import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/[\s_-]+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '')
}

export function formatNumber(n: number | null | undefined, unit = ''): string {
  if (n === null || n === undefined) return 'N/A'
  const formatted = n.toLocaleString('en-US')
  return unit ? `${formatted} ${unit}` : formatted
}

export function getGroundClearanceStatus(mm: number | null): 'good' | 'fair' | 'poor' {
  if (mm === null) return 'poor'
  if (mm >= 200) return 'good'
  if (mm >= 160) return 'fair'
  return 'poor'
}

export function yearRange(from: number | null, to: number | null): string {
  if (!from) return 'Unknown'
  if (!to) return `${from}–present`
  return `${from}–${to}`
}
