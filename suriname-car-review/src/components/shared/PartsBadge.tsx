const MAP: Record<string, { color: string; bg: string }> = {
  Low:      { color: 'var(--risk-low)',    bg: 'rgba(34,197,94,0.1)' },
  Medium:   { color: 'var(--risk-medium)', bg: 'rgba(245,158,11,0.1)' },
  High:     { color: 'var(--risk-high)',   bg: 'rgba(239,68,68,0.1)' },
  Critical: { color: '#FF3B3B',            bg: 'rgba(255,59,59,0.12)' },
}

export function PartsBadge({ risk, className = '' }: { risk: string; className?: string }) {
  const { color, bg } = MAP[risk] ?? MAP['Medium']
  return (
    <span
      className={`pill ${className}`}
      style={{ color, borderColor: `${color}55`, background: bg }}
    >
      Parts: {risk}
    </span>
  )
}
