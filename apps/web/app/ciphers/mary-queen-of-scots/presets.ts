import { encipher, symbolsOf } from "@codebook/cipher-engine/mary-queen-of-scots";
import type { MaryState } from "./useMary";

/** The opening of the postscript that Thomas Phelippes forged in Mary's cipher (The Code Book, chapter 1). */
const POSTSCRIPT =
  "I WOULD BE GLAD TO KNOW THE NAMES AND QUALITIES OF THE SIX GENTLEMEN WHICH ARE TO ACCOMPLISH THE DESIGNMENT";

/** Every trick switched on, as the page first shows it. */
const ALL_TRICKS = { seed: 1586, nullShare: 0.15, useWords: true };

/** A ciphertext for the reading desk, made by the engine. */
const signsFor = (plaintext: string) => symbolsOf(encipher(plaintext, ALL_TRICKS));

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, MaryState> = {
  /** The forged postscript with every trick on. The page starts here. */
  postscript: { mode: "write", text: POSTSCRIPT, nulls: "few", useWords: true, seed: 1586 },

  /** Only a sign for each letter: a plain substitution cipher. */
  plain: { mode: "write", text: POSTSCRIPT, nulls: "none", useWords: false, seed: 1586 },

  /** A heavy sprinkling of nulls and no word signs. */
  nulls: { mode: "write", text: POSTSCRIPT, nulls: "many", useWords: false, seed: 1586 },

  /** The postscript as Phelippes would meet it: signs only. */
  intercepted: { mode: "read", text: signsFor(POSTSCRIPT), nulls: "few", useWords: true, seed: 1586 },

  /** The challenge: a note to look up sign by sign. */
  barrel: { mode: "read", text: signsFor("HIDE THE LETTER IN THE BARREL"), nulls: "few", useWords: true, seed: 1586 },
};
