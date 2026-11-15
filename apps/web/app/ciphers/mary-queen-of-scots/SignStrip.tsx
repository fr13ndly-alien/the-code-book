import { inWords, type Token } from "@codebook/cipher-engine/mary-queen-of-scots";
import { useT, type Bilingual } from "~/i18n";
import styles from "./SignStrip.module.css";

/** What to write above a sign that stands for no letter. */
const NOTE: Partial<Record<Token["kind"], Bilingual>> = {
  null: { en: "null", vi: "đệm" },
  doubler: { en: "double", vi: "kép" },
};

/**
 * A message as a row of signs, with the meaning of each sign above it.
 * When `hidden` is set, a meaning shows only for the sign the reader tapped.
 */
export function SignStrip(props: {
  tokens: Token[];
  hidden: boolean;
  picked?: string;
  onPick: (symbol: string) => void;
}) {
  const t = useT();
  return (
    <div className={styles.strip} role="group" aria-label={t({ en: "The message in signs", vi: "Bức thư bằng ký hiệu" })}>
      {inWords(props.tokens).map((word, at) => (
        <span key={at} className={styles.word}>
          {word.map((token, i) => {
            const shown = !props.hidden || token.symbol === props.picked;
            const note = NOTE[token.kind];
            const meaning = note ? t(note) : token.plain;
            return (
              <button
                key={i}
                type="button"
                data-kind={token.kind}
                aria-pressed={token.symbol === props.picked}
                aria-label={shown ? `${token.symbol}: ${meaning}` : token.symbol}
                onClick={() => props.onPick(token.symbol)}
              >
                <span className={styles.meaning}>{shown ? meaning : " "}</span>
                <span className={styles.sign}>{token.symbol}</span>
              </button>
            );
          })}
        </span>
      ))}
    </div>
  );
}
