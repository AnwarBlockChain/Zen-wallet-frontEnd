/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'premium-black': '#000000',
        'off-black': '#121212',
        'dark-gray': '#1F1F1F',
        'medium-gray': '#2F2F2F',
        'light-gray': '#ADADAD',
        'premium-white': '#FFFFFF',
        'off-white': '#F5F5F5',
        'accent': '#333333',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(to right, #121212, #000000)',
        'gradient-premium-hover': 'linear-gradient(to right, #000000, #121212)',
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '0% 0' }
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      }
    },
  },
  plugins: [],
} 