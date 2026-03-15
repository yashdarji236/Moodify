/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1db954",
        "primary-light": "#1ed760",
        dark: "#0a0a0a",
        "dark-card": "#121212",
        "dark-hover": "#282828",
      },
      animation: {
        "bounce-slow": "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.3s ease",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "40px"],
        "5xl": ["48px", "48px"],
      },
      opacity: {
        15: "0.15",
        25: "0.25",
        35: "0.35",
      },
    },
  },
  plugins: [],
};
