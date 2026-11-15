import type { TextId } from "@codebook/cipher-engine/bible-code";
import { TEXTS } from "@codebook/cipher-engine/bible-code";
import type { Locale } from "~/i18n";

/** The engine's passage titles in Vietnamese. The passages themselves are cipher data and stay English. */
const VI_TITLES: Record<TextId, string> = {
  moby: "Moby-Dick",
  dull: "Một tấm biển ở bãi đỗ xe",
};

/** A passage's title in the page's language. */
export const textTitle = (id: TextId, locale: Locale) => (locale === "vi" ? VI_TITLES[id] : TEXTS[id].title);

/** A whole number written the way the page's language writes it: 259,602 or 259.602. */
export const withSeparators = (count: number, locale: Locale) => count.toLocaleString(locale === "vi" ? "vi-VN" : "en-GB");
