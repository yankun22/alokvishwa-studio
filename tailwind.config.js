/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        abyss: '#030304',
        obsidian: '#0a0b0e',
        surface: {
          50: '#060709',
          100: '#0a0b0e',
          200: '#111318',
          300: '#181b22',
          400: '#222733',
        },
        platinum: {
          DEFAULT: '#f8fafc',
          light: '#ffffff',
          muted: '#94a3b8',
          dark: '#64748b',
        },
        accent: {
          shimmer: '#e2e8f0',
          prismatic: '#38bdf8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'noir-card': '0 8px 32px 0 rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'noir-hover': '0 20px 48px 0 rgba(0, 0, 0, 0.95), 0 0 24px -4px rgba(255, 255, 255, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.16)',
        'pill-active': '0 0 20px -2px rgba(255, 255, 255, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
      },
      letterSpacing: {
        'tighter-editorial': '-0.04em',
        'widest-telemetry': '0.25em',
      }
    },
  },
  plugins: [],
}
