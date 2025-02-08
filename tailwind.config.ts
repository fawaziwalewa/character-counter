import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light-theme": "url('/images/bg-light-theme.png')",
        "dark-theme": "url('/images/bg-dark-theme.png')",
      },
      colors: {
        neutral: {
          900: '#12131A',
          800: '#21222C',
          700: '#2A2B37',
          600: '#404254',
          500: '#E4E4EF',
          400: '#F2F2F7',
          0: '#FFFFFF',
        },
        purple: {
          400: '#D3A0FA',
          500: '#C27CF8',
        },
        yellow: {
          500: '#FF9F00',
        },
        orange: {
          500: '#FE8159',
          800: '#DA3701',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
