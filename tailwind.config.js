/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Roboto\\ Condensed', ...defaultTheme.fontFamily.sans],
        'body': ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#6919ff',
      },
      borderWidth: {
        '0.5': '0.5px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
