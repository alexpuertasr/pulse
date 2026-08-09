import { defineSemanticTokens } from "@pandacss/dev";

export const coral = defineSemanticTokens.colors({
  "1": { value: { _light: "#fff8f7", _dark: "#1c1412" } },
  "2": { value: { _light: "#ffefef", _dark: "#391a18" } },
  "3": { value: { _light: "#ffe5e4", _dark: "#55221e" } },
  "4": { value: { _light: "#ffdbda", _dark: "#722b25" } },
  "5": { value: { _light: "#ffd2d1", _dark: "#8e342b" } },
  "6": { value: { _light: "#ffc9c8", _dark: "#aa3d32" } },
  "7": { value: { _light: "#ffbeb8", _dark: "#c6493a" } },
  "8": { value: { _light: "#ffb2a8", _dark: "#e2503f" } },
  "9": { value: { _light: "#EB5E41", _dark: "#EB5E41" } },
  "10": { value: { _light: "#de5045", _dark: "#ef6b4e" } },
  "11": { value: { _light: "#c9453b", _dark: "#f47a5c" } },
  "12": { value: { _light: "#762d25", _dark: "#faa19b" } },
  solid: {
    bg: {
      DEFAULT: { value: "{colors.coral.9}" },
      hover: { value: "{colors.coral.10}" },
    },
    fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
  },
  subtle: {
    bg: {
      DEFAULT: { value: "{colors.coral.3}" },
      hover: { value: "{colors.coral.4}" },
      active: { value: "{colors.coral.5}" },
    },
    fg: { DEFAULT: { value: "{colors.coral.11}" } },
  },
  surface: {
    bg: {
      DEFAULT: { value: "{colors.coral.2}" },
      active: { value: "{colors.coral.3}" },
    },
    border: {
      DEFAULT: { value: "{colors.coral.6}" },
      hover: { value: "{colors.coral.7}" },
    },
    fg: { DEFAULT: { value: "{colors.coral.11}" } },
  },
  outline: {
    bg: {
      hover: { value: "{colors.coral.2}" },
      active: { value: "{colors.coral.3}" },
    },
    border: { DEFAULT: { value: "{colors.coral.7}" } },
    fg: { DEFAULT: { value: "{colors.coral.11}" } },
  },
  plain: {
    bg: {
      hover: { value: "{colors.coral.3}" },
      active: { value: "{colors.coral.4}" },
    },
    fg: { DEFAULT: { value: "{colors.coral.11}" } },
  },
});
