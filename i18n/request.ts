import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Read locale from cookie, default to 'en'
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

  // Validate locale is supported
  const supportedLocales = ["en", "fr"];
  const resolvedLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
