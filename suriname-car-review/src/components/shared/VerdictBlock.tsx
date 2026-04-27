interface VerdictBlockProps {
  verdict: string
  bestFor?: string
  buyerNotes?: string
}

export function VerdictBlock({ verdict, bestFor, buyerNotes }: VerdictBlockProps) {
  return (
    <div className="space-y-4">
      {verdict && (
        <blockquote
          className="pl-4 py-1 text-base leading-relaxed"
          style={{
            borderLeft: '3px solid var(--cyan-bright)',
            color: 'var(--text-primary)',
            fontStyle: 'normal',
          }}
        >
          {verdict}
        </blockquote>
      )}

      {bestFor && (
        <div>
          <p className="spec-label mb-2">Best For</p>
          <div className="flex flex-wrap gap-2">
            {bestFor.split(/[,;·•]/).map(s => s.trim()).filter(Boolean).map((tag, i) => (
              <span
                key={i}
                className="pill"
                style={{ color: 'var(--cyan-bright)', borderColor: 'var(--cyan-dim)', background: 'var(--cyan-glow)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {buyerNotes && (
        <div
          className="flex gap-3 p-4 rounded-xl text-sm leading-relaxed"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}
        >
          <span className="text-base mt-0.5 flex-shrink-0">ℹ️</span>
          <p style={{ color: 'var(--text-secondary)' }}>{buyerNotes}</p>
        </div>
      )}
    </div>
  )
}
