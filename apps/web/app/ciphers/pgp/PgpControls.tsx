import type { Dispatch } from "react";
import { sessionKeyFrom } from "@codebook/cipher-engine/pgp";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { STEPS, travelling, type PgpAction, type PgpState } from "./usePgp";

const KEY_LENGTH = 4;

/** A fresh session key. The randomness is made here, in the view, and stored as plain letters. */
const randomSessionKey = () => sessionKeyFrom(Array.from({ length: KEY_LENGTH }, () => Math.floor(Math.random() * 26)));

/** The HTML controls of the PGP page: the step, what travels, the message and whose view to take. */
export function PgpControls({ state, dispatch }: { state: PgpState; dispatch: Dispatch<PgpAction> }) {
  const next = STEPS[state.stage];

  return (
    <Controls>
      <Row>
        <Stepper
          label="Step"
          value={`${state.stage} of ${STEPS.length}`}
          onStep={(by) => dispatch({ type: "step", by })}
        />
        <Output label="What travels">{travelling(state)}</Output>
      </Row>
      <Row>
        <Button primary disabled={!next} onClick={() => dispatch({ type: "step", by: 1 })}>
          {next ? `Next step: ${next}` : "Bob has read the message"}
        </Button>
        <Button onClick={() => dispatch({ type: "step", by: -STEPS.length })}>Back to step 0</Button>
      </Row>
      <Row>
        <TextField
          label="Alice's message (changing it starts again)"
          value={state.sealed ? "" : state.message}
          onChange={(text) => dispatch({ type: "write", text })}
        />
        <Choice
          label="Look through the eyes of"
          value={state.viewer}
          onChange={(viewer) => dispatch({ type: "look", viewer })}
          options={[
            { value: "friends", label: "Alice and Bob" },
            { value: "eve", label: "Eve" },
          ]}
        />
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "shuffle", sessionKey: randomSessionKey() })}>New session key</Button>
        <Button disabled={state.cracked} onClick={() => dispatch({ type: "factor" })}>
          Eve: split N into its primes
        </Button>
      </Row>
    </Controls>
  );
}
