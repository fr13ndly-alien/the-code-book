import { Desk, Line } from "./Desk";
import { envelope, SENT, type PgpState } from "./usePgp";

/** The envelope: the two locked parts, and whether they have been sent. */
export function EnvelopeDesk({ state }: { state: PgpState }) {
  const { ciphertext, lockedKey } = envelope(state);
  const sent = state.stage >= SENT;
  return (
    <Desk title="The envelope" note={sent ? "sent: anyone on the way can copy it" : "not sent yet"}>
      <Line label="Part 1, the locked message" secret>
        {state.stage >= 2 ? ciphertext : "empty"}
      </Line>
      <Line label="Part 2, the locked session key" secret>
        {state.stage >= 3 ? lockedKey.join(" ") : "empty"}
      </Line>
    </Desk>
  );
}
