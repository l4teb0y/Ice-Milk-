/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFFDF8',
          bg: '#FFF8EF',
        },
        pink: {
          DEFAULT: '#F48CB7',
          soft: '#FFB6CF',
          deep: '#E4699C',
        },
        choco: {
          DEFAULT: '#4A2412',
          soft: '#8A6152',
          faint: '#C9AA9C',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        numeric: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        card: '30px',
      },
      boxShadow: {
        card: '0 30px 80px -30px rgba(74, 36, 18, 0.25), 0 10px 30px -15px rgba(74, 36, 18, 0.15)',
        soft: '0 10px 30px -12px rgba(74, 36, 18, 0.18)',
        button: '0 12px 24px -8px rgba(244, 140, 183, 0.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
