import { getGroundClearanceStatus } from '@/lib/utils'

export function GroundClearanceBadge({ mm }: { mm: number | null }) {
  if (mm === null) return <span className="spec-value" style={{ color: 'var(--text-muted)' }}>N/A</span>

  const status = getGroundClearanceStatus(mm)
  const icon = status === 'good' ? '' : status === 'fair' ? ' ⚠' : ' ⛔'
  const color =
    status === 'good' ? 'var(--sdr-good)' :
    status === 'fair' ? 'var(--sdr-fair)' :
    'var(--sdr-poor)'

  return (
    <span className="font-mono text-sm" style={{ color, fontFamily: 'var(--font-jetbrains), monospace' }}>
      {mm}mm{icon}
    </span>
  )
}
