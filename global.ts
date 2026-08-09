import type messages from "./messages/en.json";
import type { locales } from "./src/i18n/config";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
