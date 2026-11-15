/**
 * A diplomatic code of the kind that carried the Zimmermann telegram. A code
 * replaces whole words with groups of figures listed in a codebook. Breaking
 * one means rebuilding the codebook, a word at a time, from intercepted messages.
 */

/** One line of a codebook. */
export interface Entry {
  /** The plain word, in English capitals. */
  word: string;
  /** The German word the real codebook listed, where the group is a real one. */
  german?: string;
  /** The group of figures sent in place of the word. */
  group: number;
  /** True when we invented the group because the real one is not known to us. */
  madeUp?: boolean;
}

/**
 * A small codebook. Every group with a German word is a real group of the
 * Zimmermann telegram as sent on from Washington to Mexico, with the German
 * reading written beside it on the decode worksheet. The worksheet was made in
 * London by Edward Bell of the American embassy, working with the Admiralty.
 * Source: U.S. National Archives, Record Group 59, National Archives Identifier 302024,
 * "Letter from Ambassador Walter Page to the Secretary of State" (the decode worksheet;
 * docsteach.org/documents/document/zimmermann-telegram-decode-worksheet).
 * All 21 pairs were checked against the scanned pages of that worksheet.
 * The four groups marked `madeUp` are ours, added so that more sentences can be built.
 */
export const CODEBOOK: Entry[] = [
  { word: "MOST SECRET", german: "ganz geheim", group: 17214 },
  { word: "WE", german: "wir", group: 21560 },
  { word: "BEGIN", german: "beginnen", group: 10392 },
  { word: "MAKE", german: "führen", group: 17166 },
  { word: "SUBMARINE", german: "U-Boot", group: 98092 },
  { word: "WAR", german: "Krieg", group: 5905 },
  { word: "PEACE", german: "Frieden", group: 17142 },
  { word: "ALLIANCE", german: "Bündnis", group: 12137 },
  { word: "TOGETHER", german: "gemeinsam", group: 4458 },
  { word: "NEUTRAL", german: "neutral", group: 17504 },
  { word: "FEBRUARY", german: "Februar", group: 13605 },
  { word: "MEXICO", german: "Mexico", group: 67893 },
  { word: "TEXAS", german: "Texas", group: 36477 },
  { word: "JAPAN", german: "Japan", group: 52262 },
  { word: "ENGLAND", german: "England", group: 76036 },
  { word: "PRESIDENT", german: "Präsident", group: 22464 },
  { word: "AND", german: "und", group: 6929 },
  { word: "WITH", german: "mit", group: 20420 },
  { word: "IN", german: "in", group: 14218 },
  // The worksheet writes "Stop" for 18222. The telegram used several other groups for a full stop too.
  { word: "STOP", german: "(full stop)", group: 18222 },
  { word: "ZIMMERMANN", german: "Zimmermann", group: 97556 },
  { word: "ATTACK", group: 8813, madeUp: true },
  { word: "SEND", group: 24068, madeUp: true },
  { word: "MONEY", group: 31795, madeUp: true },
  { word: "SHIPS", group: 40112, madeUp: true },
];

/** What a codebreaker writes for a group nobody has worked out yet. */
export const UNKNOWN = "?";

/** A codebreaker's working codebook: the word believed to lie behind each group. */
export type Readings = Record<number, string>;

/** The codebook line for a word, if it has one. */
export const entryFor = (word: string, book: Entry[] = CODEBOOK) => book.find((entry) => entry.word === word);

/** Encodes a message, word by word. A word that is not in the codebook cannot be sent and is left out. */
export const encode = (words: string[], book: Entry[] = CODEBOOK) =>
  words.flatMap((word) => {
    const entry = entryFor(word, book);
    return entry ? [entry.group] : [];
  });

/** The whole codebook as readings: what the rightful receiver has. */
export const fullReadings = (book: Entry[] = CODEBOOK): Readings =>
  Object.fromEntries(book.map((entry) => [entry.group, entry.word]));

/** Reads groups with whatever readings are to hand. A group with no reading becomes "?". */
export const read = (groups: number[], readings: Readings) => groups.map((group) => readings[group] ?? UNKNOWN);

/** Decodes a message with the complete codebook. */
export const decode = (groups: number[], book: Entry[] = CODEBOOK) => read(groups, fullReadings(book));

/** A pile of intercepted telegrams and the groups already understood from earlier work. */
export interface Intercept {
  /** Each telegram is a list of groups. */
  telegrams: number[][];
  /** Groups whose meaning is already known. */
  known: number[];
  /** Words the codebreaker suspects are in there somewhere, in alphabetical order. Some are wrong. */
  suspects: string[];
}

const groupsOf = (sentence: string) => encode(sentence.split(", "));

/**
 * Four invented telegrams in the codebook above, for the reader to break.
 * The sentences are ours. The last borrows the heart of the real telegram:
 * an alliance with Mexico, and an invitation to Japan.
 */
export const INTERCEPT: Intercept = {
  telegrams: [
    groupsOf("WE, BEGIN, SUBMARINE, WAR, IN, FEBRUARY, STOP"),
    groupsOf("WE, MAKE, WAR, TOGETHER, AND, PEACE, TOGETHER, STOP"),
    groupsOf("MEXICO, ATTACK, TEXAS, STOP"),
    groupsOf("WE, MAKE, ALLIANCE, WITH, MEXICO, AND, JAPAN"),
  ],
  known: groupsOf("WE, BEGIN, WAR, IN, STOP, MAKE, AND, ATTACK, TEXAS, WITH, JAPAN"),
  suspects: ["ALLIANCE", "ENGLAND", "FEBRUARY", "MEXICO", "NEUTRAL", "PEACE", "PRESIDENT", "SUBMARINE", "TOGETHER"],
};

/** The readings a codebreaker starts with: only the known groups. */
export const knownReadings = (intercept: Intercept, book: Entry[] = CODEBOOK): Readings =>
  Object.fromEntries(intercept.known.map((group) => [group, read([group], fullReadings(book))[0]!]));

/** The groups still to be worked out, each once, in the order they first appear. */
export const unknownGroups = (intercept: Intercept) => [
  ...new Set(intercept.telegrams.flat().filter((group) => !intercept.known.includes(group))),
];

/** How many of a codebreaker's guesses agree with the real codebook. */
export const countRight = (guesses: Readings, book: Entry[] = CODEBOOK) =>
  Object.entries(guesses).filter(([group, word]) => fullReadings(book)[Number(group)] === word).length;
