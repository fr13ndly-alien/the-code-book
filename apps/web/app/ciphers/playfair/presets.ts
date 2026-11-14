import type { PlayfairState } from "./usePlayfair";

const MESSAGE = "MEET ME AT HAMMERSMITH BRIDGE TONIGHT";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, PlayfairState> = {
  /** The example from the full edition of the book. The page starts here. */
  charles: { keyword: "CHARLES", mode: "encipher", text: MESSAGE, position: 0 },

  /** The pair HA: both letters are in the top row of the square. */
  sameRow: { keyword: "CHARLES", mode: "encipher", text: MESSAGE, position: 4 },

  /** The pair MX, where an X splits the double M of HAMMERSMITH. */
  doubleLetter: { keyword: "CHARLES", mode: "encipher", text: MESSAGE, position: 5 },

  /** A short message whose first pair, MY, sits in one column. */
  sameColumn: { keyword: "CHARLES", mode: "encipher", text: "MY TURN", position: 0 },

  /** The same message read back by the person who receives it. */
  receive: {
    keyword: "CHARLES",
    mode: "decipher",
    text: "GD DO GD RQ AR KY GD HD NK PR DA MS OG UP GK IC QY",
    position: 0,
  },

  /** The challenge: a ciphertext to read. The reader must type the keyword. */
  schoolboy: { keyword: "", mode: "decipher", text: "PQ AC SL BY OP HP IO QM CN", position: 0 },
};
