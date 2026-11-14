import type { Dispatch } from "react";
import { toTape } from "@codebook/cipher-engine/lorenz";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, Stepper, TextField } from "~/components/sim/Fields";
import { output, type LorenzAction, type LorenzState } from "./useLorenz";

/** The HTML controls of the Lorenz page: the tapes, the wheel settings and the letter being studied. */
export function LorenzControls({ state, dispatch }: { state: LorenzState; dispatch: Dispatch<LorenzAction> }) {
  const length = toTape(state.text).length;

  return (
    <Controls>
      <Row>
        <Output label="Wheels start at">{state.start.map((at) => at + 1).join(" ")}</Output>
        <Output label="Output tape (9 is a space)">{output(state)}</Output>
      </Row>
      <Row>
        <TextField label="Input tape" value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
        <Stepper
          label="Letter shown"
          value={length ? `${state.picked + 1} of ${length}` : "none"}
          onStep={(by) => dispatch({ type: "move", by })}
        />
      </Row>
      <Row>
        {state.start.map((at, wheel) => (
          <Stepper
            key={wheel}
            label={`Wheel ${wheel + 1}`}
            value={at + 1}
            onStep={(by) => dispatch({ type: "turn", wheel, by })}
          />
        ))}
      </Row>
      <Row>
        <Button primary onClick={() => dispatch({ type: "feedBack" })} disabled={length === 0}>
          Feed the output back in
        </Button>
        <Button onClick={() => dispatch({ type: "rewind" })}>All wheels to 1</Button>
      </Row>
    </Controls>
  );
}
