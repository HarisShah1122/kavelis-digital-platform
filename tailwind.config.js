/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F2F6FB',
          100: '#E4ECF6',
          200: '#C8D9EC',
          300: '#A1BCD9',
          400: '#7396C1',
          500: '#4F76A6',
          600: '#3A5C8A',
          700: '#2D486D',
          800: '#1D304D',
          900: '#101F36',
          950: '#0A1628',
        },
        electric: {
          50: '#EEF4FF',
          100: '#DBE7FF',
          200: '#BFD5FF',
          300: '#94B8FF',
          400: '#5F8FFB',
          500: '#3B6BF3',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        charcoal: {
          50: '#F6F7F9',
          100: '#ECEEF2',
          200: '#D5D9E2',
          300: '#B0B8C9',
          400: '#8590A8',
          500: '#66728C',
          600: '#515B73',
          700: '#424A5D',
          800: '#39404E',
          900: '#333842',
          950: '#15181F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 22, 40, 0.04), 0 8px 24px -12px rgba(10, 22, 40, 0.12)',
        lift: '0 24px 48px -24px rgba(10, 22, 40, 0.22)',
        nav: '0 1px 0 rgba(10, 22, 40, 0.06), 0 8px 24px -16px rgba(10, 22, 40, 0.18)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
