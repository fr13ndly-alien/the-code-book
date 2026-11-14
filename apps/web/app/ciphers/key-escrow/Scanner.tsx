import { WATCH_WORDS, scan } from "@codebook/cipher-engine/key-escrow";
import { SCANNED_MESSAGES } from "./presets";
import styles from "./Scanner.module.css";

/** A toy of the Echelon idea: a keyword filter over five messages. The enciphered one slips through. */
export function Scanner() {
  const found = scan(SCANNED_MESSAGES);
  return (
    <details className={styles.scanner}>
      <summary>A toy keyword scanner</summary>
      <p>Watch list: {WATCH_WORDS.join(", ")}. The last message is the fourth one, enciphered.</p>
      <ul>
        {SCANNED_MESSAGES.map((message, row) => (
          <li key={message} data-flagged={found[row]!.length > 0}>
            <span className={styles.message}>{message}</span>
            <span className={styles.verdict}>{found[row]!.length > 0 ? `Set aside: ${found[row]!.join(", ")}` : "Let through"}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
