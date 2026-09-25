type BarChartItem = {
  label: string
  value: number
  secondary?: string
  accentClass: string
}

type BarChartListProps = {
  items: BarChartItem[]
  maxValue: number
  formatValue: (value: number) => string
}

export function BarChartList({ items, maxValue, formatValue }: BarChartListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-slate-700 dark:text-slate-200">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold dark:bg-slate-800">
                {item.label.slice(0, 1).toUpperCase()}
              </span>
              <span className="truncate">{item.label}</span>
            </span>
            <span className="shrink-0 font-semibold text-slate-900 dark:text-white">
              {formatValue(item.value)}
            </span>
          </div>
          {item.secondary && (
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{item.secondary}</span>
            </div>
          )}
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className={`h-full rounded-full ${item.accentClass}`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
