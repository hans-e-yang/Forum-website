import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: { 
          DEFAULT: colors.blue[600],
          ...colors.blue
        },
        bg: {
          DEFAULT: colors.rose[200],
          ...colors.blue
        },
        text: {
          DEFAULT: colors.slate[800],
          ...colors.slate
        }
      }
    },
  },
  plugins: [],
}

