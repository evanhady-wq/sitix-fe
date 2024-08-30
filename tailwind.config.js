/** @type {import('tailwindcss').Config} */
const {nextui, colors} = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue-1': '#5B99C2',
        'custom-blue-2': '#1A4870',
        'custom-blue-3': '#1F316F'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

