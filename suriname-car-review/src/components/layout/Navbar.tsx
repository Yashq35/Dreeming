'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/cars', label: 'Cars' },
  { href: '/compare', label: 'Compare' },
  { href: '/sdr-guide', label: 'SDR Guide' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          background: 'rgba(8, 12, 16, 0.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--bg-border)',
        }}
      >
        <div className="max-w-site mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-syne font-extrabold text-xl" style={{ color: 'var(--cyan-bright)' }}>
              SCR
            </span>
            <span className="hidden sm:block text-xs font-sans font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Suriname Car Review
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium font-sans pb-1 transition-colors',
                  pathname?.startsWith(link.href)
                    ? 'border-b-2 tab-active'
                    : 'hover:text-white'
                )}
                style={{
                  color: pathname?.startsWith(link.href) ? 'var(--cyan-bright)' : 'var(--text-secondary)',
                  borderColor: pathname?.startsWith(link.href) ? 'var(--cyan-bright)' : 'transparent',
                  borderBottomWidth: '2px',
                  borderBottomStyle: 'solid',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Search"
            >
              <Search size={18} />
            </Link>
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(8,12,16,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute top-0 right-0 h-full w-72 flex flex-col"
            style={{ background: 'var(--bg-elevated)', borderLeft: '1px solid var(--bg-border)' }}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--bg-border)' }}>
              <span className="font-syne font-extrabold text-lg" style={{ color: 'var(--cyan-bright)' }}>SCR</span>
              <button onClick={() => setOpen(false)} style={{ color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans font-medium text-base"
                  style={{ color: pathname?.startsWith(link.href) ? 'var(--cyan-bright)' : 'var(--text-primary)' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/search"
                className="font-sans font-medium text-base"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/about"
                className="font-sans font-medium text-base"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}
