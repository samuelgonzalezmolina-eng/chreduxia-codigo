import brandAsset from "@/assets/chredux-brand-octubre.png";
import { createFileRoute } from "@tanstack/react-router";
import {
  BellRing,
  CalendarCheck,
  ChartLine,
  Clock3,
  FileCheck2,
  Fingerprint,
  HeartHandshake,
  MessageSquareText,
  Receipt,
  Scale,
  ShieldCheck,
  Smartphone,
  Timer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { registrarReserva, SERVICIOS } from "@/lib/leads.functions";
import brandAsset from "@/assets/chredux-brand-octubre.png";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHREDUX IA — Soluciones digitales y formativas de alto impacto" },
      {
        name: "description",
        content:
          "Sistemas inteligentes para colegios: detección en tiempo real de la satisfacción de apoderados y gestión de convivencia escolar blindada bajo la Ley N° 21.809. Agenda tu consulta inicial.",
      },
      { property: "og:title", content: "CHREDUX IA — Soluciones digitales y formativas de alto impacto" },
      {
        property: "og:description",
        content:
          "De la reacción tardía a la prevención inmediata: satisfacción de apoderados y convivencia escolar con trazabilidad total.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const CALENDARIO_URL = "https://calendar.app.google/qnMm1mCvCCUMyjnk8";

function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`flex min-w-0 flex-col ${className}`}>
      <img src={brandAsset} alt="CHREDUX IA" className="h-8 w-auto object-contain" />
      <span className="wordmark-tagline mt-0.5 text-[9px] leading-tight sm:mt-1 sm:text-xs">
        Soluciones digitales y formativas de alto impacto
      </span>
    </span>
  );
}

function PulsoLuz() {
  const beamRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const secciones = Array.from(
      document.querySelectorAll<HTMLElement>(".pulso-section"),
    );
    let raf = 0;
    const tick = () => {
      const b = beam.getBoundingClientRect();
      const y = b.top + b.height / 2;
      for (const el of secciones) {
        const r = el.getBoundingClientRect();
        el.classList.toggle("pulso-lit", y >= r.top && y <= r.bottom);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <div ref={beamRef} aria-hidden className="pulso-beam" />;
}

const WHATSAPP_URL =
  "https://wa.me/56958703796?text=" +
  encodeURIComponent(
    "Hola CHREDUX IA, quiero información para nuestro colegio.",
  );

function BotonWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp a CHREDUX IA"
      className="fixed bottom-3 right-3 z-40 flex items-center gap-2.5 rounded-full bg-whatsapp px-4 py-3.5 text-whatsapp-foreground shadow-[0_12px_36px_-10px_var(--whatsapp)] transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp sm:bottom-6 sm:right-6"
    >
      <span aria-hidden className="whatsapp-latido" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="relative h-6 w-6 shrink-0"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span className="relative hidden text-sm font-semibold sm:inline">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
}



function LandingPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Nav />
      <Hero alAgendar={() => setModalAbierto(true)} />
      <Productos />
      <Comparativa />
      <Beneficios />
      <AgendaCita alAgendar={() => setModalAbierto(true)} />
      <Footer />
      <PulsoLuz />
      <BotonWhatsApp />
      <ModalTelefono
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <a href="#inicio" className="flex items-center">
          <Brand className="w-[128px] sm:w-[230px] md:w-[270px]" />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#productos" className="transition-colors hover:text-foreground">
            Productos
          </a>
          <a href="#comparativa" className="transition-colors hover:text-foreground">
            ¿Por qué ahora?
          </a>
          <a href="#beneficios" className="transition-colors hover:text-foreground">
            Beneficios
          </a>
        </nav>
        <a
          href="#contacto"
          className="shrink-0 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition-transform hover:scale-[1.03] sm:px-5 sm:text-sm"
        >
          Agendar consulta
        </a>
      </div>
    </header>
  );
}

