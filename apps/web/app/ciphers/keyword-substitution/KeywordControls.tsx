import type { Dispatch } from "react";
import { commonestLetter } from "@codebook/cipher-engine/keyword-substitution";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { output, type KeywordAction, type KeywordState } from "./useKeyword";

/** The HTML controls of the keyword cipher page: the keyword, the message and the result. */
export function KeywordControls({ state, dispatch }: { state: KeywordState; dispatch: Dispatch<KeywordAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <TextField
          label="Keyword or keyphrase"
          width="short"
          value={state.keyword}
          onChange={(keyword) => dispatch({ type: "rekey", keyword })}
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
      {!enciphering && (
        <Row>
          <Output label="The commonest letter in the ciphertext">{commonestLetter(state.text)}</Output>
        </Row>
      )}
    </Controls>
  );
}
