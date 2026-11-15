import { ALPHABET, mapLetters } from "../text/index.ts";

/**
 * The Dancing Men: a substitution cipher in which every letter is a stick figure
 * in its own pose, from Conan Doyle's Sherlock Holmes story of 1903. Also the
 * two-step cipher of Jules Verne's parchment: swap each letter, then write backwards.
 */

/** Where an arm can be: raised, straight out, hanging, or bent with the hand on the hip. */
export type Arm = "up" | "out" | "down" | "bent";

/** Where a leg can be: standing, stepped out to the side, or bent in a kick. */
export type Leg = "down" | "out" | "bent";

/** One pose of a dancing man. Left and right are as the reader sees them on the page. */
export interface Pose {
  leftArm: Arm;
  rightArm: Arm;
  leftLeg: Leg;
  rightLeg: Leg;
}

/** One figure of a danced message. A flag in its hand means a word ends here. */
export interface Figure {
  letter: string;
  pose: Pose;
  flag: boolean;
}

const ARMS: Record<string, Arm> = { U: "up", O: "out", D: "down", B: "bent" };
const LEGS: Record<string, Leg> = { D: "down", O: "out", B: "bent" };

/**
 * Our own set of poses, written as left arm, right arm, left leg, right leg.
 * They are in the spirit of the story, not Conan Doyle's drawings: his messages
 * fix figures for only 18 letters. The right arm is never bent, so it is always
 * free to hold the flag.
 */
const POSE_CODES: Record<string, string> = {
  A: "UUDD", B: "OODD", C: "DDOO", D: "BDDD", E: "UUOO", F: "OUDD", G: "UODD",
  H: "BOOO", I: "DDDD", J: "DUBD", K: "UDDB", L: "OOOO", M: "BUDD", N: "DODD",
  O: "OOBB", P: "UUBD", Q: "ODOD", R: "DODO", S: "BDBD", T: "UODB", U: "OUBD",
  V: "DDBB", W: "UUDB", X: "BODB", Y: "ODDD", Z: "BUOO",
};

const poseFromCode = (code: string): Pose => ({
  leftArm: ARMS[code[0]!]!,
  rightArm: ARMS[code[1]!]!,
  leftLeg: LEGS[code[2]!]!,
  rightLeg: LEGS[code[3]!]!,
});

/** The key: the pose that stands for each of the 26 letters. */
export const POSES: Record<string, Pose> = Object.fromEntries(
  Object.entries(POSE_CODES).map(([letter, code]) => [letter, poseFromCode(code)]),
);

/** A pose as one string, so that two poses can be compared: "up-out-down-bent". */
export const poseKey = (pose: Pose) => [pose.leftArm, pose.rightArm, pose.leftLeg, pose.rightLeg].join("-");

const LETTER_OF_POSE: Record<string, string> = Object.fromEntries(
  Object.entries(POSES).map(([letter, pose]) => [poseKey(pose), letter]),
);

const ARM_WORDS: Record<Arm, string> = { up: "up", out: "out", down: "down", bent: "on the hip" };
const LEG_WORDS: Record<Leg, string> = { down: "straight", out: "out to the side", bent: "kicking" };

/** A pose in words, for readers who cannot see the drawing. */
export function describe(pose: Pose): string {
  const arms =
    pose.leftArm === pose.rightArm
      ? `both arms ${ARM_WORDS[pose.leftArm]}`
      : `left arm ${ARM_WORDS[pose.leftArm]}, right arm ${ARM_WORDS[pose.rightArm]}`;
  const legs =
    pose.leftLeg === pose.rightLeg
      ? `both legs ${LEG_WORDS[pose.leftLeg]}`
      : `left leg ${LEG_WORDS[pose.leftLeg]}, right leg ${LEG_WORDS[pose.rightLeg]}`;
  return `${arms}, ${legs}`;
}

/**
 * Turns a message into dancing men. There are no spaces: the last figure of each
 * word holds a flag instead. The final word needs none, because the message ends there.
 * Conan Doyle's story works the same way: Holmes takes NEVER for a single word
 * "since there was no flag".
 */
export function encipher(text: string): Figure[] {
  const words = text.toUpperCase().split(/[^A-Z]+/).filter(Boolean);
  return words.flatMap((word, at) =>
    [...word].map((letter, i) => ({
      letter,
      pose: POSES[letter]!,
      flag: i === word.length - 1 && at < words.length - 1,
    })),
  );
}

/** Reads dancing men back into letters, using only their poses and flags. An unknown pose is "?". */
export const decipher = (figures: { pose: Pose; flag: boolean }[]) =>
  figures.map((figure) => (LETTER_OF_POSE[poseKey(figure.pose)] ?? "?") + (figure.flag ? " " : "")).join("");

