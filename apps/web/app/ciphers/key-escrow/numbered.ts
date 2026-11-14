import { indexOfLetter } from "@codebook/cipher-engine/text";

/** Each letter with its place in the alphabet beside it, A being 0: "L 11". */
export const numbered = (letters: string) => [...letters].map((letter) => `${letter} ${indexOfLetter(letter)}`);
