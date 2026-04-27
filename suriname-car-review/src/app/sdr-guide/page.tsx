import Link from 'next/link'
import { vehicles } from '@/lib/vehicles'
import { getSDRColor, getSDRLabel } from '@/lib/sdr'

export const metadata = {
  title: 'SDR Score Guide — Suriname Car Review',
  description: 'The Suriname Road Suitability (SDR) score explained. Learn how vehicles are rated for Suriname conditions.',
}

const BANDS = [
  { range: '71–85', label: 'Top Tier',   color: '#00D4FF', bg: 'rgba(0,212,255,0.08)',  desc: 'Handles all Suriname roads — flooding, interior, Paramaribo daily.' },
  { range: '56–70', label: 'Versatile',  color: '#4ADE80', bg: 'rgba(74,222,128,0.08)', desc: 'Strong all-round choice. Minor limitations in deep interior or heavy flooding.' },
  { range: '41–55', label: 'City Only',  color: '#F0B429', bg: 'rgba(240,180,41,0.08)', desc: 'Paved Paramaribo and main roads only. Struggles in rainy season.' },
  { range: '26–40', label: 'Caution',    color: '#FF7A00', bg: 'rgba(255,122,0,0.08)',   desc: 'Significant limitations for Suriname. Proceed with caution. High parts risk likely.' },
  { range: '0–25',  label: 'Avoid',      color: '#FF3B3B', bg: 'rgba(255,59,59,0.08)',   desc: 'Not recommended for Suriname roads. Poor ground clearance, parts unavailability, or both.' },
]

const FACTORS = [
  { label: 'Ground Clearance',   weight: '25%', desc: 'Critical for flooding season in Paramaribo and district roads. <160mm is a red flag.' },
  { label: 'Wading Depth',       weight: '20%', desc: 'Essential for rainy season. Models without a rated wading depth score lower.' },
  { label: 'Parts Availability', weight: '20%', desc: 'Can you find parts in Suriname? Stockdepth, main importer, and drought history are all assessed.' },
  { label: 'Drivetrain/Offroad', weight: '15%', desc: '4WD and high-clearance models score higher for district and interior use.' },
  { label: 'Reliability',        weight: '10%', desc: 'Based on known common issues, JDM reliability data, and Surinamese owner reports.' },
  { label: 'Fuel Economy',       weight: '5%',  desc: 'Fuel costs in Suriname are significant. Thirsty engines are penalized.' },
  { label: 'Local Support',      weight: '5%',  desc: 'Authorized dealers, known importers, and local mechanic familiarity.' },
]

export default function SDRGuidePage() {
  const sorted = [...vehicles].sort((a, b) => b.sdrScore - a.sdrScore)

  return (
    <div className="max-w-site mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-12 text-center">
        <span className="eyebrow">Scoring System</span>
        <h1
          className="font-syne font-extrabold mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, color: 'var(--text-primary)' }}
        >
          SDR Score
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          The <strong style={{ color: 'var(--text-primary)' }}>Suriname Road Suitability</strong> score rates each vehicle out of 85 for real-world performance on Suriname&apos;s roads — from flooded Paramaribo streets to interior district tracks.
        </p>
      </div>

      {/* Gradient bar */}
      <div className="mb-10">
        <div
          className="h-4 rounded-full w-full mb-3"
          style={{ background: 'linear-gradient(to right, #FF3B3B, #FF7A00, #F0B429, #4ADE80, #00D4FF)' }}
        />
        <div className="grid grid-cols-5 text-center">
          {BANDS.map(b => (
            <div key={b.range}>
              <p className="font-mono text-xs font-semibold" style={{ color: b.color, fontFamily: 'var(--font-jetbrains), monospace' }}>{b.range}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Band cards */}
      <div className="grid gap-4 mb-14">
        {BANDS.map(b => (
          <div
            key={b.range}
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{ background: b.bg, border: `1px solid ${b.color}30` }}
          >
            <div
              className="flex-shrink-0 font-mono font-bold text-xl w-16 text-center"
              style={{ color: b.color, fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {b.range}
            </div>
            <div>
              <p className="font-syne font-bold text-base mb-1" style={{ color: b.color }}>{b.label}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Score factors */}
      <div className="mb-14">
        <span className="eyebrow">How it&apos;s calculated</span>
        <h2 className="font-syne font-bold text-2xl mb-6" style={{ color: 'var(--text-primary)' }}>Score Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FACTORS.map(f => (
            <div
              key={f.label}
              className="p-5 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-syne font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{f.label}</p>
                <span
                  className="font-mono text-sm font-semibold flex-shrink-0"
                  style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  {f.weight}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full ranked list */}
      <div>
        <span className="eyebrow">All vehicles ranked</span>
        <h2 className="font-syne font-bold text-2xl mb-6" style={{ color: 'var(--text-primary)' }}>
          Ranking — {sorted.length} Vehicles
        </h2>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--bg-border)' }}
        >
          {sorted.map((v, i) => {
            const color = getSDRColor(v.sdrScore)
            return (
              <Link
                key={v.slug}
                href={`/cars/${v.slug}`}
                className="flex items-center gap-4 px-5 py-4 border-b transition-colors hover:bg-[var(--bg-hover)]"
                style={{ borderColor: 'var(--bg-border)' }}
              >
                <span
                  className="w-6 text-right font-mono text-xs flex-shrink-0"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  {i + 1}
                </span>
                <span
                  className="font-mono font-bold text-base w-14 text-center flex-shrink-0"
                  style={{ color, fontFamily: 'var(--font-jetbrains), monospace' }}
                >
                  {v.sdrScore}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-syne font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {v.localName}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                    {v.make} · {v.generation}
                  </p>
                </div>
                <span
                  className="pill flex-shrink-0 hidden sm:inline-block"
                  style={{ color, borderColor: `${color}55`, background: `${color}12`, fontSize: '0.65rem' }}
                >
                  {getSDRLabel(v.sdrScore)}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
