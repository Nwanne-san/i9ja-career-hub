/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: '#f0f4f9',
          100: '#e1e9f3',
          300: '#a6c8ff',
          600: '#0c4783',
          700: '#00386c',
        },
        'primary-container': '#1a4f8b',
        'on-primary-container': '#9bc2ff',
        'on-primary': '#ffffff',
        'primary-fixed': '#1a4f8b',
        'on-primary-fixed': '#ffffff',
        'on-primary-fixed-variant': '#004599',
        secondary: {
          50: '#d8f8e8',
          100: '#8df8b7',
          600: '#007243',
          700: '#006d40',
        },
        'secondary-container': '#a5f0db',
        'on-secondary-container': '#004d37',
        tertiary: {
          600: '#624000',
          700: '#4e3200',
        },
        'tertiary-fixed': '#ffd9a8',
        'on-tertiary-fixed': '#3d2700',
        'on-tertiary-fixed-variant': '#4e3200',
        // Surface Colors
        surface: {
          DEFAULT: '#f7f9fb',
          dim: '#d8dadc',
          bright: '#f7f9fb',
          50: '#ffffff',
          100: '#f2f4f6',
          200: '#eceef0',
          300: '#e6e8ea',
          400: '#e0e3e5',
        },
        'surface-container': '#f2f4f6',
        'surface-container-low': '#f7f9fb',
        'surface-container-lowest': '#ffffff',
        // Neutral
        neutral: {
          50: '#eff1f3',
          100: '#e8ede9',
          200: '#c2c6d1',
          600: '#424750',
          700: '#191c1e',
          800: '#2d3133',
          900: '#0D0F0E',
        },
        'on-surface': '#191c1e',
        'on-surface-variant': '#424750',
        // Borders & Utility
        'border-low-contrast': '#e8ede9',
        // Status
        success: '#00A562',
        'success-green': '#00A562',
        error: '#ba1a1a',
        outline: '#717579',
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      spacing: {
        gutter: '1.5rem',
        section: '3rem',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
