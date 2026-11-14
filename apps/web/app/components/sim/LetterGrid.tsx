import styles from "./LetterGrid.module.css";

/** How a cell is drawn: "on" is the brass highlight, "cipher" the lamp colour, "dim" faded. */
export type CellMark = "on" | "cipher" | "dim" | undefined;

/**
 * A grid of letters with optional headings: a Vigenère square, a Playfair
 * square, the rails of a rail fence. Cells can be tapped if `onPick` is given.
 */
export function LetterGrid(props: {
  /** Read by screen readers, e.g. "Playfair square". */
  label: string;
  /** cells[row][column]. An empty string draws an empty cell. */
  cells: string[][];
  columnHeads?: string[];
  rowHeads?: string[];
  mark?: (row: number, column: number) => CellMark;
  onPick?: (row: number, column: number) => void;
  /** Small cells fit 26 columns; large cells suit a 5 by 5 square. */
  size?: "small" | "large";
}) {
  const { cells, columnHeads, rowHeads, mark, onPick } = props;
  return (
    <table className={styles.grid} aria-label={props.label} data-size={props.size ?? "large"}>
      {columnHeads && (
        <thead>
          <tr>
            {rowHeads && <td />}
            {columnHeads.map((head, column) => (
              <th key={column} scope="col">
                {head}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {cells.map((line, row) => (
          <tr key={row}>
            {rowHeads && <th scope="row">{rowHeads[row]}</th>}
            {line.map((letter, column) => (
              <td key={column} data-mark={mark?.(row, column)} data-empty={letter === ""}>
                {onPick && letter !== "" ? (
                  <button type="button" onClick={() => onPick(row, column)}>
                    {letter}
                  </button>
                ) : (
                  letter
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
