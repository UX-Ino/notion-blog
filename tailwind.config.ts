import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  safelist: ["lg:grid-cols-[320px_1fr]"],
  plugins: [],
} satisfies Config;
