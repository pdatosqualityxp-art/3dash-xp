import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { useLanguage } from '../../shared/context/LanguageContext'

export function HomeView() {
  const { t } = useLanguage()

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
        <Sparkles size={16} />
        {t('home')}
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
        {t('home_title')}
      </h1>

      <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
        {t('home_intro')}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <TrendingUp className="mb-3 text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('home_card_performance_title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('home_card_performance_text')}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <Sparkles className="mb-3 text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('home_card_ux_title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('home_card_ux_text')}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <ArrowRight className="mb-3 text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('home_card_action_title')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('home_card_action_text')}</p>
        </div>
      </div>
    </section>
  )
}
