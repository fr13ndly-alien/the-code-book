import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type BinaryAction, type BinaryState } from "./useBinary";

/** The HTML controls of the binary page: the direction, the message, the key and the result. */
export function BinaryControls({ state, dispatch }: { state: BinaryState; dispatch: Dispatch<BinaryAction> }) {
  const enciphering = state.mode === "encipher";
  const t = useT();

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "I want to", vi: "Tôi muốn" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encipher", label: t({ en: "Encipher", vi: "Mã hóa" }) },
            { value: "decipher", label: t({ en: "Decipher", vi: "Giải mã" }) },
          ]}
        />
        <Output
          label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}
        >{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: "Your message", vi: "Tin nhắn của bạn" })
              : t({ en: "The ciphertext, in ones and zeros", vi: "Bản mật mã, bằng số 1 và số 0" })
          }
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
        />
        <TextField
          label={t({ en: "Key", vi: "Chìa khóa" })}
          width="short"
          value={state.key}
          onChange={(key) => dispatch({ type: "rekey", key })}
        />
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "unflip" })} disabled={state.flips.length === 0}>
          {t({ en: "Undo my flipped digits", vi: "Trả lại các chữ số tôi đã lật" })}
        </Button>
      </Row>
    </Controls>
  );
}
