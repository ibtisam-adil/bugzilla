/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'max-md': { max: '768px' },
      },
      colors: {
        'custom-red': '#ff4d4d',
        'custom-pink': '#f99',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 5px 20px rgba(77, 91, 170, 0.5)',
      },
      gridTemplateColumns: {
        custom: '1.4fr 1fr',
      },
    },
  },
  plugins: [],
};
