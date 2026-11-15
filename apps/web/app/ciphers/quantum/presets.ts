import { runFrom } from "@codebook/cipher-engine/quantum";
import type { QuantumState } from "./useQuantum";

/** Sixteen photons, fixed so the page looks the same every time it loads. */
const FIRST = runFrom(
  "0111000011100100",
  "xxxx+x+x++x+x+++",
  "xxxxx+x+x+x++x+x",
  "+xx+++x++xx++x++",
  "1010111001111101",
  "1001110010010010",
);

/** A run where Eve spoils three kept bits, but none of them is in the sample. */
const LUCKY = runFrom(
  "0111111111110011",
  "+++x++xx+xxxx+++",
  "++xxx+xx++++xxxx",
  "+xxxx+x++xxx+x+x",
  "0111011011101101",
  "0000010011001010",
);

/** The three lines of the challenge. The engine's tests check which ones Eve spoils. */
const NORTH = runFrom(
  "1010110100011000",
  "+++x++x+xx+++x++",
  "x+x++++++x++x++x",
  "xxx+xxxx++++++x+",
  "1111001110011101",
  "0110100010111010",
);
const SOUTH = runFrom(
  "0010100011001101",
  "+x+xx+xxxxxxxxx+",
  "+xx+xx+++xxxx+xx",
  "+++xx++xxx+++x+x",
  "1111101001100101",
  "1010110010101000",
);
const WEST = runFrom(
  "0011011010110100",
  "x+xx+++x+++++++x",
  "x++xxxxx+x++xx++",
  "++x+xxx+xxxx+++x",
  "0100001001101111",
  "1000110100001010",
);

const line = (run: QuantumState["run"], eve: boolean): QuantumState => ({ run, eve, eveHidden: true, stage: 2 });

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, QuantumState> = {
  /** Bob has measured Alice's photons and nobody is listening. The page starts here. */
  measured: { run: FIRST, eve: false, eveHidden: false, stage: 2 },

  /** Only Alice's photons, before Bob does anything. */
  sent: { run: FIRST, eve: false, eveHidden: false, stage: 1 },

  /** The matching positions are marked. */
  sifted: { run: FIRST, eve: false, eveHidden: false, stage: 3 },

  /** The same photons with Eve measuring each one on the way. */
  tapped: { run: FIRST, eve: true, eveHidden: false, stage: 4 },

  /** Eve listens and, by luck, is not caught. */
  lucky: { run: LUCKY, eve: true, eveHidden: false, stage: 4 },

  /** The challenge: three lines, and the reader is not told which ones Eve is on. */
  north: line(NORTH, true),
  south: line(SOUTH, false),
  west: line(WEST, true),
};
