import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  fadeIn: {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  fadeOut: {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
  scaleFadeIn: {
    from: { opacity: "0", transform: "scale(0.96)" },
    to: { opacity: "1", transform: "scale(1)" },
  },
  scaleFadeOut: {
    from: { opacity: "1", transform: "scale(1)" },
    to: { opacity: "0", transform: "scale(0.96)" },
  },
  slideInBottom: {
    from: { transform: "translate3d(0, 100%, 0)" },
    to: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
  },
  slideOutBottom: {
    from: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
    to: { transform: "translate3d(0, 100%, 0)" },
  },
  slideInTop: {
    from: { transform: "translate3d(0, -100%, 0)" },
    to: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
  },
  slideOutTop: {
    from: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
    to: { transform: "translate3d(0, -100%, 0)" },
  },
  slideInLeft: {
    from: { transform: "translate3d(-100%, 0, 0)" },
    to: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
  },
  slideOutLeft: {
    from: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
    to: { transform: "translate3d(-100%, 0, 0)" },
  },
  slideInRight: {
    from: { transform: "translate3d(100%, 0, 0)" },
    to: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
  },
  slideOutRight: {
    from: {
      transform:
        "translate3d(var(--drawer-translate-x, 0), var(--drawer-translate-y, 0), 0)",
    },
    to: { transform: "translate3d(100%, 0, 0)" },
  },
});
