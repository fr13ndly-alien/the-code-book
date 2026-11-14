import { outputOf, toTape } from "@codebook/cipher-engine/lorenz";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { Adding } from "./Adding";
import { Tape } from "./Tape";
import { stepsOf, type LorenzState } from "./useLorenz";

/** The input tape, the sum for one character, and the output tape. */
export function LorenzBoard({ state, onPick }: { state: LorenzState; onPick: (at: number) => void }) {
  const steps = stepsOf(state);
  const step = steps[state.picked];

  return (
    <Board>
      <Tape label="Input tape" symbols={toTape(state.text)} picked={state.picked} onPick={onPick} />
      {step && <Adding step={step} />}
      <Tape label="Output tape" symbols={outputOf(steps)} kind="cipher" picked={state.picked} onPick={onPick} />
      <Caption>
        {step
          ? "A simplified model: five wheels that all step once per character, with invented pins. The real machine had twelve wheels."
          : "Type a message below to punch a tape."}
      </Caption>
    </Board>
  );
}
