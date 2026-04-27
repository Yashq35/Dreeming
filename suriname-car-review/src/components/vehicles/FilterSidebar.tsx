'use client'

import { useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import type { FilterState, VehicleCategory } from '@/types/vehicle'
import { DEFAULT_FILTERS, filtersToParams } from '@/lib/filters'

interface FilterSidebarProps {
  makes: string[]
  bodyTypes: string[]
  initialFilters?: Partial<FilterState>
  onFilterChange?: (filters: FilterState) => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b py-4" style={{ borderColor: 'var(--bg-border)' }}>
      <button
        className="flex items-center justify-between w-full mb-3 spec-label"
        onClick={() => setOpen(o => !o)}
      >
        {title}
        {open ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function CheckItem({ checked, onChange, label, color }: { checked: boolean; onChange: (v: boolean) => void; label: string; color?: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer py-1 group">
      <div
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors"
        style={{
          background: checked ? 'var(--cyan-bright)' : 'transparent',
          borderColor: checked ? 'var(--cyan-bright)' : 'var(--bg-border)',
        }}
        onClick={() => onChange(!checked)}
      >
        {checked && <span style={{ color: 'var(--bg-base)', fontSize: '10px', lineHeight: 1 }}>✓</span>}
      </div>
      <span className="text-xs font-sans" style={{ color: color || 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        {label}
      </span>
    </label>
  )
}

export function FilterSidebar({ makes, initialFilters, onFilterChange }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS, ...initialFilters })

  const update = useCallback((patch: Partial<FilterState>) => {
    const next = { ...filters, ...patch }
    setFilters(next)
    onFilterChange?.(next)
    const params = filtersToParams(next)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [filters, onFilterChange, pathname, router])

  const toggleArrayItem = <T extends string>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]

  const hasFilters = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)

  return (
    <aside style={{ minWidth: '240px', maxWidth: '260px' }}>
      <div
        className="sticky top-20 rounded-xl overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: 'var(--bg-border)' }}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} style={{ color: 'var(--cyan-bright)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
              Filters
            </span>
          </div>
          {hasFilters && (
            <button
              className="text-xs flex items-center gap-1"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => update(DEFAULT_FILTERS)}
            >
              <X size={10} /> Reset
            </button>
          )}
        </div>

        <div className="px-4 pb-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>

          {/* Search */}
          <Section title="Search">
            <input
              type="text"
              placeholder="Make, model, chassis..."
              value={filters.search}
              onChange={e => update({ search: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg outline-none"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--bg-border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            />
          </Section>

          {/* Category */}
          <Section title="Category">
            {(['city', 'workhorse', 'luxury'] as VehicleCategory[]).map(cat => (
              <CheckItem
                key={cat}
                checked={filters.categories.includes(cat)}
                onChange={() => update({ categories: toggleArrayItem(filters.categories, cat) })}
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                color={cat === 'city' ? 'var(--cyan-bright)' : cat === 'workhorse' ? 'var(--sdr-good)' : 'var(--gold-bright)'}
              />
            ))}
          </Section>

          {/* SDR Range */}
          <Section title="SDR Score">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-secondary)' }}>
                <span>{filters.sdrMin}</span>
                <span>{filters.sdrMax}/85</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min={0} max={85} step={5}
                  value={filters.sdrMin}
                  onChange={e => update({ sdrMin: Math.min(Number(e.target.value), filters.sdrMax - 5) })}
                  className="w-full accent-cyan-500"
                  style={{ accentColor: 'var(--cyan-bright)' }}
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min={0} max={85} step={5}
                  value={filters.sdrMax}
                  onChange={e => update({ sdrMax: Math.max(Number(e.target.value), filters.sdrMin + 5) })}
                  className="w-full"
                  style={{ accentColor: 'var(--cyan-bright)' }}
                />
              </div>
            </div>
          </Section>

          {/* Makes */}
          <Section title="Make">
            <div className="space-y-0 max-h-48 overflow-y-auto">
              {makes.map(make => (
                <CheckItem
                  key={make}
                  checked={filters.makes.includes(make)}
                  onChange={() => update({ makes: toggleArrayItem(filters.makes, make) })}
                  label={make}
                />
              ))}
            </div>
          </Section>

          {/* Parts Risk */}
          <Section title="Parts Risk">
            {['Low', 'Medium', 'High'].map(risk => (
              <CheckItem
                key={risk}
                checked={filters.partsRisk.includes(risk)}
                onChange={() => update({ partsRisk: toggleArrayItem(filters.partsRisk, risk) })}
                label={risk}
                color={risk === 'Low' ? 'var(--risk-low)' : risk === 'Medium' ? 'var(--risk-medium)' : 'var(--risk-high)'}
              />
            ))}
          </Section>

          {/* Toggles */}
          <Section title="Filters">
            <CheckItem
              checked={filters.jdmOnly}
              onChange={v => update({ jdmOnly: v })}
              label="JDM Imports Only"
              color="var(--gold-bright)"
            />
            <CheckItem
              checked={filters.recommendedOnly}
              onChange={v => update({ recommendedOnly: v })}
              label="Recommended Only"
              color="var(--status-yes)"
            />
          </Section>

        </div>
      </div>
    </aside>
  )
}
