/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#292929',
        secondary: '#af6d57'
      },
      fontFamily: {
        americana: 'Americana BT V2'
      }
    }
  },
  plugins: []
}
