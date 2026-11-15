import type { Dispatch } from "react";
import { lookUp, plainOf, symbolsOf } from "@codebook/cipher-engine/mary-queen-of-scots";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./MaryControls.module.css";
import { tokensOf, type MaryAction, type MaryState } from "./useMary";

/** The picked sign and its meaning as text: "2 = THE", "∴ = nothing (a null)". */
function pickedAsText(symbol: string | undefined, locale: Locale): string {
  if (!symbol) return "";
  const { kind, plain } = lookUp(symbol);
  if (kind === "null") return locale === "vi" ? `${symbol} = không có nghĩa (ký tự không)` : `${symbol} = nothing (a null)`;
  if (kind === "doubler") return locale === "vi" ? `${symbol} = nhân đôi ký hiệu tiếp theo` : `${symbol} = double the next sign`;
  return `${symbol} = ${plain}`;
}

/** The HTML controls of the Mary Queen of Scots page: the message, the tricks and the result. */
export function MaryControls({ state, dispatch }: { state: MaryState; dispatch: Dispatch<MaryAction> }) {
  const t = useT();
  const locale = useLocale();
  const writing = state.mode === "write";
  const tokens = tokensOf(state);

  return (
    <Controls>
      <Row>
        {writing ? (
          <Output label={t({ en: "Ciphertext, in stand-in signs", vi: "Bản mật mã, bằng ký hiệu thay thế" })}>{symbolsOf(tokens)}</Output>
        ) : (
          <Output label={t({ en: "The sign you tapped", vi: "Ký hiệu bạn vừa chạm" })}>{pickedAsText(state.picked, locale)}</Output>
        )}
        <Choice
          label={t({ en: "I want to", vi: "Tôi muốn" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "write", label: t({ en: "Write a letter", vi: "Viết thư" }) },
            { value: "read", label: t({ en: "Read one", vi: "Đọc thư" }) },
          ]}
        />
      </Row>
      <Row>
        <TextField
          label={writing ? t({ en: "Your message", vi: "Tin nhắn của bạn" }) : t({ en: "The ciphertext", vi: "Bản mật mã" })}
          value={state.text}
          rows={2}
          onChange={(text) => dispatch({ type: "type", text })}
        />
      </Row>
      {writing ? (
        <Row>
          <Choice
            label={t({ en: "Nulls", vi: "Ký tự không" })}
            value={state.nulls}
            onChange={(nulls) => dispatch({ type: "sprinkle", nulls })}
            options={[
              { value: "none", label: t({ en: "None", vi: "Không có" }) },
              { value: "few", label: t({ en: "A few", vi: "Một ít" }) },
              { value: "many", label: t({ en: "Many", vi: "Nhiều" }) },
            ]}
          />
          <Choice
            label={t({ en: "Word signs", vi: "Ký hiệu từ" })}
            value={state.useWords ? "on" : "off"}
            onChange={(value) => dispatch({ type: "useWords", on: value === "on" })}
            options={[
              { value: "on", label: t({ en: "On", vi: "Bật" }) },
              { value: "off", label: t({ en: "Off", vi: "Tắt" }) },
            ]}
          />
          <Stepper label={t({ en: "Null pattern", vi: "Kiểu rải ký tự không" })} value={state.seed} onStep={(by) => dispatch({ type: "shuffle", by })} />
        </Row>
      ) : (
        <details className={styles.reveal}>
          <summary>{t({ en: "Decipher the whole message for me", vi: "Giải mã cả bức thư giúp tôi" })}</summary>
          <p aria-live="polite">{plainOf(tokens)}</p>
        </details>
      )}
    </Controls>
  );
}
