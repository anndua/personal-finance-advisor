/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./client/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#edf7f5",
          100: "#d0ece7",
          200: "#a1d9cf",
          300: "#72c6b7",
          400: "#43b39f",
          500: "#1a9e87",
          600: "#1a6b5e",   // primary
          700: "#145449",
          800: "#0e3d35",
          900: "#082620",
        },
        gold: {
          400: "#f0c060",
          500: "#d4a843",
          600: "#b88c2e",
        },
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(26,107,94,0.07)",
        modal: "0 8px 48px 0 rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
