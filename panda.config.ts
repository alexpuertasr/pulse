import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  outdir: "src/styled-system",
  importMap: "@/styled-system",
  include: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  theme: {
    extend: {},
  },
});
