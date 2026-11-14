import type { SignaturesState } from "./useSignatures";

const IOU = "I OWE BOB 19 POUNDS";
/** Alice's signature on the IOU, and on "MEET AT NOON". Both are checked in the engine's tests. */
const IOU_SIGNATURE = 1403;
const NOON_SIGNATURE = 1519;

const note = (arrived: string): SignaturesState => ({ message: "", arrived, signature: NOON_SIGNATURE, tries: null });

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, SignaturesState> = {
  /** Alice's note has arrived just as she signed it. The page starts here. */
  signed: { message: IOU, arrived: IOU, signature: IOU_SIGNATURE, tries: null },

  /** Alice has written her note but not signed it. */
  unsigned: { message: IOU, arrived: "", signature: null, tries: null },

  /** Somebody changed the amount on the way. */
  tampered: { message: IOU, arrived: "I OWE BOB 99 POUNDS", signature: IOU_SIGNATURE, tries: null },

  /** A forger wrote a note of her own and made up a signature. */
  forger: { message: IOU, arrived: "I OWE EVE 500 POUNDS", signature: 1234, tries: null },

  /** The three notes of the challenge. All carry the same signature. */
  noteDawn: note("MEET AT DAWN"),
  noteNoon: note("MEET AT NOON"),
  noteDusk: note("MEET AT DUSK"),
};
