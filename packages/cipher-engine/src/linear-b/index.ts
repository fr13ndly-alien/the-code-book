/**
 * Reading Linear B the way Alice Kober and Michael Ventris did: sort the signs
 * into a grid of unknown consonants and unknown vowels, guess that a few words
 * are Cretan place names, and let each guessed sound spread along its row and
 * column of the grid.
 *
 * Nothing here is enciphered. The "key" is the sound of each sign, lost for
 * three thousand years. Unlike the hieroglyphs there was no translation to help.
 */

/** The five vowels of the script, in the order of the grid's columns. */
export const VOWELS = ["a", "e", "i", "o", "u"] as const;

/** One of the five vowels. */
export type Vowel = (typeof VOWELS)[number];

/**
 * The consonants of the signs used here, in the order of the grid's rows.
 * "" is the row of pure vowels. The r row also stands for l: the script has one series for both.
 */
export const CONSONANTS = ["", "d", "j", "k", "m", "n", "p", "r", "s", "t"] as const;

/** One of the consonants, or "" for none. */
export type Consonant = (typeof CONSONANTS)[number];

/** A sign of the syllabary that the page can draw. */
export interface Sign {
  /** Its number in Emmett Bennett's sign list, the standard catalogue. */
  number: number;
  consonant: Consonant;
  vowel: Vowel;
}

/**
 * The fourteen signs of this page, keyed by their sound. Numbers and values are
 * the standard ones of Ventris and Chadwick, as fixed in the Unicode character
 * names ("LINEAR B SYLLABLE B070 KO" and so on, Unicode block U+10000).
 */
export const SIGNS = {
  a: { number: 8, consonant: "", vowel: "a" },
  de: { number: 45, consonant: "d", vowel: "e" },
  ja: { number: 57, consonant: "j", vowel: "a" },
  jo: { number: 36, consonant: "j", vowel: "o" },
  ko: { number: 70, consonant: "k", vowel: "o" },
  mi: { number: 73, consonant: "m", vowel: "i" },
  ni: { number: 30, consonant: "n", vowel: "i" },
  no: { number: 52, consonant: "n", vowel: "o" },
  po: { number: 11, consonant: "p", vowel: "o" },
  ri: { number: 53, consonant: "r", vowel: "i" },
  si: { number: 41, consonant: "s", vowel: "i" },
  so: { number: 12, consonant: "s", vowel: "o" },
  ti: { number: 37, consonant: "t", vowel: "i" },
  tu: { number: 69, consonant: "t", vowel: "u" },
} satisfies Record<string, Sign>;

/** The sound of a sign, used as its key everywhere. */
export type SignId = keyof typeof SIGNS;

/** Every sign, in the order of the table above. */
export const SIGN_IDS = Object.keys(SIGNS) as SignId[];

/** The grid row of a sign: which consonant it has, counted from 0. */
export const rowOf = (sign: SignId): number => CONSONANTS.indexOf(SIGNS[sign].consonant);

/** The grid column of a sign: which vowel it has, counted from 0. */
export const columnOf = (sign: SignId): number => VOWELS.indexOf(SIGNS[sign].vowel);

/** The sign that sits in a cell of the grid, if this page has one there. */
export const signAt = (row: number, column: number): SignId | undefined =>
  SIGN_IDS.find((sign) => rowOf(sign) === row && columnOf(sign) === column);

/** A word from the tablets: a list of signs. */
export interface Word {
  signs: SignId[];
  /** What scholars now take the word to mean. */
  meaning: string;
}

/**
 * The words of the story. Spellings as given by the Mycenaean Epigraphy Group,
 * University of Cambridge ("The Decipherment Process"), and by Chadwick,
 * "The Decipherment of Linear B". The scribes wrote no final s and split
 * double consonants, so Knossos is ko-no-so and Amnisos a-mi-ni-so.
 */
export const WORDS = {
  knossosMen: { signs: ["ko", "no", "si", "jo"], meaning: "of Knossos, said of men" },
  knossosWomen: { signs: ["ko", "no", "si", "ja"], meaning: "of Knossos, said of women" },
  knossos: { signs: ["ko", "no", "so"], meaning: "Knossos, the palace" },
  amnisos: { signs: ["a", "mi", "ni", "so"], meaning: "Amnisos, the harbour of Knossos" },
  tulissos: { signs: ["tu", "ri", "so"], meaning: "Tulissos, another town on Crete" },
  tripods: { signs: ["ti", "ri", "po", "de"], meaning: "two tripods (Greek tripode)" },
} satisfies Record<string, Word>;

/** The short name of a word. */
export type WordId = keyof typeof WORDS;

/** One of "Kober's triplets": a word in three forms that differ only at the end. */
export const TRIPLET: WordId[] = ["knossosMen", "knossosWomen", "knossos"];

/** The three words that Ventris took for Cretan place names. */
export const PLACES: WordId[] = ["amnisos", "knossos", "tulissos"];

/** How many signs at the start are the same in every word. */
export function sharedStem(words: Word[]): number {
  const first = words[0]?.signs ?? [];
  const differs = first.findIndex((sign, at) => words.some((word) => word.signs[at] !== sign));
  return differs === -1 ? first.length : differs;
}

/**
 * The different signs that follow the shared start. Kober saw that they must
 * begin with the same consonant: the last one of the word's stem.
 */
