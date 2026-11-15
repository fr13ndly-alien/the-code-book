import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type MorseAction, type MorseState } from "./useMorse";

/** The HTML controls of the Morse page: the message, the send button and the telegraph key. */
export function MorseControls({ state, dispatch }: { state: MorseState; dispatch: Dispatch<MorseAction> }) {
  const t = useT();
  const sending = state.mode === "send";

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "I want to", vi: "Tôi muốn" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "send", label: t({ en: "Send", vi: "Gửi" }) },
            { value: "receive", label: t({ en: "Key by hand", vi: "Gõ bằng tay" }) },
          ]}
        />
        <Output label={sending ? t({ en: "In Morse", vi: "Bằng mã Morse" }) : t({ en: "It reads", vi: "Đọc được" })}>{output(state)}</Output>
      </Row>
      {sending ? (
        <Row>
          <TextField label={t({ en: "Your message", vi: "Tin nhắn của bạn" })} value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
          <Button primary onClick={() => dispatch({ type: state.sending ? "stop" : "send" })}>
            {state.sending ? t({ en: "Stop", vi: "Dừng" }) : t({ en: "Send", vi: "Gửi" })}
          </Button>
        </Row>
      ) : (
        <Row>
          <Button primary onClick={() => dispatch({ type: "key", symbol: "." })}>
            {t({ en: "Dot", vi: "Chấm" })}
          </Button>
          <Button primary onClick={() => dispatch({ type: "key", symbol: "-" })}>
            {t({ en: "Dash", vi: "Gạch" })}
          </Button>
          <Button onClick={() => dispatch({ type: "gap", after: "letter" })}>{t({ en: "Next letter", vi: "Chữ tiếp" })}</Button>
          <Button onClick={() => dispatch({ type: "gap", after: "word" })}>{t({ en: "Next word", vi: "Từ tiếp" })}</Button>
          <Button onClick={() => dispatch({ type: "rub" })} disabled={state.keyed === ""}>
            {t({ en: "Rub out", vi: "Xóa" })}
          </Button>
        </Row>
      )}
    </Controls>
  );
}
