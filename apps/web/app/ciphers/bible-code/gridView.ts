import { positions } from "@codebook/cipher-engine/bible-code";

/** Letters per row when the skip is 1 and the sequence simply runs along the line. */
const WRAP = 12;

/** The most columns shown at once: what fits across a phone. */
const MAX_COLUMNS = 13;

/** Rows shown above and below the sequence, so it sits in its surroundings. */
const CONTEXT = 2;

/** The part of the text grid that is on show, cut out round one sequence. */
export interface GridView {
  /** Letters per row of the whole grid: the skip, so the sequence runs straight down. */
  width: number;
  /** Rows in the whole grid. */
  rows: number;
  /** The row and column of the whole grid that the top left cell on show comes from. */
  firstRow: number;
  firstColumn: number;
  /** The letters on show: cells[row][column]. Empty past the end of the text. */
  cells: string[][];
}

const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

/**
 * Lays the letters out in rows as wide as the skip and cuts out the rows the sequence
 * passes through. `step` is the skip, negative when the sequence runs backwards.
 */
export function gridView(letters: string, start: number, step: number, length: number): GridView {
  const width = Math.abs(step) === 1 ? WRAP : Math.abs(step);
  const rows = Math.ceil(letters.length / width);
  const landed = positions(letters.length, start, step, length).map((at) => Math.floor(at / width));
  const firstRow = Math.max(0, Math.min(...landed) - CONTEXT);
  const lastRow = Math.min(rows - 1, Math.max(...landed) + CONTEXT);
  const columns = Math.min(width, MAX_COLUMNS);
  const firstColumn = clamp((start % width) - Math.floor(columns / 2), 0, width - columns);

  const cells = Array.from({ length: lastRow - firstRow + 1 }, (_, row) =>
    Array.from({ length: columns }, (_, column) => letters[(firstRow + row) * width + firstColumn + column] ?? ""),
  );
  return { width, rows, firstRow, firstColumn, cells };
}

/** The position in the text of a cell on show. */
export const positionAt = (view: GridView, row: number, column: number) =>
  (view.firstRow + row) * view.width + view.firstColumn + column;
