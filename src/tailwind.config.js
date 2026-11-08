/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pizzaYellow: "#FDC913",
        pizzaLightGray: "#5F5F5F",
        pizzaDarkGray: "#292929",
        pizzaRed: "#CE2829",
        pizzaBeige: "#FAF7F2",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        roboto: ["'Roboto Condensed'", "sans-serif"],
        quattrocento: ["Quattrocento", "serif"],
        satisfy: ["Satisfy", "cursive"],
      },
    },
  },
  plugins: [],
}