function Hero({ alAgendar }: { alAgendar: () => void }) {
  return (
    <section id="inicio" className="pulso-section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 30rem at 80% -10%, oklch(0.78 0.16 75 / 0.14), transparent 60%), radial-gradient(50rem 28rem at 0% 110%, oklch(0.55 0.12 262 / 0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-32">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <Timer className="h-3.5 w-3.5 text-primary" />
            Soluciones digitales y formativas de alto impacto
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Deja de enterarte{" "}
            <span className="text-primary italic">demasiado tarde</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Las malas experiencias ocurren en segundos; las evaluaciones
            tradicionales tardan meses. Nuestros sistemas detectan, alertan y
            documentan cada interacción crítica de tu colegio al instante.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={alAgendar}
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_-8px_var(--primary)] transition-transform hover:scale-[1.03]"
            >
              Agendar mi consulta inicial
            </button>
            <a
              href="#productos"
              className="rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Conocer los productos
            </a>
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-2 border-t border-border pt-5 pr-14 sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:pr-0 sm:pt-8">
            {[
              ["Segundos", "en detectar una mala experiencia"],
              ["100%", "trazabilidad auditable de cada caso"],
              ["Ley 21.809", "cumplimiento normativo automatizado"],
            ].map(([valor, texto]) => (
              <div key={texto}>
                <dt className="font-display text-lg text-primary sm:text-2xl">
                  {valor}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                  {texto}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-3xl opacity-25 blur-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), oklch(0.55 0.12 262))",
            }}
          />
          <div className="relative rounded-3xl border border-border bg-card p-8 shadow-2xl">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Panel en vivo — Punto de atención: Recepción
            </p>
            <div className="mt-6 space-y-4">
              {[
                { icon: Smartphone, titulo: "Apoderado evalúa con placa magnética", detalle: "Hace 12 segundos", tono: "ok" },
                { icon: BellRing, titulo: "Alerta crítica enviada a Dirección", detalle: "Motivo y hora exactos", tono: "alert" },
                { icon: MessageSquareText, titulo: "Correo de contención automático", detalle: "Caso en gestión interna", tono: "ok" },
                { icon: FileCheck2, titulo: "Registro inalterable guardado", detalle: "Folio #2026-0481", tono: "ok" },
              ].map((item) => (
                <div
                  key={item.titulo}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      item.tono === "alert"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.titulo}</p>
                    <p className="text-xs text-muted-foreground">{item.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Productos() {
  return (
    <section id="productos" className="pulso-section border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          Nuestros productos
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">
          Tres sistemas, un solo objetivo: un colegio protegido
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <article className="flex flex-col rounded-3xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/40 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <HeartHandshake className="h-6 w-6" />
            </span>
            <h3 className="mt-6 font-display text-2xl">
              Respuesta Proactiva Escolar
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sistema de gestión de satisfacción exclusivo para colegios. El
              apoderado acerca su teléfono a una placa magnética y evalúa en
              segundos, sin apps ni registros. Tú recibes la alerta antes de que
              la frustración crezca.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Evaluación ultra-rápida en el punto de atención, sin fricción",
                "Alertas en tiempo real con fecha, hora y motivo exacto",
                "Correos automáticos de agradecimiento y contención al apoderado",
                "Mapas de calor de áreas críticas y tiempos reales de respuesta",
              ].map((punto) => (
                <li key={punto} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-muted p-4 text-sm font-medium">
              Resultado: alta retención, lealtad y contención asegurada — en
              lugar de fuga silenciosa y daño reputacional.
            </p>
            <div className="mt-auto pt-6">
              <a
                href="#contacto"
                className="inline-flex w-fit rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Quiero este sistema
              </a>
            </div>
          </article>

          <article className="flex flex-col rounded-3xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/40 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Scale className="h-6 w-6" />
            </span>
            <h3 className="mt-6 font-display text-2xl">
              Convivencia Escolar Inteligente
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Gestión de denuncias blindada bajo la Ley N° 21.809. Reemplaza los
              buzones ciegos y planillas manuales por un flujo digital con
              anonimato garantizado, folio único y trazabilidad inalterable.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Reporte seguro y anónimo desde cualquier smartphone",
                "Folio único instantáneo y registro inalterable en la nube",
                "Pre Informes PDF formales y ruta legal exacta (protocolos RIE)",
                "Alertas críticas a Dirección en minutos, no en días",
              ].map((punto) => (
                <li key={punto} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-muted p-4 text-sm font-medium">
              Resultado: cero multas por fallas de proceso, cumplimiento que
              supera los estándares de la Superintendencia.
            </p>
            <div className="mt-auto pt-6">
              <a
                href="#contacto"
                className="inline-flex w-fit rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Quiero este sistema
              </a>
            </div>
          </article>

          <article className="flex flex-col rounded-3xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/40 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Receipt className="h-6 w-6" />
            </span>
            <h3 className="mt-6 font-display text-2xl">
              Rendición de Gastos en Línea
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Automatización que recibe comprobantes por WhatsApp, en imagen o
              PDF. Descarga el archivo, lo guarda en Google Drive y extrae sus
              datos con IA para registrarlos en Google Sheets sin tipear nada.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Envío por WhatsApp, sin apps ni registros nuevos",
                "Archivo automático en Google Drive, sin comprobantes perdidos",
                "Datos extraídos con IA y registrados en Google Sheets",
                "Totales y resúmenes por número de WhatsApp, con confirmación automática",
              ].map((punto) => (
                <li key={punto} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-muted p-4 text-sm font-medium">
              Resultado: rendiciones completas y auditables el mismo día, sin
              planillas manuales ni carpetas desordenadas.
            </p>
            <div className="mt-auto pt-6">
              <a
                href="#contacto"
                className="inline-flex w-fit rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Quiero este sistema
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Comparativa() {
  const filas = [
    ["Detección", "Diagnóstico tardío, ocurre en meses", "Detección en tiempo real, en segundos"],
    ["Esfuerzo", "Retención manual, investigativa y agotadora", "Gestión automatizada con datos quirúrgicos"],
    ["Evidencia", "Comentarios informales y planillas alterables", "Trazabilidad inalterable y reportes duros"],
    ["Resultado", "Alta fuga silenciosa y daño reputacional", "Alta retención, lealtad y contención"],
  ];
  return (
    <section id="comparativa" className="pulso-section border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          La trampa de los métodos tradicionales
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">
          Modelo reactivo vs. modelo proactivo
        </h2>
        <div className="mt-12 overflow-hidden rounded-3xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-6 py-4 text-left font-semibold">Categoría</th>
                <th className="px-6 py-4 text-left font-semibold">Modelo reactivo (antes)</th>
                <th className="px-6 py-4 text-left font-semibold">Modelo proactivo (después)</th>
              </tr>
            </thead>
            <tbody>
              {filas.map(([cat, antes, despues], i) => (
                <tr key={cat} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <td className="px-6 py-4 font-semibold">{cat}</td>
                  <td className="px-6 py-4 text-muted-foreground">{antes}</td>
                  <td className="px-6 py-4 font-medium">{despues}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  const items = [
    { icon: Clock3, titulo: "Optimización del tiempo", texto: "Menos horas investigando conflictos y más enfoque en resolverlos efectivamente." },
    { icon: HeartHandshake, titulo: "Fidelización real", texto: "Demuestra con hechos que la voz de la familia importa: transforma quejas en lealtad." },
    { icon: ChartLine, titulo: "Protección de ingresos", texto: "Aumenta la retención y la matrícula al evitar la fuga silenciosa de apoderados." },
    { icon: Fingerprint, titulo: "Registro inalterable", texto: "Historial automático y auditable de cada interacción y reclamo del colegio." },
    { icon: Smartphone, titulo: "Solución llave en mano", texto: "Software en la nube, hardware integrado y acompañamiento técnico especializado." },
    { icon: Scale, titulo: "Blindaje jurídico", texto: "Cumplimiento automatizado de la Ley N° 21.809 con Pre Informes listos para revisión." },
  ];
  return (
    <section id="beneficios" className="pulso-section border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          Beneficios
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">
          Tecnología robusta, servicio humano
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.titulo} className="rounded-3xl border border-border bg-background p-7 transition-colors hover:border-primary/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg">{item.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgendaCita({ alAgendar }: { alAgendar: () => void }) {
  return (
    <section id="contacto" className="pulso-section border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          Toma el control hoy
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">
          Agenda tu consulta inicial en minutos
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Una mala experiencia ocurre en segundos; tu ventaja competitiva está
          en la velocidad de tu respuesta. Elige el día y la hora que te
          acomoden y conversamos sobre la plataforma con datos adaptados a tu
          realidad escolar.
        </p>
        <button
          onClick={alAgendar}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_-8px_var(--primary)] transition-transform hover:scale-[1.03]"
        >
          <CalendarCheck className="h-5 w-5" />
          Agendar mi consulta inicial
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          Se abrirá mi calendario de Google en una nueva pestaña para que elijas
          el horario que prefieras.
        </p>
        <ul className="mt-12 grid w-full max-w-3xl gap-6 text-left sm:grid-cols-3">
          {[
            "Implementación rápida, transparente y sin fricciones",
            "Protege a tu equipo directivo, a tus alumnos y tu prestigio",
            "Soporte continuo y acompañamiento 100% especializado",
          ].map((punto) => (
            <li
              key={punto}
              className="flex gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm">{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type CamposReserva = {
  nombre: string;
  correo: string;
  telefono: string;
  servicio: string;
};

type ErroresReserva = Partial<Record<keyof CamposReserva, string>>;

const CAMPOS_VACIOS: CamposReserva = {
  nombre: "",
  correo: "",
  telefono: "",
  servicio: "",
};

function validarCampos(campos: CamposReserva): ErroresReserva {
  const errores: ErroresReserva = {};
  const nombre = campos.nombre.trim();
  if (!nombre) errores.nombre = "Ingresa tu nombre completo.";
  else if (nombre.length < 3) errores.nombre = "Ingresa tu nombre completo.";
  else if (nombre.length > 100) errores.nombre = "El nombre es demasiado largo.";
  else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(nombre))
    errores.nombre = "El nombre solo puede contener letras.";

  const correo = campos.correo.trim();
  if (!correo) errores.correo = "El correo electrónico es obligatorio.";
  else if (correo.length > 255) errores.correo = "El correo es demasiado largo.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
    errores.correo = "Ingresa un correo electrónico válido.";

  const telefono = campos.telefono.trim();
  if (!telefono) errores.telefono = "El número telefónico es obligatorio.";
  else if (telefono.length > 20)
    errores.telefono = "El número es demasiado largo.";
  else if (!/^[+0-9()\s-]+$/.test(telefono))
    errores.telefono = "Solo se permiten números, espacios y el signo +.";
  else if (telefono.replace(/\D/g, "").length < 8)
    errores.telefono =
      "Ingresa un número válido con código de país, ej: +56 9 1234 5678.";

  if (!campos.servicio) errores.servicio = "Selecciona el servicio de tu interés.";

  return errores;
}

function ModalTelefono({
  abierto,
  onCerrar,
}: {
  abierto: boolean;
  onCerrar: () => void;
}) {
  const [campos, setCampos] = useState<CamposReserva>(CAMPOS_VACIOS);
  const [errores, setErrores] = useState<ErroresReserva>({});
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);

  if (!abierto) return null;

  const actualizar = (campo: keyof CamposReserva, valor: string) => {
    setCampos((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  const enviar = async () => {
    const nuevosErrores = validarCampos(campos);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    setErrores({});
    setErrorGeneral(null);
    setEnviando(true);
    try {
      await registrarReserva({
        data: {
          nombre: campos.nombre.trim(),
          correo: campos.correo.trim(),
          whatsapp: campos.telefono.trim(),
          servicio: campos.servicio as (typeof SERVICIOS)[number],
        },
      });
      setListo(true);
    } catch {
      setErrorGeneral("No pudimos registrar tus datos. Inténtalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  const cerrar = () => {
    onCerrar();
    setCampos(CAMPOS_VACIOS);
    setErrores({});
    setErrorGeneral(null);
    setListo(false);
  };

  const claseInput = (conError: boolean) =>
    `mt-2 w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary ${
      conError ? "border-destructive" : "border-border"
    }`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={cerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Agendar consulta inicial"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {listo ? (
          <div className="text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <CalendarCheck className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl">¡Datos registrados!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ahora elige el día y la hora que prefieras en el calendario.
            </p>
            <a
              href={CALENDARIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={cerrar}
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_-8px_var(--primary)] transition-transform hover:scale-[1.03]"
            >
              Abrir calendario
            </a>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl">
              Agenda tu consulta inicial
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Completa tus datos para coordinar la consulta y luego elige el
              horario en el calendario.
            </p>

            <label
              htmlFor="reserva-nombre"
              className="mt-5 block text-sm font-semibold"
            >
              Nombre completo
            </label>
            <input
              id="reserva-nombre"
              type="text"
              value={campos.nombre}
              onChange={(e) => actualizar("nombre", e.target.value)}
              placeholder="Ej: María González Pérez"
              maxLength={100}
              aria-invalid={Boolean(errores.nombre)}
              className={claseInput(Boolean(errores.nombre))}
            />
            {errores.nombre && (
              <p className="mt-2 text-xs text-destructive">{errores.nombre}</p>
            )}

            <label
              htmlFor="reserva-correo"
              className="mt-4 block text-sm font-semibold"
            >
              Correo electrónico
            </label>
            <input
              id="reserva-correo"
              type="email"
              value={campos.correo}
              onChange={(e) => actualizar("correo", e.target.value)}
              placeholder="tucorreo@ejemplo.cl"
              maxLength={255}
              aria-invalid={Boolean(errores.correo)}
              className={claseInput(Boolean(errores.correo))}
            />
            {errores.correo && (
              <p className="mt-2 text-xs text-destructive">{errores.correo}</p>
            )}

            <label
              htmlFor="reserva-telefono"
              className="mt-4 block text-sm font-semibold"
            >
              Número telefónico (WhatsApp)
            </label>
            <input
              id="reserva-telefono"
              type="tel"
              inputMode="tel"
              value={campos.telefono}
              onChange={(e) => actualizar("telefono", e.target.value)}
              placeholder="+56 9 1234 5678"
              maxLength={20}
              aria-invalid={Boolean(errores.telefono)}
              className={claseInput(Boolean(errores.telefono))}
            />
            {errores.telefono && (
              <p className="mt-2 text-xs text-destructive">{errores.telefono}</p>
            )}

            <label
              htmlFor="reserva-servicio"
              className="mt-4 block text-sm font-semibold"
            >
              Servicio de interés
            </label>
            <select
              id="reserva-servicio"
              value={campos.servicio}
              onChange={(e) => actualizar("servicio", e.target.value)}
              aria-invalid={Boolean(errores.servicio)}
              className={claseInput(Boolean(errores.servicio))}
            >
              <option value="">Selecciona una opción…</option>
              {SERVICIOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errores.servicio && (
              <p className="mt-2 text-xs text-destructive">{errores.servicio}</p>
            )}

            {errorGeneral && (
              <p className="mt-4 text-xs text-destructive">{errorGeneral}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={enviar}
                disabled={enviando}
                className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_32px_-8px_var(--primary)] transition-transform hover:scale-[1.03] disabled:opacity-60"
              >
                {enviando ? "Registrando…" : "Continuar al calendario"}
              </button>
              <button
                onClick={cerrar}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="pulso-section border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 pt-8 pb-20 text-sm text-muted-foreground sm:flex-row sm:pt-10 sm:pb-24">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Brand className="w-[190px] sm:w-[270px]" />
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <p>Gestión de satisfacción y convivencia escolar en tiempo real.</p>
          <a href="/privacidad" className="text-primary hover:underline">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
