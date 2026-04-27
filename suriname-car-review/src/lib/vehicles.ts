import type { Vehicle, YearEntry } from '@/types/vehicle'
import vehiclesData from '../../data/vehicles.json'
import yearByYearData from '../../data/year-by-year.json'

export const vehicles = vehiclesData as Vehicle[]
export const yearByYearEntries = yearByYearData as YearEntry[]

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find(v => v.slug === slug)
}

export function getYearEntriesForVehicle(make: string, model: string): YearEntry[] {
  return yearByYearEntries.filter(
    e => e.make === make && e.model === model
  )
}

export function getAllMakes(): string[] {
  return Array.from(new Set(vehicles.map(v => v.make))).sort()
}

export function getAllBodyTypes(): string[] {
  return Array.from(new Set(vehicles.map(v => v.bodyType).filter(Boolean))).sort()
}

export const SITE_STATS = {
  totalVehicles: vehicles.length,
  totalMakes: getAllMakes().length,
  sdrScored: vehicles.filter(v => v.sdrScore > 0).length,
  recommended: vehicles.filter(v => v.recommended === 'Yes').length,
} as const
