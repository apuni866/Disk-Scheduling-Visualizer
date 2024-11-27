/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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

