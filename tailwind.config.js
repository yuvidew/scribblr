

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app-example/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
