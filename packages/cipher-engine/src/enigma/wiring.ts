/**
 * Historical wiring of the German Army "Enigma I".
 * Source: Crypto Museum, https://www.cryptomuseum.com/crypto/enigma/wiring.htm
 */

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export type RotorName = "I" | "II" | "III" | "IV" | "V";
export type ReflectorName = "B" | "C";

export interface Rotor {
  /** wiring[i] is the letter that contact i (A = 0) is wired to. */
  wiring: string;
  /** When this letter shows in the window, the next key press also turns the rotor to its left. */
  notch: string;
}

export const ROTORS: Record<RotorName, Rotor> = {
  I: { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" },
  II: { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" },
  III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" },
  IV: { wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J" },
  V: { wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z" },
};

export const ROTOR_NAMES = Object.keys(ROTORS) as RotorName[];

export const REFLECTORS: Record<ReflectorName, string> = {
  B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
  C: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
};
