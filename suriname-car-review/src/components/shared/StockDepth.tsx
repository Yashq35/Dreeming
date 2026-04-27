export function StockDepth({ depth, max = 5 }: { depth: number | null; max?: number }) {
  const filled = depth ?? 0
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Stock depth: ${filled} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="inline-block rounded-full"
          style={{
            width: '8px',
            height: '8px',
            background: i < filled ? 'var(--cyan-bright)' : 'var(--bg-border)',
          }}
        />
      ))}
    </span>
  )
}
