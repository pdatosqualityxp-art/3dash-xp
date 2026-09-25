import { Fragment } from 'react'

type HeatmapCell = {
  country: string
  region: string
  totalVenta: number
}

type HeatmapMatrixProps = {
  cells: HeatmapCell[]
  formatValue: (value: number) => string
  countryLabel: string
  regionLabel: string
  intensityLabel: string
}

const heatPalette = [
  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200',
  'bg-sky-200 text-sky-900 dark:bg-sky-900/60 dark:text-sky-100',
  'bg-sky-300 text-sky-950 dark:bg-sky-800 dark:text-sky-50',
  'bg-sky-400 text-sky-950 dark:bg-sky-700 dark:text-white',
  'bg-sky-500 text-white dark:bg-sky-600 dark:text-white',
  'bg-sky-600 text-white dark:bg-sky-500 dark:text-white',
]

export function HeatmapMatrix({
  cells,
  formatValue,
  countryLabel,
  regionLabel,
  intensityLabel,
}: HeatmapMatrixProps) {
  const countries = Array.from(new Set(cells.map((cell) => cell.country))).sort()
  const regions = Array.from(new Set(cells.map((cell) => cell.region))).sort()
  const maxValue = Math.max(...cells.map((cell) => cell.totalVenta), 1)

  const getHeatClass = (value: number) => {
    const ratio = value / maxValue
    const index = Math.min(Math.max(Math.floor(ratio * (heatPalette.length - 1)), 0), heatPalette.length - 1)
    return heatPalette[index]
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        <span>{countryLabel}</span>
        <span>{regionLabel}</span>
        <span>{intensityLabel}</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <div
            className="min-w-[420px]"
            style={{
              display: 'grid',
              gridTemplateColumns: `minmax(160px, 1.5fr) repeat(${regions.length || 1}, minmax(110px, 1fr))`,
            }}
          >
            <div className="border-b border-r border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {countryLabel}
            </div>

            {regions.map((region) => (
              <div
                key={region}
                className="border-b border-r border-slate-200 bg-slate-50 p-3 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {region}
              </div>
            ))}

            {countries.map((country) => (
              <Fragment key={`${country}-row`}>
                <div className="border-b border-r border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {country}
                </div>

                {regions.map((region) => {
                  const match = cells.find(
                    (cell) => cell.country === country && cell.region === region,
                  )

                  const value = match?.totalVenta ?? 0

                  return (
                    <div
                      key={`${country}-${region}`}
                      className={`flex min-h-[72px] items-center justify-center border-b border-r border-slate-200 p-2 text-center text-xs font-medium ${getHeatClass(value)}`}
                      title={`${country} / ${region}: ${formatValue(value)}`}
                    >
                      {value === 0 ? '-' : formatValue(value)}
                    </div>
                  )
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
