'use client'

interface SpecRowProps {
  label: string
  value: string | number | null | undefined
  unit?: string
  highlight?: 'good' | 'warn' | 'bad' | null
}

export function SpecRow({ label, value, unit, highlight }: SpecRowProps) {
  const displayValue = value === null || value === undefined || value === '' ? 'N/A' : `${value}${unit ? ' ' + unit : ''}`
  const valueColor =
    highlight === 'good' ? 'var(--sdr-good)' :
    highlight === 'warn' ? 'var(--sdr-fair)' :
    highlight === 'bad'  ? 'var(--sdr-poor)' :
    'var(--text-primary)'

  return (
    <div
      className="flex items-start justify-between py-2.5 border-b gap-4"
      style={{ borderColor: 'var(--bg-border)' }}
    >
      <span className="spec-label flex-shrink-0 pt-0.5">{label}</span>
      <span
        className="text-right text-sm leading-snug"
        style={{
          color: valueColor,
          fontFamily: 'var(--font-jetbrains), monospace',
          fontWeight: '500',
        }}
      >
        {displayValue}
      </span>
    </div>
  )
}

export function SpecGroupHeader({ title }: { title: string }) {
  return (
    <div
      className="pt-5 pb-2 text-xs font-semibold uppercase tracking-widest"
      style={{
        color: 'var(--cyan-bright)',
        borderBottom: '1px solid var(--bg-border)',
        fontFamily: 'var(--font-dm-sans), sans-serif',
      }}
    >
      {title}
    </div>
  )
}
