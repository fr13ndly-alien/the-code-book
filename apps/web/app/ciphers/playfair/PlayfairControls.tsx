import type { Dispatch } from "react";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, steps, type PlayfairAction, type PlayfairState } from "./usePlayfair";

/** The HTML controls of the Playfair page: the keyword, the pair in view, the message and the result. */
export function PlayfairControls({ state, dispatch }: { state: PlayfairState; dispatch: Dispatch<PlayfairAction> }) {
  const t = useT();
  const enciphering = state.mode === "encipher";
  const count = steps(state).length;

  return (
    <Controls>
      <Row>
        <TextField
          label={t({ en: "Keyword", vi: "Từ khóa" })}
          width="short"
          value={state.keyword}
          onChange={(keyword) => dispatch({ type: "rekey", keyword })}
        />
        <Stepper
          label={t({ en: "Pair", vi: "Cặp" })}
          value={
            count
              ? t({ en: `${state.position + 1} of ${count}`, vi: `${state.position + 1} trên ${count}` })
              : t({ en: "none", vi: "không có" })
          }
          onStep={(by) => dispatch({ type: "step", by })}
        />
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
    </Controls>
  );
}
