import { keyNumbers, keyUnder, lockKey, lockMessage } from "@codebook/cipher-engine/pgp";
import { lettersOnly } from "@codebook/cipher-engine/text";
import { Desk, Line, Working } from "./Desk";
import { BOB, type PgpState } from "./usePgp";

/** Alice's side: her message, the session key, and the working of the two locks. */
export function AliceDesk({ state }: { state: PgpState }) {
  const { message, sessionKey, stage } = state;
  if (state.sealed) {
    return (
      <Desk title="Alice" note="writes and locks">
        <Line label="Message">covered: you were not in the room</Line>
      </Desk>
    );
  }
  const letters = lettersOnly(message);
  return (
    <Desk title="Alice" note="writes and locks">
      <Line label="Message">{message || "nothing yet"}</Line>
      {stage >= 1 && (
        <Line label="Session key, picked at random for this message" secret>
          {sessionKey}
        </Line>
      )}
      {stage >= 2 && (
        <Working
          label="Locking the message with the session key"
          rows={[
            { label: "Message", cells: [...letters] },
            { label: "Session key", cells: [...keyUnder(message, sessionKey)] },
            { label: "Shifted", cells: [...lettersOnly(lockMessage(message, sessionKey))], secret: true },
          ]}
        />
      )}
      {stage >= 3 && (
        <Working
          label="Locking the session key with Bob's public key"
          rows={[
            { label: "Session key", cells: [...sessionKey] },
            { label: "As a number", cells: keyNumbers(sessionKey) },
            { label: `To the power ${BOB.e}, mod ${BOB.n}`, cells: lockKey(sessionKey, BOB), secret: true },
          ]}
        />
      )}
    </Desk>
  );
}
