import type { Dispatch } from "react";
import { padFromBytes, SHEET_LENGTH } from "@codebook/cipher-engine/one-time-pad";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type PadAction, type PadState } from "./usePad";

/** A new sheet of random letters. The randomness lives here, in the view, so the engine stays pure. */
function freshSheet(): string {
  // Twice as many bytes as letters: a few bytes are thrown away to keep every letter equally likely.
  const bytes = crypto.getRandomValues(new Uint8Array(SHEET_LENGTH * 2));
  return padFromBytes([...bytes]).slice(0, SHEET_LENGTH);
}

/** The HTML controls of the one-time pad page: the sheet, the message and the two experiments. */
export function PadControls({ state, dispatch }: { state: PadState; dispatch: Dispatch<PadAction> }) {
  const t = useT();
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <TextField label={t({ en: "Pad (this sheet)", vi: "Tờ khóa (tờ này)" })} value={state.pad} onChange={(pad) => dispatch({ type: "write", pad })} />
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: `Your message (up to ${SHEET_LENGTH} letters)`, vi: `Tin nhắn của bạn (tối đa ${SHEET_LENGTH} chữ)` })
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
        <Button primary onClick={() => dispatch({ type: "tear", pad: freshSheet() })}>
          {t({ en: "Tear off the sheet", vi: "Xé tờ này đi" })}
        </Button>
      </Row>
      <Row>
        <TextField
          label={t({ en: "Another message it could be", vi: "Một tin nhắn khác mà nó có thể là" })}
          value={state.claim}
          onChange={(text) => dispatch({ type: "claim", text })}
        />
        <TextField
          label={t({ en: "A second message on the same sheet", vi: "Tin nhắn thứ hai trên cùng một tờ" })}
          value={state.second}
          onChange={(text) => dispatch({ type: "reuse", text })}
        />
      </Row>
    </Controls>
  );
}
