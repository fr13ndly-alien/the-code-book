import { encipher } from "@codebook/cipher-engine/pigpen";
import { useLocale, useT } from "~/i18n";
import { PigpenGlyph } from "./PigpenGlyph";
import styles from "./PigpenMessage.module.css";
import { describe } from "./vi";

/**
 * A message in pigpen symbols, each over its letter. When `hidden` is set the
 * letters are left out, except under the symbol the reader tapped.
 */
export function PigpenMessage(props: {
  text: string;
  hidden: boolean;
  picked?: string;
  onPick: (letter: string) => void;
}) {
  const t = useT();
  const locale = useLocale();
  return (
    <div
      className={styles.message}
      role="group"
      aria-label={t({ en: "The message in pigpen symbols", vi: "Bức thư bằng ký hiệu chuồng heo" })}
    >
      {encipher(props.text).map((word, at) => (
        <span key={at} className={styles.word}>
          {word.map((glyph, i) => {
            const shown = !props.hidden || glyph.letter === props.picked;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={glyph.letter === props.picked}
                aria-label={shown ? `${glyph.letter}: ${describe(glyph, locale)}` : describe(glyph, locale)}
                onClick={() => props.onPick(glyph.letter)}
              >
                <PigpenGlyph glyph={glyph} />
                <span className={styles.letter}>{shown ? glyph.letter : " "}</span>
              </button>
            );
          })}
        </span>
      ))}
    </div>
  );
}
