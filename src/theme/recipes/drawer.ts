import { drawerAnatomy } from "@ark-ui/react/drawer";
import { defineSlotRecipe } from "@pandacss/dev";

export const drawer = defineSlotRecipe({
  className: "drawer",
  slots: drawerAnatomy.keys(),
  base: {
    backdrop: {
      bg: "black/50",
      inset: "0",
      position: "fixed",
      zIndex: "40",
      _open: { animation: "fadeIn 0.5s cubic-bezier(0.32, 0.72, 0, 1)" },
      _closed: { animation: "fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)" },
      _hidden: { display: "none" },
    },
    positioner: {
      alignItems: "flex-end",
      display: "flex",
      inset: "0",
      justifyContent: "center",
      position: "fixed",
      zIndex: "50",
      "&[data-swipe-direction='up']": {
        alignItems: "flex-start",
      },
      "&[data-swipe-direction='left']": {
        alignItems: "stretch",
        justifyContent: "flex-start",
      },
      "&[data-swipe-direction='right']": {
        alignItems: "stretch",
        justifyContent: "flex-end",
      },
    },
    content: {
      "--bleed": "3rem",
      animationDuration: "0.5s",
      animationTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
      bg: "bg.default",
      borderTopRadius: "2xl",
      boxShadow: "xl",
      display: "flex",
      flexDirection: "column",
      h: "full",
      maxH: "96svh",
      outline: "0",
      position: "relative",
      px: "5",
      transition: "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
      w: "full",
      _hidden: { display: "none" },
      _after: {
        bg: "inherit",
        content: '""',
        h: "var(--bleed)",
        insetInline: "0",
        pointerEvents: "none",
        position: "absolute",
        top: "100%",
      },
      _open: { animationName: "slideInBottom" },
      _closed: {
        animation: "slideOutBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      // Vertical drawers span the full width; the size variant only
      // constrains horizontal (left/right) drawers.
      "&[data-swipe-direction='down']": {
        maxW: "full",
      },
      "&[data-swipe-direction='up']": {
        borderRadius: "0 0 {radii.2xl} {radii.2xl}",
        maxW: "full",
        _after: {
          bottom: "100%",
          top: "auto",
        },
        _open: { animationName: "slideInTop" },
        _closed: { animation: "slideOutTop 0.3s cubic-bezier(0.4, 0, 0.2, 1)" },
      },
      "&[data-swipe-direction='left']": {
        borderRadius: "0 {radii.2xl} {radii.2xl} 0",
        maxH: "none",
        _after: {
          h: "auto",
          insetBlock: "0",
          insetInline: "auto",
          right: "100%",
          top: "0",
          w: "var(--bleed)",
        },
        _open: { animationName: "slideInLeft" },
        _closed: {
          animation: "slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
      "&[data-swipe-direction='right']": {
        borderRadius: "{radii.2xl} 0 0 {radii.2xl}",
        maxH: "none",
        _after: {
          h: "auto",
          insetBlock: "0",
          insetInline: "auto",
          left: "100%",
          top: "0",
          w: "var(--bleed)",
        },
        _open: { animationName: "slideInRight" },
        _closed: {
          animation: "slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    grabber: {
      alignItems: "center",
      cursor: "grab",
      display: "flex",
      flexShrink: "0",
      justifyContent: "center",
      py: "5",
      touchAction: "none",
      userSelect: "none",
      w: "full",
      _active: { cursor: "grabbing" },
    },
    grabberIndicator: {
      bg: "bg.muted",
      borderRadius: "full",
      h: "1",
      w: "10",
    },
    title: {
      color: "fg.default",
      fontWeight: "medium",
      mb: "2",
      textStyle: "lg",
    },
    description: {
      color: "fg.muted",
      mt: "1",
      textStyle: "sm",
    },
  },
  variants: {
    size: {
      xs: { content: { maxW: "xs" } },
      sm: { content: { maxW: "md" } },
      md: { content: { maxW: "lg" } },
      lg: { content: { maxW: "2xl" } },
      xl: { content: { maxW: "4xl" } },
      full: { content: { h: "100dvh", maxW: "100vw" } },
    },
  },
  defaultVariants: {
    size: "xs",
  },
});
