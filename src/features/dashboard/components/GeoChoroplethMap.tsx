import { useEffect, useMemo, useState, type ComponentType } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import { useTheme } from '../../../shared/context/ThemeContext'
import 'leaflet/dist/leaflet.css'

const MapContainerCompat = MapContainer as unknown as ComponentType<any>
const TileLayerCompat = TileLayer as unknown as ComponentType<any>
const CircleMarkerCompat = CircleMarker as unknown as ComponentType<any>

type MapSalesPoint = {
  id: string
  city: string
  province: string
  region: string
  totalVenta: number
  latitude: number
  longitude: number
}

type GeoChoroplethMapProps = {
  points: MapSalesPoint[]
  formatValue: (value: number) => string
  title: string
  regionLabel: string
  cityLabel: string
  valueLabel: string
  emptyLabel: string
}

const getTileLayer = (_theme: 'light' | 'dark') => ({
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
})

function MapView({ points, formatValue, regionLabel, cityLabel, valueLabel }: Omit<GeoChoroplethMapProps, 'title' | 'emptyLabel'>) {
  const { theme } = useTheme()
  const [hoveredPoint, setHoveredPoint] = useState<MapSalesPoint | null>(null)
  const maxValue = useMemo(() => Math.max(...points.map((point) => point.totalVenta), 1), [points])
  const tileLayer = getTileLayer(theme)

  const map = useMap()

  useEffect(() => {
    map.setView([40.4168, -3.7038], 5)
  }, [map])

  return (
    <>
      <TileLayerCompat url={tileLayer.url} attribution={tileLayer.attribution} />
      {points.map((point) => {
        const ratio = point.totalVenta / maxValue
        const radius = 8 + ratio * 25
        const color = `hsla(${200 + ratio * 50}, 80%, ${65 - ratio * 18}%, 0.8)`

        return (
          <CircleMarkerCompat
            key={point.id}
            center={[point.latitude, point.longitude]}
            radius={radius}
            pathOptions={{
              color: 'rgba(255,255,255,0.9)',
              weight: 1.4,
              fillColor: color,
              fillOpacity: 0.8,
            }}
            eventHandlers={{
              mouseover: () => setHoveredPoint(point),
              mouseout: () => setHoveredPoint(null),
            }}
          >
            <Popup>
              <div className="min-w-[180px] text-left">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {regionLabel}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{point.region}</div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {cityLabel}
                </div>
                <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">{point.city}</div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {valueLabel}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {formatValue(point.totalVenta)}
                </div>
              </div>
            </Popup>
          </CircleMarkerCompat>
        )
      })}
      {hoveredPoint && (
        <Popup position={[hoveredPoint.latitude, hoveredPoint.longitude]}>
          <div className="min-w-[180px] text-left">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {regionLabel}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{hoveredPoint.region}</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {cityLabel}
            </div>
            <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">{hoveredPoint.city}</div>
            <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {valueLabel}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
              {formatValue(hoveredPoint.totalVenta)}
            </div>
          </div>
        </Popup>
      )}
    </>
  )
}

export function GeoChoroplethMap({
  points,
  formatValue,
  title,
  regionLabel,
  cityLabel,
  valueLabel,
  emptyLabel,
}: GeoChoroplethMapProps) {
  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/40">
        {points.length > 0 ? (
          <div className="relative h-[450px] w-full">
            <MapContainerCompat center={[40.4168, -3.7038]} zoom={5} scrollWheelZoom className="h-[450px] w-full">
              <MapView
                points={points}
                formatValue={formatValue}
                regionLabel={regionLabel}
                cityLabel={cityLabel}
                valueLabel={valueLabel}
              />
            </MapContainerCompat>
          </div>
        ) : (
          <div className="flex h-[450px] items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  )
}
