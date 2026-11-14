import { ITA2 } from "@codebook/cipher-engine/lorenz";
import styles from "./Tape.module.css";

/** A strip of punched paper tape: one column of five holes per character. */
export function Tape(props: {
  label: string;
  /** The characters on the tape. */
  symbols: string;
  /** Output tape is drawn in the lamp colour. */
  kind?: "plain" | "cipher";
  picked: number;
  onPick: (at: number) => void;
}) {
  return (
    <div className={styles.frame}>
      <span className={styles.label}>{props.label}</span>
      <div className={styles.tape} data-kind={props.kind ?? "plain"}>
        {[...props.symbols].map((symbol, at) => (
          <button
            key={at}
            type="button"
            className={styles.column}
            aria-label={`${props.label}, character ${at + 1}: ${symbol}, holes ${ITA2[symbol]}`}
            aria-pressed={at === props.picked}
            onClick={() => props.onPick(at)}
          >
            <span className={styles.symbol}>{symbol}</span>
            {[...ITA2[symbol]!].map((bit, impulse) => (
              <span key={impulse} className={styles.hole} data-on={bit === "1"} data-feed={impulse === 2} />
            ))}
          </button>
        ))}
      </div>
    </div>
  );
}
