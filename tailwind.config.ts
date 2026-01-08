import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ["var(--font-space-grotesk)"],
        'noto-sans': ["var(--font-noto-sans)"],
        'manrope': ["var(--font-manrope)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "gradient-green": "rgba(37, 214, 149, 0.15)",
        "custom-grey": "rgba(23, 25, 30, 0.50)",
      },
    },
  },
  plugins: [],
};
export default config;
