import { describe, inWords, type Figure } from "@codebook/cipher-engine/dancing-men";
import { DancingFigure } from "./DancingFigure";
import styles from "./DancedMessage.module.css";

/** What a screen reader says for one figure: its letter if that is showing, its pose, and its flag. */
function nameOf(figure: Figure, shown: string | undefined): string {
  const flag = figure.flag ? ", holding a flag" : "";
  return `${shown ? `${shown}: ` : ""}${describe(figure.pose)}${flag}`;
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
  return (
    <div className={styles.message} role="group" aria-label="The message in dancing men">
      {inWords(props.figures).map((word, at) => (
        <span key={at} className={styles.word}>
          {word.map((figure, i) => {
            const shown = props.letterUnder(figure);
            return (
              <button
                key={i}
                type="button"
                aria-pressed={figure.letter === props.picked}
                aria-label={nameOf(figure, shown)}
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
