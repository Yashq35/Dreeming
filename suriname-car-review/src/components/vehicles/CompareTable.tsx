'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { Vehicle } from '@/types/vehicle'
import { SDRGauge } from '@/components/sdr/SDRGauge'

interface CompareTableProps {
  vehicles: Vehicle[]
}

const SPEC_ROWS: { label: string; key: keyof Vehicle; unit?: string; better: 'higher' | 'lower' | null }[] = [
  { label: 'SDR Score',       key: 'sdrScore',       unit: '/85', better: 'higher' },
  { label: 'Ground Clear.',   key: 'groundClearMm',  unit: 'mm',  better: 'higher' },
  { label: 'Wading Depth',    key: 'wadingDepthMm',  unit: 'mm',  better: 'higher' },
  { label: 'Horsepower',      key: 'horsepower',     unit: 'hp',  better: 'higher' },
  { label: 'Torque',          key: 'torqueNm',       unit: 'Nm',  better: 'higher' },
  { label: 'Displacement',    key: 'displacement',   unit: 'cc',  better: null },
  { label: 'Drivetrain',      key: 'drivetrain',                  better: null },
  { label: 'Transmission',    key: 'transmission',               better: null },
  { label: '0–100 km/h',      key: 'zeroTo100s',     unit: 's',   better: 'lower' },
  { label: 'Fuel (City)',     key: 'fuelCityL100',   unit: 'L',   better: 'lower' },
  { label: 'Fuel (Hwy)',      key: 'fuelHwyL100',    unit: 'L',   better: 'lower' },
  { label: 'Curb Weight',     key: 'curbWeightKg',   unit: 'kg',  better: 'lower' },
  { label: 'Tow Capacity',    key: 'towCapKg',       unit: 'kg',  better: 'higher' },
  { label: 'Payload',         key: 'payloadKg',      unit: 'kg',  better: 'higher' },
  { label: 'Cargo Volume',    key: 'cargoVolL',      unit: 'L',   better: 'higher' },
  { label: 'Seats',           key: 'seats',                       better: null },
  { label: 'Parts Risk',      key: 'partsRisk',                   better: null },
  { label: 'Main Importer',   key: 'mainImporter',               better: null },
  { label: 'Recommended',     key: 'recommended',                 better: null },
]

function isBest(vals: (number | null)[], i: number, better: 'higher' | 'lower'): boolean {
  const nums = vals.filter((v): v is number => v !== null)
  if (nums.length < 2) return false
  const best = better === 'higher' ? Math.max(...nums) : Math.min(...nums)
  return vals[i] === best
}

const PRESETS = [
  { label: 'Hilux Vigo vs Revo',    slugs: ['toyota-hilux-vigo-gen7', 'toyota-hilux-revo-gen8'] },
  { label: 'Vitz Gen 1 vs Gen 2',   slugs: ['toyota-vitz-gen1', 'toyota-vitz-gen2'] },
  { label: 'Jimny JB23 vs JB74',    slugs: ['suzuki-jimny-jb23-gen3', 'suzuki-jimny-jb74-gen4'] },
  { label: 'Alphard H20 vs H30',    slugs: ['toyota-alphard-h20-gen2', 'toyota-alphard-h30-gen3'] },
]

