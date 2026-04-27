import type { VehicleCategory } from '@/types/vehicle'

const MAP: Record<VehicleCategory, { label: string; color: string; bg: string }> = {
  city:      { label: 'City',      color: '#00D4FF', bg: 'rgba(0,212,255,0.1)' },
  workhorse: { label: 'Workhorse', color: '#4ADE80', bg: 'rgba(74,222,128,0.1)' },
  luxury:    { label: 'Luxury',    color: '#F0B429', bg: 'rgba(240,180,41,0.1)' },
}

export function CategoryBadge({ category, className = '' }: { category: VehicleCategory; className?: string }) {
  const { label, color, bg } = MAP[category]
  return (
    <span
      className={`pill ${className}`}
      style={{ color, borderColor: `${color}55`, background: bg }}
    >
      {label}
    </span>
  )
}
