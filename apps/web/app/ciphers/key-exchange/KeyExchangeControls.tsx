import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, Stepper } from "~/components/sim/Fields";
import { keyText, LAST_STEP, type KeyExchangeAction, type KeyExchangeState } from "./useKeyExchange";

/** The HTML controls of the key exchange page: the public numbers, the secrets and the steps. */
export function KeyExchangeControls(props: { state: KeyExchangeState; dispatch: Dispatch<KeyExchangeAction> }) {
  const { state, dispatch } = props;

  return (
    <Controls>
      <Row>
        <Stepper label="Public Y" value={state.base} onStep={(by) => dispatch({ type: "turnBase", by })} />
        <Stepper label="Public prime P" value={state.modulus} onStep={(by) => dispatch({ type: "turnPrime", by })} />
        <Output label={state.youAreEve ? "The key, if Eve can find it" : "Shared key"}>{keyText(state)}</Output>
      </Row>
      <Row>
        {!state.youAreEve && (
          <>
            <Stepper label="Alice's secret" value={state.aliceSecret} onStep={(by) => dispatch({ type: "turnAlice", by })} />
            <Stepper label="Bob's secret" value={state.bobSecret} onStep={(by) => dispatch({ type: "turnBob", by })} />
          </>
        )}
        <Button primary onClick={() => dispatch({ type: "next" })} disabled={state.step >= LAST_STEP}>
          Next step
        </Button>
        <Button onClick={() => dispatch({ type: "restart" })} disabled={state.youAreEve}>
          Start again
        </Button>
        <Button onClick={() => dispatch({ type: "unleashEve" })} disabled={state.step < 3}>
          {state.eveSearching ? "Hide Eve's guesses" : "Let Eve try every secret"}
        </Button>
      </Row>
    </Controls>
  );
}
