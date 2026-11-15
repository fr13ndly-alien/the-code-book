import { inWords, type Figure } from "@codebook/cipher-engine/dancing-men";
import { useLocale, type Locale } from "~/i18n";
import { DancingFigure } from "./DancingFigure";
import styles from "./DancedMessage.module.css";
import { describePose } from "./vi";

/** What a screen reader says for one figure: its letter if that is showing, its pose, and its flag. */
function nameOf(figure: Figure, shown: string | undefined, locale: Locale): string {
  const flag = figure.flag ? (locale === "vi" ? ", tay cầm cờ" : ", holding a flag") : "";
  return `${shown ? `${shown}: ` : ""}${describePose(figure.pose, locale)}${flag}`;
}

/**
 * A message in dancing men, word by word. `letterUnder` says what to write
 * under each figure: its letter, the reader's guess, or nothing.
 */
export function DancedMessage(props: {
  figures: Figure[];
  letterUnder: (figure: Figure) => string | undefined;
  picked?: string;
  onPick: (letter: string) => void;
}) {
  const locale = useLocale();
  return (
    <div
      className={styles.message}
      role="group"
      aria-label={locale === "vi" ? "Tin nhắn viết bằng hình nhân nhảy múa" : "The message in dancing men"}
    >
      {inWords(props.figures).map((word, at) => (
        <span key={at} className={styles.word}>
          {word.map((figure, i) => {
            const shown = props.letterUnder(figure);
            return (
              <button
                key={i}
                type="button"
                aria-pressed={figure.letter === props.picked}
                aria-label={nameOf(figure, shown, locale)}
                onClick={() => props.onPick(figure.letter)}
              >
                <DancingFigure pose={figure.pose} flag={figure.flag} />
                <span className={styles.letter}>{shown ?? " "}</span>
              </button>
            );
          })}
        </span>
      ))}
    </div>
  );
}
