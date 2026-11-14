import type { Dispatch } from "react";
import { gridFromNumbers, SYMBOLS } from "@codebook/cipher-engine/adfgvx";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { output, type AdfgvxAction, type AdfgvxState } from "./useAdfgvx";

/** A grid in a random order. The randomness lives here, in the view, so the engine stays pure. */
const randomGrid = () => gridFromNumbers([...SYMBOLS].map(() => Math.random()));

/** The HTML controls of the ADFGVX page: the keyword, the message, the result and a new grid. */
export function AdfgvxControls({ state, dispatch }: { state: AdfgvxState; dispatch: Dispatch<AdfgvxAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <TextField
          label="Keyword"
          width="short"
          value={state.keyword}
          onChange={(keyword) => dispatch({ type: "key", keyword })}
        />
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Your message (letters and digits)" : "The ciphertext"}
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
      <Row>
        <Button onClick={() => dispatch({ type: "shuffle", grid: randomGrid() })}>Shuffle the grid</Button>
      </Row>
    </Controls>
  );
}
