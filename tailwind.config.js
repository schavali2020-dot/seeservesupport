/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Match reference site's warm readable feel
        sans: ['"Inter"', '"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Exact palette from see-serve-support-assistutilize.base44.app
        // Background: HSL(30,20%,98%) — warm cream
        // Primary:    HSL(24,80%,54%) — warm orange
        // Charcoal:   HSL(20,10%,18%) — dark warm text
        primary: {
          DEFAULT: '#E8772C', // HSL(24,80%,54%) warm orange
          dark:    '#C45E18', // darker shade for hover/active
          light:   '#F0965A', // lighter shade
        },
        accent: {
          DEFAULT: '#16A34A', // keep green for CTA actions
          light:   '#DCFCE7',
        },
        surface:   '#FAF9F7', // HSL(30,20%,98%) warm cream background
        muted:     '#F1EEEA', // HSL(30,10%,94%) light warm gray
        border:    '#E3DFD9', // HSL(30,10%,88%) warm border
        foreground:'#1F1D1B', // HSL(20,10%,12%) dark warm charcoal
        charcoal:  '#2F2B28', // HSL(20,10%,18%)
        danger:    '#DC2626',
      },
      animation: {
        'fade-in':   'fadeIn 0.3s ease-out',
        'slide-up':  'slideUp 0.35s ease-out',
        'pulse-soft':'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 },                               to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
    },
  },
  plugins: [],
}