export function bridge(words: Word[]): SignId[] {
  const at = sharedStem(words);
  return [...new Set(words.flatMap((word) => word.signs[at] ?? []))];
}

/** A guess at what a word says: a name, cut into the syllables a scribe would write. */
export interface Name {
  label: string;
  syllables: string[];
}

/** The guesses a reader can make. "tu-ri-so" is the usual spelling: scholars write the r/l series as r. */
export const NAMES = {
  amnisos: { label: "Amnisos", syllables: ["a", "mi", "ni", "so"] },
  knossos: { label: "Knossos", syllables: ["ko", "no", "so"] },
  tulissos: { label: "Tulissos", syllables: ["tu", "ri", "so"] },
  tripods: { label: "Tripods", syllables: ["ti", "ri", "po", "de"] },
} satisfies Record<string, Name>;

/** The short name of a guess. */
export type NameId = keyof typeof NAMES;

/** What is known of the grid: a consonant for some rows and a vowel for some columns. */
export interface Values {
  /** One entry per row. null means not known yet; "" means no consonant. */
  consonants: (string | null)[];
  /** One entry per column. null means not known yet. */
  vowels: (string | null)[];
}

/** The grid before any guess: no sound known. */
export const NOTHING_KNOWN: Values = {
  consonants: CONSONANTS.map(() => null),
  vowels: VOWELS.map(() => null),
};

/** Why a guess cannot be right. */
export type Clash =
  /** The name has a different number of syllables from the word's signs. */
  | { kind: "length"; signs: number; syllables: number }
  /** One row or column would need two different sounds. */
  | { kind: "split"; line: "row" | "column"; index: number; sounds: [string, string] }
  /** Two different rows or columns would get the same sound. */
  | { kind: "merge"; line: "row" | "column"; indexes: [number, number]; sound: string };

/** Cuts a syllable into its consonant ("" if none) and its vowel: "mi" gives m and i. */
export const splitSyllable = (syllable: string) => ({
  consonant: syllable.slice(0, -1),
  vowel: syllable.slice(-1),
});

/** Writes one sound into a row or column, or reports that a different sound is already there. */
function place(line: (string | null)[], index: number, sound: string, kind: "row" | "column"): Clash[] {
  const before = line[index];
  if (before !== null && before !== undefined && before !== sound) {
    return [{ kind: "split", line: kind, index, sounds: [before, sound] }];
  }
  line[index] = sound;
  return [];
}

/** Finds pairs of rows or columns that have been given the same sound. */
function merges(line: (string | null)[], kind: "row" | "column"): Clash[] {
  const clashes: Clash[] = [];
  line.forEach((sound, index) => {
    const earlier = line.indexOf(sound);
    if (sound !== null && earlier < index) {
      clashes.push({ kind: "merge", line: kind, indexes: [earlier, index], sound });
    }
  });
  return clashes;
}

/**
 * Tests the guess that a word spells these syllables. Each sign gives its row a
 * consonant and its column a vowel, so every other sign in that row or column
 * gains half a sound. If the guess contradicts the grid, the clashes come back
 * and the values are left as they were.
 */
export function applyGuess(values: Values, word: Word, syllables: string[]): { values: Values; clashes: Clash[] } {
  if (word.signs.length !== syllables.length) {
    return { values, clashes: [{ kind: "length", signs: word.signs.length, syllables: syllables.length }] };
  }
  const next: Values = { consonants: [...values.consonants], vowels: [...values.vowels] };
  const clashes: Clash[] = [];
  word.signs.forEach((sign, at) => {
    const { consonant, vowel } = splitSyllable(syllables[at]!);
    clashes.push(...place(next.consonants, rowOf(sign), consonant, "row"));
    clashes.push(...place(next.vowels, columnOf(sign), vowel, "column"));
  });
  clashes.push(...merges(next.consonants, "row"), ...merges(next.vowels, "column"));
  return clashes.length > 0 ? { values, clashes } : { values: next, clashes };
}

/** The reader's guesses: which name they gave to which word. */
export type Guesses = Partial<Record<WordId, NameId>>;

/** The state of the grid after a set of guesses, and the clashes of the guesses that failed. */
export interface Solution {
  values: Values;
  clashes: Partial<Record<WordId, Clash[]>>;
}

/** Applies every guess in turn. A guess that clashes is reported and adds nothing to the grid. */
export function solve(guesses: Guesses): Solution {
  const solution: Solution = { values: NOTHING_KNOWN, clashes: {} };
  for (const id of Object.keys(WORDS) as WordId[]) {
    const name = guesses[id];
    if (!name) continue;
    const result = applyGuess(solution.values, WORDS[id], NAMES[name].syllables);
    solution.values = result.values;
    if (result.clashes.length > 0) solution.clashes[id] = result.clashes;
  }
  return solution;
}

/** A sign as far as it can be read: "no", "?o" when only its column is known, "??" when nothing is. */
export function readSign(sign: SignId, values: Values): string {
  const consonant = values.consonants[rowOf(sign)] ?? "?";
  const vowel = values.vowels[columnOf(sign)] ?? "?";
  return consonant + vowel;
}

/** A word as far as it can be read, sign by sign: "?o-no-so". */
export const readWord = (word: Word, values: Values): string =>
  word.signs.map((sign) => readSign(sign, values)).join("-");

/** True when every sign of the word can be read in full. */
export const isRead = (word: Word, values: Values): boolean =>
  word.signs.every((sign) => readSign(sign, values) === sign);
