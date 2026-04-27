import Link from 'next/link'
import type { Vehicle } from '@/types/vehicle'
import { VehicleImage } from './VehicleImage'
import { SDRBar } from '@/components/sdr/SDRBar'
import { JDMBadge } from '@/components/shared/JDMBadge'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import { RecommendedBadge } from '@/components/shared/RecommendedBadge'
import { GroundClearanceBadge } from '@/components/shared/GroundClearanceBadge'
import { yearRange } from '@/lib/utils'

interface VehicleCardProps {
  vehicle: Vehicle
  priority?: boolean
  style?: React.CSSProperties
}

export function VehicleCard({ vehicle: v, priority, style }: VehicleCardProps) {
  return (
    <Link href={`/cars/${v.slug}`} className="card block group" style={style}>
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-[11px]">
        <VehicleImage
          src={v.imageUrl || undefined}
          alt={v.localName}
          chassisCode={v.chassisCode}
          priority={priority}
          className="w-full"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--bg-surface), transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={v.category} />
          {v.jdmImport && <JDMBadge />}
        </div>

        {/* Names */}
        <div>
          <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            {v.make}
          </p>
          <h3 className="font-syne font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
            {v.localName}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            {v.generation} · {yearRange(v.yearFrom, v.yearTo)}
          </p>
        </div>

        {/* SDR Bar */}
        <SDRBar score={v.sdrScore} />

        {/* Specs row */}
        <div
          className="flex items-center gap-3 text-xs py-2 border-t border-b"
          style={{ borderColor: 'var(--bg-border)', fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          <GroundClearanceBadge mm={v.groundClearMm} />
          <span style={{ color: 'var(--bg-border)' }}>|</span>
          <span style={{ color: 'var(--text-secondary)' }}>{v.fuelType || 'N/A'}</span>
          <span style={{ color: 'var(--bg-border)' }}>|</span>
          <span style={{ color: 'var(--text-secondary)' }}>{v.drivetrain || 'N/A'}</span>
        </div>

        {/* Bottom badges */}
        <div className="flex items-center flex-wrap gap-2">
          <RecommendedBadge status={v.recommended} />
        </div>

        {/* Verdict preview */}
        {v.surinameVerdict && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            {v.surinameVerdict}
          </p>
        )}

        {/* CTA */}
        <div
          className="text-xs font-medium flex items-center gap-1 transition-colors group-hover:gap-2"
          style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          View Full Review
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </Link>
  )
}
