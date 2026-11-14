import type { Dispatch } from "react";
import { tryAllStaffs } from "@codebook/cipher-engine/scytale";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import styles from "./ScytaleControls.module.css";
import {
  MAX_LETTERS,
  MAX_PER_TURN,
  MIN_PER_TURN,
  linesOnStaff,
  output,
  stripTurns,
  type ScytaleAction,
  type ScytaleState,
} from "./useScytale";

/** The HTML controls of the scytale page: the staff, the message, the strip and the result. */
export function ScytaleControls({ state, dispatch }: { state: ScytaleState; dispatch: Dispatch<ScytaleAction> }) {
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Stepper
          label="Thickness: letters a turn"
          value={state.perTurn}
          onStep={(by) => dispatch({ type: "resize", by })}
        />
        <Output label={enciphering ? "Ciphertext: the unwound strip" : "Plaintext: read along the staff"}>
          {output(state)}
        </Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? `Your message (${MAX_LETTERS} letters at most)` : "The letters on the strip"}
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
        <Stepper
          label="Turn the staff"
          value={`Line ${state.facing + 1}`}
          onStep={(by) => dispatch({ type: "roll", by })}
        />
        <Output label="The lines on the staff">{linesOnStaff(state).join("\n")}</Output>
      </Row>
      <Row>
        <Output label="The unwound strip, one group for each turn">{stripTurns(state).join(" ")}</Output>
      </Row>
      {!enciphering && (
        <details className={styles.attack}>
          <summary>Try every staff at once</summary>
          <ol start={MIN_PER_TURN}>
            {tryAllStaffs(state.text, MAX_PER_TURN).map((reading, index) => (
              <li key={index} data-on={index + MIN_PER_TURN === state.perTurn}>
                {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
