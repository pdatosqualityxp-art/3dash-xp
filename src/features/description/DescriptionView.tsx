import { BookOpen, CheckCircle2, Layers3 } from 'lucide-react'
import { useLanguage } from '../../shared/context/LanguageContext'

const techTags = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Context API',
  'i18n',
  'Responsive UI',
  'Accessibility',
  'Dark mode',
  'Design tokens',
]

const detailBlocks = [
  {
    title: 'Visión general',
    text:
      'El proyecto se presenta como una base modular para interfaces de dashboard con navegación lateral, contenido estructurado y experiencia visual consistente. La intención es que cada vista pueda crecer sin perder claridad ni coherencia en la interacción.',
  },
  {
    title: 'Estructura funcional',
    text:
      'La aplicación organiza la lógica por features y contextos reutilizables, permitiendo separar responsabilidades de presentación, configuración y contenido. Esto facilita la incorporación de nuevas pantallas, la actualización de textos y la escalabilidad del sistema visual.',
  },
  {
    title: 'Experiencia de usuario',
    text:
      'Cada bloque del panel está pensado para ofrecer legibilidad, priorizar contenido, y mantener una sensación premium sin saturar la pantalla. El uso de espaciados, gradientes y jerarquías visuales ayuda a que la información se entienda rápidamente en dispositivos móviles y escritorio.',
  },
  {
    title: 'Escalabilidad',
    text:
      'Cuando el producto crece, esta estructura permite añadir nuevas secciones, ampliar módulos y mantener una narrativa estable dentro de la aplicación. La composición actual facilita la integración de más tarjetas, widgets y contenido editorial sin reescribir la base del sistema.',
  },
]

export function DescriptionView() {
  const { t } = useLanguage()

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
        <BookOpen size={16} />
        {t('description')}
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
        {t('description_title')}
      </h1>

      <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
        {t('description_intro')}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {techTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <CheckCircle2 className="mt-1 shrink-0 text-teal-600 dark:text-teal-400" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('description_objective_title')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('description_objective_text')}</p>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <Layers3 className="mt-1 shrink-0 text-teal-600 dark:text-teal-400" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('description_architecture_title')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('description_architecture_text')}</p>
          </div>
        </div>

        <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <BookOpen className="mt-1 shrink-0 text-teal-600 dark:text-teal-400" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('description_content_title')}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('description_content_text')}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {detailBlocks.map((block, index) => (
          <article
            key={block.title}
            className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-900"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                0{index + 1}
              </span>
              <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                feature
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{block.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{block.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Cronograma de entrega</h3>
        <div className="mt-5 space-y-4">
          {[
            'Análisis de estructura y contenidos principales.',
            'Diseño visual de la navegación lateral y componentes reutilizables.',
            'Implementación de temas, idioma y patrón responsive del layout.',
            'Validación de la experiencia de scroll y refinamiento visual.',
            'Despliegue inicial con ajustes finales de ergonomía y usabilidad.',
          ].map((item, index) => (
            <div key={item} className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Notas de producto</h3>
        {[
          'La experiencia debe mantenerse clara tanto para usuarios nuevos como para equipos que consulten el sistema con frecuencia.',
          'Los textos y la navegación deben adaptarse a distintos tamaños de pantalla sin perder prioridad visual en los elementos clave.',
          'La composición modular ayuda a incorporar nuevas piezas sin romper el equilibrio de la interfaz ni la consistencia del diseño.',
          'El uso de gradientes, sombras discretas y proporciones guiadas contribuye a una estética moderna y profesional.',
          'La jerarquía visual favorece la comprensión rápida del contenido y permite que cada sección crezca con autonomía.',
        ].map((paragraph) => (
          <p key={paragraph} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
