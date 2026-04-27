'use client'

import { useState } from 'react'
import type { Vehicle, YearEntry } from '@/types/vehicle'
import { SDRGauge } from '@/components/sdr/SDRGauge'
import { SpecTable } from './SpecTable'
import { YearByYearTable } from './YearByYearTable'
import { VerdictBlock } from '@/components/shared/VerdictBlock'
import { RecommendedBadge } from '@/components/shared/RecommendedBadge'
import { PartsBadge } from '@/components/shared/PartsBadge'
import { StockDepth } from '@/components/shared/StockDepth'
import { GroundClearanceBadge } from '@/components/shared/GroundClearanceBadge'
import { JDMBadge } from '@/components/shared/JDMBadge'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import { SDRBar } from '@/components/sdr/SDRBar'
import { formatNumber } from '@/lib/utils'

interface DetailTabsWrapperProps {
  vehicle: Vehicle
  yearEntries: YearEntry[]
}

type Tab = 'overview' | 'specs' | 'verdict' | 'parts' | 'years'

export function DetailTabsWrapper({ vehicle: v, yearEntries }: DetailTabsWrapperProps) {
  const [tab, setTab] = useState<Tab>('overview')
  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs',    label: 'Full Specs' },
    { id: 'verdict',  label: 'Suriname Verdict' },
    { id: 'parts',    label: 'Parts & Importers' },
    ...(yearEntries.length > 0 ? [{ id: 'years' as Tab, label: 'Year-by-Year' }] : []),
  ]

  return (
    <>
      {/* Hero strip */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--bg-border)' }}>
        {/* Left: image */}
        <div className="lg:col-span-3 relative" style={{ minHeight: '260px', background: 'var(--bg-surface)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 400 225" width="100%" height="100%">
              <rect width="400" height="225" fill="var(--bg-surface)" />
              <g transform="translate(60,50)" opacity="0.12">
                <path d="M60 80 L75 45 L115 30 L205 30 L240 45 L260 80 L275 80 L275 100 L0 100 L0 80Z" fill="var(--text-secondary)" />
                <circle cx="55" cy="100" r="22" fill="var(--text-secondary)" />
                <circle cx="220" cy="100" r="22" fill="var(--text-secondary)" />
              </g>
              <text x="200" y="175" textAnchor="middle" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: '13px', fill: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                {v.chassisCode}
              </text>
            </svg>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-elevated), transparent)' }} />
        </div>

        {/* Right: SDR panel */}
        <div className="lg:col-span-2 p-8 flex flex-col items-center justify-center gap-6">
          <SDRGauge score={v.sdrScore} size={160} animated />
          <div className="w-full space-y-3">
            <RecommendedBadge status={v.recommended} />
            <div className="flex flex-wrap gap-2 mt-2">
              <CategoryBadge category={v.category} />
              {v.jdmImport && <JDMBadge />}
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats strip */}
      <div
        className="border-b overflow-x-auto"
        style={{ background: 'var(--bg-elevated)', borderColor: 'var(--bg-border)' }}
      >
        <div className="flex divide-x" style={{ minWidth: '600px', '--divide-color': 'var(--bg-border)' } as React.CSSProperties}>
          {[
            { label: 'Horsepower',   value: formatNumber(v.horsepower, 'hp') },
            { label: 'Torque',       value: formatNumber(v.torqueNm, 'Nm') },
            { label: '0–100 km/h',   value: v.zeroTo100s ? `${v.zeroTo100s}s` : 'N/A' },
            { label: 'Ground Clear', value: v.groundClearMm ? `${v.groundClearMm}mm` : 'N/A' },
            { label: 'Wading',       value: v.wadingDepthMm ? `${v.wadingDepthMm}mm` : 'N/A' },
            { label: 'Fuel City',    value: v.fuelCityL100 ? `${v.fuelCityL100}L/100` : 'N/A' },
            { label: 'Seats',        value: v.seats ? String(v.seats) : 'N/A' },
          ].map(stat => (
            <div key={stat.label} className="flex-1 px-5 py-4 text-center" style={{ minWidth: '90px', borderColor: 'var(--bg-border)' }}>
              <p className="spec-label mb-1">{stat.label}</p>
              <p className="font-mono font-semibold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-jetbrains), monospace' }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div
        className="sticky top-16 z-30 border-b overflow-x-auto"
        style={{ background: 'rgba(14,19,24,0.95)', backdropFilter: 'blur(8px)', borderColor: 'var(--bg-border)' }}
      >
        <div className="flex max-w-site mx-auto px-6" style={{ minWidth: 'max-content' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap border-b-2"
              style={{
                color: tab === t.id ? 'var(--cyan-bright)' : 'var(--text-secondary)',
                borderBottomColor: tab === t.id ? 'var(--cyan-bright)' : 'transparent',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-site mx-auto px-6 py-10">
        {tab === 'overview' && (
          <div className="space-y-10 max-w-3xl">
            <div>
              <span className="eyebrow">Suriname Verdict</span>
              <VerdictBlock verdict={v.surinameVerdict} bestFor={v.bestFor} buyerNotes={v.buyerNotes} />
            </div>
            <div>
              <span className="eyebrow">SDR Rating</span>
              <SDRBar score={v.sdrScore} className="max-w-xs" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Parts Risk', value: <PartsBadge risk={v.partsRisk} /> },
                { label: 'Ground Clear', value: <GroundClearanceBadge mm={v.groundClearMm} /> },
                { label: 'Importer', value: <span className="text-sm font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace', color: 'var(--text-primary)' }}>{v.mainImporter || 'Unknown'}</span> },
                { label: 'Stock Depth', value: <StockDepth depth={v.stockDepth} /> },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                  <p className="spec-label mb-2">{item.label}</p>
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'specs' && <SpecTable vehicle={v} />}

        {tab === 'verdict' && (
          <div className="max-w-3xl space-y-8">
            <VerdictBlock verdict={v.surinameVerdict} bestFor={v.bestFor} buyerNotes={v.buyerNotes} />
            <div
              className="p-6 rounded-xl space-y-4"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}
            >
              <h3 className="font-syne font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                SDR Score Breakdown
              </h3>
              <SDRGauge score={v.sdrScore} size={120} animated />
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                <li>• Ground clearance: {v.groundClearMm ? `${v.groundClearMm}mm` : 'N/A'}</li>
                <li>• Wading depth: {v.wadingDepthMm ? `${v.wadingDepthMm}mm` : 'None rated'}</li>
                <li>• Parts risk: {v.partsRisk}</li>
                <li>• JDM import availability: {v.jdmImport ? 'Yes — good parts network' : 'Not a common JDM import'}</li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'parts' && (
          <div className="max-w-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                <p className="spec-label mb-2">Main Importer</p>
                <p className="text-xl font-syne font-bold" style={{ color: 'var(--text-primary)' }}>
                  {v.mainImporter || 'Unknown'}
                </p>
              </div>
              <div className="p-6 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                <p className="spec-label mb-2">Stock Depth</p>
                <div className="flex items-center gap-3">
                  <StockDepth depth={v.stockDepth} />
                  <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-jetbrains), monospace' }}>
                    {v.stockDepth ?? 0}/5
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
              <p className="spec-label mb-2">Parts Risk</p>
              <PartsBadge risk={v.partsRisk} />
            </div>
            {v.partsDroughtNote && (
              <div
                className="p-5 rounded-xl font-mono text-sm leading-relaxed"
                style={{
                  background: '#0A1A0A',
                  border: '1px solid rgba(74,222,128,0.15)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-jetbrains), monospace',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <p className="spec-label mb-3">Parts / Drought Note</p>
                {v.partsDroughtNote}
              </div>
            )}
          </div>
        )}

        {tab === 'years' && yearEntries.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="eyebrow">Year-by-Year</span>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
                {yearEntries.length} model years. Best SDR year is highlighted.
              </p>
            </div>
            <YearByYearTable entries={yearEntries} />
          </div>
        )}
      </div>
    </>
  )
}
