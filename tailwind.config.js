import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border, 220, 14%, 75%))",
        input: "hsl(var(--input, 220, 14%, 95%))",
        ring: "hsl(var(--ring, 220, 14%, 65%))",
        background: "hsl(var(--background, 220, 14%, 8%))",
        foreground: "hsl(var(--foreground, 220, 14%, 92%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 220, 14%, 58%))",
          foreground: "hsl(var(--primary-foreground, 220, 14%, 95%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 220, 14%, 18%))",
          foreground: "hsl(var(--secondary-foreground, 220, 14%, 85%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 72%, 51%))",
          foreground: "hsl(var(--destructive-foreground, 0, 0%, 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 220, 14%, 12%))",
          foreground: "hsl(var(--muted-foreground, 220, 14%, 85%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 220, 14%, 16%))",
          foreground: "hsl(var(--accent-foreground, 220, 14%, 85%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 220, 14%, 10%))",
          foreground: "hsl(var(--popover-foreground, 220, 14%, 90%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 220, 14%, 9%))",
          foreground: "hsl(var(--card-foreground, 220, 14%, 88%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 8px)",
        md: "calc(var(--radius, 8px) - 2px)",
        sm: "calc(var(--radius, 8px) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "0.4" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "blur-in": {
          "0%": { filter: "blur(8px)", opacity: "0" },
          "100%": { filter: "blur(0px)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-out": "fade-out 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "ripple": "ripple 1s cubic-bezier(0, 0.2, 0.8, 1) forwards",
        "blur-in": "blur-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    tailwindAnimate, // ✅ Uses proper ESM import
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".perspective": { perspective: "1000px" },
        ".preserve-3d": { "transform-style": "preserve-3d" },
        ".backface-hidden": { "backface-visibility": "hidden" },
        ".rotate-y-180": { transform: "rotateY(180deg)" },
        ".glass": {
          background: "rgba(255, 255, 255, 0.08)",
          "backdrop-filter": "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-dark": {
          background: "rgba(0, 0, 0, 0.08)",
          "backdrop-filter": "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        },
        ".text-balance": { "text-wrap": "balance" },
      });
    }),
  ],
};
