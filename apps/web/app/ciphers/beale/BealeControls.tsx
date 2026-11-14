import type { Dispatch } from "react";
import { KEY_TEXTS } from "@codebook/cipher-engine/beale";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { output, stepsOf, type BealeAction, type BealeState } from "./useBeale";

/** Short names for the key texts, to fit three buttons on a phone. */
const SHORT_TITLES: Record<string, string> = {
  declaration: "Declaration",
  gettysburg: "Gettysburg",
  constitution: "Constitution",
};

/** The label of the message box, with a warning when the key text cannot carry a letter. */
function messageLabel(state: BealeState) {
  const lost = [...new Set(stepsOf(state).filter((step) => step.number === 0).map((step) => step.letter))];
  return lost.length === 0 ? "Your message" : `Your message (no word starts with ${lost.join(" or ")})`;
}

/** The HTML controls of the Beale page: the key text, the message and the result. */
export function BealeControls({ state, dispatch }: { state: BealeState; dispatch: Dispatch<BealeAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Choice
          label="Key text"
          value={state.keyId}
          onChange={(keyId) => dispatch({ type: "choose", keyId })}
          options={KEY_TEXTS.map((text) => ({ value: text.id, label: SHORT_TITLES[text.id] ?? text.title }))}
        />
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? messageLabel(state) : "The numbers"}
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
      {enciphering && (
        <Row>
          <Button onClick={() => dispatch({ type: "redraw" })}>Pick different numbers</Button>
        </Row>
      )}
    </Controls>
  );
}
