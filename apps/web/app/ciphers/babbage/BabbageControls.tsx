import type { Dispatch } from "react";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { keyword, plaintext, type BabbageAction, type BabbageState } from "./useBabbage";

/** How much of the plaintext fits in the first row of the controls. */
const PREVIEW_LETTERS = 48;

/** The HTML controls of the Babbage page: the keyword and plaintext so far, and the steps of the attack. */
export function BabbageControls({ state, dispatch }: { state: BabbageState; dispatch: Dispatch<BabbageAction> }) {
  const t = useT();
  const shift = state.shifts[state.position]!;

  return (
    <Controls>
      <Row>
        <Output label={t({ en: "Keyword so far", vi: "Từ khóa tới giờ" })}>{keyword(state)}</Output>
        <Output label={t({ en: "Plaintext so far", vi: "Bản rõ tới giờ" })}>{plaintext(state).slice(0, PREVIEW_LETTERS)}…</Output>
      </Row>
      <Row>
        <Choice
          label={t({ en: "Step", vi: "Bước" })}
          value={state.stage}
          onChange={(stage) => dispatch({ type: "view", stage })}
          options={[
            { value: "length", label: t({ en: "1 Key length", vi: "1 Độ dài khóa" }) },
            { value: "letters", label: t({ en: "2 Key letters", vi: "2 Các chữ khóa" }) },
          ]}
        />
        {state.stage === "length" ? (
          <Stepper
            label={t({ en: "Key length (resets the keyword)", vi: "Độ dài khóa (đặt lại từ khóa)" })}
            value={state.keyLength}
            onStep={(by) => dispatch({ type: "resize", by })}
          />
        ) : (
          <>
            <Stepper
              label={t({ en: "Key letter", vi: "Chữ khóa" })}
              value={t({ en: `${state.position + 1} of ${state.keyLength}`, vi: `${state.position + 1} trên ${state.keyLength}` })}
              onStep={(by) => dispatch({ type: "move", by })}
            />
            <Stepper
              label={t({ en: "Shift", vi: "Độ dịch" })}
              value={`${letterAt(shift)} ${shift}`}
              onStep={(by) => dispatch({ type: "slide", by })}
            />
            <Button onClick={() => dispatch({ type: "solve" })}>{t({ en: "Find this shift for me", vi: "Tìm độ dịch này giúp tôi" })}</Button>
          </>
        )}
      </Row>
    </Controls>
  );
}
