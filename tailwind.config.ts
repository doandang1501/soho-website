import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base palette
        charcoal: {
          DEFAULT: "#0e0e0e",
          50:  "#1a1a1a",
          100: "#141414",
          200: "#111111",
          300: "#0e0e0e",
          400: "#0a0a0a",
          500: "#080808",
        },
        gold: {
          light:   "#e8d5a0",
          DEFAULT: "#c9a84c",
          dark:    "#a07830",
          muted:   "#8a6a28",
        },
        ivory: {
          DEFAULT: "#f5f0e8",
          muted:   "#d4cfc6",
          dim:     "#a09a90",
        },
        // Semantic aliases
        bg:       "#0e0e0e",
        surface:  "#1a1a1a",
        border:   "#2a2a2a",
        text:     "#f5f0e8",
        "text-muted": "#a09a90",
      },
      fontFamily: {
        serif:  ["var(--font-playfair)", "Georgia", "serif"],
        sans:   ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "heading-1": ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.15" }],
        "heading-2": ["clamp(1.25rem, 2vw, 2rem)", { lineHeight: "1.2" }],
      },
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "section": "7rem",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },
      backgroundImage: {
        "gold-gradient":    "linear-gradient(135deg, #e8d5a0 0%, #c9a84c 50%, #a07830 100%)",
        "dark-gradient":    "linear-gradient(180deg, rgba(14,14,14,0) 0%, rgba(14,14,14,0.7) 60%, rgba(14,14,14,1) 100%)",
        "hero-overlay":     "linear-gradient(to bottom, rgba(14,14,14,0.3) 0%, rgba(14,14,14,0.6) 100%)",
        "card-gradient":    "linear-gradient(180deg, transparent 40%, rgba(14,14,14,0.95) 100%)",
      },
      boxShadow: {
        "gold":       "0 0 40px rgba(201, 168, 76, 0.15)",
        "gold-sm":    "0 0 20px rgba(201, 168, 76, 0.1)",
        "luxury":     "0 25px 60px rgba(0,0,0,0.5)",
        "luxury-sm":  "0 8px 30px rgba(0,0,0,0.4)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in":     "fadeIn 0.8s ease forwards",
        "slide-up":    "slideUp 0.8s ease forwards",
        "shimmer":     "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
