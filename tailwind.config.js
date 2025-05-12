/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-purple': {
          950: '#13001f',
          900: '#1a0029',
          800: '#230033',
        },
        'dark-blue': {
          950: '#000a1f',
          900: '#00102b',
          800: '#001638',
        }
      },
    },
  },
  plugins: [],
};
