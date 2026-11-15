import { WATCH_WORDS, scan } from "@codebook/cipher-engine/key-escrow";
import { useT } from "~/i18n";
import { SCANNED_MESSAGES } from "./presets";
import styles from "./Scanner.module.css";

/** A toy of the Echelon idea: a keyword filter over five messages. The enciphered one slips through. */
export function Scanner() {
  const t = useT();
  const found = scan(SCANNED_MESSAGES);
  return (
    <details className={styles.scanner}>
      <summary>{t({ en: "A toy keyword scanner", vi: "Máy quét từ khóa đồ chơi" })}</summary>
      <p>
        {t({
          en: <>Watch list: {WATCH_WORDS.join(", ")}. The last message is the fourth one, enciphered.</>,
          vi: <>Danh sách theo dõi: {WATCH_WORDS.join(", ")}. Tin nhắn cuối cùng chính là tin nhắn thứ tư, đã được mã hóa.</>,
        })}
      </p>
      <ul>
        {SCANNED_MESSAGES.map((message, row) => (
          <li key={message} data-flagged={found[row]!.length > 0}>
            <span className={styles.message}>{message}</span>
            <span className={styles.verdict}>{found[row]!.length > 0
                ? t({ en: `Set aside: ${found[row]!.join(", ")}`, vi: `Để riêng ra: ${found[row]!.join(", ")}` })
                : t({ en: "Let through", vi: "Cho qua" })}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
