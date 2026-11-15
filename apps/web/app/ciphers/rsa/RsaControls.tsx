import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { keysOf, output, type RsaAction, type RsaState } from "./useRsa";

/** The HTML controls of the RSA page: the key, the message and the attack. */
export function RsaControls({ state, dispatch }: { state: RsaState; dispatch: Dispatch<RsaAction> }) {
  const keys = keysOf(state);
  const enciphering = state.mode === "encipher";
  const t = useT();
  const locale = useLocale();

  return (
    <Controls>
      <Row>
        <Output label={t({ en: "Public key", vi: "Khóa công khai" })}>
          N = {keys.n}, e = {keys.e}
        </Output>
        <Output
          label={enciphering ? t({ en: "Ciphertext C", vi: "Bản mật mã C" }) : t({ en: "Message M", vi: "Tin nhắn M" })}
        >
          {output(state, locale)}
        </Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: "Message: a letter or a number", vi: "Tin nhắn: một chữ cái hoặc một con số" })
              : t({ en: "Ciphertext: a number", vi: "Bản mật mã: một con số" })
          }
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
          width="short"
        />
        <Choice
          label={t({ en: "I want to", vi: "Tôi muốn" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encipher", label: t({ en: "Encipher", vi: "Mã hóa" }) },
            { value: "decipher", label: t({ en: "Decipher", vi: "Giải mã" }) },
          ]}
        />
        <Button onClick={() => dispatch({ type: "attack" })}>
          {state.attacked
            ? t({ en: "Call Eve off", vi: "Gọi Eve dừng lại" })
            : t({ en: "Let Eve factor N", vi: "Để Eve phân tích N ra thừa số" })}
        </Button>
      </Row>
      {!state.youAreEve && (
        <Row>
          <Stepper label={t({ en: "Prime p", vi: "Số nguyên tố p" })} value={state.p} onStep={(by) => dispatch({ type: "turnP", by })} />
          <Stepper label={t({ en: "Prime q", vi: "Số nguyên tố q" })} value={state.q} onStep={(by) => dispatch({ type: "turnQ", by })} />
          <Stepper label={t({ en: "Public e", vi: "e công khai" })} value={state.e} onStep={(by) => dispatch({ type: "turnE", by })} />
        </Row>
      )}
    </Controls>
  );
}
