import type { SDRBand } from '@/types/vehicle'

export function getSDRBand(score: number): SDRBand {
  if (score >= 70) return 'great'
  if (score >= 55) return 'good'
  if (score >= 40) return 'fair'
  if (score >= 25) return 'poor'
  return 'critical'
}

export function getSDRColor(score: number): string {
  const map: Record<SDRBand, string> = {
    great: '#00D4FF',
    good: '#4ADE80',
    fair: '#F0B429',
    poor: '#FF7A00',
    critical: '#FF3B3B',
  }
  return map[getSDRBand(score)]
}

export function getSDRLabel(score: number): string {
  const map: Record<SDRBand, string> = {
    great: 'Top Tier',
    good: 'Versatile',
    fair: 'City Only',
    poor: 'Caution',
    critical: 'Avoid',
  }
  return map[getSDRBand(score)]
}

export function getSDRBandLabel(band: SDRBand): string {
  const map: Record<SDRBand, string> = {
    great: '71–85 · Top Tier',
    good: '56–70 · Versatile',
    fair: '41–55 · City Only',
    poor: '26–40 · Caution',
    critical: '0–25 · Avoid',
  }
  return map[band]
}
