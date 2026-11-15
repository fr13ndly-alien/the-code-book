import type { Dispatch } from "react";
import { tryAllRails } from "@codebook/cipher-engine/rail-fence";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import styles from "./RailFenceControls.module.css";
import { MAX_RAILS, MIN_RAILS, output, type RailFenceAction, type RailFenceState } from "./useRailFence";

/** The HTML controls of the rail fence page: the rails, the message and the result. */
export function RailFenceControls({
  state,
  dispatch,
}: {
  state: RailFenceState;
  dispatch: Dispatch<RailFenceAction>;
}) {
  const t = useT();
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Stepper label={t({ en: "Rails", vi: "Thanh rào" })} value={state.rails} onStep={(by) => dispatch({ type: "step", by })} />
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}>{output(state)}</Output>
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
          <summary>{t({ en: "Try every number of rails at once", vi: "Thử mọi số thanh rào cùng lúc" })}</summary>
          <ol start={MIN_RAILS}>
            {tryAllRails(state.text, MAX_RAILS).map((reading, index) => (
              <li key={index} data-on={index + MIN_RAILS === state.rails}>
                {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
