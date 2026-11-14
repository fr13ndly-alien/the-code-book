import { describe, tally } from "@codebook/cipher-engine/pigpen";
import { PigpenGlyph } from "./PigpenGlyph";
import styles from "./SymbolCounts.module.css";

/** How often each symbol appears in the message, commonest first: the codebreaker's count. */
export function SymbolCounts(props: { text: string; picked?: string; onPick: (letter: string) => void }) {
  const counts = tally(props.text);
  if (counts.length === 0) return null;
  return (
    <div className={styles.counts}>
      <span className={styles.title}>Count of each symbol, commonest first</span>
      <ol>
        {counts.map(({ glyph, count }) => (
          <li key={glyph.letter}>
            <button
              type="button"
              aria-pressed={glyph.letter === props.picked}
              aria-label={`${describe(glyph)}: ${count}`}
              onClick={() => props.onPick(glyph.letter)}
            >
              <PigpenGlyph glyph={glyph} />
              <span className={styles.count}>{count}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
