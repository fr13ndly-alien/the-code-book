/**
 * Reading royal names in Egyptian hieroglyphs, the way Thomas Young and
 * Jean-François Champollion did: guess the name inside a cartouche, give each
 * sign a sound, and test those sounds on the next cartouche.
 *
 * Nothing here is enciphered. The "key" is the list of sounds, lost for
 * fourteen centuries and recovered sign by sign.
 */

/** The sounds a reader can give a sign. "ra" is a whole word: the sun. */
export const SOUNDS = ["a", "e", "k", "l", "m", "n", "o", "p", "r", "s", "t", "ra"] as const;

/** One of the sounds a sign can have. */
export type Sound = (typeof SOUNDS)[number];

/** A hieroglyph that the page can draw. */
export interface Sign {
  /** The sign's usual name among Egyptologists, e.g. "folded cloth". */
  name: string;
  /** Its number in Gardiner's sign list, the standard catalogue. */
  gardiner: string;
  /** The sound the book gives it. */
  sound: Sound;
}

/**
 * The signs of the four cartouches, with the sound values printed in
 * The Code Book, Tables 9, 11 and 12 and its account of the Rameses cartouche.
 * The book writes the reeds as "e" (Table 11); Egyptologists now write i or y.
 * The hard c of Cleopatra is written "k" here, as in the Greek spelling Kleopatra.
 * The fox skins are really the two consonants m-s; the book reads them as m,
 * as Champollion did at first.
 * The other sounds are also the book's, rounded to the Greek names. Egyptologists
 * now write the hand as d, the hill slope as q, the vulture as a throat sound
 * (aleph), the lasso as w-aleph and the lion as r-w, used for l in Greek names.
 * Names and numbers follow Gardiner's sign list ("Egyptian Grammar", 1927).
 * Aa15 is in Gardiner's "unclassified" group: nobody is sure what it shows.
 * "Plinth" (a flat base seen from the side) is the name it usually goes by.
 */
export const SIGNS = {
  stool: { name: "stool", gardiner: "Q3", sound: "p" },
  loaf: { name: "loaf of bread", gardiner: "X1", sound: "t" },
  lasso: { name: "lasso", gardiner: "V4", sound: "o" },
  lion: { name: "lion", gardiner: "E23", sound: "l" },
  plinth: { name: "plinth", gardiner: "Aa15", sound: "m" },
  reeds: { name: "pair of reeds", gardiner: "M17 twice", sound: "e" },
  cloth: { name: "folded cloth", gardiner: "S29", sound: "s" },
  slope: { name: "hill slope", gardiner: "N29", sound: "k" },
  reed: { name: "reed", gardiner: "M17", sound: "e" },
  vulture: { name: "vulture", gardiner: "G1", sound: "a" },
  hand: { name: "hand", gardiner: "D46", sound: "t" },
  mouth: { name: "mouth", gardiner: "D21", sound: "r" },
  basket: { name: "basket with a handle", gardiner: "V31", sound: "k" },
  water: { name: "ripple of water", gardiner: "N35", sound: "n" },
  bolt: { name: "door bolt", gardiner: "O34", sound: "s" },
  sun: { name: "sun", gardiner: "N5", sound: "ra" },
  skins: { name: "three fox skins", gardiner: "F31", sound: "m" },
} satisfies Record<string, Sign>;

/** The short name of a sign, used as its key everywhere. */
export type SignId = keyof typeof SIGNS;

/** A royal name written inside a ring. */
export interface Cartouche {
  /** The name in English. */
  name: string;
  /** The signs in the order they are read. */
  signs: SignId[];
  /**
   * The sounds of the name, known from a Greek text beside the hieroglyphs.
   * Missing for a cartouche that was found without a translation.
   */
  greek?: Sound[];
}

/**
 * The four cartouches of the book's story. The feminine ending of Cleopatra's
 * cartouche (two more signs) is left out, as in the book's Table 11.
 */
