import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import brandAsset from "@/assets/chredux-brand-octubre.png";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad y Protección de Datos — CHREDUX IA" },
      { name: "description", content: "Cómo CHREDUX IA recopila, usa y protege tus datos personales conforme a la Ley N° 19.628 de Chile." },
      { property: "og:title", content: "Política de Privacidad — CHREDUX IA" },
      { property: "og:description", content: "Tratamiento de datos personales, cookies y derechos ARCO según la Ley N° 19.628." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacidadPage,
});

const ACTUALIZACION = "2 de octubre de 2026";
const CORREO = "contacto@chreduxia.com";

const SECCIONES = [
  ["responsable", "1. Introducción y responsable"],
  ["datos", "2. Datos recopilados"],
  ["finalidad", "3. Finalidad del tratamiento"],
  ["base-legal", "4. Base legal y consentimiento"],
  ["cookies", "5. Cookies y seguimiento"],
  ["arco", "6. Derechos ARCO"],
  ["seguridad", "7. Seguridad de la información"],
  ["terceros", "8. Comunicación a terceros"],
  ["modificaciones", "9. Modificaciones"],
] as const;

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-xl border border-border bg-card p-6 sm:p-8">
      <h2 className="font-display text-xl text-foreground sm:text-2xl">{titulo}</h2>
      <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">← Volver al inicio</Link>
          <Link to="/" aria-label="CHREDUX IA — Inicio" className="ml-4 shrink-0">
            <img src={brandAsset} alt="CHREDUX IA" width={340} height={165} className="h-auto w-[100px] sm:w-[150px]" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm text-primary">Última actualización: {ACTUALIZACION}</p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl">Política de Privacidad y Protección de Datos</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Esta política se rige por la Ley N° 19.628 sobre Protección de la Vida Privada de la República de Chile.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav className="lg:sticky lg:top-6 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contenido</p>
            <ul className="space-y-1 text-sm">
              {SECCIONES.map(([id, t]) => (
                <li key={id}><a href={`#${id}`} className="block rounded-md px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">{t}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6">
            <Seccion id="responsable" titulo={SECCIONES[0][1]}>
              <p>El responsable del tratamiento de los datos personales es:</p>
              <ul>
                <li><strong>Empresa:</strong> CHREDUX IA</li>
                <li><strong>RUT:</strong> 77.201.492-9</li>
                <li><strong>Domicilio:</strong> Pedro Fontova 1145, Huechuraba, Chile</li>
                <li><strong>Correo de contacto:</strong> {CORREO}</li>
              </ul>
            </Seccion>
            <Seccion id="datos" titulo={SECCIONES[1][1]}>
              <ul>
                <li><strong>Nombre completo:</strong> para identificarte y personalizar la atención.</li>
                <li><strong>Correo electrónico:</strong> para confirmar reuniones y enviarte información solicitada.</li>
                <li><strong>Número telefónico:</strong> para coordinar la consulta inicial.</li>
                <li><strong>RUT (cuando corresponda):</strong> para emitir documentos comerciales y tributarios.</li>
                <li><strong>Servicio de interés:</strong> para preparar una propuesta adecuada.</li>
                <li><strong>Datos de navegación:</strong> dirección IP, navegador y páginas visitadas, para analizar y mejorar el sitio.</li>
              </ul>
            </Seccion>
            <Seccion id="finalidad" titulo={SECCIONES[2][1]}>
              <ul>
                <li>Gestionar solicitudes, reuniones y la relación comercial con tu institución.</li>
                <li>Enviar comunicaciones comerciales, solo con tu autorización previa.</li>
                <li>Mejorar nuestros servicios y la experiencia en el sitio.</li>
              </ul>
            </Seccion>
            <Seccion id="base-legal" titulo={SECCIONES[3][1]}>
              <p>Los datos se recopilan con tu <strong>consentimiento expreso</strong>, otorgado al completar nuestros formularios, conforme al artículo 4° de la Ley N° 19.628. Puedes revocarlo en cualquier momento, sin efecto retroactivo.</p>
            </Seccion>
            <Seccion id="cookies" titulo={SECCIONES[4][1]}>
              <p>Las cookies son pequeños archivos que el sitio guarda en tu navegador para recordar información sobre tu visita.</p>
              <ul>
                <li><strong>Técnicas o esenciales:</strong> necesarias para el funcionamiento del sitio.</li>
                <li><strong>De análisis o rendimiento:</strong> miden visitas y uso para mejorar el sitio.</li>
                <li><strong>Publicitarias o de marketing:</strong> muestran contenido relevante según tus intereses.</li>
              </ul>
              <p>Herramientas de terceros que pueden instalar cookies: <strong>Google Analytics</strong>, <strong>Meta Pixel</strong>, <strong>Google Calendar</strong> y herramientas de automatización.</p>
              <p>Puedes gestionar, bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Firefox, Safari o Edge, en la sección "Privacidad"). Bloquear las cookies esenciales puede afectar el funcionamiento del sitio.</p>
            </Seccion>
            <Seccion id="arco" titulo={SECCIONES[5][1]}>
              <p>Conforme a la Ley N° 19.628, puedes ejercer en cualquier momento tus derechos de:</p>
              <ul>
                <li><strong>Acceso:</strong> saber qué datos tuyos tenemos y para qué se usan.</li>
                <li><strong>Rectificación:</strong> corregir datos erróneos, inexactos o incompletos.</li>
                <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos.</li>
                <li><strong>Oposición:</strong> oponerte a usos específicos, como comunicaciones comerciales.</li>
              </ul>
              <p>Escríbenos a <a href={`mailto:${CORREO}`} className="text-primary hover:underline">{CORREO}</a> indicando tu nombre, el derecho que deseas ejercer y un medio de contacto. Responderemos en un plazo máximo de 2 días hábiles, según lo dispuesto por la ley.</p>
            </Seccion>
            <Seccion id="seguridad" titulo={SECCIONES[6][1]}>
              <ul>
                <li>Conexión cifrada (HTTPS) en todo el sitio.</li>
                <li>Acceso restringido a los datos solo al personal autorizado.</li>
                <li>Proveedores con estándares reconocidos de seguridad.</li>
                <li>Revisión periódica de nuestras prácticas de protección.</li>
              </ul>
            </Seccion>
            <Seccion id="terceros" titulo={SECCIONES[7][1]}>
              <p>No vendemos ni cedemos tus datos personales. Solo los compartimos con proveedores necesarios para prestar el servicio (por ejemplo, pasarelas de pago, Google Workspace y herramientas de automatización), quienes deben mantener su confidencialidad y usarlos únicamente para los fines indicados, o cuando lo exija una autoridad competente.</p>
            </Seccion>
            <Seccion id="modificaciones" titulo={SECCIONES[8][1]}>
              <p>Podemos actualizar esta política. Publicaremos los cambios en esta página indicando la nueva fecha de actualización y, si son relevantes, te avisaremos por correo electrónico.</p>
            </Seccion>
          </div>
        </div>
      </main>
    </div>
  );
}
