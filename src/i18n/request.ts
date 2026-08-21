import { cookies, headers } from "next/headers";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import {
  defaultLocale,
  LOCALE_COOKIE_NAME,
  type Locale,
  locales,
} from "./config";

async function resolveLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && hasLocale(locales, cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  for (const part of acceptLanguage.split(",")) {
    const base = part.split(";")[0]?.trim().toLowerCase().split("-")[0];
    if (base && hasLocale(locales, base)) {
      return base;
    }
  }

  return defaultLocale;
}

// Messages ship per base language (en/es), but formatting (dates, numbers)
// should honor the user's regional conventions, e.g. en-AU → DD/MM/YYYY.
// Returns the first Accept-Language tag matching the resolved language,
// falling back to the base language itself.
async function resolveFormattingLocale(locale: Locale): Promise<string> {
  const acceptLanguage = (await headers()).get("accept-language") ?? "";

  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0]?.trim();
    if (!tag) {
      continue;
    }

    try {
      const parsed = new Intl.Locale(tag);
      if (parsed.language === locale) {
        return parsed.toString();
      }
    } catch {
      // Malformed tag in the header, skip it.
    }
  }

  return locale;
}

export default getRequestConfig(async () => {
  const locale = await resolveLocale();

  return {
    locale: await resolveFormattingLocale(locale),
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
