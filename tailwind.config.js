/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy #101629 — primary text, dark sections, footer
        navy: {
          50: '#F4F5F7',
          100: '#E8EAEE',
          200: '#D0D4DC',
          300: '#ADB3C0',
          400: '#838BA0',
          500: '#646D85',
          600: '#4E5670',
          700: '#3F465B',
          800: '#2A3145',
          900: '#1C2233',
          950: '#101629',
        },
        // Brand teal ramp — dark teal #075B66, teal #159A98, mint #62D6B0
        teal: {
          50: '#E8F6F2',
          100: '#D4EFE7',
          200: '#B5E2D8',
          300: '#8CD4C4',
          400: '#62D6B0',
          500: '#159A98',
          600: '#0E8482',
          700: '#0D6F70',
          800: '#075B66',
          900: '#05484F',
          950: '#03363C',
        },
        // Mint accent
        mint: {
          300: '#8FE3C6',
          400: '#62D6B0',
          500: '#3FC49A',
        },
        // Muted gray #687385 — secondary text
        charcoal: {
          50: '#F6F7F8',
          100: '#ECEEF1',
          200: '#D8DBE1',
          300: '#B8BEC9',
          400: '#8F97A8',
          500: '#687385',
          600: '#576174',
          700: '#495163',
          800: '#3D4453',
          900: '#343A47',
          950: '#1F232C',
        },
        // Soft off-white page canvas
        canvas: '#FAF9F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 22, 41, 0.04), 0 8px 24px -12px rgba(16, 22, 41, 0.10)',
        lift: '0 24px 48px -24px rgba(16, 22, 41, 0.18)',
        nav: '0 1px 0 rgba(16, 22, 41, 0.05), 0 8px 24px -16px rgba(16, 22, 41, 0.14)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
