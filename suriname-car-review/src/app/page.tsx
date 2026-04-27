import Link from 'next/link'
import { ArrowRight, Gauge, MapPin, TrendingUp } from 'lucide-react'
import { vehicles, SITE_STATS } from '@/lib/vehicles'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { getSDRColor } from '@/lib/sdr'

export default function HomePage() {
  const bySDR = [...vehicles].sort((a, b) => b.sdrScore - a.sdrScore)
  const topOverall = bySDR.slice(0, 3)

  const featured = [
    ...vehicles.filter(v => v.category === 'workhorse').sort((a, b) => b.sdrScore - a.sdrScore).slice(0, 3),
    ...vehicles.filter(v => v.category === 'city').sort((a, b) => b.sdrScore - a.sdrScore).slice(0, 2),
    ...vehicles.filter(v => v.category === 'luxury').sort((a, b) => b.sdrScore - a.sdrScore).slice(0, 1),
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="hero-grid relative flex flex-col justify-center"
        style={{ minHeight: '88vh', background: 'var(--bg-base)' }}
      >
        <div className="relative z-10 max-w-site mx-auto px-6 py-20">
          <span className="eyebrow mb-4 inline-block">SURINAME · 2026 DATABASE</span>
          <h1
            className="font-syne font-extrabold mb-6 leading-none"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--text-primary)' }}
          >
            Find Your Car<br />
            for{' '}
            <span style={{ color: 'var(--cyan-bright)' }}>Suriname Roads.</span>
          </h1>
          <p
            className="text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
          >
            {SITE_STATS.totalVehicles} vehicles rated for flooding, interior roads,
            JDM imports &amp; parts availability.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:opacity-90"
              style={{ background: 'var(--cyan-bright)', color: 'var(--bg-base)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            >
              Browse All Cars <ArrowRight size={16} />
            </Link>
            <Link
              href="/sdr-guide"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-colors hover:border-[var(--cyan-dim)]"
              style={{ border: '1px solid var(--bg-border)', color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            >
              What is SDR? →
            </Link>
          </div>
          <div className="flex flex-wrap gap-8">
            {[
              { value: SITE_STATS.totalVehicles, label: 'Vehicles' },
              { value: `${SITE_STATS.totalMakes}+`, label: 'Makes' },
              { value: SITE_STATS.sdrScored, label: 'SDR Scored' },
              { value: '2026', label: 'Database' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-mono font-bold text-2xl" style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-jetbrains), monospace' }}>{s.value}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-base))' }} />
      </section>

      {/* ── TOP 3 ── */}
      <section className="py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-site mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="eyebrow">Top Rated</span>
              <h2 className="font-syne font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                Highest SDR Scores
              </h2>
            </div>
            <Link href="/sdr-guide" className="text-sm hidden sm:flex items-center gap-1" style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
              Full ranking →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topOverall.map((v, i) => (
              <Link key={v.slug} href={`/cars/${v.slug}`} className="card p-5 flex items-center gap-4">
                <span className="font-mono font-bold text-4xl" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--bg-border)' }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{v.make}</p>
                  <p className="font-syne font-bold text-base truncate" style={{ color: 'var(--text-primary)' }}>{v.localName}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{v.generation}</p>
                </div>
                <span className="font-mono font-bold text-2xl flex-shrink-0" style={{ color: getSDRColor(v.sdrScore), fontFamily: 'var(--font-jetbrains), monospace' }}>
                  {v.sdrScore}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="py-16" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-site mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="eyebrow">Featured</span>
              <h2 className="font-syne font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>Recommended for Suriname</h2>
            </div>
            <Link href="/cars" className="text-sm hidden sm:flex items-center gap-1" style={{ color: 'var(--cyan-bright)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
              View all {SITE_STATS.totalVehicles} →
            </Link>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {featured.map((v, i) => <VehicleCard key={v.slug} vehicle={v} priority={i < 3} />)}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-site mx-auto px-6">
          <span className="eyebrow">Browse by category</span>
          <h2 className="font-syne font-bold text-2xl mb-8" style={{ color: 'var(--text-primary)' }}>What are you looking for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { href: '/cars/city-commuters', label: 'City Commuters', icon: <MapPin size={20} />, desc: 'Paramaribo daily drivers. Fuel-efficient JDM hatchbacks and saloons rated for paved roads.', color: 'var(--cyan-bright)', count: vehicles.filter(v => v.category === 'city').length },
              { href: '/cars/district-workhorses', label: 'District Workhorses', icon: <TrendingUp size={20} />, desc: "Interior roads, flooding, heavy loads. Pickup trucks and 4x4s that handle Suriname's toughest terrain.", color: '#4ADE80', count: vehicles.filter(v => v.category === 'workhorse').length },
              { href: '/cars/luxury-resale', label: 'Luxury & Resale', icon: <Gauge size={20} />, desc: 'Premium vehicles assessed honestly. High status, but do they survive Suriname roads?', color: 'var(--gold-bright)', count: vehicles.filter(v => v.category === 'luxury').length },
            ].map(cat => (
              <Link key={cat.href} href={cat.href} className="card p-6 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}18`, color: cat.color }}>{cat.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-syne font-bold text-base" style={{ color: 'var(--text-primary)' }}>{cat.label}</h3>
                    <span className="font-mono text-xs" style={{ color: cat.color, fontFamily: 'var(--font-jetbrains), monospace' }}>{cat.count}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDR CTA ── */}
      <section className="py-16" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-site mx-auto px-6">
          <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
            <div>
              <span className="eyebrow">Understanding the score</span>
              <h2 className="font-syne font-bold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>What is the SDR Score?</h2>
              <p className="text-sm max-w-lg leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                Ground clearance, wading depth, parts availability, and reliability — all scored for Suriname roads, not European highways.
              </p>
            </div>
            <Link href="/sdr-guide" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm" style={{ border: '1px solid var(--cyan-dim)', color: 'var(--cyan-bright)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
              Read the SDR Guide <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COMPARE CTA ── */}
      <section className="py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="max-w-site mx-auto px-6 text-center">
          <span className="eyebrow">Tool</span>
          <h2 className="font-syne font-bold text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Hilux Vigo vs Hilux Revo?</h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            The most asked question in Surinamese truck buying. Compare them side-by-side.
          </p>
          <Link href="/compare?a=toyota-hilux-vigo-gen7&b=toyota-hilux-revo-gen8" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-sm" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            Compare Now <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
