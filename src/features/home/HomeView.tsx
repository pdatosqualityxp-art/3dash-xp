import { ArrowRight, Database, Sparkles, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import { useLanguage } from '../../shared/context/LanguageContext'

type DashboardSummary = {
  products: number
  clients: number
  interventions: number
}

export function HomeView() {
  const { t } = useLanguage()
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env')
      setLoading(false)
      return
    }

    const fetchSummary = async () => {
      try {
        const [productsResponse, clientsResponse, interventionsResponse] = await Promise.all([
          supabase.from('productos').select('*', { count: 'exact', head: true }),
          supabase.from('clientes').select('*', { count: 'exact', head: true }),
          supabase.from('intervenciones').select('*', { count: 'exact', head: true }),
        ])

        const productError = productsResponse.error
        const clientError = clientsResponse.error
        const interventionError = interventionsResponse.error

        if (productError || clientError || interventionError) {
          setError('No se pudo conectar con Supabase. Revisa la URL, la clave y el SQL ejecutado.')
          setLoading(false)
          return
        }

        setSummary({
          products: productsResponse.count ?? 0,
          clients: clientsResponse.count ?? 0,
          interventions: interventionsResponse.count ?? 0,
        })
      } catch {
        setError('Error inesperado al consultar Supabase.')
      } finally {
        setLoading(false)
      }
    }

    void fetchSummary()
  }, [])

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

      <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-5 dark:border-teal-900/60 dark:bg-slate-800/80">
        <div className="flex items-center gap-3">
          <Database className="text-teal-600 dark:text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Datos de Supabase</h2>
        </div>

        {loading ? (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Conectando con la base de datos...</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : summary ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Productos</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{summary.products}</p>
            </div>
            <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Clientes</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{summary.clients}</p>
            </div>
            <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Intervenciones</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{summary.interventions}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
