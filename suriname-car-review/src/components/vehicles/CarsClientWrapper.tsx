'use client'

import { useState } from 'react'
import type { Vehicle, FilterState } from '@/types/vehicle'
import { filterVehicles, sortVehicles, DEFAULT_FILTERS } from '@/lib/filters'
import { VehicleCard } from './VehicleCard'
import { FilterSidebar } from './FilterSidebar'
import { LayoutGrid } from 'lucide-react'

interface CarsClientWrapperProps {
  vehicles: Vehicle[]
  makes: string[]
  bodyTypes: string[]
  initialCategory?: string
}

export function CarsClientWrapper({ vehicles, makes, bodyTypes, initialCategory }: CarsClientWrapperProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    categories: initialCategory ? [initialCategory as FilterState['categories'][0]] : [],
  })

  const filtered = sortVehicles(
    filterVehicles(vehicles, filters),
    'sdrScore',
    'desc'
  )

  return (
    <div className="flex gap-6 items-start">
      <FilterSidebar
        makes={makes}
        bodyTypes={bodyTypes}
        initialFilters={filters}
        onFilterChange={setFilters}
      />

      <div className="flex-1 min-w-0">
        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            <span className="font-mono font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jetbrains), monospace' }}>
              {filtered.length}
            </span>{' '}
            vehicles
          </span>
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
          >
            <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>No vehicles match your filters.</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Try adjusting the SDR range or removing some filters.</p>
          </div>
        ) : (
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
          >
            {filtered.map((v, i) => (
              <VehicleCard
                key={v.slug}
                vehicle={v}
                priority={i < 3}
                style={{ animationDelay: `${Math.min(i, 12) * 50}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
