import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { output, type MorseAction, type MorseState } from "./useMorse";

/** The HTML controls of the Morse page: the message, the send button and the telegraph key. */
export function MorseControls({ state, dispatch }: { state: MorseState; dispatch: Dispatch<MorseAction> }) {
  const sending = state.mode === "send";

  return (
    <Controls>
      <Row>
        <Choice
          label="I want to"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "send", label: "Send" },
            { value: "receive", label: "Key by hand" },
          ]}
        />
        <Output label={sending ? "In Morse" : "It reads"}>{output(state)}</Output>
      </Row>
      {sending ? (
        <Row>
          <TextField label="Your message" value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
          <Button primary onClick={() => dispatch({ type: state.sending ? "stop" : "send" })}>
            {state.sending ? "Stop" : "Send"}
          </Button>
        </Row>
      ) : (
        <Row>
          <Button primary onClick={() => dispatch({ type: "key", symbol: "." })}>
            Dot
          </Button>
          <Button primary onClick={() => dispatch({ type: "key", symbol: "-" })}>
            Dash
          </Button>
          <Button onClick={() => dispatch({ type: "gap", after: "letter" })}>Next letter</Button>
          <Button onClick={() => dispatch({ type: "gap", after: "word" })}>Next word</Button>
          <Button onClick={() => dispatch({ type: "rub" })} disabled={state.keyed === ""}>
            Rub out
          </Button>
        </Row>
      )}
    </Controls>
  );
}
