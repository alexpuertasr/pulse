import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "button",
  jsx: ["Button", "IconButton"],
  base: {
    alignItems: "center",
    appearance: "none",
    borderRadius: "md",
    cursor: "pointer",
    display: "inline-flex",
    fontWeight: "semibold",
    justifyContent: "center",
    outline: "0",
    transitionDuration: "normal",
    transitionProperty: "background-color, border-color, color, box-shadow",
    userSelect: "none",
    whiteSpace: "nowrap",
    _disabled: { cursor: "not-allowed", opacity: "0.5" },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "colorPalette.solid.bg",
      outlineOffset: "2px",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "colorPalette.solid.bg",
        color: "colorPalette.solid.fg",
        _hover: { bg: "colorPalette.solid.bg.hover" },
      },
      outline: {
        borderColor: "colorPalette.outline.border",
        borderWidth: "1px",
        color: "colorPalette.outline.fg",
        colorPalette: "gray",
        _hover: { bg: "colorPalette.outline.bg.hover" },
        _active: { bg: "colorPalette.outline.bg.active" },
      },
      subtle: {
        bg: "colorPalette.subtle.bg",
        color: "colorPalette.subtle.fg",
        colorPalette: "gray",
        _hover: { bg: "colorPalette.subtle.bg.hover" },
        _active: { bg: "colorPalette.subtle.bg.active" },
      },
      ghost: {
        color: "colorPalette.plain.fg",
        colorPalette: "gray",
        _hover: { bg: "colorPalette.plain.bg.hover" },
        _active: { bg: "colorPalette.plain.bg.active" },
      },
    },
    size: {
      sm: {
        gap: "2",
        h: "9",
        minW: "9",
        px: "3",
        textStyle: "sm",
        "& svg": { boxSize: "4" },
      },
      md: {
        gap: "2",
        h: "10",
        minW: "10",
        px: "4",
        textStyle: "sm",
        "& svg": { boxSize: "5" },
      },
      lg: {
        gap: "2.5",
        h: "11",
        minW: "11",
        px: "4.5",
        textStyle: "md",
        "& svg": { boxSize: "5" },
      },
    },
  },
  defaultVariants: { variant: "solid", size: "md" },
});
