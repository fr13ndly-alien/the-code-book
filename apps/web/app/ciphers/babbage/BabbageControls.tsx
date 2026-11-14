import type { Dispatch } from "react";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper } from "~/components/sim/Fields";
import { keyword, plaintext, type BabbageAction, type BabbageState } from "./useBabbage";

/** How much of the plaintext fits in the first row of the controls. */
const PREVIEW_LETTERS = 48;

/** The HTML controls of the Babbage page: the keyword and plaintext so far, and the steps of the attack. */
export function BabbageControls({ state, dispatch }: { state: BabbageState; dispatch: Dispatch<BabbageAction> }) {
  const shift = state.shifts[state.position]!;

  return (
    <Controls>
      <Row>
        <Output label="Keyword so far">{keyword(state)}</Output>
        <Output label="Plaintext so far">{plaintext(state).slice(0, PREVIEW_LETTERS)}…</Output>
      </Row>
      <Row>
        <Choice
          label="Step"
          value={state.stage}
          onChange={(stage) => dispatch({ type: "view", stage })}
          options={[
            { value: "length", label: "1 Key length" },
            { value: "letters", label: "2 Key letters" },
          ]}
        />
        {state.stage === "length" ? (
          <Stepper
            label="Key length (resets the keyword)"
            value={state.keyLength}
            onStep={(by) => dispatch({ type: "resize", by })}
          />
        ) : (
          <>
            <Stepper
              label="Key letter"
              value={`${state.position + 1} of ${state.keyLength}`}
              onStep={(by) => dispatch({ type: "move", by })}
            />
            <Stepper label="Shift" value={`${letterAt(shift)} ${shift}`} onStep={(by) => dispatch({ type: "slide", by })} />
            <Button onClick={() => dispatch({ type: "solve" })}>Find this shift for me</Button>
          </>
        )}
      </Row>
    </Controls>
  );
}
