import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:     'var(--bg-base)',
          surface:  'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          border:   'var(--bg-border)',
          hover:    'var(--bg-hover)',
        },
        cyan: {
          bright: 'var(--cyan-bright)',
          mid:    'var(--cyan-mid)',
          dim:    'var(--cyan-dim)',
        },
        gold: {
          bright: 'var(--gold-bright)',
          dim:    'var(--gold-dim)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
        sdr: {
          great:    'var(--sdr-great)',
          good:     'var(--sdr-good)',
          fair:     'var(--sdr-fair)',
          poor:     'var(--sdr-poor)',
          critical: 'var(--sdr-critical)',
        },
        status: {
          yes:  'var(--status-yes)',
          cond: 'var(--status-cond)',
          no:   'var(--status-no)',
        },
        risk: {
          low:    'var(--risk-low)',
          medium: 'var(--risk-medium)',
          high:   'var(--risk-high)',
        },
      },
      fontFamily: {
        syne:      ['var(--font-syne)', 'sans-serif'],
        sans:      ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        mono:      ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        site: '1280px',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
export default config;
