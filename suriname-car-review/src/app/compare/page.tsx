import { vehicles } from '@/lib/vehicles'
import { CompareTable } from '@/components/vehicles/CompareTable'

export const metadata = {
  title: 'Compare Vehicles — Suriname Car Review',
  description: 'Compare up to 3 vehicles side-by-side. SDR scores, specs, and Suriname suitability.',
}

export default function ComparePage() {
  return (
    <div className="max-w-site mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="eyebrow">Tool</span>
        <h1 className="font-syne font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Compare Vehicles
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          Select up to 3 vehicles to compare side-by-side. Best values are highlighted.
        </p>
      </div>

      <CompareTable vehicles={vehicles} />
    </div>
  )
}
