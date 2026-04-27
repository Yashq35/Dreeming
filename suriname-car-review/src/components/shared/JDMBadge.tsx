export function JDMBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pill ${className}`}
      style={{ color: 'var(--gold-bright)', borderColor: 'var(--gold-dim)', background: 'rgba(240,180,41,0.1)' }}
    >
      JDM
    </span>
  )
}
