/**
 * Quantum key exchange, the BB84 scheme of Charles Bennett and Gilles Brassard.
 * Alice sends single photons polarised in one of two schemes; Bob measures each
 * with a detector he picks at random; they keep the bits where the two agree.
 * Nothing here is random: every coin toss is passed in, so a run can be replayed.
 */

/** One binary digit. */
export type Bit = 0 | 1;

/** A way to polarise or measure a photon: "+" is rectilinear (upright or flat), "x" is diagonal. */
export type Scheme = "+" | "x";

/** Every choice and every coin toss of one exchange, as plain data. All lists have one entry per photon. */
export interface Run {
  aliceBits: Bit[];
  aliceSchemes: Scheme[];
  bobSchemes: Scheme[];
  eveSchemes: Scheme[];
  /** What Eve's detector reads when it is the wrong scheme for the photon. */
  eveCoins: Bit[];
  /** What Bob's detector reads when it is the wrong scheme for the photon. */
  bobCoins: Bit[];
}

/** What Eve did to one photon. */
export interface Tap {
  scheme: Scheme;
  /** The bit Eve read. */
  bit: Bit;
  /** The angle of the photon she sent on to Bob, in degrees. */
  angle: number;
}

/** The whole life of one photon, for a page to draw. */
export interface Photon {
  aliceBit: Bit;
  aliceScheme: Scheme;
  /** The angle of the photon Alice sent, in degrees: 0 is flat, 90 is upright. */
  angle: number;
  /** Present only when Eve is listening. */
  eve?: Tap;
  bobScheme: Scheme;
  bobBit: Bit;
  /** True when Bob's detector matched Alice's scheme, so the bit is kept. */
  kept: boolean;
  /** True when a kept bit differs between Alice and Bob. Only Eve can cause this. */
  wrong: boolean;
}

/**
 * The angle of a photon carrying a bit. In "+", 1 is upright and 0 is flat;
 * in "x", 1 leans right and 0 leans left. Any agreed choice would do.
 */
export function polarise(bit: Bit, scheme: Scheme): number {
  if (scheme === "+") return bit === 1 ? 90 : 0;
  return bit === 1 ? 45 : 135;
}

/**
 * Measures a photon. The right detector reads its bit for certain. The wrong
 * detector reads 0 or 1 by chance: `coin` is that chance, decided beforehand.
 */
export const measure = (bit: Bit, sent: Scheme, detector: Scheme, coin: Bit): Bit => (sent === detector ? bit : coin);

function sendOne(run: Run, i: number, eveListening: boolean): Photon {
  const aliceBit = run.aliceBits[i]!;
  const aliceScheme = run.aliceSchemes[i]!;
  const bobScheme = run.bobSchemes[i]!;
  let arriving = { bit: aliceBit, scheme: aliceScheme };
  let eve: Tap | undefined;
  if (eveListening) {
    // Eve cannot copy a photon. She must measure it and send on a new one, made in her own scheme.
    const scheme = run.eveSchemes[i]!;
    const bit = measure(aliceBit, aliceScheme, scheme, run.eveCoins[i]!);
    eve = { scheme, bit, angle: polarise(bit, scheme) };
    arriving = { bit, scheme };
  }
  const bobBit = measure(arriving.bit, arriving.scheme, bobScheme, run.bobCoins[i]!);
  const kept = aliceScheme === bobScheme;
  return { aliceBit, aliceScheme, angle: polarise(aliceBit, aliceScheme), eve, bobScheme, bobBit, kept, wrong: kept && bobBit !== aliceBit };
}

/** Sends every photon of a run from Alice to Bob, through Eve if she is listening. */
export const transmit = (run: Run, eveListening: boolean): Photon[] =>
  run.aliceBits.map((_, i) => sendOne(run, i, eveListening));

/** The positions Alice and Bob keep: those where Bob's detector matched Alice's scheme. */
export const sift = (photons: Photon[]): number[] => photons.flatMap((photon, i) => (photon.kept ? [i] : []));

/** The outcome of comparing a sample of the kept bits in public. */
export interface Comparison {
  /** Positions of the photons whose bits were read out and then thrown away. */
  sample: number[];
  /** How many of the sampled bits differed. Any at all means somebody measured the photons. */
  errors: number;
  /** Positions of the kept photons that were not read out. */
  secret: number[];
  /** Alice's bits at the secret positions: the key. */
  aliceKey: Bit[];
  /** Bob's bits at the same positions. Equal to Alice's unless Eve was missed. */
  bobKey: Bit[];
}

/** Alice and Bob read out every second kept bit, starting with the first, and keep the rest secret. */
export function compare(photons: Photon[]): Comparison {
  const kept = sift(photons);
  const sample = kept.filter((_, rank) => rank % 2 === 0);
  const secret = kept.filter((_, rank) => rank % 2 === 1);
  return {
    sample,
    errors: sample.filter((i) => photons[i]!.wrong).length,
    secret,
    aliceKey: secret.map((i) => photons[i]!.aliceBit),
    bobKey: secret.map((i) => photons[i]!.bobBit),
  };
}

/** The chance that Eve spoils at least one of `compared` bits: each one has a quarter chance of being wrong. */
export const chanceOfCatchingEve = (compared: number) => 1 - 0.75 ** compared;

/** Reads bits from text: "0110" gives [0, 1, 1, 0]. */
export const bits = (text: string): Bit[] => [...text].map((char) => (char === "1" ? 1 : 0));

/** Reads schemes from text: "+x" gives ["+", "x"]. */
export const schemes = (text: string): Scheme[] => [...text].map((char) => (char === "+" ? "+" : "x"));

/** A run written compactly as six strings of equal length, in the order of the Run fields. */
export const runFrom = (a: string, as: string, bs: string, es: string, ec: string, bc: string): Run => ({
  aliceBits: bits(a),
  aliceSchemes: schemes(as),
  bobSchemes: schemes(bs),
  eveSchemes: schemes(es),
  eveCoins: bits(ec),
  bobCoins: bits(bc),
});
