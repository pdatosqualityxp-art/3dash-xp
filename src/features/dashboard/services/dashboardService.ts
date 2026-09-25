import { isSupabaseConfigured, supabase } from '../../../lib/supabase'

export type DashboardMetric = {
  label: string
  value: number
}

export type ClientSalesMetric = {
  idCliente: string
  nomCliente: string
  totalVenta: number
}

export type ProductSalesMetric = {
  idProd: string
  nomProd: string
  totalVenta: number
  unidadesVenta: number
}

export type GeographicSalesMetric = {
  region: string
  totalVenta: number
  percent: number
}

export type MapSalesPoint = {
  id: string
  city: string
  province: string
  region: string
  totalVenta: number
  latitude: number
  longitude: number
}

export type DashboardData = {
  totalRevenue: number
  totalUnits: number
  averageTicket: number
  totalOperations: number
  topClients: ClientSalesMetric[]
  topProducts: ProductSalesMetric[]
  geographicSales: GeographicSalesMetric[]
  mapPoints: MapSalesPoint[]
}

type SaleRow = {
  idventa: string
  idprod: string
  idcliente: string
  unidadesventa: number
  preciounidadventa: number
  totalventa: number
  fechaventa: string
}

type ClientRow = {
  idcliente: string
  nomcliente: string
  paiscliente: string | null
  comautonomacliente: string | null
  provinciacliente: string | null
  poblacioncliente: string | null
}

type ProductRow = {
  idprod: string
  nomprod: string
}

const normalizeText = (value: string | null | undefined) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const cityCoordinates: Record<string, [number, number]> = {
  madrid: [40.4168, -3.7038],
  barcelona: [41.3851, 2.1734],
  valencia: [39.4699, -0.3763],
  sevilla: [37.3891, -5.9845],
  malaga: [36.7213, -4.4214],
  zaragoza: [41.6488, -0.8891],
  bilbao: [43.263, -2.934],
  murcia: [37.9922, -1.1307],
  palma: [39.5696, 2.6502],
  'las palmas': [28.1248, -15.43],
  'santa cruz de tenerife': [28.4636, -16.2518],
  alicante: [38.3452, -0.4815],
  cordoba: [37.8882, -4.7794],
  granada: [37.1773, -3.5986],
  toledo: [39.8628, -4.0273],
  valladolid: [41.6523, -4.7286],
  salamanca: [40.9701, -5.6635],
  'a coruna': [43.3623, -8.4115],
  coruna: [43.3623, -8.4115],
  lugo: [43.012, -7.557],
  oviedo: [43.3619, -5.8494],
  pamplona: [42.8125, -1.6458],
  navarra: [42.8125, -1.6458],
  logrono: [42.4658, -2.4499],
  'la rioja': [42.4658, -2.4499],
  albacete: [38.9944, -1.8564],
  cuenca: [40.0704, -2.1374],
  guadalajara: [40.6327, -3.167],
  almeria: [36.8402, -2.4679],
  huelva: [37.2579, -6.948],
  jaen: [37.7796, -3.7847],
  caceres: [39.4722, -6.3719],
  badajoz: [38.8794, -6.9707],
  'castilla y leon': [41.65, -4.72],
  'castilla la mancha': [39.7, -3.5],
  andalusia: [37.4, -4.8],
  catalonia: [41.6, 1.8],
  galicia: [42.9, -8.1],
  'basque country': [43.2, -2.9],
  aragon: [41.5, -0.9],
  'balearic islands': [39.56, 2.65],
  asturias: [43.36, -5.84],
  extremadura: [39.3, -6.1],
  'canary islands': [28.1, -15.4],
  navarre: [42.81, -1.65],
}

