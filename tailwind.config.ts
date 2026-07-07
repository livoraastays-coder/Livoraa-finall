import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F3ED",
        surface: "#FCFBF8",
        ink: "#24241F",
        muted: "#777269",
        olive: "#747866",
        walnut: "#745B48",
        border: "#DDD8CF",
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
