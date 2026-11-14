/**
 * Two attacks on Enigma, built on the Enigma engine next door.
 *
 * Rejewski's chains use the message key that operators typed twice. Turing's
 * crib uses a guessed word and the fact that Enigma never turns a letter into itself.
 */

export * from "./chains.ts";
export * from "./crib.ts";
