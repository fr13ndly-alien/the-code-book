import type { Dispatch } from "react";
import { NAMES } from "@codebook/cipher-engine/linear-b";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output } from "~/components/sim/Fields";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./LinearBControls.module.css";
import { NAMES_OFFERED, output, pickedName, type LinearBAction, type LinearBState } from "./useLinearB";
import { NAME_LABEL_VI } from "./vi";

/** What the row of name buttons is for, given what the reader has chosen. */
function pickerLabel(state: LinearBState, locale: Locale): string {
  if (locale === "vi") {
    if (state.view === "triplet") return "Chạm vào các ký hiệu trên bảng để đánh dấu những ký hiệu cả ba từ cùng có";
    return state.picked ? "Từ bạn chọn nói gì?" : "Chạm vào một từ ở trên, rồi chọn xem nó nói gì";
  }
  if (state.view === "triplet") return "Tap signs on the board to mark the ones all three words share";
  return state.picked ? "What does the chosen word say?" : "Tap a word above, then pick what it says";
}

/** The HTML controls of the Linear B page: the words on the board, their reading and the names to guess. */
export function LinearBControls(props: { state: LinearBState; dispatch: Dispatch<LinearBAction> }) {
  const { state, dispatch } = props;
  const current = pickedName(state);
  const t = useT();
  const locale = useLocale();

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "On the board", vi: "Trên bảng" })}
          value={state.view}
          onChange={(view) => dispatch({ type: "show", view })}
          options={[
            { value: "triplet", label: t({ en: "Kober's words", vi: "Các từ của Kober" }) },
            { value: "places", label: t({ en: "Place names", vi: "Địa danh" }) },
            { value: "tripod", label: t({ en: "Tripod tablet", vi: "Tấm đất sét vạc ba chân" }) },
          ]}
        />
        <Output label={t({ en: "The words read", vi: "Các từ đọc là" })}>{output(state)}</Output>
      </Row>
      <div className={styles.picker} role="group" aria-label={t({ en: "Name for the chosen word", vi: "Tên cho từ đã chọn" })}>
        <span className={styles.label}>{pickerLabel(state, locale)}</span>
        <div className={styles.names}>
          {NAMES_OFFERED[state.view].map((name) => (
            <button
              key={name}
              type="button"
              disabled={!state.picked}
              aria-pressed={name === current}
              onClick={() => dispatch({ type: "guess", name })}
            >
              {t({ en: NAMES[name].label, vi: NAME_LABEL_VI[name] })}
              <span className={styles.spelling}>{NAMES[name].syllables.join("-")}</span>
            </button>
          ))}
          {state.view !== "triplet" && (
            <button type="button" disabled={!current} onClick={() => dispatch({ type: "guess", name: undefined })}>
              {t({ en: "Clear", vi: "Xóa" })}
            </button>
          )}
        </div>
      </div>
      <Row>
        <Button onClick={() => dispatch({ type: "fill" })}>
          {t({ en: "Name the three places for me", vi: "Điền giúp tôi ba địa danh" })}
        </Button>
        <Button onClick={() => dispatch({ type: "wipe" })}>
          {t({ en: "Forget every guess and mark", vi: "Xóa mọi lần đoán và đánh dấu" })}
        </Button>
      </Row>
    </Controls>
  );
}
