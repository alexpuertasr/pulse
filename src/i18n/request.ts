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

export default getRequestConfig(async () => {
  const locale = await resolveLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
