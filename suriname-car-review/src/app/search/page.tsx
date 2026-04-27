'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { vehicles } from '@/lib/vehicles'
import { SDRBar } from '@/components/sdr/SDRBar'
import { JDMBadge } from '@/components/shared/JDMBadge'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const q = query.trim().toLowerCase()
  const results = q.length >= 2
    ? vehicles.filter(v => {
        const hay = `${v.make} ${v.model} ${v.localName} ${v.generation} ${v.chassisCode} ${v.bodyType}`.toLowerCase()
        return hay.includes(q)
      })
    : []

  const handleChange = (val: string) => {
    setQuery(val)
    if (val.trim().length >= 2) {
      router.replace(`/search?q=${encodeURIComponent(val.trim())}`, { scroll: false })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--text-muted)' }}
        />
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          placeholder="Search by make, model, chassis code..."
          autoFocus
          className="w-full pl-12 pr-4 py-4 rounded-xl text-base outline-none transition-colors"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--bg-border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-dm-sans), sans-serif',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--cyan-dim)')}
          onBlur={e => (e.target.style.borderColor = 'var(--bg-border)')}
        />
      </div>

      {q.length >= 2 && (
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          <span className="font-mono font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jetbrains), monospace' }}>
            {results.length}
          </span> result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map(v => (
            <Link
              key={v.slug}
              href={`/cars/${v.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl transition-colors"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--bg-border)',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-syne font-bold" style={{ color: 'var(--text-primary)' }}>{v.localName}</p>
                  {v.jdmImport && <JDMBadge />}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                  {v.make} · {v.generation}
                  {v.chassisCode && ` · ${v.chassisCode}`}
                </p>
              </div>
              <div className="w-28 flex-shrink-0">
                <SDRBar score={v.sdrScore} showLabel={false} />
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>→</span>
            </Link>
          ))}
        </div>
      )}

      {q.length >= 2 && results.length === 0 && (
        <div className="text-center py-12" style={{ color: 'var(--text-secondary)' }}>
          <p className="text-lg font-syne font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No results found.</p>
          <p className="text-sm" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            Try searching for a make name, model, or chassis code.
          </p>
        </div>
      )}

      {q.length < 2 && (
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
          Type at least 2 characters to search {vehicles.length} vehicles.
        </p>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="max-w-site mx-auto px-6 py-10">
      <div className="mb-8 text-center">
        <span className="eyebrow">Search</span>
        <h1 className="font-syne font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Find a Vehicle
        </h1>
      </div>
      <Suspense fallback={<div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}
