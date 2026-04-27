import { vehicles, getAllMakes, getAllBodyTypes } from '@/lib/vehicles'
import { CarsClientWrapper } from '@/components/vehicles/CarsClientWrapper'

export const metadata = {
  title: 'City Commuters — Suriname Car Review',
  description: 'City-friendly vehicles rated for Paramaribo streets and Suriname urban driving.',
}

export default function CityCommutorsPage() {
  const cityVehicles = vehicles.filter(v => v.category === 'city')
  return (
    <div className="max-w-site mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="eyebrow">Category</span>
        <h1 className="font-syne font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          City Commuters
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          {cityVehicles.length} vehicles suited for Paramaribo and urban Suriname driving.
        </p>
      </div>
      <CarsClientWrapper vehicles={cityVehicles} makes={getAllMakes()} bodyTypes={getAllBodyTypes()} initialCategory="city" />
    </div>
  )
}
