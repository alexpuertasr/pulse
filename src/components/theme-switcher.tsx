"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { IconButton } from "@/components/ui/icon-button";
import { css } from "@/styled-system/css";

export function ThemeSwitcher({ className }: { className?: string }) {
  const t = useTranslations("theme-switcher");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton
      size="sm"
      variant="ghost"
      aria-label={t("label")}
      className={className}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon
        className={css({
          _dark: { display: "none" },
        })}
      />
      <MoonIcon
        className={css({
          display: "none",
          _dark: { display: "block" },
        })}
      />
    </IconButton>
  );
}
