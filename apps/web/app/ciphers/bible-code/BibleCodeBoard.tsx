import { positions } from "@codebook/cipher-engine/bible-code";
import { TEXTS } from "@codebook/cipher-engine/bible-code";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { gridView, positionAt, type GridView } from "./gridView";
import { letters, output, type BibleCodeState } from "./useBibleCode";

/** Says which way the highlighted letters run through the grid. */
function shape(state: BibleCodeState): string {
  if (state.skip === 1) return state.direction === 1 ? "A skip of 1 is ordinary reading." : "A skip of 1, read backwards.";
  const way = state.direction === 1 ? "down" : "up";
  return `Each row holds ${state.skip} letters, so a jump of ${state.skip} lands in the same column. Read ${way} it.`;
}

/** Says which part of the whole grid is on show. */
function extent(view: GridView): string {
  const lastRow = view.firstRow + view.cells.length;
  const columns = view.cells[0]?.length ?? 0;
  const across = columns < view.width ? `, columns ${view.firstColumn + 1} to ${view.firstColumn + columns}` : "";
  return `Showing rows ${view.firstRow + 1} to ${lastRow} of ${view.rows}${across}.`;
}

/** The passage as a grid as wide as the skip, with the equidistant letters lit. */
export function BibleCodeBoard({ state, onPick }: { state: BibleCodeState; onPick: (position: number) => void }) {
  const text = letters(state);
  const step = state.skip * state.direction;
  const view = gridView(text, state.start, step, state.length);
  const landed = new Set(positions(text.length, state.start, step, state.length));

  return (
    <Board>
      <LetterGrid
        label={`${TEXTS[state.text].title}, in rows of ${view.width} letters`}
        cells={view.cells}
        size="small"
        mark={(row, column) => (landed.has(positionAt(view, row, column)) ? "on" : undefined)}
        onPick={(row, column) => onPick(positionAt(view, row, column))}
      />
      <Caption>
        The lit letters spell <Letters>{output(state)}</Letters>. {shape(state)} {extent(view)} Tap a letter to start
        from it.
      </Caption>
    </Board>
  );
}
