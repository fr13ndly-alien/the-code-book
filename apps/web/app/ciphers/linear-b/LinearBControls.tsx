import type { Dispatch } from "react";
import { NAMES } from "@codebook/cipher-engine/linear-b";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output } from "~/components/sim/Fields";
import styles from "./LinearBControls.module.css";
import { NAMES_OFFERED, output, pickedName, type LinearBAction, type LinearBState } from "./useLinearB";

/** What the row of name buttons is for, given what the reader has chosen. */
function pickerLabel(state: LinearBState): string {
  if (state.view === "triplet") return "Tap signs on the board to mark the ones all three words share";
  return state.picked ? "What does the chosen word say?" : "Tap a word above, then pick what it says";
}

/** The HTML controls of the Linear B page: the words on the board, their reading and the names to guess. */
export function LinearBControls(props: { state: LinearBState; dispatch: Dispatch<LinearBAction> }) {
  const { state, dispatch } = props;
  const current = pickedName(state);

  return (
    <Controls>
      <Row>
        <Choice
          label="On the board"
          value={state.view}
          onChange={(view) => dispatch({ type: "show", view })}
          options={[
            { value: "triplet", label: "Kober's words" },
            { value: "places", label: "Place names" },
            { value: "tripod", label: "Tripod tablet" },
          ]}
        />
        <Output label="The words read">{output(state)}</Output>
      </Row>
      <div className={styles.picker} role="group" aria-label="Name for the chosen word">
        <span className={styles.label}>{pickerLabel(state)}</span>
        <div className={styles.names}>
          {NAMES_OFFERED[state.view].map((name) => (
            <button
              key={name}
              type="button"
              disabled={!state.picked}
              aria-pressed={name === current}
              onClick={() => dispatch({ type: "guess", name })}
            >
              {NAMES[name].label}
              <span className={styles.spelling}>{NAMES[name].syllables.join("-")}</span>
            </button>
          ))}
          {state.view !== "triplet" && (
            <button type="button" disabled={!current} onClick={() => dispatch({ type: "guess", name: undefined })}>
              Clear
            </button>
          )}
        </div>
      </div>
      <Row>
        <Button onClick={() => dispatch({ type: "fill" })}>Name the three places for me</Button>
        <Button onClick={() => dispatch({ type: "wipe" })}>Forget every guess and mark</Button>
      </Row>
    </Controls>
  );
}
