import { selectAnatomy } from "@ark-ui/react/select";
import { defineSlotRecipe } from "@pandacss/dev";

export const select = defineSlotRecipe({
  className: "select",
  slots: selectAnatomy.keys(),
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5",
      w: "full",
    },
    label: {
      color: "fg.default",
      fontWeight: "medium",
      textStyle: "sm",
    },
    control: {
      position: "relative",
    },
    trigger: {
      alignItems: "center",
      appearance: "none",
      bg: "bg.default",
      borderColor: "border.default",
      borderRadius: "lg",
      borderWidth: "1px",
      color: "fg.default",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      outline: "0",
      transitionDuration: "normal",
      transitionProperty: "background-color, border-color, color, box-shadow",
      w: "full",
      _disabled: { cursor: "not-allowed", opacity: "0.5" },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "colorPalette.solid.bg",
        outlineOffset: "1px",
      },
      "&[data-placeholder-shown]": {
        color: "fg.subtle",
      },
    },
    valueText: {
      overflow: "hidden",
      textAlign: "start",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    indicator: {
      color: "fg.muted",
      display: "flex",
      flexShrink: "0",
    },
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
      maxH: "80",
      minW: "var(--reference-width)",
      outline: "0",
      overflowY: "auto",
      p: "1",
      _hidden: { display: "none" },
    },
    item: {
      alignItems: "center",
      borderRadius: "md",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      transitionDuration: "fast",
      transitionProperty: "background-color, color",
      _highlighted: { bg: "bg.muted" },
      _disabled: {
        color: "fg.disabled",
        cursor: "not-allowed",
        _highlighted: { bg: "transparent" },
      },
    },
    itemText: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    itemIndicator: {
      color: "colorPalette.solid.bg",
      display: "flex",
      flexShrink: "0",
    },
  },
  variants: {
    size: {
      sm: {
        trigger: { gap: "2", h: "9", px: "3", textStyle: "sm" },
        item: { gap: "2", px: "2", py: "1.5", textStyle: "sm" },
      },
      md: {
        trigger: { gap: "2", h: "10", px: "3", textStyle: "sm" },
        item: { gap: "2", px: "2", py: "1.5", textStyle: "sm" },
      },
      lg: {
        trigger: { gap: "2.5", h: "11", px: "3.5", textStyle: "md" },
        item: { gap: "2.5", px: "2.5", py: "2", textStyle: "md" },
      },
    },
  },
  defaultVariants: { size: "md" },
});
