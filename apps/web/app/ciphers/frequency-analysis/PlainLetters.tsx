import { ENGLISH_RANK } from "@codebook/cipher-engine/frequency-analysis";
import styles from "./PlainLetters.module.css";

/**
 * The letters of normal English, most common first. Tap one to say that the
 * picked cipher letter stands for it. Letters already used are faded.
 */
export function PlainLetters(props: {
  /** The plain letters already given to a cipher letter. */
  used: string[];
  /** The plain letter of the cipher letter being worked on, if it has one. */
  current?: string;
  disabled: boolean;
  onAssign: (plain: string) => void;
}) {
  return (
    <div className={styles.picker} role="group" aria-label="Plain letters, most common in English first">
      <span className={styles.label}>English, most common first</span>
      <div className={styles.letters}>
        {ENGLISH_RANK.map((letter) => (
          <button
            key={letter}
            type="button"
            disabled={props.disabled}
            data-used={props.used.includes(letter)}
            aria-pressed={letter === props.current}
            aria-label={`Plain ${letter}`}
            onClick={() => props.onAssign(letter)}
          >
            {letter.toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
