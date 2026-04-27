import type { Vehicle, FilterState, SortKey, SortDir } from '@/types/vehicle'

export const DEFAULT_FILTERS: FilterState = {
  makes: [],
  categories: [],
  sdrMin: 0,
  sdrMax: 85,
  partsRisk: [],
  jdmOnly: false,
  recommendedOnly: false,
  bodyTypes: [],
  search: '',
}

export function filterVehicles(vehicles: Vehicle[], filters: FilterState): Vehicle[] {
  return vehicles.filter(v => {
    if (filters.makes.length && !filters.makes.includes(v.make)) return false
    if (filters.categories.length && !filters.categories.includes(v.category)) return false
    if (v.sdrScore < filters.sdrMin || v.sdrScore > filters.sdrMax) return false
    if (filters.partsRisk.length && !filters.partsRisk.includes(v.partsRisk)) return false
    if (filters.jdmOnly && !v.jdmImport) return false
    if (filters.recommendedOnly && v.recommended !== 'Yes') return false
    if (filters.bodyTypes.length && !filters.bodyTypes.includes(v.bodyType)) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const hay = `${v.make} ${v.model} ${v.localName} ${v.generation} ${v.chassisCode}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
}

export function sortVehicles(list: Vehicle[], key: SortKey, dir: SortDir): Vehicle[] {
  return [...list].sort((a, b) => {
    const av = (a[key] as number | null) ?? (dir === 'asc' ? Infinity : -Infinity)
    const bv = (b[key] as number | null) ?? (dir === 'asc' ? Infinity : -Infinity)
    const result = av < bv ? -1 : av > bv ? 1 : 0
    return dir === 'asc' ? result : -result
  })
}

export function filtersFromParams(params: URLSearchParams): FilterState {
  return {
    makes: params.get('makes') ? params.get('makes')!.split(',').filter(Boolean) : [],
    categories: (params.get('cat') ? params.get('cat')!.split(',').filter(Boolean) : []) as FilterState['categories'],
    sdrMin: Number(params.get('sdrMin') ?? 0),
    sdrMax: Number(params.get('sdrMax') ?? 85),
    partsRisk: params.get('risk') ? params.get('risk')!.split(',').filter(Boolean) : [],
    jdmOnly: params.get('jdm') === '1',
    recommendedOnly: params.get('rec') === '1',
    bodyTypes: params.get('body') ? params.get('body')!.split(',').filter(Boolean) : [],
    search: params.get('q') ?? '',
  }
}

export function filtersToParams(filters: FilterState): URLSearchParams {
  const p = new URLSearchParams()
  if (filters.makes.length) p.set('makes', filters.makes.join(','))
  if (filters.categories.length) p.set('cat', filters.categories.join(','))
  if (filters.sdrMin > 0) p.set('sdrMin', String(filters.sdrMin))
  if (filters.sdrMax < 85) p.set('sdrMax', String(filters.sdrMax))
  if (filters.partsRisk.length) p.set('risk', filters.partsRisk.join(','))
  if (filters.jdmOnly) p.set('jdm', '1')
  if (filters.recommendedOnly) p.set('rec', '1')
  if (filters.bodyTypes.length) p.set('body', filters.bodyTypes.join(','))
  if (filters.search) p.set('q', filters.search)
  return p
}
