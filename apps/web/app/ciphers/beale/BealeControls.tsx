import type { Dispatch } from "react";
import { KEY_TEXTS } from "@codebook/cipher-engine/beale";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useLocale, useT, type Locale } from "~/i18n";
import { output, stepsOf, type BealeAction, type BealeState } from "./useBeale";
import { KEY_TEXT_TITLES, SHORT_TITLES } from "./vi";

/** The label of the message box, with a warning when the key text cannot carry a letter. */
function messageLabel(state: BealeState, locale: Locale) {
  const lost = [...new Set(stepsOf(state).filter((step) => step.number === 0).map((step) => step.letter))];
  if (locale === "vi")
    return lost.length === 0
      ? "Tin nhắn của bạn"
      : `Tin nhắn của bạn (không có từ nào bắt đầu bằng ${lost.join(" hay ")})`;
  return lost.length === 0 ? "Your message" : `Your message (no word starts with ${lost.join(" or ")})`;
}

/** The HTML controls of the Beale page: the key text, the message and the result. */
export function BealeControls({ state, dispatch }: { state: BealeState; dispatch: Dispatch<BealeAction> }) {
  const t = useT();
  const locale = useLocale();
  const enciphering = state.mode === "encipher";
  const titleOf = (id: string, title: string) => {
    const name = SHORT_TITLES[id] ?? KEY_TEXT_TITLES[id];
    return name ? t(name) : title;
  };

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "Key text", vi: "Văn bản khóa mã" })}
          value={state.keyId}
          onChange={(keyId) => dispatch({ type: "choose", keyId })}
          options={KEY_TEXTS.map((text) => ({ value: text.id, label: titleOf(text.id, text.title) }))}
        />
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? messageLabel(state, locale) : t({ en: "The numbers", vi: "Các con số" })}
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
      {enciphering && (
        <Row>
          <Button onClick={() => dispatch({ type: "redraw" })}>{t({ en: "Pick different numbers", vi: "Chọn các con số khác" })}</Button>
        </Row>
      )}
    </Controls>
  );
}
