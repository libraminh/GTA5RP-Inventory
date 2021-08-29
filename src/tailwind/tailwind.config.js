module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "./src/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        26: "6.5rem",
      },
      colors: {
        "gta-blue-300": "#4dc3f7",
        "gta-blue-400": "#4d92b1",
      },
      maxWidth: {
        230: "230px",
      },
      maxHeight: {
        "45vh": "45vh",
        "50vh": "50vh",
      },
      minHeight: {
        "48vh": "48.5vh",
      },
    },
  },
  variants: {
    extend: {
      appearance: ["hover", "focus"],
    },
  },
  plugins: [],
};
