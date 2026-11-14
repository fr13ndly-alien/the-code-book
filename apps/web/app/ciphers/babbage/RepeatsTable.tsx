import { MAX_KEY_LENGTH, tallyFactors, type Repeat } from "@codebook/cipher-engine/babbage";
import styles from "./RepeatsTable.module.css";

const LENGTHS = Array.from({ length: MAX_KEY_LENGTH - 1 }, (_, index) => index + 2);

/**
 * The book's Table 6: each repeated sequence, the spacing between its two
 * copies, and a tick under every key length that divides the spacing.
 */
export function RepeatsTable(props: {
  repeats: Repeat[];
  /** The key length the reader is trying: its column is lit. */
  keyLength: number;
  /** The row whose sequence is lit in the ciphertext. */
  picked?: number;
  onPick: (row: number) => void;
}) {
  const { repeats, keyLength } = props;
  return (
    <table className={styles.table} aria-label="Repeated sequences, their spacings and the key lengths that fit">
      <thead>
        <tr>
          <th scope="col">Repeat</th>
          <th scope="col">Spacing</th>
          {LENGTHS.map((length) => (
            <th key={length} scope="col" data-on={length === keyLength}>
              {length}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {repeats.map((repeat, row) => (
          <tr key={row}>
            <th scope="row">
              <button type="button" aria-pressed={row === props.picked} onClick={() => props.onPick(row)}>
                {repeat.sequence}
              </button>
            </th>
            <td>{repeat.spacing}</td>
            {LENGTHS.map((length) => (
              <td key={length} data-on={length === keyLength}>
                {repeat.spacing % length === 0 ? "✓" : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colSpan={2}>
            Repeats that fit
          </th>
          {tallyFactors(repeats).map(({ length, count }) => (
            <td key={length} data-on={length === keyLength}>
              {count}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
}
