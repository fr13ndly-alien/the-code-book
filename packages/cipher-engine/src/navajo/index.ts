/**
 * The Navajo code of the US Marine Corps, 1942 to 1945. Military terms had a
 * Navajo code word with an everyday meaning ("iron fish" for a submarine).
 * Every other word was spelled out: each English letter became the Navajo
 * word for an English word that starts with that letter.
 *
 * The Navajo spellings are the rough English-letter spellings of the wartime
 * lists, not modern Navajo writing.
 */

/** One spoken word of the code, with the chain that explains it. */
export interface CodeWord {
  /** What the code talker said. */
  navajo: string;
  /** What that Navajo word means in everyday English, e.g. "ant". */
  meaning: string;
  /** What it stands for in the message: a letter ("A") or a term ("SUBMARINE"). */
  stands: string;
  kind: "letter" | "term";
}

/**
 * The spelling alphabet: letter, English word, Navajo word.
 * Source: The Code Book, Table 8, "The Navajo alphabet code".
 */
const ALPHABET_TABLE: [string, string, string][] = [
  ["A", "ant", "Wol-la-chee"],
  ["B", "bear", "Shush"],
  ["C", "cat", "Moasi"],
  ["D", "deer", "Be"],
  ["E", "elk", "Dzeh"],
  ["F", "fox", "Ma-e"],
  ["G", "goat", "Klizzie"],
  ["H", "horse", "Lin"],
  ["I", "ice", "Tkin"],
  ["J", "jackass", "Tkele-cho-gi"],
  ["K", "kid", "Klizzie-yazzi"],
  ["L", "lamb", "Dibeh-yazzi"],
  ["M", "mouse", "Na-as-tso-si"],
  ["N", "nut", "Nesh-chee"],
  ["O", "owl", "Ne-as-jah"],
  ["P", "pig", "Bi-sodih"],
  ["Q", "quiver", "Ca-yeilth"],
  ["R", "rabbit", "Gah"],
  ["S", "sheep", "Dibeh"],
  ["T", "turkey", "Than-zie"],
  ["U", "Ute", "No-da-ih"],
  ["V", "victor", "A-keh-di-glini"],
  ["W", "weasel", "Gloe-ih"],
  ["X", "cross", "Al-an-as-dzoh"],
  ["Y", "yucca", "Tsah-as-zih"],
  ["Z", "zinc", "Besh-do-gliz"],
];

/** The 26 code words of the spelling alphabet, A first. */
export const LETTER_WORDS: CodeWord[] = ALPHABET_TABLE.map(([stands, meaning, navajo]) => ({
  navajo,
  meaning,
  stands,
  kind: "letter",
}));

/**
 * A small part of the lexicon of military terms: term, everyday meaning, Navajo word.
 * Submarine and amphibious are printed in The Code Book, chapter 4. All entries
 * follow the US Navy's "Navajo Code Talkers' Dictionary" (revised 15 June 1945,
 * published by the Naval History and Heritage Command), which gives
 * Da-he-tih-hi, the fighter plane, as "humming bird".
 */
const LEXICON_TABLE: [string, string, string][] = [
  ["FIGHTER PLANE", "hummingbird", "Da-he-tih-hi"],
  ["BOMBER", "buzzard", "Jay-sho"],
  ["DIVE BOMBER", "chicken hawk", "Gini"],
  ["TORPEDO PLANE", "swallow", "Tas-chizzie"],
  ["BATTLESHIP", "whale", "Lo-tso"],
  ["CRUISER", "small whale", "Lo-tso-yazzie"],
  ["DESTROYER", "shark", "Ca-lo"],
  ["SUBMARINE", "iron fish", "Besh-lo"],
  ["AMPHIBIOUS", "frog", "Chal"],
  ["TANK", "tortoise", "Chay-da-gahi"],
  ["GRENADE", "potato", "Ni-ma-si"],
  ["BOMB", "eggs", "A-ye-shi"],
  ["FORTIFICATION", "cliff dwelling", "Ah-na-sozi"],
  ["AMERICA", "our mother", "Ne-he-mah"],
];

/** The code words for military terms that this page knows. */
export const TERM_WORDS: CodeWord[] = LEXICON_TABLE.map(([stands, meaning, navajo]) => ({
  navajo,
  meaning,
  stands,
  kind: "term",
}));

/** The term that these English words name, if any. A final S is allowed: "TANKS". */
function findTerm(words: string[]): CodeWord | undefined {
  const phrase = words.join(" ");
  return TERM_WORDS.find((term) => term.stands === phrase || `${term.stands}S` === phrase);
}

/** The code words that spell one English word letter by letter. */
export const spell = (word: string): CodeWord[] =>
  [...word.toUpperCase()].flatMap((letter) => LETTER_WORDS.find((entry) => entry.stands === letter) ?? []);

/**
 * Turns an English message into code. Each group is one English word or term:
 * a known term gives a single code word, anything else is spelled out.
 * Digits and punctuation are dropped, as the page has no code words for them.
 */
export function encode(message: string): CodeWord[][] {
  const words = message.toUpperCase().match(/[A-Z]+/g) ?? [];
  const groups: CodeWord[][] = [];
  for (let at = 0; at < words.length; ) {
    // The longest term is two words long ("FIGHTER PLANE"), so look for a pair first.
    const pair = at + 1 < words.length ? findTerm(words.slice(at, at + 2)) : undefined;
    const term = pair ?? findTerm([words[at]!]);
    groups.push(term ? [term] : spell(words[at]!));
    at += pair ? 2 : 1;
  }
  return groups;
}

/** The code word a listener hears, found by its Navajo spelling. Capitals do not matter. */
export const lookUp = (navajo: string): CodeWord | undefined =>
  [...TERM_WORDS, ...LETTER_WORDS].find((word) => word.navajo.toLowerCase() === navajo.trim().toLowerCase());

/** The English for one group of code words: letters join into a word, a term stands alone. */
export const readGroup = (group: CodeWord[]) => group.map((word) => word.stands).join("");

/** Turns groups of code words back into English. */
export const decode = (groups: CodeWord[][]) => groups.map(readGroup).join(" ");

/** Decodes a heard message written as Navajo words, with "/" between English words. */
export function decodeHeard(heard: string): string {
  const groups = heard.split("/").map((group) => group.trim().split(/\s+/).flatMap((word) => lookUp(word) ?? []));
  return decode(groups.filter((group) => group.length > 0));
}

/** The Navajo words of a message as text, with "/" between English words. */
export const speak = (groups: CodeWord[][]) =>
  groups.map((group) => group.map((word) => word.navajo).join(" ")).join(" / ");
