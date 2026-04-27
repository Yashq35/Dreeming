import { vehicles, getAllMakes, getAllBodyTypes } from '@/lib/vehicles'
import { CarsClientWrapper } from '@/components/vehicles/CarsClientWrapper'

export const metadata = {
  title: 'District Workhorses — Suriname Car Review',
  description: 'Off-road and interior-capable vehicles rated for Suriname district roads.',
}

export default function DistrictWorkhorsesPage() {
  const workhorseVehicles = vehicles.filter(v => v.category === 'workhorse')
  return (
    <div className="max-w-site mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="eyebrow">Category</span>
        <h1 className="font-syne font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          District Workhorses
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          {workhorseVehicles.length} vehicles built for interior roads, flooding, and district driving.
        </p>
      </div>
      <CarsClientWrapper vehicles={workhorseVehicles} makes={getAllMakes()} bodyTypes={getAllBodyTypes()} initialCategory="workhorse" />
    </div>
  )
}
