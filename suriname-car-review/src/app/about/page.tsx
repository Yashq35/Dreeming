export const metadata = {
  title: 'About — Suriname Car Review',
  description: 'About the Suriname Car Review database and the SDR scoring methodology.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <span className="eyebrow">About</span>
      <h1 className="font-syne font-extrabold text-4xl mb-6" style={{ color: 'var(--text-primary)' }}>
        Suriname Car Review
      </h1>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <p>
          Suriname Car Review is the definitive car buying guide for Suriname. We rate every vehicle through a Suriname-specific lens — flooding, interior roads, JDM grey-market availability, parts supply chains, and the realities of driving in Paramaribo and beyond.
        </p>
        <p>
          This isn&apos;t a global car site that mentions &ldquo;off-road capability.&rdquo; We rate a Toyota Hilux Vigo differently from a BMW 3-Series because Suriname roads demand it. A ground clearance of 140mm might be fine for Berlin. In Commewijne during rainy season, it&apos;s a problem.
        </p>
        <p>
          The <strong style={{ color: 'var(--text-primary)' }}>SDR (Suriname Road Suitability) Score</strong> is our core metric — a 0–85 rating that accounts for flooding depth, ground clearance, parts availability, JDM reliability, and local importer support.
        </p>
        <p>
          The database covers 84 vehicle variants across city commuters, district workhorses, and luxury vehicles. Data is sourced from the 2026 Suriname Automotive Database, cross-referenced with local importer data and owner reports.
        </p>
        <div
          className="p-5 rounded-xl text-xs"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}
        >
          <p className="font-mono font-semibold mb-1" style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-jetbrains), monospace' }}>
            Database: 2026 Edition
          </p>
          <p>84 vehicle variants · 17 makes · 188 year-by-year entries · SDR scored</p>
        </div>
      </div>
    </div>
  )
}
