import { fence, readRails } from "@codebook/cipher-engine/rail-fence";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { RailReadout } from "./RailReadout";
import { plaintext, type RailFenceState } from "./useRailFence";

/** Messages longer than this are drawn with small cells, to keep the fence short. */
const LARGE_CELLS_UP_TO = 8;

/** The message written zig-zag on the rails, and the rails read off below it. */
export function RailFenceBoard({ state, onPick }: { state: RailFenceState; onPick: (rail: number) => void }) {
  const plain = plaintext(state);
  const cells = fence(plain, state.rails);
  const columns = cells[0]?.length ?? 0;

  return (
    <Board>
      <LetterGrid
        label="The message written on the rails"
        cells={cells}
        rowHeads={cells.map((_, rail) => String(rail + 1))}
        size={columns > LARGE_CELLS_UP_TO ? "small" : "large"}
        mark={(rail) => (rail === state.picked ? "on" : undefined)}
        onPick={(rail) => onPick(rail)}
      />
      <RailReadout rails={readRails(plain, state.rails)} picked={state.picked} onPick={onPick} />
      <Caption>
        {state.mode === "encipher"
          ? "Write the message down and up the rails. Then read rail 1, rail 2 and so on: that is the ciphertext."
          : "The ciphertext is cut into rails and laid back on the fence. Follow the zig-zag to read the message."}
      </Caption>
    </Board>
  );
}