function CompareContent({ vehicles }: CompareTableProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const slugA = searchParams.get('a') ?? 'toyota-hilux-vigo-gen7'
  const slugB = searchParams.get('b') ?? 'toyota-hilux-revo-gen8'
  const slugC = searchParams.get('c') ?? ''

  const [selA, setSelA] = useState(slugA)
  const [selB, setSelB] = useState(slugB)
  const [selC, setSelC] = useState(slugC)

  const selected = [selA, selB, selC]
    .filter(Boolean)
    .map(s => vehicles.find(v => v.slug === s))
    .filter(Boolean) as Vehicle[]

  const updateURL = (a: string, b: string, c: string) => {
    const p = new URLSearchParams()
    if (a) p.set('a', a)
    if (b) p.set('b', b)
    if (c) p.set('c', c)
    router.replace(`/compare?${p.toString()}`, { scroll: false })
  }

  const SelectVehicle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm rounded-lg px-3 py-2 outline-none"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--bg-border)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-dm-sans), sans-serif',
      }}
    >
      <option value="">— Select vehicle —</option>
      {vehicles.map(v => (
        <option key={v.slug} value={v.slug}>
          {v.localName} ({v.generation}) — SDR {v.sdrScore}
        </option>
      ))}
    </select>
  )

  return (
    <div>
      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="spec-label self-center">Quick compare:</span>
        {PRESETS.map(p => (
          <button
            key={p.label}
            className="pill transition-colors"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--bg-border)', cursor: 'pointer' }}
            onClick={() => {
              setSelA(p.slugs[0])
              setSelB(p.slugs[1] ?? '')
              setSelC('')
              updateURL(p.slugs[0], p.slugs[1] ?? '', '')
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SelectVehicle value={selA} onChange={v => { setSelA(v); updateURL(v, selB, selC) }} />
        <SelectVehicle value={selB} onChange={v => { setSelB(v); updateURL(selA, v, selC) }} />
        <SelectVehicle value={selC} onChange={v => { setSelC(v); updateURL(selA, selB, v) }} />
      </div>

      {selected.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-secondary)' }}>
          <p>Select vehicles above to compare them.</p>
        </div>
      )}

      {selected.length > 0 && (
        <>
          {/* SDR Gauges */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[selA, selB, selC].map((slug, i) => {
              const v = vehicles.find(x => x.slug === slug)
              if (!v) return <div key={i} />
              return (
                <div
                  key={v.slug}
                  className="rounded-xl p-6 text-center"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}
                >
                  <p className="spec-label mb-3">{v.make}</p>
                  <h3 className="font-syne font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>{v.localName}</h3>
                  <SDRGauge score={v.sdrScore} size={120} />
                </div>
              )
            })}
          </div>

          {/* Spec comparison table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--bg-border)' }}
          >
            {/* Header */}
            <div
              className="grid border-b"
              style={{ gridTemplateColumns: '180px repeat(3, 1fr)', borderColor: 'var(--bg-border)' }}
            >
              <div className="px-4 py-3" />
              {[selA, selB, selC].map((slug, i) => {
                const v = vehicles.find(x => x.slug === slug)
                return (
                  <div key={i} className="px-4 py-3 border-l" style={{ borderColor: 'var(--bg-border)' }}>
                    {v ? (
                      <div>
                        <p className="spec-label">{v.make}</p>
                        <p className="text-sm font-syne font-bold" style={{ color: 'var(--text-primary)' }}>{v.localName}</p>
                      </div>
                    ) : <span className="spec-label">—</span>}
                  </div>
                )
              })}
            </div>

            {/* Rows */}
            {SPEC_ROWS.map(row => {
              const vals = [selA, selB, selC].map(slug => {
                const v = vehicles.find(x => x.slug === slug)
                if (!v) return null
                const raw = v[row.key]
                return raw !== null && raw !== undefined && raw !== '' ? raw : null
              })

              const numVals = vals.map(v => typeof v === 'number' ? v : null)

              return (
                <div
                  key={row.key}
                  className="grid border-b"
                  style={{ gridTemplateColumns: '180px repeat(3, 1fr)', borderColor: 'var(--bg-border)' }}
                >
                  <div className="px-4 py-3 spec-label">{row.label}</div>
                  {vals.map((val, i) => {
                    const best = row.better && isBest(numVals, i, row.better)
                    const display = val !== null ? `${val}${row.unit ? ' ' + row.unit : ''}` : '—'
                    return (
                      <div
                        key={i}
                        className="px-4 py-3 border-l"
                        style={{
                          borderColor: 'var(--bg-border)',
                          background: best ? 'rgba(0,212,255,0.05)' : 'transparent',
                        }}
                      >
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: 'var(--font-jetbrains), monospace',
                            color: best ? 'var(--cyan-bright)' : 'var(--text-primary)',
                            fontWeight: best ? 600 : 400,
                          }}
                        >
                          {display}
                        </span>
                        {best && <span className="ml-1 text-xs" style={{ color: 'var(--cyan-bright)' }}>↑</span>}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export function CompareTable({ vehicles }: CompareTableProps) {
  return (
    <Suspense fallback={<div className="py-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading...</div>}>
      <CompareContent vehicles={vehicles} />
    </Suspense>
  )
}
