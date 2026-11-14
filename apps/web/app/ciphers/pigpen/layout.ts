import type { Glyph, Side } from "@codebook/cipher-engine/pigpen";

/** Sizes and positions for drawing pigpen symbols and grids. All in SVG units. */

/** A point in a drawing. */
export type Point = [x: number, y: number];

/** A straight stroke from one point to another. */
export type Line = [from: Point, to: Point];

/** The square box every symbol is drawn in. */
export const GLYPH_SIZE = 24;

/** Space between a symbol's strokes and the edge of its box. */
const GLYPH_INSET = 4;

/** The radius of a symbol's dot. */
export const GLYPH_DOT = 2;

/** The square box every grid is drawn in: three cells of 30. */
export const GRID_SIZE = 90;

/** The width of one cell of a noughts-and-crosses grid. */
export const CELL = GRID_SIZE / 3;

/** How far the arms of an X grid stop short of the corners of its box. */
const X_INSET = 6;

/** The four edges of a box from `low` to `high`, by side. */
const edges = (left: number, top: number, size: number): Record<Side, Line> => ({
  top: [[left, top], [left + size, top]],
  right: [[left + size, top], [left + size, top + size]],
  bottom: [[left, top + size], [left + size, top + size]],
  left: [[left, top], [left, top + size]],
});

/** The strokes of a square symbol in its own box. */
export function glyphLines(walls: Side[]): Line[] {
  const box = edges(GLYPH_INSET, GLYPH_INSET, GLYPH_SIZE - 2 * GLYPH_INSET);
  return walls.map((side) => box[side]);
}

/** The points of a V that opens to the top, before it is turned to face its side. */
export const ANGLE_POINTS: Point[] = [
  [GLYPH_INSET, GLYPH_INSET + 1],
  [GLYPH_SIZE / 2, GLYPH_SIZE - GLYPH_INSET - 1],
  [GLYPH_SIZE - GLYPH_INSET, GLYPH_INSET + 1],
];

/** Where the dot of a V sits before turning: inside its open mouth. */
export const ANGLE_DOT: Point = [GLYPH_SIZE / 2, GLYPH_INSET + 4];

/** How far to turn a V, in degrees clockwise, so that it opens toward a side. */
export const TURN: Record<Side, number> = { top: 0, right: 90, bottom: 180, left: 270 };

/** The grid lines of a noughts-and-crosses grid. */
export const SQUARE_GRID_LINES: Line[] = [1, 2].flatMap((n): Line[] => [
  [[n * CELL, 0], [n * CELL, GRID_SIZE]],
  [[0, n * CELL], [GRID_SIZE, n * CELL]],
]);

const NEAR = X_INSET;
const FAR = GRID_SIZE - X_INSET;
const MIDDLE = GRID_SIZE / 2;

/** The two arms of an X grid. */
export const X_GRID_LINES: Line[] = [
  [[NEAR, NEAR], [FAR, FAR]],
  [[FAR, NEAR], [NEAR, FAR]],
];

/** The corners an X cell lies between, by the side of the X it is on. */
const X_CORNERS: Record<Side, [Point, Point]> = {
  top: [[NEAR, NEAR], [FAR, NEAR]],
  right: [[FAR, NEAR], [FAR, FAR]],
  bottom: [[NEAR, FAR], [FAR, FAR]],
  left: [[NEAR, NEAR], [NEAR, FAR]],
};

/** How far from the middle of an X the letter of a cell is written. */
const X_LETTER_REACH = 27;

/** The middle of the cell a letter sits in, inside its grid. */
export function cellCentre(glyph: Glyph): Point {
  if (glyph.shape === "square") {
    return [((glyph.cell % 3) + 0.5) * CELL, (Math.floor(glyph.cell / 3) + 0.5) * CELL];
  }
  const reach: Record<Side, Point> = { top: [0, -1], right: [1, 0], bottom: [0, 1], left: [-1, 0] };
  const [dx, dy] = reach[glyph.opens!];
  return [MIDDLE + dx * X_LETTER_REACH, MIDDLE + dy * X_LETTER_REACH];
}

/** The parts of a grid's lines that make up one letter's symbol. */
export function cellLines(glyph: Glyph): Line[] {
  if (glyph.shape === "angle") {
    return X_CORNERS[glyph.opens!].map((corner): Line => [[MIDDLE, MIDDLE], corner]);
  }
  const box = edges((glyph.cell % 3) * CELL, Math.floor(glyph.cell / 3) * CELL, CELL);
  return glyph.walls.map((side) => box[side]);
}
