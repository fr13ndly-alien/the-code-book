import type { Dispatch } from "react";
import type { Bit, Run, Scheme } from "@codebook/cipher-engine/quantum";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper } from "~/components/sim/Fields";
import { outcome, STEPS, type QuantumAction, type QuantumState } from "./useQuantum";

const SIZES = ["16", "32", "64"] as const;

const coin = (): Bit => (Math.random() < 0.5 ? 0 : 1);
const scheme = (): Scheme => (Math.random() < 0.5 ? "+" : "x");
const list = <T,>(count: number, make: () => T) => Array.from({ length: count }, make);

/** A fresh exchange. The randomness is made here, in the view, and stored as plain data. */
const randomRun = (count: number): Run => ({
  aliceBits: list(count, coin),
  aliceSchemes: list(count, scheme),
  bobSchemes: list(count, scheme),
  eveSchemes: list(count, scheme),
  eveCoins: list(count, coin),
  bobCoins: list(count, coin),
});

/** What the Eve switch shows. In the challenge it shows neither option as chosen. */
const eveChoice = (state: QuantumState) => (state.eveHidden ? "" : state.eve ? "on" : "off");

/** The HTML controls of the quantum page: the step, the key, Eve, and new photons. */
export function QuantumControls({ state, dispatch }: { state: QuantumState; dispatch: Dispatch<QuantumAction> }) {
  const next = STEPS[state.stage];
  const count = state.run.aliceBits.length;

  return (
    <Controls>
      <Row>
        <Stepper
          label="Step"
          value={`${state.stage} of ${STEPS.length}`}
          onStep={(by) => dispatch({ type: "step", by })}
        />
        <Output label="Secret key">{outcome(state)}</Output>
      </Row>
      <Row>
        <Button primary disabled={!next} onClick={() => dispatch({ type: "step", by: 1 })}>
          {next ? `Next step: ${next}` : "All steps done"}
        </Button>
        <Choice
          label={state.eveHidden ? "Eve is listening (unknown)" : "Eve is listening"}
          value={eveChoice(state)}
          onChange={(value) => dispatch({ type: "listen", eve: value === "on" })}
          options={[
            { value: "off", label: "No" },
            { value: "on", label: "Yes" },
          ]}
        />
      </Row>
      <Row>
        <Choice
          label="Send new photons"
          value={String(count)}
          onChange={(size) => dispatch({ type: "send", run: randomRun(Number(size)) })}
          options={SIZES.map((size) => ({ value: size, label: size }))}
        />
        <Button onClick={() => dispatch({ type: "send", run: randomRun(count) })}>Send {count} again</Button>
      </Row>
    </Controls>
  );
}
