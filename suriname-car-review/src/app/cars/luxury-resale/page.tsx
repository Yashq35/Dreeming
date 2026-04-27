import { vehicles, getAllMakes, getAllBodyTypes } from '@/lib/vehicles'
import { CarsClientWrapper } from '@/components/vehicles/CarsClientWrapper'

export const metadata = {
  title: 'Luxury & Resale — Suriname Car Review',
  description: 'Premium and luxury vehicles assessed for Suriname roads and resale value.',
}

export default function LuxuryResalePage() {
  const luxuryVehicles = vehicles.filter(v => v.category === 'luxury')
  return (
    <div className="max-w-site mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="eyebrow">Category</span>
        <h1 className="font-syne font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Luxury & Resale
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          {luxuryVehicles.length} premium vehicles — assessed honestly for Suriname conditions.
        </p>
      </div>
      <CarsClientWrapper vehicles={luxuryVehicles} makes={getAllMakes()} bodyTypes={getAllBodyTypes()} initialCategory="luxury" />
    </div>
  )
}
