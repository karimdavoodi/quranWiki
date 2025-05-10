import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs0: ["8px", "12px"],
      xs1: ["12px", "16px"],
      xs2: ["16px", "24px"],
      xs3: ["20px", "28px"],
      xs4: ["32px", "36px"],
      lx: ["38px", "60px"],
    },
    extend: {
      colors: {
        "bg": "var(--bg-color)",
        "bgHover": "var(--bg-hover-color)",
        "menu": "var(--text-menu-color)",
        "menu2": "var(--text-menu2-color)",
        "en": "var(--text-en-color)",
        "ar": "var(--text-ar-color)",
      },
    },
  },
  plugins: [
    function ({
      addBase,
      theme,
    }: {
      addBase: (styles: Record<string, any>) => void;
      theme: (path: string) => any;
    }) {
      addBase({
        ":root": {
          "--bg-color": theme("colors.black"),
          "--bg-hover-color": theme("colors.green.700"),
          "--text-menu-color": theme("colors.blue.100"),
          "--text-menu2-color": theme("colors.black"),
          "--text-en-color": theme("colors.yellow.600"),
          "--text-ar-color": theme("colors.yellow.500"),
        },
      });
    },
  ],
};
export default config;
