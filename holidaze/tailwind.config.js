/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      wood: "#716947",
      pearl: "#F1F2EE",
      leaf: "#4B6858",
      white: "#ffffff",
      danger: "#B01212 "
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Cormorant Infant", "serif"],
      body: ["Assistant" , "Roboto", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}

