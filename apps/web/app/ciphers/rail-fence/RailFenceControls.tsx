import type { Dispatch } from "react";
import { tryAllRails } from "@codebook/cipher-engine/rail-fence";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import styles from "./RailFenceControls.module.css";
import { MAX_RAILS, MIN_RAILS, output, type RailFenceAction, type RailFenceState } from "./useRailFence";

/** The HTML controls of the rail fence page: the rails, the message and the result. */
export function RailFenceControls({
  state,
  dispatch,
}: {
  state: RailFenceState;
  dispatch: Dispatch<RailFenceAction>;
}) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Stepper label="Rails" value={state.rails} onStep={(by) => dispatch({ type: "step", by })} />
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
          <summary>Try every number of rails at once</summary>
          <ol start={MIN_RAILS}>
            {tryAllRails(state.text, MAX_RAILS).map((reading, index) => (
              <li key={index} data-on={index + MIN_RAILS === state.rails}>
                {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
