import { read, type Guesses } from "@codebook/cipher-engine/frequency-analysis";
import { indexOfLetter } from "@codebook/cipher-engine/text";
import styles from "./WorkingText.module.css";

/**
 * The message as the codebreaker sees it. Unsolved cipher letters stay in
 * capitals; solved ones turn into small plain letters, as in the book. Tap a letter to work on it.
 */
export function WorkingText(props: {
  ciphertext: string;
  guesses: Guesses;
  picked?: string;
  onPick: (cipher: string) => void;
}) {
  return (
    <p className={styles.text} aria-label="The message so far">
      {props.ciphertext.split(/\s+/).map((word, at) => (
        <span key={at} className={styles.word}>
          {read(word, props.guesses).map(({ cipher, plain }, i) =>
            indexOfLetter(cipher) < 0 ? (
              cipher
            ) : (
              <button
                key={i}
                type="button"
                data-solved={plain !== undefined}
                aria-pressed={cipher === props.picked}
                aria-label={plain ? `Cipher ${cipher}, read as ${plain}` : `Cipher ${cipher}, not solved`}
                onClick={() => props.onPick(cipher)}
              >
                {plain?.toLowerCase() ?? cipher}
              </button>
            ),
          )}{" "}
        </span>
      ))}
    </p>
  );
}
