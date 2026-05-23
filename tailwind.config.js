/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // ── Colors ──────────────────────────────
      colors: {
        orange:     '#ff6b35',
        'orange-lt':'#ffaa70',
        dark:       '#0a0a0a',
        'dark-alt': '#0d0d0d',
        'dark-card':'#0f0f0f',
        light:      '#f5f0eb',
        gray:       '#f0ede8',
        'text-gray':'rgba(245,240,235,0.42)',
      },

      // ── Typography ───────────────────────────
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },

      // ── Spacing ──────────────────────────────
      maxWidth: {
        inner: '1200px',
      },

      // ── Box shadows ──────────────────────────
      boxShadow: {
        hero:   '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,107,53,0.1)',
        card:   '0 20px 60px rgba(0,0,0,0.4)',
        orange: '0 8px 28px rgba(255,107,53,0.35)',
        'orange-lg': '0 16px 48px rgba(255,107,53,0.5)',
      },

      // ── Border radius ────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Animations ───────────────────────────
      keyframes: {
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer:      'shimmer 4s linear infinite',
        pulse:        'pulse 2s ease-in-out infinite',
        float:        'float 4s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'spin-slower':'spin 30s linear infinite reverse',
        blink:        'blink 0.9s step-end infinite',
      },

      // ── Transitions ──────────────────────────
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },

  plugins: [
    // Uncomment if you install @tailwindcss/typography for blog content:
    // require('@tailwindcss/typography'),
  ],
};