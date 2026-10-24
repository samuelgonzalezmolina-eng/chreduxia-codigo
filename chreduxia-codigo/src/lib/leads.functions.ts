import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1u4douQXw3P8nPPcbDWE4yKi5t6UAGQ12UcasBFwlzbY";
const SHEET_TAB = "Respuestas de formulario 1";

export const SERVICIOS = [
  "Respuesta Proactiva Escolar",
  "Convivencia Escolar Inteligente",
  "Rendición de Gastos en Línea",
  "Más de un servicio",
] as const;

const reservaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo.")
    .max(100, "El nombre es demasiado largo.")
    .regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/, "El nombre solo puede contener letras."),
  correo: z
    .string()
    .trim()
    .min(1, "El correo electrónico es obligatorio.")
    .max(255, "El correo es demasiado largo.")
    .email("Ingresa un correo electrónico válido."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "El número telefónico es obligatorio.")
    .max(20, "El número es demasiado largo.")
    .regex(/^[+0-9()\s-]+$/, "Solo se permiten números, espacios y el signo +.")
    .refine((v) => v.replace(/\D/g, "").length >= 8, {
      message:
        "Ingresa un número válido con código de país, ej: +56 9 1234 5678.",
    }),
  servicio: z.enum(SERVICIOS, {
    message: "Selecciona el servicio de tu interés.",
  }),
});

export const registrarReserva = createServerFn({ method: "POST" })
  .inputValidator((data) => reservaSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
    if (!lovableKey || !sheetsKey) {
      throw new Error("La conexión con Google Sheets no está configurada.");
    }

    const timestamp = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
    });

    // Column order matches the sheet headers:
    // A Marca temporal | B Dirección de correo | C-G disponibilidad | H Objetivo
    // I Nombre Completo | J WhatsApp | K Correo electrónico | L Puntuación
    const row = [
      timestamp,
      "",
      "",
      "",
      "",
      "",
      "",
      data.servicio,
      data.nombre,
      data.whatsapp,
      data.correo,
      "",
    ];

    const range = `'${SHEET_TAB}'!A1:L1`;
    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Sheets append failed [${response.status}]: ${errorBody}`);
      throw new Error(
        "No pudimos registrar tus datos. Inténtalo nuevamente en unos minutos.",
      );
    }

    // Crea el evento en Google Calendar:
    // - summary: servicio de interés
    // - description: únicamente el número telefónico, tal como fue escrito
    // - asistente: nombre completo (displayName) y correo electrónico (email)
    const calendarKey = process.env["GOOGLE_CALENDAR_API_KEY"];
    if (calendarKey) {
      const inicio = new Date(Date.now() + 60 * 60 * 1000);
      const fin = new Date(inicio.getTime() + 30 * 60 * 1000);
      const evento = {
        summary: data.servicio,
        description: data.whatsapp,
        start: { dateTime: inicio.toISOString() },
        end: { dateTime: fin.toISOString() },
        attendees: [{ displayName: data.nombre, email: data.correo }],
      };
      const calResponse = await fetch(
        "https://connector-gateway.lovable.dev/google_calendar/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": calendarKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evento),
        },
      );
      if (!calResponse.ok) {
        const calError = await calResponse.text();
        console.error(`Calendar event failed [${calResponse.status}]: ${calError}`);
      }
    }

    return { ok: true };
  });
