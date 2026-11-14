import {
  ciphertext,
  cleanKey,
  keyInUse,
  lodged,
  whatPoliceCanRead,
  whatThiefCanRead,
} from "@codebook/cipher-engine/key-escrow";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { Desk, Line, Working } from "./Desk";
import { numbered } from "./numbered";
import { ReaderDesk } from "./ReaderDesk";
import type { Agency, EscrowPageState } from "./useEscrow";

/** Alice's side: her key, the sum that splits it, and her message. Covered during the challenge. */
function AliceDesk({ state }: { state: EscrowPageState }) {
  if (state.sealed) {
    return (
      <Desk title="Alice" note="has lodged a key">
        <Line label="Her desk">covered: you are the police now</Line>
      </Desk>
    );
  }
  const halves = lodged(state);
  return (
    <Desk title="Alice" note="lodges her key, then writes to Bob">
      <Working
        label="Splitting the key in two"
        rows={[
          { label: "Her key", cells: numbered(cleanKey(state.key)), secret: true },
          { label: "Half one: letters picked by chance", cells: numbered(halves.one) },
          { label: "Half two: key minus half one", cells: numbered(halves.two) },
        ]}
      />
      <Line label="How to count">A is 0 and Z is 25. Below 0, add 26.</Line>
      {!state.escrowed && (
        <Line label="Her own key, which she never lodged" secret>
          {keyInUse(state)}
        </Line>
      )}
      <Line label="Message to Bob">{state.message || "nothing yet"}</Line>
    </Desk>
  );
}

/** Where an agency's half is now, in words. */
function status(state: EscrowPageState, agency: Agency): string {
  const released = state.warrant && state.released[agency];
  if (released && state.stolen[agency]) return "released to the police, and a thief has a copy";
  if (released) return "released to the police under the warrant";
  if (state.stolen[agency]) return "a thief has a copy";
  return state.warrant ? "locked away, waiting to be asked" : "locked away: no warrant, no release";
}

/** One of the two agencies: the half it stores and where that half has gone. */
function AgencyDesk({ state, agency }: { state: EscrowPageState; agency: Agency }) {
  const out = (state.warrant && state.released[agency]) || state.stolen[agency];
  return (
    <Desk title={agency === "one" ? "Agency one" : "Agency two"} note="stores half the key">
      <Line label={`Half ${agency} in its database`} secret>
        {state.sealed && !out ? "hidden" : lodged(state)[agency]}
      </Line>
      <Line label="Where it is">{status(state, agency)}</Line>
    </Desk>
  );
}

/** Key escrow as desks: Alice lodges a key, two agencies hold the halves, the police ask for them. */
export function EscrowBoard({ state }: { state: EscrowPageState }) {
  const thief = whatThiefCanRead(state);
  return (
    <Board>
      <AliceDesk state={state} />
      <AgencyDesk state={state} agency="one" />
      <AgencyDesk state={state} agency="two" />
      <Desk title="On the wire" note="anyone can copy it">
        <Line label={state.escrowed ? "Ciphertext, made with the lodged key" : "Ciphertext, made with a key nobody lodged"} secret>
          {ciphertext(state)}
        </Line>
      </Desk>
      <ReaderDesk title="The police" note="want to read it" reading={whatPoliceCanRead(state)}>
        <Line label="Warrant from a judge">{state.warrant ? "yes" : "no"}</Line>
      </ReaderDesk>
      {(thief.one ?? thief.two) && <ReaderDesk title="A thief" note="has no warrant and needs none" reading={thief} />}
      <Caption>
        Everything here is a toy. A real escrowed key was a long binary number sealed inside a chip, not four letters.
      </Caption>
    </Board>
  );
}
