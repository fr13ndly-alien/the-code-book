import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { Counts } from "./Counts";
import { Path } from "./Path";
import { Plugboard } from "./Plugboard";
import { Strip } from "./Strip";
import { Switches } from "./Switches";
import { ciphertextOf, stepsOf, type PurpleState } from "./usePurple";

/** The Purple machine at work on one letter, or the letter counts of its ciphertext. */
export function PurpleBoard({ state, onPick }: { state: PurpleState; onPick: (at: number) => void }) {
  if (state.view === "count") {
    return (
      <Board>
        <Counts ciphertext={ciphertextOf(state)} plugboard={state.plugboard} sixesFirst={state.sixesFirst} />
      </Board>
    );
  }
  const steps = stepsOf(state);
  const step = steps[state.picked];

  return (
    <Board>
      {step ? (
        <>
          <Strip steps={steps} picked={state.picked} onPick={onPick} />
          <Plugboard plugboard={state.plugboard} lit={step.input} />
          <Switches step={step} motion={state.motion} />
          <Path step={step} settings={state} mode={state.mode} />
        </>
      ) : (
        <>
          <Plugboard plugboard={state.plugboard} />
          <Caption>Type a message below to send it through the switches.</Caption>
        </>
      )}
    </Board>
  );
}
