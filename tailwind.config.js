/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,css}"],
  theme: {
    fontFamily:{
      "gans": ["Roboto","sans-serif"]
    },
    extend: {
      backgroundImage:{
        "home": "url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

