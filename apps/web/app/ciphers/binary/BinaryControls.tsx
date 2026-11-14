import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { output, type BinaryAction, type BinaryState } from "./useBinary";

/** The HTML controls of the binary page: the direction, the message, the key and the result. */
export function BinaryControls({ state, dispatch }: { state: BinaryState; dispatch: Dispatch<BinaryAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Choice
          label="I want to"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encipher", label: "Encipher" },
            { value: "decipher", label: "Decipher" },
          ]}
        />
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Your message" : "The ciphertext, in ones and zeros"}
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
        />
        <TextField
          label="Key"
          width="short"
          value={state.key}
          onChange={(key) => dispatch({ type: "rekey", key })}
        />
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "unflip" })} disabled={state.flips.length === 0}>
          Undo my flipped digits
        </Button>
      </Row>
    </Controls>
  );
}
