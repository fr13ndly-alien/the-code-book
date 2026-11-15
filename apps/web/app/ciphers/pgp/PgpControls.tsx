import type { Dispatch } from "react";
import { sessionKeyFrom } from "@codebook/cipher-engine/pgp";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { STEPS, travelling, type PgpAction, type PgpState } from "./usePgp";

const KEY_LENGTH = 4;

/** A fresh session key. The randomness is made here, in the view, and stored as plain letters. */
const randomSessionKey = () => sessionKeyFrom(Array.from({ length: KEY_LENGTH }, () => Math.floor(Math.random() * 26)));

/** The HTML controls of the PGP page: the step, what travels, the message and whose view to take. */
export function PgpControls({ state, dispatch }: { state: PgpState; dispatch: Dispatch<PgpAction> }) {
  const t = useT();
  const locale = useLocale();
  const next = STEPS[state.stage];

  return (
    <Controls>
      <Row>
        <Stepper
          label={t({ en: "Step", vi: "Bước" })}
          value={t({ en: `${state.stage} of ${STEPS.length}`, vi: `${state.stage} / ${STEPS.length}` })}
          onStep={(by) => dispatch({ type: "step", by })}
        />
        <Output label={t({ en: "What travels", vi: "Những gì được gửi đi" })}>{travelling(state, locale)}</Output>
      </Row>
      <Row>
        <Button primary disabled={!next} onClick={() => dispatch({ type: "step", by: 1 })}>
          {next
            ? t({ en: `Next step: ${next.en}`, vi: `Bước tiếp: ${next.vi}` })
            : t({ en: "Bob has read the message", vi: "Bob đã đọc tin nhắn" })}
        </Button>
        <Button onClick={() => dispatch({ type: "step", by: -STEPS.length })}>{t({ en: "Back to step 0", vi: "Về bước 0" })}</Button>
      </Row>
      <Row>
        <TextField
          label={t({ en: "Alice's message (changing it starts again)", vi: "Tin nhắn của Alice (đổi nó thì làm lại từ đầu)" })}
          value={state.sealed ? "" : state.message}
          onChange={(text) => dispatch({ type: "write", text })}
        />
        <Choice
          label={t({ en: "Look through the eyes of", vi: "Nhìn qua mắt của" })}
          value={state.viewer}
          onChange={(viewer) => dispatch({ type: "look", viewer })}
          options={[
            { value: "friends", label: t({ en: "Alice and Bob", vi: "Alice và Bob" }) },
            { value: "eve", label: t({ en: "Eve", vi: "Eve" }) },
          ]}
        />
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "shuffle", sessionKey: randomSessionKey() })}>{t({ en: "New session key", vi: "Khóa phiên mới" })}</Button>
        <Button disabled={state.cracked} onClick={() => dispatch({ type: "factor" })}>
          {t({ en: "Eve: split N into its primes", vi: "Eve: tách N thành các số nguyên tố" })}
        </Button>
      </Row>
    </Controls>
  );
}
