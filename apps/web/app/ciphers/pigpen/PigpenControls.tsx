import type { Dispatch } from "react";
import { describe, glyphOf } from "@codebook/cipher-engine/pigpen";
import { lettersOnly } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import type { PigpenAction, PigpenState } from "./usePigpen";

/** The picked letter and its symbol in words: "A: lines on the right and bottom". */
function pickedAsText(letter: string | undefined): string {
  const glyph = letter ? glyphOf(letter) : undefined;
  return glyph ? `${glyph.letter}: ${describe(glyph)}` : "";
}

/** The HTML controls of the pigpen page: the message and the symbol being looked at. */
export function PigpenControls({ state, dispatch }: { state: PigpenState; dispatch: Dispatch<PigpenAction> }) {
  return (
    <Controls>
      <Row>
        <Output label="The symbol you tapped">{pickedAsText(state.picked)}</Output>
        {state.hidden ? (
          <Button onClick={() => dispatch({ type: "reveal" })}>Show every letter</Button>
        ) : (
          <Output label="Symbols in the message">{String(lettersOnly(state.text).length)}</Output>
        )}
      </Row>
      {!state.hidden && (
        <Row>
          <TextField
            label="Your message"
            value={state.text}
            onChange={(text) => dispatch({ type: "type", text })}
          />
        </Row>
      )}
    </Controls>
  );
}
