/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',

    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'bg': 'background'
      },
      cursor: {
        'delete': 'url(./src/assets/delete.ico), pointer',
      },
      fontFamily: {
        gilroy: ["Gilroy", "Roboto", "Noto Kufi Arabic", "Nunito", "Helvetica", "sans-serif"]
      },

      keyframes: {
        transcart: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'none' },
        },
        transcart_rtl: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'none' },
        },
        load_pulse: {
          '0%': { transform: 'scale(0.15)' ,opacity:"0"},
          '50%': { opacity:"1" },
          '100%': { transform: 'scale(1)' ,opacity:"0"},
        },
        scalet: {
          '0%': { maxHeight: '0' },
          '100%': { maxHeight: '500px' },
        },
        faveorite: {
          '0%': { transform: 'scale(1.2)' },
          '100%': { transform: 'none' },
        },
        modalProd: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'none' },
        },
        rotateH: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        trt: {
          '0%': { transform: 'translateX(-50%) translateY(120px)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        vibre: {
          "0%": {
            transform: "none"
          },
          "20%": {
            transform: 'translateX(6px)'
          },
          "40%": {
            transform: 'translateX(-6px)'
          },
          "60%": {
            transform: 'translateX(3px)'
          },
          "80%": {
            transform: 'translateX(-3px)'
          },
          "100%": {
            transform: 'translateX(0px)'
          },
        },
        vibre_sc: {
          "0%": {
            transform: "none"
          },
          "20%": {
            transform: 'scale(1)'
          },
          "40%": {
            transform: 'scale(0.9)'
          },
          "60%": {
            transform: 'scale(1)'
          },
          "80%": {
            transform: 'scale(0.95)'
          },
          "100%": {
            transform: 'scale(1)'
          },
        },
        anim_border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',

        /*
        * body text color
        */
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

        /*
        * border, default flat bg color for input components, tab & dropdown hover color
        */
        muted: 'rgb(var(--muted) / <alpha-value>)',

        /*
        * disable foreground color
        */
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',

        /*
        * primary colors
        */
        primary: {
          lighter: colors.gray[200],
          DEFAULT: "var(--primary-color)",
          dark: "var(--primary-color)",
          foreground: colors.white,
          // lighter: colors.gray[200],
          // DEFAULT: colors.gray[800],
          // dark: colors.gray[950],
          // foreground: colors.white,
        },

        /*
        * secondary colors
        */
        secondary: {
          lighter: colors.indigo[200],
          DEFAULT: "var(--secondary-color)",
          dark: "var(--secondary-color)",
          foreground: colors.white,
        },
        rose:"#EB1199",
        "rose-ligt":"#E059AD",

        /*
        * danger colors
        */
        red: {
          lighter: "rgb(var(--red-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--red-default) / <alpha-value>)",
          dark: "rgb(var(--red-dark) / <alpha-value>)",
        },

        /*
        * warning colors
        */
        orange: {
          lighter: "rgb(var(--orange-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--orange-default) / <alpha-value>)",
          dark: "rgb(var(--orange-dark) / <alpha-value>)",
        },

        /*
        * info colors
        */
        blue: {
          lighter: "rgb(var(--blue-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--blue-default) / <alpha-value>)",
          dark: "rgb(var(--blue-dark) / <alpha-value>)",
        },

        /*
        * success colors
        */
        green: {
          lighter: "rgb(var(--green-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--green-default) / <alpha-value>)",
          dark: "rgb(var(--green-dark) / <alpha-value>)",
        },
      },
      animation: {
        cart: 'transcart .3s ',
        trt: "trt .3s",
        scalet: "scalet .3s",
        cart_rtl: 'transcart_rtl .3s ',
        faveorite: 'faveorite .2s ',
        vibre: 'vibre 2s linear infinite',
        rotateH: 'rotateH 25s linear infinite',
        modalProd: 'modalProd .5s ',
        vibre_sc: "vibre_sc 5s linear infinite",
        load_pulse:" load_pulse 0.85s infinite linear"
        // anim_border:"anim_border 4s ease infinite"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
}

