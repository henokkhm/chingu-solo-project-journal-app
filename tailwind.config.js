/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#007ae6",
        "custom-blue-hover": "#02549c",
        "custom-red": "#ea2e4c",
        "custom-red-hover": "#b33348",
      },
      screens: {
        "custom-sm": "430px",
      },
    },
  },
  plugins: [],
};
