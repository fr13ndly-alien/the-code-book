import type { Dispatch } from "react";
import { KEY_LENGTH } from "@codebook/cipher-engine/key-escrow";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { Scanner } from "./Scanner";
import { policeView, readers, type Agency, type EscrowAction, type EscrowPageState } from "./useEscrow";

/** Four letters picked by chance. The randomness is made here, in the view, and stored as plain text. */
const randomHalf = () =>
  Array.from({ length: KEY_LENGTH }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");

/** The button that asks one agency for its half. It only works while there is a warrant. */
function AskAgency(props: { state: EscrowPageState; agency: Agency; onAsk: () => void }) {
  const { state, agency } = props;
  const name = agency === "one" ? "Agency one" : "Agency two";
  if (!state.warrant) {
    return (
      <Button disabled onClick={props.onAsk}>
        {name}: no warrant, no half
      </Button>
    );
  }
  return (
    <Button primary={!state.released[agency]} disabled={state.released[agency]} onClick={props.onAsk}>
      {state.released[agency] ? `${name}: half released` : `${name}: release your half`}
    </Button>
  );
}

/** The HTML controls of the key escrow page: the warrant, the agencies, the critics' cases and Alice's desk. */
export function EscrowControls({ state, dispatch }: { state: EscrowPageState; dispatch: Dispatch<EscrowAction> }) {
  return (
    <Controls>
      <Row>
        <Output label="Who can read the message right now">{readers(state)}</Output>
        <Output label="What the police see">{policeView(state)}</Output>
      </Row>
      <Row>
        <Choice
          label="Warrant from a judge"
          value={state.warrant ? "yes" : "no"}
          onChange={(value) => dispatch({ type: "warrant", on: value === "yes" })}
          options={[
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
        />
        <AskAgency state={state} agency="one" onAsk={() => dispatch({ type: "release", agency: "one" })} />
        <AskAgency state={state} agency="two" onAsk={() => dispatch({ type: "release", agency: "two" })} />
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "leak", agency: "one" })}>An insider at agency one leaks a half</Button>
        <Button onClick={() => dispatch({ type: "steal" })}>Both databases are stolen</Button>
        <Button onClick={() => dispatch({ type: "reset" })}>Put everything back</Button>
      </Row>
      <Row>
        <Choice
          label="The sender uses"
          value={state.escrowed ? "lodged" : "own"}
          onChange={(value) => dispatch({ type: "outlaw", on: value === "own" })}
          options={[
            { value: "lodged", label: "The escrowed cipher" },
            { value: "own", label: "A cipher that is not escrowed" },
          ]}
        />
      </Row>
      {!state.sealed && (
        <Row>
          <TextField
            label="Alice's key, 4 letters (a new key starts again)"
            width="short"
            value={state.key}
            onChange={(text) => dispatch({ type: "rekey", text })}
          />
          <TextField label="Alice's message" value={state.message} onChange={(text) => dispatch({ type: "write", text })} />
          <Button onClick={() => dispatch({ type: "lodge", random: randomHalf() })}>Lodge the key again with new halves</Button>
        </Row>
      )}
      <Scanner />
    </Controls>
  );
}
