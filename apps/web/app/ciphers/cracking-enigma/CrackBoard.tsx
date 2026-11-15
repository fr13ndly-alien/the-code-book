import { Board } from "~/components/sim/Board";
import { ChainsBoard } from "./ChainsBoard";
import { CribBoard } from "./CribBoard";
import type { CrackState } from "./useCrack";

/** The simulator: whichever of the two attacks the reader has chosen. */
export function CrackBoard({ state, onPick }: { state: CrackState; onPick: (column: number) => void }) {
  return <Board>{state.tool === "chains" ? <ChainsBoard state={state} onPick={onPick} /> : <CribBoard state={state} />}</Board>;
}
