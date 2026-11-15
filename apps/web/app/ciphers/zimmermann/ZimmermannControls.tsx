import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type ZimmermannAction, type ZimmermannState } from "./useZimmermann";

/** The HTML controls of the Zimmermann page: which desk, the result, and the ways to undo. */
export function ZimmermannControls(props: { state: ZimmermannState; dispatch: Dispatch<ZimmermannAction> }) {
  const t = useT();
  const { state, dispatch } = props;
  const encoding = state.mode === "encode";
  const guessed = state.picked !== undefined && state.picked in state.guesses;

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "I am", vi: "Tôi là" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encode", label: t({ en: "The clerk", vi: "Nhân viên mã hóa" }) },
            { value: "break", label: t({ en: "The codebreaker", vi: "Nhà giải mã" }) },
          ]}
        />
        <Output
          label={
            encoding
              ? t({ en: "The telegram as sent", vi: "Bức điện được gửi đi" })
              : t({ en: "The telegrams so far", vi: "Các bức điện đến lúc này" })
          }
        >{output(state)}</Output>
      </Row>
      {encoding ? (
        <Row>
          <Button onClick={() => dispatch({ type: "rub" })} disabled={state.words.length === 0}>
            {t({ en: "Rub out the last word", vi: "Xóa từ cuối cùng" })}
          </Button>
          <Button onClick={() => dispatch({ type: "clear" })} disabled={state.words.length === 0}>
            {t({ en: "Clear the telegram", vi: "Xóa cả bức điện" })}
          </Button>
        </Row>
      ) : (
        <Row>
          <Button onClick={() => dispatch({ type: "forget" })} disabled={!guessed}>
            {t({ en: "Rub out this guess", vi: "Xóa phỏng đoán này" })}
          </Button>
          <Button onClick={() => dispatch({ type: "clear" })}>{t({ en: "Rub out every guess", vi: "Xóa mọi phỏng đoán" })}</Button>
        </Row>
      )}
    </Controls>
  );
}
