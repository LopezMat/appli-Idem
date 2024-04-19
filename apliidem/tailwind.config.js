/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kigo': 'rgba(249, 79, 13, 1)',

      }
    },
  },
  plugins: [],
}

