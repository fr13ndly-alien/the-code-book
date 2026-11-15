import { describe as describeInEnglish, type Drawing, type Side } from "@codebook/cipher-engine/pigpen";
import type { Locale } from "~/i18n";

/** The sides of a cell in Vietnamese. */
const SIDE: Record<Side, string> = { top: "phía trên", right: "bên phải", bottom: "phía dưới", left: "bên trái" };

/** Joins words the Vietnamese way: "a, b và c". */
const joined = (words: string[]) =>
  words.length < 2 ? words.join("") : `${words.slice(0, -1).join(", ")} và ${words[words.length - 1]}`;

/** A symbol in words, in the page's language, for readers who cannot see it. */
export function describe(glyph: Drawing, locale: Locale): string {
  if (locale === "en") return describeInEnglish(glyph);
  const dot = glyph.dot ? ", có một dấu chấm" : "";
  if (glyph.shape === "angle") return `hình chữ V mở về ${SIDE[glyph.opens!]}${dot}`;
  if (glyph.walls.length === 4) return `một ô vuông kín${dot}`;
  return `các nét ở ${joined(glyph.walls.map((side) => SIDE[side]))}${dot}`;
}
