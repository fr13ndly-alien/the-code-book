import type { KeywordState } from "./useKeyword";

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, KeywordState> = {
  /** The book's keyphrase, with a short message. The page starts here. */
  julius: { keyword: "JULIUS CAESAR", mode: "encipher", text: "BEWARE THE IDES OF MARCH" },

  /** No keyword yet, so the cipher alphabet is still the plain one. */
  blank: { keyword: "", mode: "encipher", text: "BEWARE THE IDES OF MARCH" },

  /** A ciphertext made with the book's keyphrase, to read back. */
  reply: { keyword: "JULIUS CAESAR", mode: "decipher", text: "USNJFS HES RISG ZC XJFLE" },

  /** A longer ciphertext with no key loaded, for counting letters. */
  caught: {
    keyword: "",
    mode: "decipher",
    text: "HES SYSXP YSMSF YSSIG SMSFP VSP NESY HES WSHHSFG HESXGSWMSG HSWW HES GSLFSH",
  },

  /** The challenge: a ciphertext whose keyphrase the reader must type in. */
  sealed: { keyword: "", mode: "decipher", text: "VQIQB JBOGQ GNQ SQL YWJV" },
};
