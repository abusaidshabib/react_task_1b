/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#111111",
        'secondary': "#ffffff",
        'neural': "#9BFF00",
        'primary-v1': "#1D1D1D",
        'secondary-v2': "#A2A2A2",
        'neural-v2': "#DBFD51",
      },
      fontFamily: {
        'inter': ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
