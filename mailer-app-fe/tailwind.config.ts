import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00b09e",

          secondary: "#00d400",

          accent: "#f7ab00",

          neutral: "#060f21",

          "base-100": "#fcfcfc",

          info: "#00dbff",

          success: "#659900",

          warning: "#ff5800",

          error: "#ff598f",
        },
      },
    ],
  },
  plugins: [daisyui],
};
export default config;
