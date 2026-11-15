import { useT } from "~/i18n";
import styles from "./PairCards.module.css";

/**
 * The thirteen pairs, each drawn as two letters joined by a line. Tapping a
 * letter picks it; the picked letter and its partner are lit.
 */
export function PairCards(props: {
  pairs: string[];
  picked?: string;
  partner?: string;
  onPick: (letter: string) => void;
}) {
  const t = useT();
  const mark = (letter: string) =>
    letter === props.picked ? "on" : letter === props.partner ? "partner" : undefined;

  return (
    <ul className={styles.pairs} aria-label={t({ en: "The thirteen pairs of letters", vi: "Mười ba cặp chữ cái" })}>
      {props.pairs.map((pair) => (
        <li key={pair} className={styles.pair}>
          <PairButton letter={pair[0]!} partner={pair[1]!} mark={mark(pair[0]!)} onPick={props.onPick} />
          <span className={styles.link} aria-hidden="true" />
          <PairButton letter={pair[1]!} partner={pair[0]!} mark={mark(pair[1]!)} onPick={props.onPick} />
        </li>
      ))}
    </ul>
  );
}

/** One letter of a pair, as a button. */
function PairButton(props: { letter: string; partner: string; mark?: string; onPick: (letter: string) => void }) {
  const t = useT();
  return (
    <button
      type="button"
      aria-label={t({ en: `${props.letter}, paired with ${props.partner}`, vi: `${props.letter}, cùng cặp với ${props.partner}` })}
      aria-pressed={props.mark === "on"}
      data-mark={props.mark}
      onClick={() => props.onPick(props.letter)}
    >
      {props.letter}
    </button>
  );
}
