import { CODEBOOK, entryFor } from "@codebook/cipher-engine/zimmermann";
import { useLocale, useT } from "~/i18n";
import styles from "./Desk.module.css";
import { GERMAN_COLUMN_VI } from "./vi";

/** The encoding clerk's desk: the telegram so far, and the codebook to tap words from. */
export function ClerkDesk({ words, onTap }: { words: string[]; onTap: (word: string) => void }) {
  const t = useT();
  const vi = useLocale() === "vi";
  const german = (text: string | undefined) => (vi && text ? (GERMAN_COLUMN_VI[text] ?? text) : text);
  return (
    <>
      <ol className={styles.telegram} aria-label={t({ en: "Your telegram", vi: "Bức điện của bạn" })}>
        {words.length === 0 && <li className={styles.empty}>{t({ en: "The telegram form is empty.", vi: "Tờ mẫu điện báo còn trống." })}</li>}
        {words.map((word, index) => (
          <li key={index} className={styles.chip}>
            <span className={styles.word}>{word}</span>
            <span className={styles.group}>{entryFor(word)?.group}</span>
          </li>
        ))}
      </ol>
      <ul className={styles.codebook} aria-label={t({ en: "Codebook", vi: "Sổ mã" })}>
        {CODEBOOK.map((entry) => (
          <li key={entry.word}>
            <button type="button" className={styles.entry} onClick={() => onTap(entry.word)}>
              <span className={styles.word}>{entry.word}</span>
              <span className={styles.german}>{entry.madeUp ? t({ en: "made up *", vi: "tự đặt *" }) : german(entry.german)}</span>
              <span className={styles.group}>{entry.group}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