const resolveCoordinates = (client: ClientRow): [number, number] => {
  const candidates = [
    client.poblacioncliente,
    client.provinciacliente,
    client.comautonomacliente,
    'madrid',
  ]

  for (const candidate of candidates) {
    const normalized = normalizeText(candidate)
    if (!normalized) continue
    const matchKey = Object.keys(cityCoordinates).find((key) => normalizeText(key) === normalized)
    if (matchKey) return cityCoordinates[matchKey]
  }

  return cityCoordinates.madrid
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase not configured')
  }

  const [salesResult, clientsResult, productsResult] = await Promise.all([
    supabase.from('ventas').select('*'),
    supabase.from('clientes').select('*'),
    supabase.from('productos').select('*'),
  ])

  if (salesResult.error || clientsResult.error || productsResult.error) {
    throw new Error('Dashboard data fetch failed')
  }

  const sales = (salesResult.data ?? []) as SaleRow[]
  const clients = (clientsResult.data ?? []) as ClientRow[]
  const products = (productsResult.data ?? []) as ProductRow[]

  const customerNames = new Map<string, string>(
    clients.map((client) => [String(client.idcliente), String(client.nomcliente ?? 'Cliente sin nombre')]),
  )

  const productNames = new Map<string, string>(
    products.map((product) => [String(product.idprod), String(product.nomprod ?? 'Producto sin nombre')]),
  )

  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.totalventa ?? 0), 0)
  const totalUnits = sales.reduce((sum, sale) => sum + Number(sale.unidadesventa ?? 0), 0)
  const totalOperations = sales.length
  const averageTicket = totalOperations > 0 ? totalRevenue / totalOperations : 0

  const clientTotals = new Map<string, ClientSalesMetric>()
  for (const sale of sales) {
    const key = String(sale.idcliente)
    const totalVenta = Number(sale.totalventa ?? 0)
    const current = clientTotals.get(key)

    if (current) {
      current.totalVenta += totalVenta
    } else {
      clientTotals.set(key, {
        idCliente: key,
        nomCliente: customerNames.get(key) ?? 'Cliente sin nombre',
        totalVenta,
      })
    }
  }

  const productTotals = new Map<string, ProductSalesMetric>()
  for (const sale of sales) {
    const key = String(sale.idprod)
    const totalVenta = Number(sale.totalventa ?? 0)
    const unidades = Number(sale.unidadesventa ?? 0)
    const current = productTotals.get(key)

    if (current) {
      current.totalVenta += totalVenta
      current.unidadesVenta += unidades
    } else {
      productTotals.set(key, {
        idProd: key,
        nomProd: productNames.get(key) ?? 'Producto sin nombre',
        totalVenta,
        unidadesVenta: unidades,
      })
    }
  }

  const regionalTotals = new Map<string, number>()
  for (const sale of sales) {
    const client = clients.find((item) => String(item.idcliente) === String(sale.idcliente))
    const region = client?.comautonomacliente?.trim() || 'Sin región'
    const totalVenta = Number(sale.totalventa ?? 0)
    regionalTotals.set(region, (regionalTotals.get(region) ?? 0) + totalVenta)
  }

  const geographicSales = Array.from(regionalTotals.entries())
    .map(([region, totalVenta]) => ({ region, totalVenta }))
    .sort((a, b) => b.totalVenta - a.totalVenta)

  const totalRegionalRevenue = geographicSales.reduce((sum, item) => sum + item.totalVenta, 0) || 1

  const mapPoints = new Map<string, MapSalesPoint>()
  for (const sale of sales) {
    const client = clients.find((item) => String(item.idcliente) === String(sale.idcliente))
    if (!client) continue

    const city = String(client.poblacioncliente ?? client.provinciacliente ?? client.comautonomacliente ?? 'Madrid').trim() || 'Madrid'
    const province = String(client.provinciacliente ?? client.comautonomacliente ?? city).trim() || city
    const region = String(client.comautonomacliente ?? client.provinciacliente ?? city).trim() || city
    const key = `${city}|${province}|${region}`
    const [latitude, longitude] = resolveCoordinates(client)
    const totalVenta = Number(sale.totalventa ?? 0)
    const current = mapPoints.get(key)

    if (current) {
      current.totalVenta += totalVenta
    } else {
      mapPoints.set(key, {
        id: key,
        city,
        province,
        region,
        totalVenta,
        latitude,
        longitude,
      })
    }
  }

  return {
    totalRevenue,
    totalUnits,
    averageTicket,
    totalOperations,
    topClients: Array.from(clientTotals.values())
      .sort((a, b) => b.totalVenta - a.totalVenta)
      .slice(0, 5),
    topProducts: Array.from(productTotals.values())
      .sort((a, b) => b.totalVenta - a.totalVenta)
      .slice(0, 5),
    geographicSales: geographicSales.map((item) => ({
      region: item.region,
      totalVenta: item.totalVenta,
      percent: (item.totalVenta / totalRegionalRevenue) * 100,
    })),
    mapPoints: Array.from(mapPoints.values()).sort((a, b) => b.totalVenta - a.totalVenta),
  }
}

export const dashboardMetrics: DashboardMetric[] = []
