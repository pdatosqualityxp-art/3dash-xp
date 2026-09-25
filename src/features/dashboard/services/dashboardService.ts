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

export type DashboardData = {
  totalRevenue: number
  totalUnits: number
  averageTicket: number
  totalOperations: number
  topClients: ClientSalesMetric[]
  topProducts: ProductSalesMetric[]
  geographicSales: GeographicSalesMetric[]
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
  comautonomacliente: string | null
}

type ProductRow = {
  idprod: string
  nomprod: string
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
  }
}

export const dashboardMetrics: DashboardMetric[] = []
