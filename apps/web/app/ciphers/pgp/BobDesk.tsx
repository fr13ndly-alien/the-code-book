import { keyUnder, open, unlockMessage } from "@codebook/cipher-engine/pgp";
import { lettersOnly } from "@codebook/cipher-engine/text";
import { useT } from "~/i18n";
import { Desk, Line, Working } from "./Desk";
import { BOB, envelope, type PgpState } from "./usePgp";

/** Bob's side: his two keys, and the two locks undone in order. */
export function BobDesk({ state }: { state: PgpState }) {
  const t = useT();
  const { ciphertext, lockedKey } = envelope(state);
  const { sessionKey, message } = open({ ciphertext, lockedKey }, BOB);
  return (
    <Desk title={t({ en: "Bob", vi: "Bob" })} note={t({ en: "unlocks", vi: "mở khóa" })}>
      <Line label={t({ en: "Public key, which he gives to everyone", vi: "Khóa công khai, anh đưa cho mọi người" })}>
        N = {BOB.n}, e = {BOB.e}
      </Line>
      <Line label={t({ en: "Private key, which never leaves this desk", vi: "Khóa riêng, không bao giờ rời khỏi bàn này" })} secret>
        d = {BOB.d}
      </Line>
      {state.stage >= 5 && (
        <Working
          label={t({ en: "Unlocking the session key with Bob's private key", vi: "Mở khóa phiên bằng khóa riêng của Bob" })}
          rows={[
            { label: t({ en: "Part 2", vi: "Phần 2" }), cells: lockedKey, secret: true },
            { label: t({ en: `To the power ${BOB.d}, mod ${BOB.n}`, vi: `Lũy thừa ${BOB.d}, mod ${BOB.n}` }), cells: lockedKey.map((_, i) => sessionKey.charCodeAt(i)) },
            { label: t({ en: "Session key", vi: "Khóa phiên" }), cells: [...sessionKey] },
          ]}
        />
      )}
      {state.stage >= 6 && (
        <>
          <Working
            label={t({ en: "Unlocking the message with the session key", vi: "Mở tin nhắn bằng khóa phiên" })}
            rows={[
              { label: t({ en: "Part 1", vi: "Phần 1" }), cells: [...lettersOnly(ciphertext)], secret: true },
              { label: t({ en: "Session key", vi: "Khóa phiên" }), cells: [...keyUnder(ciphertext, sessionKey)] },
              { label: t({ en: "Shifted back", vi: "Dịch ngược lại" }), cells: [...lettersOnly(unlockMessage(ciphertext, sessionKey))] },
            ]}
          />
          <Line label={t({ en: "Bob reads", vi: "Bob đọc được" })}>{message}</Line>
        </>
      )}
    </Desk>
  );
}
