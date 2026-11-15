import type { Dispatch } from "react";
import { letterAt } from "@codebook/cipher-engine/text";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type DiscAction, type DiscState } from "./useDisc";

/** The HTML controls of the cipher disc page: the setting, the message and how the disc moves. */
export function DiscControls({ state, dispatch }: { state: DiscState; dispatch: Dispatch<DiscAction> }) {
  const enciphering = state.mode === "encipher";
  const t = useT();

  return (
    <Controls>
      <Row>
        {state.turning === "keyword" ? (
          <TextField
            label={t({ en: "Keyword", vi: "Từ khóa" })}
            width="short"
            value={state.keyword}
            onChange={(keyword) => dispatch({ type: "key", keyword })}
          />
        ) : (
          <Stepper
            label={
              state.turning === "fixed"
                ? t({ en: "Inner letter beside A", vi: "Chữ vòng trong cạnh A" })
                : t({ en: "Inner letter beside A at the start", vi: "Chữ vòng trong cạnh A lúc đầu" })
            }
            value={letterAt(state.shift)}
            onStep={(by) => dispatch({ type: "turn", by })}
          />
        )}
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering ? t({ en: "Your message", vi: "Tin nhắn của bạn" }) : t({ en: "The ciphertext", vi: "Bản mật mã" })
          }
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
      <Row>
        <Choice
          label={t({ en: "While you type, the disc", vi: "Khi bạn gõ, đĩa sẽ" })}
          value={state.turning}
          onChange={(turning) => dispatch({ type: "spin", turning })}
          options={[
            { value: "fixed", label: t({ en: "Stays still", vi: "Đứng yên" }) },
            { value: "stepping", label: t({ en: "Steps", vi: "Xoay từng bước" }) },
            { value: "keyword", label: t({ en: "Keyword", vi: "Theo từ khóa" }) },
          ]}
        />
      </Row>
    </Controls>
  );
}
