import { ALPHABET, ENGLISH_FREQUENCY, indexOfLetter } from "@codebook/cipher-engine/text";
import styles from "./LetterPicker.module.css";

/** The letters of English, most common first: the order a codebreaker tries them in. */
const BY_FREQUENCY = [...ALPHABET].sort(
  (a, b) => ENGLISH_FREQUENCY[indexOfLetter(b)]! - ENGLISH_FREQUENCY[indexOfLetter(a)]!,
);

/** The letters to choose from when naming a figure. Letters already given to a figure are faded. */
export function LetterPicker(props: {
  used: string[];
  /** The letter the picked figure has now, if any. */
  current?: string;
  disabled: boolean;
  onAssign: (plain: string) => void;
}) {
  return (
    <div className={styles.picker} role="group" aria-label="Letters, most common in English first">
      <span className={styles.label}>
        {props.disabled ? "Tap a figure first. Then pick its letter here" : "Pick a letter for the bright figure"}
        {" (most common in English first)"}
      </span>
      <div className={styles.letters}>
        {BY_FREQUENCY.map((letter) => (
          <button
            key={letter}
            type="button"
            disabled={props.disabled}
            data-used={props.used.includes(letter)}
            aria-pressed={letter === props.current}
            aria-label={`Letter ${letter}`}
            onClick={() => props.onAssign(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
