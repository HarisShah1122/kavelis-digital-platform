/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary navy #111629 / secondary navy #171D31 — text, dark sections, footer
        navy: {
          50: '#F5F6F8',
          100: '#E7E9ED',
          200: '#D3D7DE',
          300: '#B4BAC5',
          400: '#8D95A2',
          500: '#6E7788',
          600: '#5B6473',
          700: '#414A5C',
          800: '#2A3148',
          900: '#171D31',
          950: '#111629',
        },
        // Brand gold — #C58D3E, hover #AA742D, pale gold #F5EBDD
        gold: {
          50: '#FDF9F3',
          100: '#F5EBDD',
          200: '#EDD9BC',
          300: '#DFC08A',
          400: '#D0A05C',
          500: '#C58D3E',
          600: '#AA742D',
          700: '#8C5E22',
          800: '#6F4A1B',
          900: '#573914',
        },
        // Slate gray supporting text — #5B6473, muted #8D95A2
        slate: {
          50: '#F7F8F9',
          100: '#ECEEF1',
          200: '#D8DBE1',
          300: '#B8BEC9',
          400: '#8D95A2',
          500: '#5B6473',
          600: '#4A5261',
          700: '#3D4450',
          800: '#2F3540',
          900: '#232833',
        },
        // Alias kept for existing text-charcoal-* utilities (slate values)
        charcoal: {
          50: '#F7F8F9',
          100: '#ECEEF1',
          200: '#D8DBE1',
          300: '#B8BEC9',
          400: '#8D95A2',
          500: '#5B6473',
          600: '#4A5261',
          700: '#3D4450',
          800: '#2F3540',
          900: '#232833',
          950: '#1A1E27',
        },
        // Warm white page canvas
        canvas: '#F7F7F7',
        // Semantic status colors
        success: '#21865B',
        warning: '#B7791F',
        error: '#C43D43',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        // Editorial display face — used for large headings only, never body copy.
        display: ['"Instrument Serif"', 'Iowan Old Style', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(17, 22, 41, 0.04), 0 8px 24px -12px rgba(17, 22, 41, 0.10)',
        lift: '0 24px 48px -24px rgba(17, 22, 41, 0.18)',
        nav: '0 1px 0 rgba(17, 22, 41, 0.05), 0 8px 24px -16px rgba(17, 22, 41, 0.14)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
