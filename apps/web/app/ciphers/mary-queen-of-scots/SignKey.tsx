import { STAND_IN } from "@codebook/cipher-engine/mary-queen-of-scots";
import { useT, type Bilingual } from "~/i18n";
import styles from "./SignKey.module.css";

/** One part of the nomenclator: a heading and its signs, each with what it stands for. */
interface Part {
  title: Bilingual;
  entries: { symbol: string; meaning: Bilingual }[];
}

/** Letters and words are cipher data: the same in both languages. */
const fromTable = (table: Record<string, string>) =>
  Object.entries(table).map(([meaning, symbol]) => ({ symbol, meaning: { en: meaning, vi: meaning } }));

const NULL = { en: "null", vi: "không" };
const DOUBLE = { en: "double", vi: "kép" };

/** The stand-in nomenclator, laid out like the sheet Mary and her friends each kept. */
const PARTS: Part[] = [
  { title: { en: "A sign for each letter", vi: "Mỗi chữ một ký hiệu" }, entries: fromTable(STAND_IN.letters) },
  {
    title: { en: "Nulls: they mean nothing", vi: "Ký tự không: chúng chẳng có nghĩa gì" },
    entries: STAND_IN.nulls.map((symbol) => ({ symbol, meaning: NULL })),
  },
  {
    title: { en: "Doubles the next sign", vi: "Nhân đôi ký hiệu tiếp theo" },
    entries: [{ symbol: STAND_IN.doubler, meaning: DOUBLE }],
  },
  { title: { en: "Signs for whole words", vi: "Ký hiệu cho cả từ" }, entries: fromTable(STAND_IN.words) },
];

/** The key: every sign of the nomenclator. Tap one to find it in the message. */
export function SignKey({ picked, onPick }: { picked?: string; onPick: (symbol: string) => void }) {
  const t = useT();
  return (
    <div className={styles.key}>
      <p className={styles.note}>
        {t({
          en: "The key. These signs are our stand-ins, not Mary's own.",
          vi: "Chìa khóa. Đây là các ký hiệu thay thế của chúng tôi, không phải ký hiệu thật của Mary.",
        })}
      </p>
      {PARTS.map((part) => (
        <div key={part.title.en} className={styles.part} role="group" aria-label={t(part.title)}>
          <span className={styles.title}>{t(part.title)}</span>
          <div className={styles.entries}>
            {part.entries.map(({ symbol, meaning }) => (
              <button
                key={symbol}
                type="button"
                aria-pressed={symbol === picked}
                aria-label={`${symbol}: ${t(meaning)}`}
                onClick={() => onPick(symbol)}
              >
                <span className={styles.meaning}>{t(meaning)}</span>
                <span className={styles.sign}>{symbol}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
