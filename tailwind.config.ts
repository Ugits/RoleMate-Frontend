import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        strong: "0 0px 30px 10px rgba(0, 0, 0, 0.9)",
        innerStrong: " inset 0 0px 30px 10px rgba(0, 0, 0, 0.9)",
        saberglow: "0 0px 1px 7px rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newTextShadows = {
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
        },
      };

      addUtilities(newTextShadows, ["responsive", "hover"]);
    },
  ],
} satisfies Config;