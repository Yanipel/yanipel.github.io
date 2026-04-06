import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F3EA',
        foreground: '#1B1A17',
        primary: '#0D4C49',
        accent: '#F97316',
        muted: '#E8DFCF',
        border: '#D9CCB8',
      },
      boxShadow: {
        glow: '0 20px 45px rgba(13, 76, 73, 0.24)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config
