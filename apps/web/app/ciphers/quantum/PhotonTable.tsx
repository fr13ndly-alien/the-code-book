import type { ReactNode } from "react";
import type { Comparison, Photon } from "@codebook/cipher-engine/quantum";
import { Arrow } from "./Arrow";
import styles from "./PhotonTable.module.css";
import { COMPARED, MEASURED, SIFTED } from "./useQuantum";

/** One line of the table: a label and one cell per photon. */
interface TableRow {
  label: string;
  kind?: "photon" | "eve" | "key";
  cell: (photon: Photon, column: number) => ReactNode;
}

/** The detector symbol as the reader sees it: + or ×. */
const sign = (scheme: Photon["aliceScheme"]) => (scheme === "+" ? "+" : "×");

const ALICE_ROWS: TableRow[] = [
  { label: "Alice's bit", cell: (photon) => photon.aliceBit },
  { label: "Alice's scheme", cell: (photon) => sign(photon.aliceScheme) },
  { label: "Photon she sends", kind: "photon", cell: (photon) => <Arrow angle={photon.angle} /> },
];

const EVE_ROWS: TableRow[] = [
  { label: "Eve's detector", kind: "eve", cell: (photon) => photon.eve && sign(photon.eve.scheme) },
  { label: "Eve reads", kind: "eve", cell: (photon) => photon.eve?.bit },
  { label: "Photon she sends on", kind: "eve", cell: (photon) => photon.eve && <Arrow angle={photon.eve.angle} /> },
];

const BOB_ROWS: TableRow[] = [
  { label: "Bob's detector", cell: (photon) => sign(photon.bobScheme) },
  { label: "Bob's bit", cell: (photon) => photon.bobBit },
];

const SIFT_ROW: TableRow = { label: "Same scheme?", cell: (photon) => (photon.kept ? "✓" : "") };

/** The rows that only exist once a sample has been compared. */
function compareRows(result: Comparison): TableRow[] {
  return [
    {
      label: "Read out to compare",
      cell: (photon, column) => (result.sample.includes(column) ? (photon.wrong ? "✗" : "=") : ""),
    },
    { label: "Secret key", kind: "key", cell: (photon, column) => (result.secret.includes(column) ? photon.aliceBit : "") },
  ];
}

/**
 * A row of photons, one column each, from Alice at the top to Bob at the
 * bottom. Rows appear as the steps are done. Tapping under a column picks it.
 */
export function PhotonTable(props: {
  photons: Photon[];
  result: Comparison;
  stage: number;
  showEve: boolean;
  picked?: number;
  onPick: (column: number) => void;
}) {
  const { photons, stage, picked } = props;
  const rows = [
    ...ALICE_ROWS,
    ...(props.showEve ? EVE_ROWS : []),
    ...(stage >= MEASURED ? BOB_ROWS : []),
    ...(stage >= SIFTED ? [SIFT_ROW] : []),
    ...(stage >= COMPARED ? compareRows(props.result) : []),
  ];

  return (
    <table className={styles.table}>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} data-kind={row.kind}>
            <th scope="row">{row.label}</th>
            {photons.map((photon, column) => (
              <td key={column} data-on={column === picked} data-dim={stage >= SIFTED && !photon.kept}>
                {row.cell(photon, column)}
              </td>
            ))}
          </tr>
        ))}
        <tr className={styles.pickers}>
          <th scope="row">Photon number</th>
          {photons.map((_, column) => (
            <td key={column}>
              <button type="button" aria-pressed={column === picked} onClick={() => props.onPick(column)}>
                {column + 1}
              </button>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
