import { useT } from "~/i18n";
import { Desk, Line } from "./Desk";
import { BOB, envelope, evesLoot, SENT, type PgpState } from "./usePgp";

/** Eve's side: only what travels in the open, and what she can work out from it. */
export function EveDesk({ state }: { state: PgpState }) {
  const t = useT();
  const sent = state.stage >= SENT;
  const notSent = t({ en: "not sent yet", vi: "chưa gửi" });
  const { ciphertext, lockedKey } = envelope(state);
  const loot = evesLoot(state);
  return (
    <Desk title={t({ en: "Eve", vi: "Eve" })} note={t({ en: "sees only what travels", vi: "chỉ thấy những gì được gửi đi" })}>
      <Line label={t({ en: "Bob's public key", vi: "Khóa công khai của Bob" })}>
        N = {BOB.n}, e = {BOB.e}
      </Line>
      <Line label={t({ en: "Part 1, the locked message", vi: "Phần 1, tin nhắn đã khóa" })} secret>
        {sent ? ciphertext : notSent}
      </Line>
      <Line label={t({ en: "Part 2, the locked session key", vi: "Phần 2, khóa phiên đã khóa" })} secret>
        {sent ? lockedKey.join(" ") : notSent}
      </Line>
      {state.cracked && (
        <>
          <Line label={t({
              en: `Dividing N by 2, 3, 4… worked on try ${loot.key.tries}`,
              vi: `Chia N cho 2, 3, 4… thì chia hết ở lần thử thứ ${loot.key.tries}`,
            })}>
            {BOB.n} = {loot.key.p} × {loot.key.q}
          </Line>
          <Line label={t({ en: "So Bob's private key is", vi: "Vậy khóa riêng của Bob là" })}>d = {loot.key.d}</Line>
          {sent && <Line label={t({ en: "Session key", vi: "Khóa phiên" })}>{loot.sessionKey}</Line>}
          {sent && <Line label={t({ en: "Eve reads", vi: "Eve đọc được" })}>{loot.message}</Line>}
        </>
      )}
    </Desk>
  );
}
