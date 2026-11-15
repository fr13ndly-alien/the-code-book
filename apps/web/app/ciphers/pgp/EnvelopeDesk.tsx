import { useT } from "~/i18n";
import { Desk, Line } from "./Desk";
import { envelope, SENT, type PgpState } from "./usePgp";

/** The envelope: the two locked parts, and whether they have been sent. */
export function EnvelopeDesk({ state }: { state: PgpState }) {
  const t = useT();
  const { ciphertext, lockedKey } = envelope(state);
  const sent = state.stage >= SENT;
  return (
    <Desk
      title={t({ en: "The envelope", vi: "Phong bì" })}
      note={
        sent
          ? t({ en: "sent: anyone on the way can copy it", vi: "đã gửi: ai ở dọc đường cũng chép được" })
          : t({ en: "not sent yet", vi: "chưa gửi" })
      }
    >
      <Line label={t({ en: "Part 1, the locked message", vi: "Phần 1, tin nhắn đã khóa" })} secret>
        {state.stage >= 2 ? ciphertext : t({ en: "empty", vi: "trống" })}
      </Line>
      <Line label={t({ en: "Part 2, the locked session key", vi: "Phần 2, khóa phiên đã khóa" })} secret>
        {state.stage >= 3 ? lockedKey.join(" ") : t({ en: "empty", vi: "trống" })}
      </Line>
    </Desk>
  );
}
