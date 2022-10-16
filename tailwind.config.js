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
        primary: '#6919FF',
        neutrals: {
          '50': '#F8FAFC',
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '700': '#292961',
          '800': '#1C1B45',
          '900': '#12112C',
        }
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      zIndex: {
        '1': '1',
      }
    },
    fluidType: {
      settings: {
        fontSizeMin: 1, /* 16px */
      },
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('tailwindcss-fluid-type'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
