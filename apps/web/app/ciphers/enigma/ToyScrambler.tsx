import { TOY_KEYS, TOY_LAMPS, toyAlphabet } from "@codebook/cipher-engine";
import type { Dispatch } from "react";
import type { ToyAction, ToyState } from "./useToyScrambler";
import styles from "./ToyScrambler.module.css";
import { useLocale, useT, type Locale } from "~/i18n";

/** The drawing's own units. The SVG scales to the width it is given. */
const VIEW = { width: 280, rowHeight: 26, top: 18 };
/** Where each part sits across the drawing, left to right. */
const X = { key: 14, keyEdge: 28, scramblerIn: 92, scramblerOut: 188, lampEdge: 252, lamp: 266 };
const LAMP_RADIUS = 10;
const HEIGHT = VIEW.top * 2 + VIEW.rowHeight * (TOY_KEYS.length - 1);

const rowY = (row: number) => VIEW.top + VIEW.rowHeight * row;

interface ToyScramblerProps {
  toy: ToyState;
  dispatch: Dispatch<ToyAction>;
}

/** The book's six-letter machine: six keys, one scrambler, six lamps. */
export function ToyScrambler({ toy, dispatch }: ToyScramblerProps) {
  const { last, rotating } = toy;
  // The drawing shows the scrambler as it stood when the last lamp lit, like the book's figures.
  const drawn = last ? last.position : toy.position;
  const alphabet = toyAlphabet(drawn);
  const t = useT();
  const locale = useLocale();

  return (
    <div className={styles.toy}>
      <p className={styles.hint}>
        {t({
          en: "The book explains Enigma with six letters and one scrambler. Each key has a wire through the scrambler to one lamp.",
          vi: "Cuốn sách giải thích Enigma bằng sáu chữ và một đĩa mã hóa. Mỗi phím có một sợi dây đi qua đĩa mã hóa tới một bóng đèn.",
        })}
      </p>

      <Wiring alphabet={alphabet} litKey={last?.key ?? null} locale={locale} />

      <p className={styles.table}>
        {[...TOY_KEYS].map((key, row) => (
          <span key={key} data-lit={key === last?.key}>
            {key}→{alphabet[row]}
          </span>
        ))}
      </p>

      <p className={styles.hint} aria-live="polite">
        {describe(toy, locale)}
      </p>

      <div className={styles.keys} role="group" aria-label={t({ en: "Keys of the six-letter model", vi: "Các phím của mô hình sáu chữ" })}>
        {[...TOY_KEYS].map((key) => (
          <button key={key} type="button" aria-label={t({ en: `Press ${key}`, vi: `Nhấn ${key}` })} onClick={() => dispatch({ type: "press", key })}>
            {key}
          </button>
        ))}
      </div>

      <dl className={styles.tape} aria-live="polite">
        <dt>{t({ en: "You typed", vi: "Bạn đã gõ" })}</dt>
        <dd>{toy.typed || "…"}</dd>
        <dt>{t({ en: "Lamps lit", vi: "Đèn đã sáng" })}</dt>
        <dd className={styles.lamps}>{toy.lamps || "…"}</dd>
      </dl>

      <label className={styles.turning}>
        <input
          type="checkbox"
          checked={rotating}
          onChange={(event) => dispatch({ type: "setTurning", rotating: event.target.checked })}
        />
        {t({
          en: "The scrambler turns after each letter (starts again)",
          vi: "Đĩa mã hóa quay sau mỗi chữ (bắt đầu lại)",
        })}
      </label>

      <button type="button" className={styles.button} onClick={() => dispatch({ type: "restart" })}>
        {t({ en: "Start again", vi: "Bắt đầu lại" })}
      </button>
    </div>
  );
}

/** Says in words what the drawing shows. */
function describe({ last, rotating }: ToyState, locale: Locale): string {
  if (locale === "vi") {
    if (!last) return "Nhấn một phím để lần theo sợi dây của nó.";
    const lit = `${last.key} làm sáng đèn ${last.output}.`;
    if (!rotating) return `${lit} Đĩa mã hóa đứng yên, nên ${last.key} luôn làm sáng đèn ${last.output}.`;
    return `${lit} Rồi đĩa mã hóa quay một nấc, nên với chữ tiếp theo, mọi sợi dây đều thấp xuống một hàng.`;
  }
  if (!last) return "Press a key to follow its wire.";
  const lit = `${last.key} lit ${last.output}.`;
  if (!rotating) return `${lit} The scrambler stays still, so ${last.key} always lights ${last.output}.`;
  return `${lit} Then the scrambler turned one place, so every wire sits one row lower for the next letter.`;
}

/** Keys on the left, lamps on the right, and the six wires through the scrambler between them. */
function Wiring({ alphabet, litKey, locale }: { alphabet: string; litKey: string | null; locale: Locale }) {
  const litLamp = litKey ? alphabet[TOY_KEYS.indexOf(litKey)] : null;
  const to = locale === "vi" ? "tới" : "to";
  const label = [...TOY_KEYS].map((key, row) => `${key} ${to} ${alphabet[row]}`).join(", ");

  return (
    <svg className={styles.wiring} viewBox={`0 0 ${VIEW.width} ${HEIGHT}`} role="img" aria-label={locale === "vi" ? `Đường dây: ${label}` : `Wiring: ${label}`}>
      <rect
        className={styles.scrambler}
        x={X.scramblerIn}
        y={VIEW.top / 2}
        width={X.scramblerOut - X.scramblerIn}
        height={HEIGHT - VIEW.top}
        rx={LAMP_RADIUS}
      />
      {[...TOY_KEYS].map((key, row) => {
        const lampRow = TOY_LAMPS.indexOf(alphabet[row]!);
        const points = [
          [X.keyEdge, rowY(row)],
          [X.scramblerIn, rowY(row)],
          [X.scramblerOut, rowY(lampRow)],
          [X.lampEdge, rowY(lampRow)],
        ];
        return <polyline key={key} className={styles.wire} data-lit={key === litKey} points={points.join(" ")} />;
      })}
      {[...TOY_KEYS].map((key, row) => (
        <text key={key} className={styles.keyLetter} data-lit={key === litKey} x={X.key} y={rowY(row)}>
          {key}
        </text>
      ))}
      {[...TOY_LAMPS].map((lamp, row) => (
        <g key={lamp} className={styles.lamp} data-lit={lamp === litLamp}>
          <circle cx={X.lamp} cy={rowY(row)} r={LAMP_RADIUS} />
          <text x={X.lamp} y={rowY(row)}>
            {lamp}
          </text>
        </g>
      ))}
    </svg>
  );
}
