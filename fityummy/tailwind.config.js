/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mint: { 50: '#f0faf5', 100: '#dcf5e8', 200: '#b3ebce', 300: '#7ddbb0', DEFAULT: '#4ecb8c', 500: '#2db87a', 600: '#1f9e66' },
        croc: { DEFAULT: '#6bbf47', dark: '#4a8c2e', light: '#a3d96e' },
        choco: { DEFAULT: '#2d1a0e', light: '#5c3317', cream: '#f5e6c8' },
        berry: { DEFAULT: '#e84393', light: '#f472b6' },
        mango: { DEFAULT: '#f5a623', light: '#fcd34d' },
        kiwi: { DEFAULT: '#84cc16', dark: '#4d7c0f' },
      },
      fontFamily: {
        display: ['"Fredoka One"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-15px)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.8)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
      backgroundImage: {
        'dots': "radial-gradient(circle, #4ecb8c33 1px, transparent 1px)",
        'wave': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='%234ecb8c' d='M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
