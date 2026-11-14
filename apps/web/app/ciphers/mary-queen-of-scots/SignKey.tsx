import { STAND_IN } from "@codebook/cipher-engine/mary-queen-of-scots";
import styles from "./SignKey.module.css";

/** One part of the nomenclator: a heading and its signs, each with what it stands for. */
interface Part {
  title: string;
  entries: { symbol: string; meaning: string }[];
}

const fromTable = (table: Record<string, string>) =>
  Object.entries(table).map(([meaning, symbol]) => ({ symbol, meaning }));

/** The stand-in nomenclator, laid out like the sheet Mary and her friends each kept. */
const PARTS: Part[] = [
  { title: "A sign for each letter", entries: fromTable(STAND_IN.letters) },
  { title: "Nulls: they mean nothing", entries: STAND_IN.nulls.map((symbol) => ({ symbol, meaning: "null" })) },
  { title: "Doubles the next sign", entries: [{ symbol: STAND_IN.doubler, meaning: "double" }] },
  { title: "Signs for whole words", entries: fromTable(STAND_IN.words) },
];

/** The key: every sign of the nomenclator. Tap one to find it in the message. */
export function SignKey({ picked, onPick }: { picked?: string; onPick: (symbol: string) => void }) {
  return (
    <div className={styles.key}>
      <p className={styles.note}>The key. These signs are our stand-ins, not Mary's own.</p>
      {PARTS.map((part) => (
        <div key={part.title} className={styles.part} role="group" aria-label={part.title}>
          <span className={styles.title}>{part.title}</span>
          <div className={styles.entries}>
            {part.entries.map(({ symbol, meaning }) => (
              <button
                key={symbol}
                type="button"
                aria-pressed={symbol === picked}
                aria-label={`${symbol}: ${meaning}`}
                onClick={() => onPick(symbol)}
              >
                <span className={styles.meaning}>{meaning}</span>
                <span className={styles.sign}>{symbol}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
