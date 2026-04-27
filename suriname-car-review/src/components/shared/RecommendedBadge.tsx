const MAP: Record<string, { color: string; bg: string; label: string }> = {
  Yes:         { color: 'var(--status-yes)',  bg: 'rgba(34,197,94,0.1)',  label: '✓ Recommended' },
  Conditional: { color: 'var(--status-cond)', bg: 'rgba(245,158,11,0.1)', label: '~ Conditional' },
  No:          { color: 'var(--status-no)',   bg: 'rgba(239,68,68,0.1)',  label: '✕ Not Recommended' },
}

export function RecommendedBadge({ status, className = '' }: { status: string; className?: string }) {
  const { color, bg, label } = MAP[status] ?? MAP['No']
  return (
    <span
      className={`pill ${className}`}
      style={{ color, borderColor: `${color}55`, background: bg }}
    >
      {label}
    </span>
  )
}
