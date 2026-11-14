import type { Dispatch } from "react";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { output, steps, type VigenereAction, type VigenereState } from "./useVigenere";

/** The HTML controls of the Vigenère page: the keyword, the letter in view, the message and the result. */
export function VigenereControls({ state, dispatch }: { state: VigenereState; dispatch: Dispatch<VigenereAction> }) {
  const enciphering = state.mode === "encipher";
  const count = steps(state).length;

  return (
    <Controls>
      <Row>
        <TextField
          label="Keyword"
          width="short"
          value={state.keyword}
          onChange={(keyword) => dispatch({ type: "rekey", keyword })}
        />
        <Stepper
          label="Letter"
          value={count ? `${state.position + 1} of ${count}` : "none"}
          onStep={(by) => dispatch({ type: "step", by })}
        />
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Your message" : "The ciphertext"}
          value={state.text}
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
    </Controls>
  );
}
