/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        customizeTurquoise: "hsl(175, 69%, 57%)",
        customizeGreen: "hsl(162, 69%, 50%)",
        customizeLightGreen: "hsl(149, 91%, 62%)",
        customizeDarkGreen: "hsl(168, 100%, 20%)",
        customizeLight:  "hsl(0, 0%, 97%)",
      },
      maxWidth: {
        thousand: "1000px",
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

/*
  $turquoise: hsl(175, 69%, 57%);

  $green: hsl(162, 69%, 50%);

  $light-green: hsl(149, 91%, 62%);

  $dark-green: hsl(168, 100%, 20%);

  $light: hsl(0, 0%, 97%);

  $primary: $green => Change The Primary Color In Bulma
  $link: $light-green => Change The Link Color In Bulma
  $control-border-width: 2px
  $input-border-color: transparent
  $input-shadow: none

*/
