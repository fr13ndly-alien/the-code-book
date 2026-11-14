import { Desk, Line } from "./Desk";
import { BOB, envelope, evesLoot, SENT, type PgpState } from "./usePgp";

/** Eve's side: only what travels in the open, and what she can work out from it. */
export function EveDesk({ state }: { state: PgpState }) {
  const sent = state.stage >= SENT;
  const { ciphertext, lockedKey } = envelope(state);
  const loot = evesLoot(state);
  return (
    <Desk title="Eve" note="sees only what travels">
      <Line label="Bob's public key">
        N = {BOB.n}, e = {BOB.e}
      </Line>
      <Line label="Part 1, the locked message" secret>
        {sent ? ciphertext : "not sent yet"}
      </Line>
      <Line label="Part 2, the locked session key" secret>
        {sent ? lockedKey.join(" ") : "not sent yet"}
      </Line>
      {state.cracked && (
        <>
          <Line label={`Dividing N by 2, 3, 4… worked on try ${loot.key.tries}`}>
            {BOB.n} = {loot.key.p} × {loot.key.q}
          </Line>
          <Line label="So Bob's private key is">d = {loot.key.d}</Line>
          {sent && <Line label="Session key">{loot.sessionKey}</Line>}
          {sent && <Line label="Eve reads">{loot.message}</Line>}
        </>
      )}
    </Desk>
  );
}
