import { BITS, charOf, type Column } from "@codebook/cipher-engine/binary";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useT } from "~/i18n";
import styles from "./BinaryBoard.module.css";
import { columnsOf, type BinaryState } from "./useBinary";

/** One character of the sum: its digits, the key's digits under them, and the result. */
function Sum(props: { column: Column; keyRow: number; flips: number[]; onFlip: (digit: number) => void }) {
  const { column, keyRow } = props;
  const t = useT();
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
            aria-label={t({ en: `Key digit ${bit}. Flip it`, vi: `Chữ số khóa ${bit}. Lật nó` })}
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
  const t = useT();

  return (
    <Board>
      <ol className={styles.sums} aria-label={t({ en: "The sum, one block per character", vi: "Phép cộng, mỗi ký tự một khối" })}>
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
          ? t({ en: "Type below to fill the board.", vi: "Gõ ở dưới để điền vào bảng." })
          : t({
              en: `Each block is one character. Top row: the ${enciphering ? "message" : "ciphertext"}. Middle row: the key. Bottom row: their sum, where a digit is 1 only if the two above it differ. A dot is a number with no printable character.`,
              vi: `Mỗi khối là một ký tự. Hàng trên: ${enciphering ? "tin nhắn" : "bản mật mã"}. Hàng giữa: khóa. Hàng dưới: tổng của chúng, trong đó một chữ số là 1 chỉ khi hai chữ số phía trên nó khác nhau. Dấu chấm là một con số không ứng với ký tự in được nào.`,
            })}
      </Caption>
    </Board>
  );
}
