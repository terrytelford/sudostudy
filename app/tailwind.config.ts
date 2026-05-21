import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#0d1117',
        'bg-secondary': '#161b22',
        'bg-tertiary':  '#21262d',
        'accent-green': '#00ff88',
        'accent-cyan':  '#00d4ff',
        'text-primary': '#f0f6fc',
        'text-muted':   '#8b949e',
        'border':       '#30363d',
        'success':      '#3fb950',
        'error':        '#f85149',
        'warning':      '#d29922',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'flip': 'flip 0.5s ease-in-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
