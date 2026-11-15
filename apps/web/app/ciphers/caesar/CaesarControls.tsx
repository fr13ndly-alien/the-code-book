import type { Dispatch } from "react";
import { tryAllShifts } from "@codebook/cipher-engine/caesar";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import styles from "./CaesarControls.module.css";
import { output, type CaesarAction, type CaesarState } from "./useCaesar";

/** The HTML controls of the Caesar page: the shift, the message and the result. */
export function CaesarControls({ state, dispatch }: { state: CaesarState; dispatch: Dispatch<CaesarAction> }) {
  const t = useT();
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Stepper label={t({ en: "Shift", vi: "Độ dịch" })} value={state.shift} onStep={(by) => dispatch({ type: "turn", by })} />
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Bản rõ" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? t({ en: "Your message", vi: "Tin nhắn của bạn" }) : t({ en: "The ciphertext", vi: "Bản mật mã" })}
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
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
      </Row>
      {!enciphering && (
        <details className={styles.attack}>
          <summary>{t({ en: "Try every shift at once", vi: "Thử mọi độ dịch cùng lúc" })}</summary>
          <ol start={0}>
            {tryAllShifts(state.text).map((reading, shift) => (
              <li key={shift} data-on={shift === state.shift}>
                {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
