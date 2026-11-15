import { tally } from "@codebook/cipher-engine/pigpen";
import { useLocale, useT } from "~/i18n";
import { PigpenGlyph } from "./PigpenGlyph";
import styles from "./SymbolCounts.module.css";
import { describe } from "./vi";

/** How often each symbol appears in the message, commonest first: the codebreaker's count. */
export function SymbolCounts(props: { text: string; picked?: string; onPick: (letter: string) => void }) {
  const t = useT();
  const locale = useLocale();
  const counts = tally(props.text);
  if (counts.length === 0) return null;
  return (
    <div className={styles.counts}>
      <span className={styles.title}>
        {t({ en: "Count of each symbol, commonest first", vi: "Số lần mỗi ký hiệu xuất hiện, hay gặp nhất trước" })}
      </span>
      <ol>
        {counts.map(({ glyph, count }) => (
          <li key={glyph.letter}>
            <button
              type="button"
              aria-pressed={glyph.letter === props.picked}
              aria-label={`${describe(glyph, locale)}: ${count}`}
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
