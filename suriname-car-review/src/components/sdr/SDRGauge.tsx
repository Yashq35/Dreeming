'use client'

import { useEffect, useState } from 'react'
import { getSDRColor, getSDRLabel } from '@/lib/sdr'

interface SDRGaugeProps {
  score: number
  size?: number
  animated?: boolean
}

const CX = 50
const CY = 50
const R = 38
const CIRCUMFERENCE = 2 * Math.PI * R
const ARC_DEGREES = 270
const ARC_LENGTH = (ARC_DEGREES / 360) * CIRCUMFERENCE

export function SDRGauge({ score, size = 160, animated = true }: SDRGaugeProps) {
  const [displayed, setDisplayed] = useState(animated ? 0 : score)
  const color = getSDRColor(score)
  const label = getSDRLabel(score)

  useEffect(() => {
    if (!animated) return
    const timeout = setTimeout(() => setDisplayed(score), 100)
    return () => clearTimeout(timeout)
  }, [score, animated])

  const filledLength = (displayed / 85) * ARC_LENGTH
  const trackDash = `${ARC_LENGTH} ${CIRCUMFERENCE - ARC_LENGTH}`
  const progressDash = `${filledLength} ${CIRCUMFERENCE - filledLength}`

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 100 90"
        role="img"
        aria-label={`SDR Score: ${score} out of 85 — ${label}`}
      >
        {/* Track arc */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="var(--bg-border)"
          strokeWidth="7"
          strokeDasharray={trackDash}
          strokeLinecap="round"
          transform="rotate(-225 50 50)"
        />
        {/* Progress arc */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={progressDash}
          strokeLinecap="round"
          transform="rotate(-225 50 50)"
          style={{
            transition: animated ? 'stroke-dasharray 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            filter: `drop-shadow(0 0 6px ${color}55)`,
          }}
        />
        {/* Score number */}
        <text
          x={CX}
          y={CY - 3}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '20px',
            fontWeight: '600',
            fill: color,
          }}
        >
          {score}
        </text>
        {/* /85 label */}
        <text
          x={CX}
          y={CY + 12}
          textAnchor="middle"
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '8px',
            fill: 'var(--text-muted)',
          }}
        >
          /85
        </text>
      </svg>
      <span
        className="pill mt-1"
        style={{
          color,
          borderColor: `${color}55`,
          background: `${color}12`,
          fontSize: '0.65rem',
        }}
      >
        {label}
      </span>
    </div>
  )
}
