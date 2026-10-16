import type { Config } from "tailwindcss";

// Green replaces the original blue. "brand" maps 1:1 to the blue roles in the design.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf3",
          100: "#d1fae0",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#079455",
          700: "#067647",
          800: "#085d3a",
          900: "#074d31",
          950: "#04291b",
        },
        ink: "#0b1f17",
        accent: "#f97316",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px -12px rgba(4, 41, 27, 0.25)",
        glow: "0 0 60px rgba(18, 183, 106, 0.45)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
