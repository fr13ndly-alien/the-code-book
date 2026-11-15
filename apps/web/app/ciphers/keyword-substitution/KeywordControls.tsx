import type { Dispatch } from "react";
import { commonestLetter } from "@codebook/cipher-engine/keyword-substitution";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type KeywordAction, type KeywordState } from "./useKeyword";

/** The HTML controls of the keyword cipher page: the keyword, the message and the result. */
export function KeywordControls({ state, dispatch }: { state: KeywordState; dispatch: Dispatch<KeywordAction> }) {
  const t = useT();
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <TextField
          label={t({ en: "Keyword or keyphrase", vi: "Từ khóa hoặc cụm từ khóa mã" })}
          width="short"
          value={state.keyword}
          onChange={(keyword) => dispatch({ type: "rekey", keyword })}
        />
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
        <Row>
          <Output label={t({ en: "The commonest letter in the ciphertext", vi: "Chữ hay gặp nhất trong bản mật mã" })}>{commonestLetter(state.text)}</Output>
        </Row>
      )}
    </Controls>
  );
}
