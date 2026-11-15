import type { Dispatch } from "react";
import { numbersOf, plainOf } from "@codebook/cipher-engine/homophonic";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { stepsOf, type HomophonicAction, type HomophonicState } from "./useHomophonic";

/** The HTML controls of the homophonic page: the table, the message and the result. */
export function HomophonicControls(props: { state: HomophonicState; dispatch: Dispatch<HomophonicAction> }) {
  const { state, dispatch } = props;
  const t = useT();
  const enciphering = state.mode === "encipher";
  const steps = stepsOf(state);

  return (
    <Controls>
      <Row>
        <Stepper label={t({ en: "Table", vi: "Bảng" })} value={state.table} onStep={(by) => dispatch({ type: "deal", by })} />
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Bản rõ" })}>
          {enciphering ? numbersOf(steps) : plainOf(steps)}
        </Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: "Your message", vi: "Tin nhắn của bạn" })
              : t({ en: "The ciphertext, in two-digit numbers", vi: "Bản mật mã, bằng các số hai chữ số" })
          }
          value={state.text}
          rows={2}
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
      {enciphering && (
        <Row>
          <Stepper
            label={t({ en: "Roll the picks again", vi: "Chọn lại các con số" })}
            value={state.picks}
            onStep={(by) => dispatch({ type: "roll", by })}
          />
        </Row>
      )}
    </Controls>
  );
}
