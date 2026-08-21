import { defineConfig } from "@pandacss/dev";

import { coral } from "./src/theme/colors/coral";
import { gray } from "./src/theme/colors/gray";
import { button } from "./src/theme/recipes/button";
import { datePicker } from "./src/theme/recipes/date-picker";
import { menu } from "./src/theme/recipes/menu";
import { numberInput } from "./src/theme/recipes/number-input";
import { select } from "./src/theme/recipes/select";
import { semanticColors } from "./src/theme/semantic-tokens";
import { fonts } from "./src/theme/tokens/fonts";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  outdir: "src/styled-system",
  importMap: "@/styled-system",
  include: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  conditions: {
    extend: {
      light: ":root &, .light &",
      dark: ".dark &",
    },
  },
  globalCss: {
    extend: {
      html: {
        colorPalette: "coral",
      },
      body: {
        background: "bg.canvas",
        color: "fg.default",
        fontFamily: "sans",
      },
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts,
      },
      semanticTokens: {
        colors: {
          ...semanticColors,
          coral,
          gray,
        },
      },
      recipes: {
        button,
      },
      slotRecipes: {
        datePicker,
        menu,
        numberInput,
        select,
      },
    },
  },
});
