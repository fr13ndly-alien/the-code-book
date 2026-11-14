import { describe, glyphOf } from "@codebook/cipher-engine/pigpen";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { PigpenGrids } from "./PigpenGrids";
import { PigpenMessage } from "./PigpenMessage";
import { SymbolCounts } from "./SymbolCounts";
import type { PigpenState } from "./usePigpen";

/** The four grids of the key, the message in symbols, and a count of the symbols. */
export function PigpenBoard({ state, onPick }: { state: PigpenState; onPick: (letter: string) => void }) {
  const glyph = state.picked ? glyphOf(state.picked) : undefined;

  return (
    <Board>
      <PigpenGrids picked={state.picked} onPick={onPick} />
      <Caption>
        {glyph ? (
          <>
            <Letters>{glyph.letter}</Letters> lives in grid {glyph.grid + 1}. Sketch the lines around it and you get
            its symbol: {describe(glyph)}.
          </>
        ) : (
          "Tap a letter in a grid, or a symbol in the message. The bright lines around the letter are its symbol."
        )}
      </Caption>
      <PigpenMessage text={state.text} hidden={state.hidden} picked={state.picked} onPick={onPick} />
      <SymbolCounts text={state.text} picked={state.picked} onPick={onPick} />
    </Board>
  );
}
