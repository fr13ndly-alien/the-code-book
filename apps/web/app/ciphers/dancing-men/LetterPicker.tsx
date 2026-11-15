import { ALPHABET, ENGLISH_FREQUENCY, indexOfLetter } from "@codebook/cipher-engine/text";
import { useT } from "~/i18n";
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
  const t = useT();
  return (
    <div
      className={styles.picker}
      role="group"
      aria-label={t({ en: "Letters, most common in English first", vi: "Các chữ cái, chữ hay gặp nhất trong tiếng Anh đứng trước" })}
    >
      <span className={styles.label}>
        {props.disabled
          ? t({ en: "Tap a figure first. Then pick its letter here", vi: "Hãy chạm vào một hình nhân trước. Rồi chọn chữ của nó ở đây" })
          : t({ en: "Pick a letter for the bright figure", vi: "Chọn một chữ cho hình nhân đang sáng" })}
        {t({ en: " (most common in English first)", vi: " (chữ hay gặp nhất trong tiếng Anh đứng trước)" })}
      </span>
      <div className={styles.letters}>
        {BY_FREQUENCY.map((letter) => (
          <button
            key={letter}
            type="button"
            disabled={props.disabled}
            data-used={props.used.includes(letter)}
            aria-pressed={letter === props.current}
            aria-label={t({ en: `Letter ${letter}`, vi: `Chữ ${letter}` })}
            onClick={() => props.onAssign(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
