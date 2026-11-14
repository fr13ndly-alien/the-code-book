import { BITS, charOf, type Column } from "@codebook/cipher-engine/binary";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import styles from "./BinaryBoard.module.css";
import { columnsOf, type BinaryState } from "./useBinary";

/** One character of the sum: its digits, the key's digits under them, and the result. */
function Sum(props: { column: Column; keyRow: number; flips: number[]; onFlip: (digit: number) => void }) {
  const { column, keyRow } = props;
  return (
    <li className={styles.sum}>
      <span className={styles.char}>{charOf(column.input)}</span>
      <span className={styles.bits}>
        {[...column.input].map((bit, at) => (
          <span key={at}>{bit}</span>
        ))}
      </span>
      <span className={styles.char} data-kind="key">
        {charOf(column.key)}
      </span>
      <span className={styles.bits} data-kind="key">
        {[...column.key].map((bit, at) => (
          <button
            key={at}
            type="button"
            aria-label={`Key digit ${bit}. Flip it`}
            aria-pressed={props.flips.includes(keyRow * BITS + at)}
            disabled={keyRow < 0}
            onClick={() => props.onFlip(keyRow * BITS + at)}
          >
            {bit}
          </button>
        ))}
      </span>
      <span className={styles.char} data-kind="out">
        {charOf(column.output)}
      </span>
      <span className={styles.bits} data-kind="out">
        {[...column.output].map((bit, at) => (
          <span key={at} data-changed={bit !== column.input[at]}>
            {bit}
          </span>
        ))}
      </span>
    </li>
  );
}

/** The message, the key and their sum as rows of binary digits, one block per character. */
export function BinaryBoard({ state, onFlip }: { state: BinaryState; onFlip: (digit: number) => void }) {
  const columns = columnsOf(state);
  const keyLength = [...state.key].length;
  const enciphering = state.mode === "encipher";

  return (
    <Board>
      <ol className={styles.sums} aria-label="The sum, one block per character">
        {columns.map((column, at) => (
          <Sum
            key={at}
            column={column}
            keyRow={keyLength ? at % keyLength : -1}
            flips={state.flips}
            onFlip={onFlip}
          />
        ))}
      </ol>
      <Caption>
        {columns.length === 0
          ? "Type below to fill the board."
          : `Each block is one character. Top row: the ${enciphering ? "message" : "ciphertext"}. Middle row: the key. Bottom row: their sum, where a digit is 1 only if the two above it differ. A dot is a number with no printable character.`}
      </Caption>
    </Board>
  );
}
