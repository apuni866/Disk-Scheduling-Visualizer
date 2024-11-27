/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/images/home_background.jpg')",
      },
    },
  },
  plugins: [],
}

