import { keyUnder, open, unlockMessage } from "@codebook/cipher-engine/pgp";
import { lettersOnly } from "@codebook/cipher-engine/text";
import { Desk, Line, Working } from "./Desk";
import { BOB, envelope, type PgpState } from "./usePgp";

/** Bob's side: his two keys, and the two locks undone in order. */
export function BobDesk({ state }: { state: PgpState }) {
  const { ciphertext, lockedKey } = envelope(state);
  const { sessionKey, message } = open({ ciphertext, lockedKey }, BOB);
  return (
    <Desk title="Bob" note="unlocks">
      <Line label="Public key, which he gives to everyone">
        N = {BOB.n}, e = {BOB.e}
      </Line>
      <Line label="Private key, which never leaves this desk" secret>
        d = {BOB.d}
      </Line>
      {state.stage >= 5 && (
        <Working
          label="Unlocking the session key with Bob's private key"
          rows={[
            { label: "Part 2", cells: lockedKey, secret: true },
            { label: `To the power ${BOB.d}, mod ${BOB.n}`, cells: lockedKey.map((_, i) => sessionKey.charCodeAt(i)) },
            { label: "Session key", cells: [...sessionKey] },
          ]}
        />
      )}
      {state.stage >= 6 && (
        <>
          <Working
            label="Unlocking the message with the session key"
            rows={[
              { label: "Part 1", cells: [...lettersOnly(ciphertext)], secret: true },
              { label: "Session key", cells: [...keyUnder(ciphertext, sessionKey)] },
              { label: "Shifted back", cells: [...lettersOnly(unlockMessage(ciphertext, sessionKey))] },
            ]}
          />
          <Line label="Bob reads">{message}</Line>
        </>
      )}
    </Desk>
  );
}