/** The figures split into words, each ending with its flag. */
export function inWords(figures: Figure[]): Figure[][] {
  const words: Figure[][] = [[]];
  for (const figure of figures) {
    words[words.length - 1]!.push(figure);
    if (figure.flag) words.push([]);
  }
  return words.filter((word) => word.length > 0);
}

/** How often each figure appears, commonest first: the codebreaker's count. */
export function tally(figures: Figure[]): { letter: string; pose: Pose; count: number }[] {
  const counts = new Map<string, number>();
  for (const { letter } of figures) counts.set(letter, (counts.get(letter) ?? 0) + 1);
  return [...counts]
    .map(([letter, count]) => ({ letter, pose: POSES[letter]!, count }))
    .sort((a, b) => b.count - a.count);
}

/** A codebreaker's working key: for each figure (named by its true letter), the letter guessed. */
export type Guesses = Record<string, string>;

/** Adds a guess. A letter can belong to one figure only, so it is taken from any other. */
export function assign(guesses: Guesses, figure: string, plain: string): Guesses {
  const kept = Object.entries(guesses).filter(([other, letter]) => other !== figure && letter !== plain);
  return { ...Object.fromEntries(kept), [figure]: plain };
}

/** Rubs out the guess for one figure. */
export const unassign = (guesses: Guesses, figure: string): Guesses =>
  Object.fromEntries(Object.entries(guesses).filter(([other]) => other !== figure));

/** The message as the guesses read it: a dot for each figure not yet named, a space after each flag. */
export const readWith = (figures: Figure[], guesses: Guesses) =>
  figures.map((figure) => (guesses[figure.letter] ?? "·") + (figure.flag ? " " : "")).join("");

/** True when every figure of the message has been given its right letter. */
export const isSolved = (figures: Figure[], guesses: Guesses) =>
  figures.length > 0 && figures.every((figure) => guesses[figure.letter] === figure.letter);

/** The commonest figure that is still unnamed or wrongly named: the next one to give away as a hint. */
export const nextHint = (figures: Figure[], guesses: Guesses): string | undefined =>
  tally(figures).find(({ letter }) => guesses[letter] !== letter)?.letter;

/**
 * The messages of the story, as Holmes read them, in the order they appear.
 * Source: Arthur Conan Doyle, "The Adventure of the Dancing Men", The Strand Magazine, December 1903.
 * Checked against the text in The Return of Sherlock Holmes (Project Gutenberg ebook 108).
 * COME ELSIE appears twice in the story (on the tool-house door, then on paper); it is listed once.
 * Between them they use 18 letters; the story gives no figure for F, J, K, Q, U, W, X or Z.
 */
export const DOYLE_MESSAGES = [
  "AM HERE ABE SLANEY",
  "AT ELRIGES",
  "COME ELSIE",
  "NEVER",
  "ELSIE PREPARE TO MEET THY GOD",
  "COME HERE AT ONCE",
];

/** Our own practice message for the reader to break by counting, the way Holmes did. */
export const DESK_MESSAGE =
  "THE MEN DANCE ON THE GARDEN WALL EVERY EVENING. EACH ONE STANDS FOR A LETTER, AND THE SAME MAN IS ALWAYS " +
  "THE SAME LETTER. COUNT THEM. THE ONE YOU SEE MOST IS THE LETTER E. THE FLAGS SHOW WHERE EVERY WORD ENDS. " +
  "NOW READ THE REST.";

/**
 * Our own cipher alphabet for the Verne tool: the keyword SNEFFELS, then the
 * unused letters backwards. In the novel the parchment is written in runes;
 * here plain A becomes S, B becomes N and so on.
 */
export const VERNE_ALPHABET = "SNEFLZYXWVUTRQPOMKJIHGDCBA";

const backwards = (text: string) => [...text].reverse().join("");

/** Swaps each letter for its partner in VERNE_ALPHABET. */
export const verneSwap = (text: string) => mapLetters(text, (letter) => VERNE_ALPHABET[ALPHABET.indexOf(letter)]!);

/** Swaps each letter back to the plain alphabet. */
export const verneSwapBack = (text: string) => mapLetters(text, (letter) => ALPHABET[VERNE_ALPHABET.indexOf(letter)]!);

/**
 * The whole life of a Verne message in five lines: the plain text, the letters
 * swapped, that written backwards (the parchment), the parchment read backwards,
 * and the letters swapped back.
 */
export function verneSteps(text: string): string[] {
  const plain = text.toUpperCase();
  const swapped = verneSwap(plain);
  const parchment = backwards(swapped);
  const turned = backwards(parchment);
  return [plain, swapped, parchment, turned, verneSwapBack(turned)];
}
