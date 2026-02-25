/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F15A24",
          dark: "#D1481B",
          light: "#F47B50",
        },
        secondary: {
          DEFAULT: "#008D46",
          dark: "#006B35",
          light: "#00B058",
        },
        dark: {
          DEFAULT: "#333333",
          lighter: "#444444",
        },
        surface: "#F9F9F9",
      },
      borderRadius: {
        xl: "2px",
        "2xl": "4px",
        "3xl": "8px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.05)",
        card: "0 4px 20px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
