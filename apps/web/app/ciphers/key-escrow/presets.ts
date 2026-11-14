import { encipher } from "@codebook/cipher-engine/key-escrow";
import type { EscrowPageState } from "./useEscrow";

const NOBODY = { one: false, two: false };
const BOTH = { one: true, two: true };

const base: EscrowPageState = {
  key: "LOCK",
  random: "QXJM",
  message: "THE PARTY IS ON FRIDAY",
  escrowed: true,
  ownKey: "MINE",
  warrant: false,
  released: NOBODY,
  stolen: NOBODY,
  sealed: false,
};

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, EscrowPageState> = {
  /** Alice's key is lodged and nobody has asked for it. The page starts here. */
  lodged: base,

  /** A judge has signed a warrant, and agency one has handed over its half. */
  oneHalf: { ...base, warrant: true, released: { one: true, two: false } },

  /** Both agencies have released their halves under the warrant. */
  bothHalves: { ...base, warrant: true, released: BOTH },

  /** The police have both halves, but the sender has switched to a cipher of their own. */
  outlaw: { ...base, escrowed: false, warrant: true, released: BOTH },

  /** The challenge: a key the reader has not seen, with Alice's desk covered. Proven in the engine's tests. */
  challenge: { ...base, key: "CHIP", random: "WTGB", message: "THE MONEY IS UNDER THE BRIDGE", sealed: true },
};

/** Keys a police officer might suspect, to show that one half fits them all. */
export const SUSPECT_KEYS = ["SAFE", "DOOR", "WIRE", "ZZZZ"];

const PLOT = "THE ASSASSIN ARRIVES AT NOON";

/** Five messages for the toy keyword scanner. The last is the fourth, enciphered with the key LOCK. */
export const SCANNED_MESSAGES = [
  "SEE YOU AT FOOTBALL ON SATURDAY",
  "OUR SCHOOL TRIP VISITS THE PENTAGON",
  "HAPPY BIRTHDAY GRANDMA",
  PLOT,
  encipher(PLOT, "LOCK"),
];
