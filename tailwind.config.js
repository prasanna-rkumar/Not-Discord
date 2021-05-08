module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xxs: ".7rem",
      xs: ".75rem",
      md: ".825rem",
      "mobile-paragraph": "14px",
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    colors: {
      anchor: {
        DEFAULT: "#00b0f4",
      },
      "chat-sender": {
        DEFAULT: "#e91e63"
      },
      primary: {
        DEFAULT: "#7289da",
      },
      danger: {
        DEFAULT: "#F04747"
      },
      success: {
        DEFAULT: "#43b582"
      },
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
      black: {
        DEFAULT: "#000",
        subtitle: "#4f5660",
      },
      gray: {
        alt: "#292B2F",
        darkest: "#202225",
        DEFAULT: "#2F3136",
        light: "#36393F",
        lightest: "#40444B"
      }
    },
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'],
      scale: ['group-hover'],
      borderRadius: ['hover'],
      backgroundColor: ['active'],
      backgroundOpacity: ['active'],
      textColor: ['active'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
