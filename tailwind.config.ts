import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: ["class", ".dark"], // Use the '.dark' class for dark mode

  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bgLight: "var(--bg-light)",
        text: "var(--text)",
        textLight: "var(--text-light)",
        accent: "var(--accent)",
        accentLight: "var(--accent-light)",
        link: "var(--link)",
        red: "var(--red)",
        dimRed: "var(--dimRed)",
        orange: "var(--orange)",
        dimOrange: "var(--dimOrange)",
        yellow: "var(--yellow)",
        dimYellow: "var(--dimYellow)",
        green: "var(--green)",
        dimGreen: "var(--dimGreen)",
        blue: "var(--blue)",
        dimBlue: "var(--dimBlue)",
        purple: "var(--purple)",
        dimPurple: "var(--dimPurple)",
        grey: "var(--grey)",
        dimGrey: "var(--dimGrey)",
        muted: "var(--color-text-secondary)",

      },
      typography: (theme:any) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
            lineHeight: "1.6",
            color: theme("colors.text"),
            a: {
              color: theme("colors.link"),
              "&:hover": {
                color: theme("colors.accent"),
              },
            },
            h1: { color: theme("colors.text") },
            h2: { color: theme("colors.text") },
            h3: { color: theme("colors.text") },
            h4: { color: theme("colors.text") },
            code: { color: theme("colors.orange") }, // backticks
            blockquote: {
              borderLeftColor: theme("colors.accent"),
              color: theme("colors.textLight"),
            },
            strong: {
              color: theme("colors.purple"),
              fontWeight: "700",
            },
            em: {
              fontStyle: "italic",
              color: theme("colors.accentLight"),
            },
            del: {
              textDecoration: "line-through",
              color: theme("colors.orange"),
            },
            th: {
              color: theme("colors.accent"),
              fontWeight: "700",
              borderBottomColor: theme("colors.grey"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.textLight"),
            a: {
              color: theme("colors.link"),
              "&:hover": {
                color: theme("colors.accentLight"),
              },
            },
            h1: { color: theme("colors.textLight") },
            h2: { color: theme("colors.textLight") },
            h3: { color: theme("colors.textLight") },
            h4: { color: theme("colors.textLight") },
            code: { color: theme("colors.accentLight") },
            blockquote: {
              borderLeftColor: theme("colors.accentLight"),
              color: theme("colors.text"),
            },
            strong: {
              color: theme("colors.accentLight"),
              fontWeight: "700",
            },
            th: {
              color: theme("colors.accentLight"),
              fontWeight: "700",
              borderBottomColor: theme("colors.dimGrey"),
            },
          },
        },
      }),
    },
  },

  plugins: [typographyPlugin],
} satisfies Config;
