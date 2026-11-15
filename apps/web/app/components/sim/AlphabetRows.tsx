import { UI, useLocale } from "~/i18n";
import styles from "./AlphabetRows.module.css";

/** One line of an alphabet table, such as the plain alphabet or a cipher alphabet. */
export interface AlphabetRow {
  label: string;
  /** One entry per column. A string is split into its letters. */
  letters: string | string[];
  /** Cipher rows are drawn in the lamp colour, plain rows in the text colour. */
  kind?: "plain" | "cipher";
}

/**
 * Alphabets written one above the other, the way the book draws a substitution
 * cipher. Tapping a column highlights it, to show which letter becomes which.
 */
export function AlphabetRows(props: {
  rows: AlphabetRow[];
  /** The highlighted column, counting from 0. */
  highlight?: number;
  onPick?: (column: number) => void;
}) {
  const locale = useLocale();
  const columns = [...props.rows[0]!.letters];
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <tbody>
          {props.rows.map((row) => (
            <tr key={row.label} data-kind={row.kind ?? "plain"}>
              <th scope="row">{row.label}</th>
              {[...row.letters].map((letter, column) => (
                <td key={column} data-on={column === props.highlight}>
                  {letter}
                </td>
              ))}
            </tr>
          ))}
          {props.onPick && (
            <tr className={styles.pickers}>
              <th scope="row" className="visually-hidden">
                {UI.highlight[locale]}
              </th>
              {columns.map((letter, column) => (
                <td key={column}>
                  <button
                    type="button"
                    aria-label={`${UI.highlight[locale]} ${letter}`}
                    aria-pressed={column === props.highlight}
                    onClick={() => props.onPick!(column)}
                  />
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
