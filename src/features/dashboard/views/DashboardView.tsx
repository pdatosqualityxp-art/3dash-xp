import { useEffect, useMemo, useState } from 'react'
import { BarChart3, DollarSign, MapPinned, Package, TrendingUp, Users } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { BarChartList } from '../components/BarChartList'
import { GeographicBreakdown } from '../components/GeographicBreakdown'
import { GeoChoroplethMap } from '../components/GeoChoroplethMap'
import { getDashboardData, type DashboardData } from '../services/dashboardService'
import { useLanguage } from '../../../shared/context/LanguageContext'

const currencyFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
})

const integerFormatter = new Intl.NumberFormat('es-ES', {
  maximumFractionDigits: 0,
})

export function DashboardView() {
  const { t } = useLanguage()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getDashboardData()
        setDashboardData(data)
        setError(null)
      } catch {
        setError(t('dashboard_fetch_error'))
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [t])

  const maxClientValue = useMemo(
    () => Math.max(...(dashboardData?.topClients.map((item) => item.totalVenta) ?? [1]), 1),
    [dashboardData],
  )

  const maxProductValue = useMemo(
    () => Math.max(...(dashboardData?.topProducts.map((item) => item.totalVenta) ?? [1]), 1),
    [dashboardData],
  )

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {t('dashboard_loading')}
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-300">
        {error}
      </section>
    )
  }

  if (!dashboardData) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        {t('dashboard_no_data')}
      </section>
    )
  }

  const clientItems = dashboardData.topClients.map((client) => ({
    label: client.nomCliente,
    value: client.totalVenta,
    accentClass: 'bg-gradient-to-r from-teal-500 to-cyan-500',
  }))

  const productItems = dashboardData.topProducts.map((product) => ({
    label: product.nomProd,
    value: product.totalVenta,
    secondary: `${t('dashboard_units')}: ${integerFormatter.format(product.unidadesVenta)}`,
    accentClass: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
  }))

  const geographicItems = dashboardData.geographicSales.map((item) => ({
    region: item.region,
    totalVenta: item.totalVenta,
    percent: item.percent,
  }))

  const mapPoints = dashboardData.mapPoints

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
          <BarChart3 size={16} />
          {t('dashboard')}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          {t('dashboard_title')}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
          {t('dashboard_intro')}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title={t('dashboard_kpi_revenue')}
          value={currencyFormatter.format(dashboardData.totalRevenue)}
          helper={t('dashboard_kpi_revenue_helper')}
          icon={<DollarSign size={18} />}
          accentClass="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
        />
        <MetricCard
          title={t('dashboard_kpi_units')}
          value={integerFormatter.format(dashboardData.totalUnits)}
          helper={t('dashboard_kpi_units_helper')}
          icon={<Package size={18} />}
          accentClass="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
        />
        <MetricCard
          title={t('dashboard_kpi_ticket')}
          value={currencyFormatter.format(dashboardData.averageTicket)}
          helper={t('dashboard_kpi_ticket_helper')}
          icon={<TrendingUp size={18} />}
          accentClass="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
        />
        <MetricCard
          title={t('dashboard_kpi_orders')}
          value={integerFormatter.format(dashboardData.totalOperations)}
          helper={t('dashboard_kpi_orders_helper')}
          icon={<Users size={18} />}
          accentClass="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="text-teal-600 dark:text-teal-400" size={20} />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('dashboard_top_clients')}</h2>
          </div>
          <BarChartList
            items={clientItems}
            maxValue={maxClientValue}
            formatValue={(value) => currencyFormatter.format(value)}
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <Package className="text-violet-600 dark:text-violet-400" size={20} />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('dashboard_top_products')}</h2>
          </div>
          <BarChartList
            items={productItems}
            maxValue={maxProductValue}
            formatValue={(value) => currencyFormatter.format(value)}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <MapPinned className="text-sky-600 dark:text-sky-400" size={20} />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('dashboard_map_title')}</h2>
        </div>
        <GeoChoroplethMap
          points={mapPoints}
          formatValue={(value) => currencyFormatter.format(value)}
          title={t('dashboard_map_title')}
          regionLabel={t('dashboard_map_region')}
          cityLabel={t('dashboard_map_city')}
          valueLabel={t('dashboard_map_value')}
          emptyLabel={t('dashboard_map_empty')}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <MapPinned className="text-sky-600 dark:text-sky-400" size={20} />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('dashboard_geo')}</h2>
        </div>
        <GeographicBreakdown
          items={geographicItems}
          formatValue={(value) => currencyFormatter.format(value)}
        />
      </div>
    </section>
  )
}
