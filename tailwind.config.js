/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./*.html"],
  mode:'jit',
  darkMode: 'selector',
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        '1000': '1000px',
      },
      screens: {
        'xxs': '500px',
        'sm': '640px',
        'md': '768px',
        'cl': '960px',
        'lg': '1024px',
        'xl': '1280px',
        'lpt': '1366px',
        '1xl': '1450px',
        '2xl': '1536px',
        '4xl': {'min':'1600px','max': '2560px'}
      },
      flexBasis: {
        '1/2': '48%',
        '1/3': '32%',
        '1/1': '98',
        '1/4': '19%'
      }
    },
  },
  plugins: [],
}

