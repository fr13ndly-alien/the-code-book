import type { Dispatch } from "react";
import { padFromBytes, SHEET_LENGTH } from "@codebook/cipher-engine/one-time-pad";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { output, type PadAction, type PadState } from "./usePad";

/** A new sheet of random letters. The randomness lives here, in the view, so the engine stays pure. */
function freshSheet(): string {
  // Twice as many bytes as letters: a few bytes are thrown away to keep every letter equally likely.
  const bytes = crypto.getRandomValues(new Uint8Array(SHEET_LENGTH * 2));
  return padFromBytes([...bytes]).slice(0, SHEET_LENGTH);
}

/** The HTML controls of the one-time pad page: the sheet, the message and the two experiments. */
export function PadControls({ state, dispatch }: { state: PadState; dispatch: Dispatch<PadAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <TextField label="Pad (this sheet)" value={state.pad} onChange={(pad) => dispatch({ type: "write", pad })} />
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? `Your message (up to ${SHEET_LENGTH} letters)` : "The ciphertext"}
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
        <Button primary onClick={() => dispatch({ type: "tear", pad: freshSheet() })}>
          Tear off the sheet
        </Button>
      </Row>
      <Row>
        <TextField
          label="Another message it could be"
          value={state.claim}
          onChange={(text) => dispatch({ type: "claim", text })}
        />
        <TextField
          label="A second message on the same sheet"
          value={state.second}
          onChange={(text) => dispatch({ type: "reuse", text })}
        />
      </Row>
    </Controls>
  );
}
