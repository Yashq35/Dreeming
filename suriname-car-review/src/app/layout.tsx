import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Suriname Car Review — Built for Suriname Roads',
  description: '85 vehicles rated for flooding, interior roads, JDM imports & parts availability. The definitive car buying guide for Suriname.',
  keywords: ['suriname', 'car review', 'JDM', 'SDR score', 'hilux', 'vitz', 'paramaribo'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased" style={{ background: 'var(--bg-base)' }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
