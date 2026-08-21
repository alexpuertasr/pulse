"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Select } from "@/components/ui/select";
import { setUserLocale } from "@/i18n/actions";
import { type Locale, locales } from "@/i18n/config";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale-switcher");
  const [isPending, startTransition] = useTransition();
  // useLocale() may return a regional tag like "en-AU"; the switcher
  // operates on the base language.
  const locale = new Intl.Locale(useLocale()).language;

  const items = locales.map((l) => ({ label: t(l), value: l }));

  return (
    <Select
      items={items}
      value={[locale]}
      disabled={isPending}
      aria-label={t("label")}
      className={className}
      onValueChange={({ value }) => {
        const next = value[0] as Locale | undefined;
        if (next && next !== locale) {
          startTransition(() => setUserLocale(next));
        }
      }}
    />
  );
}
