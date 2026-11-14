import { CODEBOOK, entryFor } from "@codebook/cipher-engine/zimmermann";
import styles from "./Desk.module.css";

/** The encoding clerk's desk: the telegram so far, and the codebook to tap words from. */
export function ClerkDesk({ words, onTap }: { words: string[]; onTap: (word: string) => void }) {
  return (
    <>
      <ol className={styles.telegram} aria-label="Your telegram">
        {words.length === 0 && <li className={styles.empty}>The telegram form is empty.</li>}
        {words.map((word, index) => (
          <li key={index} className={styles.chip}>
            <span className={styles.word}>{word}</span>
            <span className={styles.group}>{entryFor(word)?.group}</span>
          </li>
        ))}
      </ol>
      <ul className={styles.codebook} aria-label="Codebook">
        {CODEBOOK.map((entry) => (
          <li key={entry.word}>
            <button type="button" className={styles.entry} onClick={() => onTap(entry.word)}>
              <span className={styles.word}>{entry.word}</span>
              <span className={styles.german}>{entry.madeUp ? "made up *" : entry.german}</span>
              <span className={styles.group}>{entry.group}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
