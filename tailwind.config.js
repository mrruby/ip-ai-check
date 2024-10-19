/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8A2BE2", // Brighter purple
        secondary: "#87CEFA", // Light blue
        accent: "#0000FF", // Dark blue
        background: "#F8F8FF", // Very light grayish blue
      },
    },
  },
  plugins: [],
};
