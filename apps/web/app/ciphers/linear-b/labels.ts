import { SIGNS, readSign, type Clash, type SignId, type Values } from "@codebook/cipher-engine/linear-b";

/** The name of a sign for screen readers: its sound once known, its catalogue number until then. */
export function signLabel(sign: SignId, values: Values): string {
  const reading = readSign(sign, values);
  return reading === sign ? `sign ${reading}` : `sign ${SIGNS[sign].number}, sound ${reading}`;
}

/** The fixed name of a grid row ("C3") or column ("V4"), as Ventris numbered his. */
export const lineName = (line: "row" | "column", index: number): string =>
  `${line === "row" ? "C" : "V"}${index + 1}`;

/** The consonant of a grid row once known: "k-", or a dash for the row of pure vowels. */
export function rowSound(row: number, values: Values): string | undefined {
  const consonant = values.consonants[row];
  if (consonant === null || consonant === undefined) return undefined;
  return consonant === "" ? "–" : `${consonant}-`;
}

/** The vowel of a grid column once known: "-o". */
export function columnSound(column: number, values: Values): string | undefined {
  const vowel = values.vowels[column];
  return vowel ? `-${vowel}` : undefined;
}

/** A clash in plain words, using the grid's own row and column names. */
export function clashText(clash: Clash): string {
  if (clash.kind === "length") {
    return `That name has ${clash.syllables} syllables, but the word has ${clash.signs} signs.`;
  }
  const { line } = clash;
  const part = line === "row" ? "consonant" : "vowel";
  if (clash.kind === "split") {
    const sounds = clash.sounds.map((sound) => sound || "none").join(" and ");
    return `Signs in one ${line} share a ${part}. This name gives ${line} ${lineName(line, clash.index)} two: ${sounds}.`;
  }
  const [first, second] = clash.indexes;
  const names = `${lineName(line, first)} and ${lineName(line, second)}`;
  return `This name gives ${line}s ${names} the same ${part}, ${clash.sound || "none"}. Two ${line}s cannot share one.`;
}
