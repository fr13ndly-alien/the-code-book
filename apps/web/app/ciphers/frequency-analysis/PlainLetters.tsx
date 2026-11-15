import { ENGLISH_RANK } from "@codebook/cipher-engine/frequency-analysis";
import { useT } from "~/i18n";
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
  const t = useT();
  return (
    <div
      className={styles.picker}
      role="group"
      aria-label={t({ en: "Plain letters, most common in English first", vi: "Các chữ rõ, chữ hay gặp nhất trong tiếng Anh đứng đầu" })}
    >
      <span className={styles.label}>{t({ en: "English, most common first", vi: "Tiếng Anh, chữ hay gặp nhất đứng đầu" })}</span>
      <div className={styles.letters}>
        {ENGLISH_RANK.map((letter) => (
          <button
            key={letter}
            type="button"
            disabled={props.disabled}
            data-used={props.used.includes(letter)}
            aria-pressed={letter === props.current}
            aria-label={t({ en: `Plain ${letter}`, vi: `Chữ rõ ${letter}` })}
            onClick={() => props.onAssign(letter)}
          >
            {letter.toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
