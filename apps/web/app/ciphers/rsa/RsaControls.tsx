import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { keysOf, output, type RsaAction, type RsaState } from "./useRsa";

/** The HTML controls of the RSA page: the key, the message and the attack. */
export function RsaControls({ state, dispatch }: { state: RsaState; dispatch: Dispatch<RsaAction> }) {
  const keys = keysOf(state);
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Output label="Public key">
          N = {keys.n}, e = {keys.e}
        </Output>
        <Output label={enciphering ? "Ciphertext C" : "Message M"}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Message: a letter or a number" : "Ciphertext: a number"}
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
          width="short"
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
        <Button onClick={() => dispatch({ type: "attack" })}>
          {state.attacked ? "Call Eve off" : "Let Eve factor N"}
        </Button>
      </Row>
      {!state.youAreEve && (
        <Row>
          <Stepper label="Prime p" value={state.p} onStep={(by) => dispatch({ type: "turnP", by })} />
          <Stepper label="Prime q" value={state.q} onStep={(by) => dispatch({ type: "turnQ", by })} />
          <Stepper label="Public e" value={state.e} onStep={(by) => dispatch({ type: "turnE", by })} />
        </Row>
      )}
    </Controls>
  );
}
