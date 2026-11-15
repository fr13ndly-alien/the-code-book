import type { Bilingual, Locale } from "~/i18n";

/** How many letters of the message the strip shows at a time: as many as fit across a phone. */
export const PAGE = 10;

/** The names of the four switches, sixes first. */
export const SWITCH_NAMES = ["Sixes", "I", "II", "III"];

/** The name of a switch in the reader's language: "Sixes" / "Nhóm sáu", then I, II, III. */
export const switchName = (index: number, locale: Locale) =>
  index === 0 && locale === "vi" ? "Nhóm sáu" : SWITCH_NAMES[index]!;

const SPEEDS: Bilingual<string[]> = { en: ["fast", "medium", "slow"], vi: ["nhanh", "vừa", "chậm"] };

/** The speed of a twenties switch (1 to 3) under a motion such as "231". */
export const speedOf = (index: number, motion: string, locale: Locale = "en") =>
  SPEEDS[locale][motion.indexOf(String(index))]!;

/** The two groups of the plugboard, as words inside a sentence. */
export const GROUP_WORDS: Record<"sixes" | "twenties", Bilingual> = {
  sixes: { en: "sixes", vi: "nhóm sáu" },
  twenties: { en: "twenties", vi: "nhóm hai mươi" },
};

/** The longest output the controls show before folding the rest away. */
export const SHORT_OUTPUT = 60;
