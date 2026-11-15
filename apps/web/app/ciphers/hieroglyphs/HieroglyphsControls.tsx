import type { Dispatch } from "react";
import { SOUNDS } from "@codebook/cipher-engine/hieroglyphs";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import styles from "./HieroglyphsControls.module.css";
import { output, pickedSign, type HieroglyphsAction, type HieroglyphsState } from "./useHieroglyphs";
import { signName } from "./vi";

/** The HTML controls of the hieroglyphs page: the mystery name, its reading and the sounds to pick from. */
export function HieroglyphsControls(props: { state: HieroglyphsState; dispatch: Dispatch<HieroglyphsAction> }) {
  const { state, dispatch } = props;
  const t = useT();
  const locale = useLocale();
  const sign = pickedSign(state);
  const current = sign && state.assignment[sign];

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "Mystery name", vi: "Tên bí ẩn" })}
          value={state.mystery}
          onChange={(mystery) => dispatch({ type: "choose", mystery })}
          options={[
            { value: "rameses", label: "Abu Simbel" },
            { value: "alexander", label: t({ en: "Another", vi: "Một tên khác" }) },
          ]}
        />
        <Output label={t({ en: "The mystery name reads", vi: "Tên bí ẩn đọc là" })}>{output(state)}</Output>
      </Row>
      <div className={styles.picker} role="group" aria-label={t({ en: "Sound of the chosen sign", vi: "Âm của ký hiệu đang chọn" })}>
        <span className={styles.label}>
          {sign
            ? t({ en: `Sound of the ${signName(sign, locale)}`, vi: `Âm của hình ${signName(sign, locale)}` })
            : t({ en: "Tap a sign above, then pick its sound", vi: "Chạm vào một ký hiệu ở trên, rồi chọn âm của nó" })}
        </span>
        <div className={styles.sounds}>
          {SOUNDS.map((sound) => (
            <button
              key={sound}
              type="button"
              disabled={!sign}
              aria-pressed={sound === current}
              onClick={() => dispatch({ type: "say", sound })}
            >
              {sound}
            </button>
          ))}
          <button type="button" disabled={!current} onClick={() => dispatch({ type: "say", sound: undefined })}>
            {t({ en: "Clear", vi: "Xóa" })}
          </button>
        </div>
      </div>
      <Row>
        <Button onClick={() => dispatch({ type: "fill" })}>{t({ en: "Read Ptolemy and Cleopatra for me", vi: "Đọc giúp tôi Ptolemy và Cleopatra" })}</Button>
        <Button onClick={() => dispatch({ type: "wipe" })}>{t({ en: "Forget every sound", vi: "Quên hết mọi âm" })}</Button>
      </Row>
    </Controls>
  );
}
