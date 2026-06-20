/** @type {import('tailwindcss').Config} */
export default {
  // Kích hoạt dark mode qua class
  darkMode: 'class',

  // Các file sẽ được Tailwind scan để tạo utility classes
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      // ==========================
      // BRAND COLORS - ITechZone
      // ==========================
      colors: {
        // Primary: Đỏ ITechZone
        primary: {
          50:  '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#f83737',
          600: '#e51c1c',
          700: '#c21313',
          800: '#a01414',
          900: '#841717',
          950: '#480707',
          DEFAULT: '#e51c1c',
        },
        // Dark Background
        dark: {
          50:  '#f6f6f7',
          100: '#e1e3e8',
          200: '#c2c6d0',
          300: '#9ba1b2',
          400: '#747c92',
          500: '#596077',
          600: '#464c61',
          700: '#3a3f51',
          800: '#1e2130',
          900: '#111420',
          950: '#0a0c15',
          DEFAULT: '#0a0c15',
        },
        // Surface colors
        surface: {
          light: '#ffffff',
          dark:  '#161b2e',
        },
      },

      // ==========================
      // TYPOGRAPHY
      // ==========================
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },

      // ==========================
      // FONT SIZES
      // ==========================
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs:   ['0.75rem',  { lineHeight: '1rem' }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',     { lineHeight: '1.5rem' }],
        lg:   ['1.125rem', { lineHeight: '1.75rem' }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':['1.5rem',   { lineHeight: '2rem' }],
        '3xl':['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl':['3rem',     { lineHeight: '1.15' }],
        '6xl':['3.75rem',  { lineHeight: '1.1' }],
        '7xl':['4.5rem',   { lineHeight: '1.05' }],
      },

      // ==========================
      // SPACING
      // ==========================
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
      },

      // ==========================
      // BORDER RADIUS
      // ==========================
      borderRadius: {
        'xs':  '0.25rem',
        'sm':  '0.375rem',
        DEFAULT: '0.5rem',
        'md':  '0.625rem',
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ==========================
      // BOX SHADOW
      // ==========================
      boxShadow: {
        'card':    '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.14)',
        'primary': '0 4px 20px rgba(229,28,28,0.35)',
        'primary-lg': '0 8px 32px rgba(229,28,28,0.45)',
        'dark-card':  '0 2px 16px rgba(0,0,0,0.4)',
        'glass':   '0 8px 32px rgba(0,0,0,0.12)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.15)',
      },

      // ==========================
      // ANIMATIONS
      // ==========================
      animation: {
        'fade-in':     'fadeIn 0.3s ease-out',
        'fade-up':     'fadeUp 0.4s ease-out',
        'slide-in-left':  'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in':    'scaleIn 0.2s ease-out',
        'shimmer':     'shimmer 1.5s infinite',
        'pulse-slow':  'pulse 3s infinite',
        'float':       'float 3s ease-in-out infinite',
        'count-down':  'countdown 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },

      // ==========================
      // TRANSITIONS
      // ==========================
      transitionTimingFunction: {
        'spring':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':   'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },

      // ==========================
      // BACKDROP BLUR (glassmorphism)
      // ==========================
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },

      // ==========================
      // Z-INDEX
      // ==========================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'header': '200',
        'overlay': '300',
        'modal': '400',
        'toast': '500',
      },

      // ==========================
      // SCREENS (breakpoints)
      // ==========================
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1680px',
      },

      // ==========================
      // BACKGROUND
      // ==========================
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #e51c1c 0%, #c21313 100%)',
        'gradient-dark':    'linear-gradient(135deg, #0a0c15 0%, #161b2e 100%)',
        'gradient-hero':    'linear-gradient(135deg, #0a0c15 0%, #1a0505 50%, #0a0c15 100%)',
        'gradient-card':    'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
      },
    },
  },

  plugins: [],
}
