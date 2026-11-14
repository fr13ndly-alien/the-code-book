import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import { output, pairs, type KamaSutraAction, type KamaSutraState } from "./useKamaSutra";

/** The HTML controls of the Kama Sutra page: the pairs, the message and the result. */
export function KamaSutraControls({
  state,
  dispatch,
}: {
  state: KamaSutraState;
  dispatch: Dispatch<KamaSutraAction>;
}) {
  const fromBook = state.seed === 0;

  return (
    <Controls>
      <Row>
        <Output label={fromBook ? "The pairs (from the book)" : `The pairs (shuffle ${state.seed})`}>
          {pairs(state).join(" ")}
        </Output>
        <Output label="After the swap">{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label="Your message, or a ciphertext"
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
        />
      </Row>
      <Row>
        <Button primary onClick={() => dispatch({ type: "shuffle" })}>
          Shuffle the pairs
        </Button>
        <Button disabled={fromBook} onClick={() => dispatch({ type: "restore" })}>
          Use the book's pairs
        </Button>
      </Row>
    </Controls>
  );
}
