import { GRIDS, glyphOf, type Glyph } from "@codebook/cipher-engine/pigpen";
import { GRID_SIZE, SQUARE_GRID_LINES, X_GRID_LINES, cellCentre, cellLines, type Line } from "./layout";
import styles from "./PigpenGrids.module.css";

/** A position inside a grid as a percentage, for placing an HTML button over the drawing. */
const percent = (value: number) => `${(100 * value) / GRID_SIZE}%`;

/** A set of strokes in a grid drawing. */
function Lines({ lines, className }: { lines: Line[]; className?: string }) {
  return (
    <g className={className}>
      {lines.map(([[x1, y1], [x2, y2]], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
    </g>
  );
}

/** One grid: its lines drawn in SVG, with a button over each cell. The picked letter's lines are lit. */
function Grid(props: { letters: string; picked?: string; onPick: (letter: string) => void }) {
  const glyphs = [...props.letters].map((letter) => glyphOf(letter)!);
  const first = glyphs[0]!;
  const lit = glyphs.find((glyph) => glyph.letter === props.picked);

  return (
    <div className={styles.grid} role="group" aria-label={`Grid ${first.grid + 1}${first.dot ? ", with dots" : ""}`}>
      <svg viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`} aria-hidden="true">
        <Lines lines={first.shape === "square" ? SQUARE_GRID_LINES : X_GRID_LINES} />
        {lit && <Lines lines={cellLines(lit)} className={styles.lit} />}
      </svg>
      {glyphs.map((glyph) => (
        <CellButton key={glyph.letter} glyph={glyph} on={glyph === lit} onPick={props.onPick} />
      ))}
    </div>
  );
}

/** The button over one cell: its letter, and a dot if the grid has dots. */
function CellButton({ glyph, on, onPick }: { glyph: Glyph; on: boolean; onPick: (letter: string) => void }) {
  const [x, y] = cellCentre(glyph);
  return (
    <button
      type="button"
      style={{ left: percent(x), top: percent(y) }}
      aria-pressed={on}
      aria-label={glyph.dot ? `${glyph.letter}, with a dot` : glyph.letter}
      onClick={() => onPick(glyph.letter)}
    >
      {glyph.letter}
      {glyph.dot && <span className={styles.dot} />}
    </button>
  );
}

/** The key of the pigpen cipher: the four grids. Tap a letter to see which lines make its symbol. */
export function PigpenGrids({ picked, onPick }: { picked?: string; onPick: (letter: string) => void }) {
  return (
    <div className={styles.grids}>
      {GRIDS.map((letters) => (
        <Grid key={letters} letters={letters} picked={picked} onPick={onPick} />
      ))}
    </div>
  );
}
