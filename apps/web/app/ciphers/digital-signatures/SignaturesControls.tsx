import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { ALICE, verdict, type SignaturesAction, type SignaturesState } from "./useSignatures";

/** The number in a box where only digits count, kept below N. Empty means no signature. */
function toSignature(text: string): number | null {
  const digits = text.replace(/\D/g, "");
  return digits === "" ? null : Number(digits) % ALICE.n;
}

/** A made-up signature. The randomness is made here, in the view, and stored as a plain number. */
const randomSignature = () => Math.floor(Math.random() * ALICE.n);

/** The HTML controls of the signatures page: sign, tamper, forge, and Bob's verdict. */
export function SignaturesControls(props: { state: SignaturesState; dispatch: Dispatch<SignaturesAction> }) {
  const { state, dispatch } = props;
  const t = useT();
  const locale = useLocale();

  return (
    <Controls>
      <Row>
        <Output label={t({ en: "Signature that arrives", vi: "Chữ ký đến nơi" })}>
          {state.signature ?? t({ en: "none", vi: "không có" })}
        </Output>
        <Output label={t({ en: "Bob's check", vi: "Phép kiểm tra của Bob" })}>{verdict(state, locale)}</Output>
      </Row>
      <Row>
        <TextField
          label={t({ en: "Message that arrives (change it to tamper)", vi: "Tin nhắn đến nơi (sửa nó để làm giả)" })}
          value={state.arrived}
          onChange={(text) => dispatch({ type: "tamper", text })}
        />
        <TextField
          label={t({ en: "Signature that arrives", vi: "Chữ ký đến nơi" })}
          width="short"
          value={state.signature === null ? "" : String(state.signature)}
          onChange={(text) => dispatch({ type: "scribble", signature: toSignature(text) })}
        />
      </Row>
      <Row>
        <TextField label={t({ en: "Alice's message", vi: "Tin nhắn của Alice" })} value={state.message} onChange={(text) => dispatch({ type: "write", text })} />
        <Button primary onClick={() => dispatch({ type: "sign" })}>
          {t({ en: "Sign and send", vi: "Ký và gửi" })}
        </Button>
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "scribble", signature: randomSignature() })}>
          {t({ en: "Forger: guess a signature", vi: "Kẻ giả mạo: đoán một chữ ký" })}
        </Button>
        <Button onClick={() => dispatch({ type: "tryAll" })}>
          {t({ en: "Forger: try every number", vi: "Kẻ giả mạo: thử mọi con số" })}
        </Button>
      </Row>
    </Controls>
  );
}
