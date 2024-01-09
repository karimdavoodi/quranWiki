import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        fontSize: {
            xs0: ["8px", "12px"],
            xs1: ["12px", "16px"],
            xs2: ["16px", "24px"],
            xs3: ["20px", "28px"],
            xs4: ["32px", "36px"],
            lx: ["38px", "60px"],
        },
    },
    plugins: [],
};
export default config
