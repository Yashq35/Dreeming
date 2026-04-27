'use client'

import { useState } from 'react'
import Image from 'next/image'

interface VehicleImageProps {
  src?: string
  alt: string
  chassisCode?: string
  priority?: boolean
  className?: string
}

export function VehicleImage({ src, alt, chassisCode, priority = false, className = '' }: VehicleImageProps) {
  const [error, setError] = useState(false)
  const showPlaceholder = !src || error

  if (showPlaceholder) {
    return (
      <div
        className={`w-full flex items-center justify-center ${className}`}
        style={{ background: 'var(--bg-elevated)', aspectRatio: '16/9' }}
      >
        <svg viewBox="0 0 280 158" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Simple car silhouette */}
          <rect width="280" height="158" fill="var(--bg-elevated)" />
          <g transform="translate(35,40)" opacity="0.15">
            <path
              d="M 60 60 L 70 35 L 100 25 L 150 25 L 180 35 L 195 60 L 205 60 L 205 75 L 5 75 L 5 60 Z"
              fill="var(--bg-border)"
              stroke="none"
            />
            <circle cx="50" cy="75" r="16" fill="var(--bg-border)" />
            <circle cx="160" cy="75" r="16" fill="var(--bg-border)" />
          </g>
          {chassisCode && (
            <text
              x="140"
              y="130"
              textAnchor="middle"
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '11px',
                fill: 'var(--text-muted)',
                letterSpacing: '0.12em',
              }}
            >
              {chassisCode}
            </text>
          )}
        </svg>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: '16/9' }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      />
    </div>
  )
}
