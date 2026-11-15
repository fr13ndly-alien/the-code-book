import type { Dispatch } from "react";
import { glyphOf } from "@codebook/cipher-engine/pigpen";
import { lettersOnly } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import { useLocale, useT, type Locale } from "~/i18n";
import type { PigpenAction, PigpenState } from "./usePigpen";
import { describe } from "./vi";

/** The picked letter and its symbol in words: "A: lines on the right and bottom". */
function pickedAsText(letter: string | undefined, locale: Locale): string {
  const glyph = letter ? glyphOf(letter) : undefined;
  return glyph ? `${glyph.letter}: ${describe(glyph, locale)}` : "";
}

/** The HTML controls of the pigpen page: the message and the symbol being looked at. */
export function PigpenControls({ state, dispatch }: { state: PigpenState; dispatch: Dispatch<PigpenAction> }) {
  const t = useT();
  const locale = useLocale();
  return (
    <Controls>
      <Row>
        <Output label={t({ en: "The symbol you tapped", vi: "Ký hiệu bạn vừa chạm" })}>{pickedAsText(state.picked, locale)}</Output>
        {state.hidden ? (
          <Button onClick={() => dispatch({ type: "reveal" })}>{t({ en: "Show every letter", vi: "Hiện mọi chữ" })}</Button>
        ) : (
          <Output label={t({ en: "Symbols in the message", vi: "Số ký hiệu trong bức thư" })}>{String(lettersOnly(state.text).length)}</Output>
        )}
      </Row>
      {!state.hidden && (
        <Row>
          <TextField
            label={t({ en: "Your message", vi: "Tin nhắn của bạn" })}
            value={state.text}
            onChange={(text) => dispatch({ type: "type", text })}
          />
        </Row>
      )}
    </Controls>
  );
}
