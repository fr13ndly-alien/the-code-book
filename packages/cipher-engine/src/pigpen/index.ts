import { indexOfLetter, lettersOnly } from "../text/index.ts";

/**
 * The pigpen cipher of the Freemasons: each letter sits in a cell of a grid,
 * and its symbol is a sketch of the lines around that cell.
 */

/** A side of a cell. */
export type Side = "top" | "right" | "bottom" | "left";

/**
 * The four grids, in the layout of The Code Book, Appendix D. The first two are
 * noughts-and-crosses grids read row by row. The last two are X shapes whose
 * cells are listed top, left, right, bottom. Grids 1 and 3 carry dots.
 */
export const GRIDS = ["ABCDEFGHI", "JKLMNOPQR", "STUV", "WXYZ"];

/** The cells of an X grid, in the order their letters are listed. */
const X_CELLS: Side[] = ["top", "left", "right", "bottom"];

/** The symbol for one letter, described so that any page can draw it. */
export interface Glyph {
  letter: string;
  /** Which of the four grids the letter lives in, 0 to 3. */
  grid: number;
  /** Its cell in that grid, counting from 0 in the order of GRIDS. */
  cell: number;
  /** "square" for a cell of a noughts-and-crosses grid, "angle" for a cell of an X. */
  shape: "square" | "angle";
  /** For a square: the sides of the cell that have a grid line. Empty for an angle. */
  walls: Side[];
  /** For an angle: the side the V opens toward, which is where its cell lies in the X. */
  opens?: Side;
  /** Whether the symbol has a dot: true for the second grid of each kind. */
  dot: boolean;
}

/** The grid lines around one cell of a three-by-three grid: the outer edge has none. */
function wallsOf(cell: number): Side[] {
  const [row, column] = [Math.floor(cell / 3), cell % 3];
  const walls: [Side, boolean][] = [
    ["top", row > 0],
    ["right", column < 2],
    ["bottom", row < 2],
    ["left", column > 0],
  ];
  return walls.filter(([, present]) => present).map(([side]) => side);
}

/** The symbol for a capital letter, or undefined for anything else. */
export function glyphOf(letter: string): Glyph | undefined {
  const grid = GRIDS.findIndex((letters) => letters.includes(letter));
  if (grid < 0 || indexOfLetter(letter) < 0) return undefined;
  const cell = GRIDS[grid]!.indexOf(letter);
  const dot = grid % 2 === 1;
  return grid < 2
    ? { letter, grid, cell, shape: "square", walls: wallsOf(cell), dot }
    : { letter, grid, cell, shape: "angle", walls: [], opens: X_CELLS[cell]!, dot };
}

/** A message as words of symbols. Spaces split the words; punctuation is dropped. */
export const encipher = (text: string): Glyph[][] =>
  text
    .toUpperCase()
    .split(/\s+/)
    .map((word) => [...lettersOnly(word)].map((letter) => glyphOf(letter)!))
    .filter((word) => word.length > 0);

/** A drawn symbol, without its letter: all that a reader of the ciphertext can see. */
export type Drawing = Pick<Glyph, "shape" | "walls" | "opens" | "dot">;

/** A symbol as a short text, the same for any two symbols that look the same. */
export const signature = ({ shape, walls, opens, dot }: Drawing) =>
  `${shape}:${shape === "square" ? [...walls].sort().join("+") : opens}${dot ? ":dot" : ""}`;

/** Every letter's symbol, A first. */
export const ALL_GLYPHS = GRIDS.flatMap((letters) => [...letters].map((letter) => glyphOf(letter)!));

/** Reads one drawn symbol back into its letter, or undefined if no letter has that symbol. */
export const letterOf = (drawing: Drawing) =>
  ALL_GLYPHS.find((glyph) => signature(glyph) === signature(drawing))?.letter;

/** Reads a message of drawn symbols back into letters, with a space between words. */
export const decipher = (words: Drawing[][]) =>
  words.map((word) => word.map((drawing) => letterOf(drawing) ?? "?").join("")).join(" ");

/** A symbol in words, for readers who cannot see it: "lines on the right and bottom, with a dot". */
export function describe(glyph: Drawing): string {
  const dot = glyph.dot ? ", with a dot" : "";
  if (glyph.shape === "angle") return `a V shape that opens to the ${glyph.opens}${dot}`;
  if (glyph.walls.length === 4) return `a closed box${dot}`;
  return `lines on the ${glyph.walls.join(", ").replace(/, ([a-z]+)$/, " and $1")}${dot}`;
}

/** How often each symbol appears in a message, most common first. */
export function tally(text: string): { glyph: Glyph; count: number }[] {
  const counts = new Map<string, number>();
  for (const letter of lettersOnly(text)) counts.set(letter, (counts.get(letter) ?? 0) + 1);
  return [...counts]
    .map(([letter, count]) => ({ glyph: glyphOf(letter)!, count }))
    .sort((a, b) => b.count - a.count);
}
