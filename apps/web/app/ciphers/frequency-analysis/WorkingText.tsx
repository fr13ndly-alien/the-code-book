import { read, type Guesses } from "@codebook/cipher-engine/frequency-analysis";
import { indexOfLetter } from "@codebook/cipher-engine/text";
import { useT } from "~/i18n";
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
  const t = useT();
  return (
    <p className={styles.text} aria-label={t({ en: "The message so far", vi: "Tin nhắn tới giờ" })}>
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
                aria-label={
                  plain
                    ? t({ en: `Cipher ${cipher}, read as ${plain}`, vi: `Chữ mã ${cipher}, đọc là ${plain}` })
                    : t({ en: `Cipher ${cipher}, not solved`, vi: `Chữ mã ${cipher}, chưa giải` })
                }
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
