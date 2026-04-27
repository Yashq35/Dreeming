import { getSDRColor, getSDRLabel } from '@/lib/sdr'

interface SDRBarProps {
  score: number
  showLabel?: boolean
  className?: string
}

export function SDRBar({ score, showLabel = true, className = '' }: SDRBarProps) {
  const color = getSDRColor(score)
  const pct = Math.round((score / 85) * 100)

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <span className="spec-label">{getSDRLabel(score)}</span>
        )}
        <span
          className="font-mono text-sm font-semibold ml-auto"
          style={{ color, fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          {score}/85
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '4px', background: 'var(--bg-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
