import type { YearEntry } from '@/types/vehicle'
import { getSDRColor } from '@/lib/sdr'

interface YearByYearTableProps {
  entries: YearEntry[]
}

export function YearByYearTable({ entries }: YearByYearTableProps) {
  if (!entries.length) return null

  const bestScore = Math.max(...entries.map(e => e.sdrScore ?? 0))

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full text-sm border-collapse" style={{ minWidth: '900px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--bg-border)' }}>
            {['Year', 'SDR', 'Engine', 'HP', 'Price (USD)', 'Odometer', 'Common Issues', 'Verdict'].map(h => (
              <th
                key={h}
                className="text-left py-3 pr-4 spec-label whitespace-nowrap"
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => {
            const isBest = e.sdrScore === bestScore && bestScore > 0
            const sdrColor = e.sdrScore ? getSDRColor(e.sdrScore) : 'var(--text-muted)'
            return (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid var(--bg-border)',
                  borderLeft: isBest ? '3px solid var(--cyan-bright)' : '3px solid transparent',
                  background: isBest ? 'rgba(0,212,255,0.03)' : 'transparent',
                }}
              >
                <td className="py-3 pr-4 font-mono font-semibold" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-primary)' }}>
                  {e.year ?? '—'}
                </td>
                <td className="py-3 pr-4 font-mono font-semibold" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: sdrColor }}>
                  {e.sdrScore ?? '—'}
                </td>
                <td className="py-3 pr-4 font-mono text-xs" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-secondary)' }}>
                  {e.engineCode || e.displacement || '—'}
                </td>
                <td className="py-3 pr-4 font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-secondary)' }}>
                  {e.horsepower || '—'}
                </td>
                <td className="py-3 pr-4 font-mono text-xs" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-secondary)' }}>
                  {e.usedPriceUsd || '—'}
                </td>
                <td className="py-3 pr-4 font-mono text-xs" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-secondary)' }}>
                  {e.typicalOdometerKm || '—'}
                </td>
                <td className="py-3 pr-4 text-xs max-w-[200px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                  <span className="line-clamp-2">{e.commonIssues || '—'}</span>
                </td>
                <td className="py-3 text-xs max-w-[200px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                  <span className="line-clamp-2">{e.surinameVerdict || '—'}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
