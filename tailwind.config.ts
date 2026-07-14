import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Grably brand palette
        "grably-dark": "#0F2E1E",
        "grably-mid": "#1A4731",
        "grably-accent": "#2ECC71",
        "grably-adk": "#27AE60",
        "grably-offwhite": "#F4F9F6",
        "grably-lightgrn": "#D4EDDA",
        "grably-text": "#1A2E1A",
        "grably-textmid": "#3D5A47",
        "grably-warn": "#C0392B",
        "grably-gray": "#E8EDF0",

        // shadcn/ui tokens (HSL CSS variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            "--tw-prose-body": theme("colors.grably-textmid"),
            "--tw-prose-headings": theme("colors.grably-text"),
            "--tw-prose-bold": theme("colors.grably-text"),
            "--tw-prose-links": theme("colors.grably-accent"),
            "--tw-prose-quotes": theme("colors.grably-textmid"),
            "--tw-prose-quote-borders": theme("colors.grably-accent"),
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            },
            a: {
              textDecoration: "none",
              fontWeight: "600",
              "&:hover": {
                color: theme("colors.grably-adk"),
                textDecoration: "underline",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
