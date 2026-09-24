import { BadgeInfo, ShieldCheck, Zap } from 'lucide-react'
import { useLanguage } from '../../shared/context/LanguageContext'

export function InfoView() {
  const { t } = useLanguage()

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
        <BadgeInfo size={16} />
        {t('info')}
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
        {t('info_title')}
      </h1>

      <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
        {t('info_intro')}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <ShieldCheck className="mb-3 text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('info_security_title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('info_security_text')}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <Zap className="mb-3 text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('info_performance_title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('info_performance_text')}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <BadgeInfo className="mb-3 text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('info_context_title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('info_context_text')}</p>
        </div>
      </div>
    </section>
  )
}
