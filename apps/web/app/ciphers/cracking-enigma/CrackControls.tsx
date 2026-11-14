import type { Dispatch } from "react";
import { clashes, ROTOR_POSITIONS } from "@codebook/cipher-engine/cracking-enigma";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import styles from "./CrackControls.module.css";
import { DAY_CABLES, fingerprint, type CrackAction, type CrackState } from "./useCrack";

interface Props {
  state: CrackState;
  dispatch: Dispatch<CrackAction>;
}

const ROTOR_LABELS = ["Left rotor", "Middle rotor", "Right rotor"] as const;

/** The HTML controls of the page: a choice of attack, then the controls of that attack. */
export function CrackControls({ state, dispatch }: Props) {
  const chains = state.tool === "chains";
  return (
    <Controls>
      <Row>
        <Choice
          label="Attack"
          value={state.tool}
          onChange={(tool) => dispatch({ type: "use", tool })}
          options={[
            { value: "chains", label: "Rejewski's chains" },
            { value: "crib", label: "Turing's crib" },
          ]}
        />
        {chains ? (
          <Output label="Chain lengths today">{fingerprint(state)}</Output>
        ) : (
          <Output label="Message">{message(state)}</Output>
        )}
      </Row>
      {chains ? <ChainControls state={state} dispatch={dispatch} /> : <CribControls state={state} dispatch={dispatch} />}
    </Controls>
  );
}

/** What the crib search has revealed so far, in words or as the message itself. */
function message({ stops }: CrackState): string {
  if (!stops) return "Not tested yet";
  return stops[0]?.plaintext ?? "No rotor setting fits here";
}

/** The day key the reader can change: three rotor starts, six cables, and which letters to compare. */
function ChainControls({ state, dispatch }: Props) {
  return (
    <>
      <Row>
        {ROTOR_LABELS.map((label, slot) => (
          <Stepper
            key={label}
            label={label}
            value={letterAt(state.start[slot]!)}
            onStep={(by) => dispatch({ type: "turn", slot: slot as 0 | 1 | 2, by })}
          />
        ))}
      </Row>
      <Row>
        <div className={styles.cables} role="group" aria-label="Plugboard cables">
          <span>Plugboard cables (press to pull out or put back)</span>
          <div>
            {DAY_CABLES.map((cable) => (
              <button
                key={cable}
                type="button"
                aria-pressed={state.cables.includes(cable)}
                onClick={() => dispatch({ type: "plug", cable })}
              >
                {cable[0]}–{cable[1]}
              </button>
            ))}
          </div>
        </div>
        <Choice
          label="Compare letters"
          value={String(state.pair)}
          onChange={(pair) => dispatch({ type: "compare", pair: Number(pair) as 0 | 1 | 2 })}
          options={[
            { value: "0", label: "1 and 4" },
            { value: "1", label: "2 and 5" },
            { value: "2", label: "3 and 6" },
          ]}
        />
      </Row>
    </>
  );
}

/** The crib, where it sits, and the button that runs the search. */
function CribControls({ state, dispatch }: Props) {
  const clash = clashes(state.ciphertext, state.crib, state.offset).length > 0;
  return (
    <Row>
      <Stepper label="Crib starts at letter" value={state.offset + 1} onStep={(by) => dispatch({ type: "slide", by })} />
      <TextField
        label="Crib (your guess)"
        width="short"
        value={state.crib}
        onChange={(crib) => dispatch({ type: "guess", crib })}
      />
      <Button primary disabled={clash || state.crib === ""} onClick={() => dispatch({ type: "test" })}>
        Test {ROTOR_POSITIONS.toLocaleString("en")} rotor settings
      </Button>
    </Row>
  );
}
