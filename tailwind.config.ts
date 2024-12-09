const { nextui } = require("@nextui-org/react");

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  prefix: "",
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      defaultTheme: "light",
    }),
  ],
} satisfies Config;

export default config;
