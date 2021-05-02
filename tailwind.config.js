module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "message-hover": {
        DEFAULT: "rgba(4, 4, 5, 0.07)"
      },
      transparent: {
        DEFAULT: "#00000000"
      },
      white: {
        hover: "#dcddde",
        muted: "#72767d",
        dark: "#d5d6d7",
        DEFAULT: "#FFF",
        normal: "#DCDDDE",
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
