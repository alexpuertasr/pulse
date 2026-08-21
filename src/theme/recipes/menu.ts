import { menuAnatomy } from "@ark-ui/react/menu";
import { defineSlotRecipe } from "@pandacss/dev";

export const menu = defineSlotRecipe({
  className: "menu",
  slots: menuAnatomy.keys(),
  base: {
    positioner: {
      zIndex: "50",
    },
    content: {
      bg: "bg.default",
      borderColor: "border.subtle",
      borderRadius: "lg",
      borderWidth: "1px",
      boxShadow: "lg",
      display: "flex",
      flexDirection: "column",
      minW: "var(--reference-width)",
      outline: "0",
      p: "1",
      _hidden: { display: "none" },
    },
    item: {
      alignItems: "center",
      borderRadius: "md",
      color: "fg.default",
      cursor: "pointer",
      display: "flex",
      gap: "2",
      px: "2.5",
      py: "2",
      textStyle: "sm",
      transitionDuration: "normal",
      transitionProperty: "background-color, color",
      _highlighted: { bg: "bg.subtle" },
      "& svg": { boxSize: "4", color: "fg.muted" },
    },
    separator: {
      borderColor: "border.subtle",
      my: "1",
    },
  },
});
