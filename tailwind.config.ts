import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        perceel: {
          green: "#0f6b4f",
          dark: "#17352f",
          soft: "#f4f7f4",
          line: "#d8e2dc"
        }
      }
    }
  },
  plugins: []
};

export default config;
