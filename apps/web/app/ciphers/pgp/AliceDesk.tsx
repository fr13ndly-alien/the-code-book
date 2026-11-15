import { keyNumbers, keyUnder, lockKey, lockMessage } from "@codebook/cipher-engine/pgp";
import { lettersOnly } from "@codebook/cipher-engine/text";
import { useT } from "~/i18n";
import { Desk, Line, Working } from "./Desk";
import { BOB, type PgpState } from "./usePgp";

/** Alice's side: her message, the session key, and the working of the two locks. */
export function AliceDesk({ state }: { state: PgpState }) {
  const t = useT();
  const { message, sessionKey, stage } = state;
  const title = t({ en: "Alice", vi: "Alice" });
  const note = t({ en: "writes and locks", vi: "viết và mã hóa" });
  if (state.sealed) {
    return (
      <Desk title={title} note={note}>
        <Line label={t({ en: "Message", vi: "Tin nhắn" })}>
          {t({ en: "covered: you were not in the room", vi: "bị che: bạn không có mặt trong phòng" })}
        </Line>
      </Desk>
    );
  }
  const letters = lettersOnly(message);
  return (
    <Desk title={title} note={note}>
      <Line label={t({ en: "Message", vi: "Tin nhắn" })}>{message || t({ en: "nothing yet", vi: "chưa có gì" })}</Line>
      {stage >= 1 && (
        <Line label={t({ en: "Session key, picked at random for this message", vi: "Khóa phiên, chọn ngẫu nhiên cho riêng bức thư này" })} secret>
          {sessionKey}
        </Line>
      )}
      {stage >= 2 && (
        <Working
          label={t({ en: "Locking the message with the session key", vi: "Mã hóa bức thư bằng khóa phiên" })}
          rows={[
            { label: t({ en: "Message", vi: "Tin nhắn" }), cells: [...letters] },
            { label: t({ en: "Session key", vi: "Khóa phiên" }), cells: [...keyUnder(message, sessionKey)] },
            { label: t({ en: "Shifted", vi: "Đã dịch" }), cells: [...lettersOnly(lockMessage(message, sessionKey))], secret: true },
          ]}
        />
      )}
      {stage >= 3 && (
        <Working
          label={t({ en: "Locking the session key with Bob's public key", vi: "Mã hóa khóa phiên bằng chìa khóa công khai của Bob" })}
          rows={[
            { label: t({ en: "Session key", vi: "Khóa phiên" }), cells: [...sessionKey] },
            { label: t({ en: "As a number", vi: "Đổi thành số" }), cells: keyNumbers(sessionKey) },
            { label: t({ en: `To the power ${BOB.e}, mod ${BOB.n}`, vi: `Lũy thừa ${BOB.e}, mod ${BOB.n}` }), cells: lockKey(sessionKey, BOB), secret: true },
          ]}
        />
      )}
    </Desk>
  );
}
