import type { Config } from "tailwindcss";
// import typographyPlugin from '@tailwindcss/typography'

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode : "media",
  darkMode: "selector",
  // darkMode: "class",
} satisfies Config;
