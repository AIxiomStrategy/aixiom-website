/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 0 40px -15px rgba(0,0,0,0.6)'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
