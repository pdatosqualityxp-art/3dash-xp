type GeographicItem = {
  region: string
  totalVenta: number
  percent: number
}

type GeographicBreakdownProps = {
  items: GeographicItem[]
  formatValue: (value: number) => string
}

const accentPalette = [
  'rgba(20, 184, 166, 1)',
  'rgba(59, 130, 246, 1)',
  'rgba(168, 85, 247, 1)',
  'rgba(251, 146, 60, 1)',
  'rgba(244, 63, 94, 1)',
  'rgba(14, 165, 233, 1)',
  'rgba(16, 185, 129, 1)',
]

export function GeographicBreakdown({ items, formatValue }: GeographicBreakdownProps) {
  const total = items.reduce((sum, item) => sum + item.totalVenta, 0) || 1
  const gradient = items.length
    ? items
        .map((item, index) => {
          const start = items.slice(0, index).reduce((sum, current) => sum + current.percent, 0)
          const end = start + item.percent
          return `${accentPalette[index % accentPalette.length]} ${start}% ${end}%`
        })
        .join(', ')
    : 'rgba(148, 163, 184, 0.2) 0% 100%'

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
      <div className="flex items-center justify-center">
        <div
          className="flex h-44 w-44 items-center justify-center rounded-full border-[16px] border-slate-200 shadow-inner dark:border-slate-700"
          style={{
            background: `conic-gradient(${gradient})`,
          }}
        >
          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center dark:bg-slate-900">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Total</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{formatValue(total)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.region} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accentPalette[index % accentPalette.length] }}
                />
                <span>{item.region}</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">{formatValue(item.totalVenta)}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: accentPalette[index % accentPalette.length],
                  }}
                />
              </div>
              <span>{Math.round(item.percent)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
