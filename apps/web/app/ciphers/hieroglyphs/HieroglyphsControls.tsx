import type { Dispatch } from "react";
import { SIGNS, SOUNDS } from "@codebook/cipher-engine/hieroglyphs";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output } from "~/components/sim/Fields";
import styles from "./HieroglyphsControls.module.css";
import { output, pickedSign, type HieroglyphsAction, type HieroglyphsState } from "./useHieroglyphs";

/** The HTML controls of the hieroglyphs page: the mystery name, its reading and the sounds to pick from. */
export function HieroglyphsControls(props: { state: HieroglyphsState; dispatch: Dispatch<HieroglyphsAction> }) {
  const { state, dispatch } = props;
  const sign = pickedSign(state);
  const current = sign && state.assignment[sign];

  return (
    <Controls>
      <Row>
        <Choice
          label="Mystery name"
          value={state.mystery}
          onChange={(mystery) => dispatch({ type: "choose", mystery })}
          options={[
            { value: "rameses", label: "Abu Simbel" },
            { value: "alexander", label: "Another" },
          ]}
        />
        <Output label="The mystery name reads">{output(state)}</Output>
      </Row>
      <div className={styles.picker} role="group" aria-label="Sound of the chosen sign">
        <span className={styles.label}>
          {sign ? `Sound of the ${SIGNS[sign].name}` : "Tap a sign above, then pick its sound"}
        </span>
        <div className={styles.sounds}>
          {SOUNDS.map((sound) => (
            <button
              key={sound}
              type="button"
              disabled={!sign}
              aria-pressed={sound === current}
              onClick={() => dispatch({ type: "say", sound })}
            >
              {sound}
            </button>
          ))}
          <button type="button" disabled={!current} onClick={() => dispatch({ type: "say", sound: undefined })}>
            Clear
          </button>
        </div>
      </div>
      <Row>
        <Button onClick={() => dispatch({ type: "fill" })}>Read Ptolemy and Cleopatra for me</Button>
        <Button onClick={() => dispatch({ type: "wipe" })}>Forget every sound</Button>
      </Row>
    </Controls>
  );
}
