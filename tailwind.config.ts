import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limeGlow: "#A3FF12",
        darkBg: "#0B0E0D",
        darkCard: "#111615",
      },
      boxShadow: {
        glow: "0 0 40px rgba(163,255,18,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
