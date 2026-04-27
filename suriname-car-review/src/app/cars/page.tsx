import { vehicles, getAllMakes, getAllBodyTypes } from '@/lib/vehicles'
import { CarsClientWrapper } from '@/components/vehicles/CarsClientWrapper'

export const metadata = {
  title: 'All Vehicles — Suriname Car Review',
  description: 'Browse 84 vehicles rated for Suriname roads. Filter by SDR score, category, parts risk, and more.',
}

export default function CarsPage() {
  const makes = getAllMakes()
  const bodyTypes = getAllBodyTypes()

  return (
    <div className="max-w-site mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="eyebrow">Database</span>
        <h1 className="font-syne font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          All Vehicles
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          {vehicles.length} vehicles rated for Suriname roads. Sorted by SDR score.
        </p>
      </div>

      <CarsClientWrapper
        vehicles={vehicles}
        makes={makes}
        bodyTypes={bodyTypes}
      />
    </div>
  )
}
