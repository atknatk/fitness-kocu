import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2E75B6", dark: "#1B4F72", light: "#EBF5FB" },
        accent: { DEFAULT: "#27AE60", light: "#E8F8F5" },
        warning: { DEFAULT: "#E67E22", light: "#FEF9E7" },
        danger: "#E74C3C",
        royal: { DEFAULT: "#8E44AD", light: "#F5EEF8" },
        dark: "#1a1a2e",
      },
      animation: {
        "stickman": "stickman 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
