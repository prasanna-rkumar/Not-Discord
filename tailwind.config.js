module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: {
        hover: "#dcddde",
        muted: "#72767d",
        dark: "#d5d6d7",
        DEFAULT: "#FFF",
      },
      gray: {
        darkest: "#202225",
        dark: "#292B2F",
        DEFAULT: "#2F3136",
        light: "#36393F",
        lightest: "#40444B"
      }
    },
    extend: {},
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      borderRadius: ['hover'],
    },
  },
  plugins: [],
};
