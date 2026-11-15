import type { Dispatch } from "react";
import { gridFromNumbers, SYMBOLS } from "@codebook/cipher-engine/adfgvx";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type AdfgvxAction, type AdfgvxState } from "./useAdfgvx";

/** A grid in a random order. The randomness lives here, in the view, so the engine stays pure. */
const randomGrid = () => gridFromNumbers([...SYMBOLS].map(() => Math.random()));

/** The HTML controls of the ADFGVX page: the keyword, the message, the result and a new grid. */
export function AdfgvxControls({ state, dispatch }: { state: AdfgvxState; dispatch: Dispatch<AdfgvxAction> }) {
  const t = useT();
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <TextField
          label={t({ en: "Keyword", vi: "Từ khóa" })}
          width="short"
          value={state.keyword}
          onChange={(keyword) => dispatch({ type: "key", keyword })}
        />
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: "Your message (letters and digits)", vi: "Tin nhắn của bạn (chữ cái và chữ số)" })
              : t({ en: "The ciphertext", vi: "Bản mật mã" })
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
        <Button onClick={() => dispatch({ type: "shuffle", grid: randomGrid() })}>{t({ en: "Shuffle the grid", vi: "Xáo trộn lưới" })}</Button>
      </Row>
    </Controls>
  );
}
