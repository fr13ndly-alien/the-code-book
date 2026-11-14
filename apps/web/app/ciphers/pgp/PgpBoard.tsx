import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { AliceDesk } from "./AliceDesk";
import { BobDesk } from "./BobDesk";
import { EnvelopeDesk } from "./EnvelopeDesk";
import { EveDesk } from "./EveDesk";
import type { PgpState } from "./usePgp";

/** What has just happened at each stage, for readers who never open the story. */
const CAPTIONS = [
  "Alice has written a message for Bob. Nothing is locked yet.",
  "Alice's computer picks a session key at random. It will be used for this message only.",
  "The fast lock: each letter of the message is shifted by a letter of the session key.",
  "The slow lock: each letter of the session key becomes a number, locked with Bob's public key.",
  "Both locked parts travel together. Bob's private key stays at home.",
  "Bob's private key turns part 2 back into the session key.",
  "The session key turns part 1 back into the message. Only Bob could do both steps.",
];

const EVE_CAPTION = "Eve can copy everything that travels. Without d she cannot unlock part 2, so she cannot unlock part 1.";
const CRACKED_CAPTION = "A toy N is easy to split. A real one is hundreds of digits long, and nobody knows a quick way.";

/** The hybrid scheme as three desks: Alice's, the envelope and Bob's. Or Eve's desk alone. */
export function PgpBoard({ state }: { state: PgpState }) {
  if (state.viewer === "eve") {
    return (
      <Board>
        <EveDesk state={state} />
        <Caption>{state.cracked ? CRACKED_CAPTION : EVE_CAPTION}</Caption>
      </Board>
    );
  }
  return (
    <Board>
      <AliceDesk state={state} />
      <EnvelopeDesk state={state} />
      <BobDesk state={state} />
      <Caption>
        {CAPTIONS[state.stage]} These are toy locks: real PGP used a cipher called IDEA and far bigger numbers.
      </Caption>
    </Board>
  );
}
