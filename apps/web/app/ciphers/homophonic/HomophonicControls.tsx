import type { Dispatch } from "react";
import { numbersOf, plainOf } from "@codebook/cipher-engine/homophonic";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { stepsOf, type HomophonicAction, type HomophonicState } from "./useHomophonic";

/** The HTML controls of the homophonic page: the table, the message and the result. */
export function HomophonicControls(props: { state: HomophonicState; dispatch: Dispatch<HomophonicAction> }) {
  const { state, dispatch } = props;
  const enciphering = state.mode === "encipher";
  const steps = stepsOf(state);

  return (
    <Controls>
      <Row>
        <Stepper label="Table" value={state.table} onStep={(by) => dispatch({ type: "deal", by })} />
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>
          {enciphering ? numbersOf(steps) : plainOf(steps)}
        </Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Your message" : "The ciphertext, in two-digit numbers"}
          value={state.text}
          rows={2}
          onChange={(text) => dispatch({ type: "type", text })}
        />
        <Choice
          label="I want to"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encipher", label: "Encipher" },
            { value: "decipher", label: "Decipher" },
          ]}
        />
      </Row>
      {enciphering && (
        <Row>
          <Stepper label="Roll the picks again" value={state.picks} onStep={(by) => dispatch({ type: "roll", by })} />
        </Row>
      )}
    </Controls>
  );
}
