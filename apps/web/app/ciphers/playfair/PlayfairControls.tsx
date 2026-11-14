import type { Dispatch } from "react";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { output, steps, type PlayfairAction, type PlayfairState } from "./usePlayfair";

/** The HTML controls of the Playfair page: the keyword, the pair in view, the message and the result. */
export function PlayfairControls({ state, dispatch }: { state: PlayfairState; dispatch: Dispatch<PlayfairAction> }) {
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
          label="Pair"
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
