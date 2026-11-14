import type { Dispatch } from "react";
import { tryAllShifts } from "@codebook/cipher-engine/caesar";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import styles from "./CaesarControls.module.css";
import { output, type CaesarAction, type CaesarState } from "./useCaesar";

/** The HTML controls of the Caesar page: the shift, the message and the result. */
export function CaesarControls({ state, dispatch }: { state: CaesarState; dispatch: Dispatch<CaesarAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Stepper label="Shift" value={state.shift} onStep={(by) => dispatch({ type: "turn", by })} />
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
        <details className={styles.attack}>
          <summary>Try every shift at once</summary>
          <ol start={0}>
            {tryAllShifts(state.text).map((reading, shift) => (
              <li key={shift} data-on={shift === state.shift}>
                {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
