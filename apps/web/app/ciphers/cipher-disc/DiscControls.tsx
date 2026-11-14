import type { Dispatch } from "react";
import { letterAt } from "@codebook/cipher-engine/text";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { output, type DiscAction, type DiscState } from "./useDisc";

/** The HTML controls of the cipher disc page: the setting, the message and how the disc moves. */
export function DiscControls({ state, dispatch }: { state: DiscState; dispatch: Dispatch<DiscAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        {state.turning === "keyword" ? (
          <TextField
            label="Keyword"
            width="short"
            value={state.keyword}
            onChange={(keyword) => dispatch({ type: "key", keyword })}
          />
        ) : (
          <Stepper
            label={state.turning === "fixed" ? "Inner letter beside A" : "Inner letter beside A at the start"}
            value={letterAt(state.shift)}
            onStep={(by) => dispatch({ type: "turn", by })}
          />
        )}
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
      <Row>
        <Choice
          label="While you type, the disc"
          value={state.turning}
          onChange={(turning) => dispatch({ type: "spin", turning })}
          options={[
            { value: "fixed", label: "Stays still" },
            { value: "stepping", label: "Steps" },
            { value: "keyword", label: "Keyword" },
          ]}
        />
      </Row>
    </Controls>
  );
}
