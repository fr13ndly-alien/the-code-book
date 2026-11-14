/** A nomenclator: a cipher alphabet plus a short list of signs for whole words. */
export interface Nomenclator {
  /** The sign for each letter of the alphabet it has. */
  letters: Record<string, string>;
  /** Signs that mean nothing. The sender sprinkles them in to spoil a count. */
  nulls: string[];
  /** A sign that says "the next sign is a double letter". Mary's clerks called it the dowbleth. */
  doubler: string;
  /** Signs that each stand for a whole word. */
  words: Record<string, string>;
}

/**
 * A stand-in for the nomenclator of Mary Queen of Scots. The shape is hers, as
 * described with Figure 7 of The Code Book (chapter 1): 23 letters with no J, V
 * or W, four nulls and a doubling sign. Her list had 35 words; we keep 12 of them.
 * THE SIGNS ARE OURS. Mary's real signs are not in Unicode, so we chose common
 * characters that every phone can draw.
 */
export const STAND_IN: Nomenclator = {
  letters: {
    A: "○", B: "#", C: "Π", D: "≠", E: "◊", F: "□", G: "Θ", H: "∞",
    I: "†", K: "§", L: "Δ", M: "÷", N: "∩", O: "Ψ", P: "¶", Q: "Σ",
    R: "±", S: "Φ", T: "×", U: "Ω", X: "∪", Y: "√", Z: "Ξ",
  },
  nulls: ["∴", "¿", "♪", "☼"],
  doubler: "≈",
  // Every word here is on Mary's own list in Figure 7.
  words: {
    THE: "2", AND: "3", OF: "4", FOR: "5", WITH: "6", THAT: "7",
    FROM: "8", YOU: "9", YOUR: "&", MY: "%", SEND: "@", THIS: "$",
  },
};

/**
 * How we spell the three letters the alphabet lacks. Writers of the time used
 * I for J and U for V; writing W as two U's is our own choice.
 */
export const MISSING_LETTERS: Record<string, string> = { J: "I", V: "U", W: "UU" };
