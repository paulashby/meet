const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "am-darkest-blue": "#10121B",
          "am-blue-grey": "#393e5f",
          "am-mid-grey": "#627786",
          "am-mid-grey-light": "#708899",
        accent: {
          50: "#b0b2b5",
          100: "#394451",
          200: "#263d4a",
          300: "#66fcf1",
          400: "#0693b3",
          500: "#45a29e",
          600: "#627786",
          700: "#44535d",
          800: "#30384f",
          900: "#1f2536",
        },
      },
      fontFamily: {
        sans: "var(--font-public-sans), sans-serif",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"])
    }),
  ],
}
