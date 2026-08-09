import { defineSemanticTokens } from "@pandacss/dev";

export const semanticColors = defineSemanticTokens.colors({
  bg: {
    canvas: { value: "{colors.gray.1}" },
    default: { value: { _light: "{colors.white}", _dark: "{colors.gray.2}" } },
    subtle: { value: { _light: "{colors.gray.2}", _dark: "{colors.gray.3}" } },
    muted: { value: { _light: "{colors.gray.3}", _dark: "{colors.gray.4}" } },
    emphasized: {
      value: { _light: "{colors.gray.4}", _dark: "{colors.gray.5}" },
    },
    disabled: {
      value: { _light: "{colors.gray.5}", _dark: "{colors.gray.6}" },
    },
  },
  fg: {
    default: { value: "{colors.gray.12}" },
    muted: { value: "{colors.gray.11}" },
    subtle: { value: "{colors.gray.10}" },
    disabled: { value: "{colors.gray.9}" },
  },
  border: {
    default: { value: "{colors.gray.7}" },
    muted: { value: "{colors.gray.6}" },
    subtle: { value: "{colors.gray.4}" },
    disabled: { value: "{colors.gray.5}" },
    outline: { value: "{colors.gray.a9}" },
  },
});
