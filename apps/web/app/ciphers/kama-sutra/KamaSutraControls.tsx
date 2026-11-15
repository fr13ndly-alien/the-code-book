import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, pairs, type KamaSutraAction, type KamaSutraState } from "./useKamaSutra";

/** The HTML controls of the Kama Sutra page: the pairs, the message and the result. */
export function KamaSutraControls({
  state,
  dispatch,
}: {
  state: KamaSutraState;
  dispatch: Dispatch<KamaSutraAction>;
}) {
  const t = useT();
  const fromBook = state.seed === 0;

  return (
    <Controls>
      <Row>
        <Output label={
            fromBook
              ? t({ en: "The pairs (from the book)", vi: "Các cặp (theo cuốn sách)" })
              : t({ en: `The pairs (shuffle ${state.seed})`, vi: `Các cặp (lần xáo số ${state.seed})` })
          }>
          {pairs(state).join(" ")}
        </Output>
        <Output label={t({ en: "After the swap", vi: "Sau khi đổi" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField
          label={t({ en: "Your message, or a ciphertext", vi: "Tin nhắn của bạn, hoặc một bản mật mã" })}
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
        />
      </Row>
      <Row>
        <Button primary onClick={() => dispatch({ type: "shuffle" })}>
          {t({ en: "Shuffle the pairs", vi: "Xáo các cặp" })}
        </Button>
        <Button disabled={fromBook} onClick={() => dispatch({ type: "restore" })}>
          {t({ en: "Use the book's pairs", vi: "Dùng các cặp của cuốn sách" })}
        </Button>
      </Row>
    </Controls>
  );
}
