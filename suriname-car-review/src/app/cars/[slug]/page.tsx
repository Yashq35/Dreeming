import { notFound } from 'next/navigation'
import { vehicles, getVehicleBySlug, getYearEntriesForVehicle } from '@/lib/vehicles'
import { DetailTabsWrapper } from '@/components/vehicles/DetailTabsWrapper'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return vehicles.map(v => ({ slug: v.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const vehicle = getVehicleBySlug(params.slug)
  if (!vehicle) return {}
  return {
    title: `${vehicle.localName} (${vehicle.generation}) Review — Suriname Car Review`,
    description: vehicle.surinameVerdict || `${vehicle.make} ${vehicle.localName} rated ${vehicle.sdrScore}/85 for Suriname roads.`,
  }
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = getVehicleBySlug(params.slug)
  if (!vehicle) notFound()

  const yearEntries = getYearEntriesForVehicle(vehicle.make, vehicle.model)

  return (
    <>
      {/* Vehicle header */}
      <div
        className="border-b"
        style={{ background: 'var(--bg-elevated)', borderColor: 'var(--bg-border)' }}
      >
        <div className="max-w-site mx-auto px-6 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                {vehicle.make} · {vehicle.category}
              </p>
              <h1 className="font-syne font-extrabold text-3xl mb-1" style={{ color: 'var(--text-primary)' }}>
                {vehicle.localName}
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                {vehicle.generation} · {vehicle.yearFrom}–{vehicle.yearTo ?? 'present'}
                {vehicle.chassisCode && ` · ${vehicle.chassisCode}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DetailTabsWrapper vehicle={vehicle} yearEntries={yearEntries} />
    </>
  )
}
