import type { HomophonicState } from "./useHomophonic";

/** Our own passage: long enough, at over 300 letters, for the two charts to show their shapes. */
const DUKE =
  "THE DUKE HAS A SECRET. HIS CLERKS TURN EVERY LETTER INTO A NUMBER, AND THE COMMON LETTERS GET MORE " +
  "NUMBERS THAN THE RARE ONES. WHEN THE ENEMY COUNTS THE NUMBERS, HE FINDS THAT NONE STANDS OUT. EACH ONE " +
  "APPEARS ABOUT AS OFTEN AS THE REST. THE TALL BAR THAT GAVE AWAY THE LETTER E IS GONE, CUT INTO A DOZEN " +
  "SHORT ONES. THE CODEBREAKER WHO TRUSTED HIS TABLE OF FREQUENCIES IS LOST, AT LEAST FOR A WHILE.";

/** A passage stuffed with Q, to show the habit that betrays the cipher. */
const QUEEN =
  "THE QUEEN ASKED A QUICK QUESTION. THE QUIET SQUIRE WAS QUITE UNABLE TO REPLY. HE SQUEEZED HIS QUILL " +
  "AND REQUESTED A QUARTER OF AN HOUR. THE QUEEN, QUITE ANNOYED, QUIT THE ROOM.";

/** Setups that buttons in story.mdx can load, by name. All use table 1, where Q is 84. */
export const PRESETS: Record<string, HomophonicState> = {
  /** A long message, so the flat chart shows. The page starts here. */
  duke: { mode: "encipher", text: DUKE, table: 1, picks: 1 },

  /** An empty message, ready for the reader's own words. */
  blank: { mode: "encipher", text: "", table: 1, picks: 1 },

  /** The attack: the number for Q is picked, and only three numbers ever follow it. */
  queen: { mode: "encipher", text: QUEEN, table: 1, picks: 1, picked: "84" },

  /** The challenge: an empty deciphering desk with the right table. */
  desk: { mode: "decipher", text: "", table: 1, picks: 1 },
};