export const CARTOUCHES = {
  /** The Code Book, Tables 9 and 11: p t o l m e s, for Ptolemaios. */
  ptolemy: {
    name: "Ptolemy",
    signs: ["stool", "loaf", "lasso", "lion", "plinth", "reeds", "cloth"],
    greek: ["p", "t", "o", "l", "m", "e", "s"],
  },
  /** The Code Book, Table 11: c l e o p a t r a, from the Bankes obelisk. */
  cleopatra: {
    name: "Cleopatra",
    signs: ["slope", "lion", "reed", "lasso", "stool", "vulture", "hand", "mouth", "vulture"],
    greek: ["k", "l", "e", "o", "p", "a", "t", "r", "a"],
  },
  /**
   * The Code Book, Table 12 (Table 16 in the full edition): a l ? s e ? t r ?,
   * read as alksentrs. The signs and their order were checked against the
   * printed table: vulture, lion, basket, folded cloth, reed, water, hand,
   * mouth, door bolt. We follow the book. Ancient spellings of the name vary:
   * a common one (Gardiner G1 E23 V31 O34 M17 N35 D46 D21 O34, as listed on
   * French Wikipedia's "Alexandre le Grand") has the door bolt for both s
   * sounds. The book's version has the folded cloth for the first s, which is
   * why that s is already known from Ptolemy and only the last one is new.
   */
  alexander: {
    name: "Alexander",
    signs: ["vulture", "lion", "basket", "cloth", "reed", "water", "hand", "mouth", "bolt"],
  },
  /** The Code Book, chapter 4: the Abu Simbel cartouche, ra-?-s-s. */
  rameses: { name: "Rameses", signs: ["sun", "skins", "cloth", "cloth"] },
} satisfies Record<string, Cartouche>;

/** The short name of a cartouche. */
export type CartoucheId = keyof typeof CARTOUCHES;

/** The sounds a reader has given to signs so far. */
export type Assignment = Partial<Record<SignId, Sound>>;

/** Gives a sign a sound, or takes its sound away. Every copy of the sign changes at once. */
export function assign(assignment: Assignment, sign: SignId, sound: Sound | undefined): Assignment {
  const next = { ...assignment };
  if (sound) next[sign] = sound;
  else delete next[sign];
  return next;
}

/** The sound of each sign of a cartouche under an assignment. Unknown signs are undefined. */
export const read = (cartouche: Cartouche, assignment: Assignment): (Sound | undefined)[] =>
  cartouche.signs.map((sign) => assignment[sign]);

/** A reading as text, with "?" for each sign that has no sound yet: "a l ? s e ? t r ?". */
export const readingText = (cartouche: Cartouche, assignment: Assignment) =>
  read(cartouche, assignment)
    .map((sound) => sound ?? "?")
    .join(" ");

/** How one sign of a reading compares with the name the reader is testing it against. */
export type Verdict = "fits" | "clashes" | "unknown";

/**
 * Compares a reading with the Greek name, sign by sign. A sign whose sound was
 * found in another cartouche and also fits here is the cross-check that told
 * Champollion he was right.
 */
export function check(cartouche: Cartouche, assignment: Assignment): Verdict[] {
  const expected = cartouche.greek ?? cartouche.signs.map((sign) => SIGNS[sign].sound);
  return read(cartouche, assignment).map((sound, at) =>
    sound === undefined ? "unknown" : sound === expected[at] ? "fits" : "clashes",
  );
}

/** True when every sign of the cartouche has the sound the book gives it. */
export const isRead = (cartouche: Cartouche, assignment: Assignment) =>
  cartouche.signs.every((sign) => assignment[sign] === SIGNS[sign].sound);

/** The sounds that reading these cartouches correctly gives you. */
export function valuesFrom(cartouches: Cartouche[]): Assignment {
  const found: Assignment = {};
  for (const sign of cartouches.flatMap((cartouche) => cartouche.signs)) found[sign] = SIGNS[sign].sound;
  return found;
}

/** The signs that two cartouches share: the places where one reading can test another. */
export const sharedSigns = (a: Cartouche, b: Cartouche): SignId[] => [
  ...new Set(a.signs.filter((sign) => b.signs.includes(sign))),
];
