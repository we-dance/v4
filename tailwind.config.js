const animate = require("tailwindcss-animate");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,vue}",
    "./components/**/*.{ts,tsx,vue}",
    "./app/**/*.{ts,tsx,vue}",
    "./src/**/*.{ts,tsx,vue}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      heading: ["Noto Sans", "sans-serif"],
      sans: ["Noto Sans", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
          },
          "33%": {
            transform: "translate(100px, -100px) scale(1.3) rotate(20deg)",
          },
          "66%": {
            transform: "translate(-50px, 50px) scale(0.7) rotate(-20deg)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 15s infinite cubic-bezier(0.4, 0, 0.2, 1)",
      },
      utilities: {
        ".animation-delay-2000": {
          "animation-delay": "2s",
        },
        ".animation-delay-4000": {
          "animation-delay": "4s",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "rgb(107 70 193 / 0.8)", // purple-700 with opacity
            h2: {
              color: "rgb(88 28 135)", // purple-900
              fontWeight: "600",
              fontSize: "1.25em",
              marginTop: "1.5em",
              marginBottom: "0.75em",
            },
            h3: {
              color: "rgb(88 28 135)", // purple-900
              fontWeight: "500",
              fontSize: "1.1em",
              marginTop: "1.25em",
              marginBottom: "0.5em",
            },
            p: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
            ul: {
              marginTop: "0.125em",
              marginBottom: "0.125em",
            },
            li: {
              marginTop: "0.05em",
              marginBottom: "0.05em",
              lineHeight: "1.2",
            },
            "ul > li::before": {
              backgroundColor: "rgb(147 51 234)", // purple-600
              width: "0.25em",
              height: "0.25em",
              marginTop: "0.5em",
              marginLeft: "-0.75em",
            },
            strong: {
              color: "rgb(88 28 135)", // purple-900
              fontWeight: "600",
            },
            a: {
              color: "rgb(147 51 234)", // purple-600
              textDecoration: "none",
              "&:hover": {
                color: "rgb(126 34 206)", // purple-700
                textDecoration: "underline",
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography, animate],
};
