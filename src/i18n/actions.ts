"use server";

import { cookies } from "next/headers";
import { hasLocale } from "next-intl";

import { LOCALE_COOKIE_NAME, type Locale, locales } from "./config";

export async function setUserLocale(locale: Locale) {
  if (!hasLocale(locales, locale)) {
    return;
  }

  (await cookies()).set(LOCALE_COOKIE_NAME, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}
