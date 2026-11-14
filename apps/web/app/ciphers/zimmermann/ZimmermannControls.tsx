import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output } from "~/components/sim/Fields";
import { output, type ZimmermannAction, type ZimmermannState } from "./useZimmermann";

/** The HTML controls of the Zimmermann page: which desk, the result, and the ways to undo. */
export function ZimmermannControls(props: { state: ZimmermannState; dispatch: Dispatch<ZimmermannAction> }) {
  const { state, dispatch } = props;
  const encoding = state.mode === "encode";
  const guessed = state.picked !== undefined && state.picked in state.guesses;

  return (
    <Controls>
      <Row>
        <Choice
          label="I am"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encode", label: "The clerk" },
            { value: "break", label: "The codebreaker" },
          ]}
        />
        <Output label={encoding ? "The telegram as sent" : "The telegrams so far"}>{output(state)}</Output>
      </Row>
      {encoding ? (
        <Row>
          <Button onClick={() => dispatch({ type: "rub" })} disabled={state.words.length === 0}>
            Rub out the last word
          </Button>
          <Button onClick={() => dispatch({ type: "clear" })} disabled={state.words.length === 0}>
            Clear the telegram
          </Button>
        </Row>
      ) : (
        <Row>
          <Button onClick={() => dispatch({ type: "forget" })} disabled={!guessed}>
            Rub out this guess
          </Button>
          <Button onClick={() => dispatch({ type: "clear" })}>Rub out every guess</Button>
        </Row>
      )}
    </Controls>
  );
}
