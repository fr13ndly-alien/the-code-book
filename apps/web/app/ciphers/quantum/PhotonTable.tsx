import type { ReactNode } from "react";
import type { Comparison, Photon } from "@codebook/cipher-engine/quantum";
import { useT, type Bilingual } from "~/i18n";
import { Arrow } from "./Arrow";
import styles from "./PhotonTable.module.css";
import { COMPARED, MEASURED, SIFTED } from "./useQuantum";

/** One line of the table: a label and one cell per photon. */
interface TableRow {
  label: Bilingual;
  kind?: "photon" | "eve" | "key";
  cell: (photon: Photon, column: number) => ReactNode;
}

/** The detector symbol as the reader sees it: + or ×. */
const sign = (scheme: Photon["aliceScheme"]) => (scheme === "+" ? "+" : "×");

const ALICE_ROWS: TableRow[] = [
  { label: { en: "Alice's bit", vi: "Bit của Alice" }, cell: (photon) => photon.aliceBit },
  { label: { en: "Alice's scheme", vi: "Sơ đồ của Alice" }, cell: (photon) => sign(photon.aliceScheme) },
  { label: { en: "Photon she sends", vi: "Phôtôn cô gửi" }, kind: "photon", cell: (photon) => <Arrow angle={photon.angle} /> },
];

const EVE_ROWS: TableRow[] = [
  { label: { en: "Eve's detector", vi: "Máy dò của Eve" }, kind: "eve", cell: (photon) => photon.eve && sign(photon.eve.scheme) },
  { label: { en: "Eve reads", vi: "Eve đọc được" }, kind: "eve", cell: (photon) => photon.eve?.bit },
  { label: { en: "Photon she sends on", vi: "Phôtôn cô gửi tiếp" }, kind: "eve", cell: (photon) => photon.eve && <Arrow angle={photon.eve.angle} /> },
];

const BOB_ROWS: TableRow[] = [
  { label: { en: "Bob's detector", vi: "Máy dò của Bob" }, cell: (photon) => sign(photon.bobScheme) },
  { label: { en: "Bob's bit", vi: "Bit của Bob" }, cell: (photon) => photon.bobBit },
];

const SIFT_ROW: TableRow = { label: { en: "Same scheme?", vi: "Cùng sơ đồ?" }, cell: (photon) => (photon.kept ? "✓" : "") };

/** The rows that only exist once a sample has been compared. */
function compareRows(result: Comparison): TableRow[] {
  return [
    {
      label: { en: "Read out to compare", vi: "Đọc to để so" },
      cell: (photon, column) => (result.sample.includes(column) ? (photon.wrong ? "✗" : "=") : ""),
    },
    { label: { en: "Secret key", vi: "Chìa khóa bí mật" }, kind: "key", cell: (photon, column) => (result.secret.includes(column) ? photon.aliceBit : "") },
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
  const t = useT();
  const { photons, stage, picked } = props;
  const rows = [
    ...ALICE_ROWS,
    ...(props.showEve ? EVE_ROWS : []),
    ...(stage >= MEASURED ? BOB_ROWS : []),
    ...(stage >= SIFTED ? [SIFT_ROW] : []),
    ...(stage >= COMPARED ? compareRows(props.result) : []),
  ];

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label.en} data-kind={row.kind}>
              <th scope="row">{t(row.label)}</th>
              {photons.map((photon, column) => (
                <td key={column} data-on={column === picked} data-dim={stage >= SIFTED && !photon.kept}>
                  {row.cell(photon, column)}
                </td>
              ))}
            </tr>
          ))}
          <tr className={styles.pickers}>
            <th scope="row">{t({ en: "Photon number", vi: "Số thứ tự phôtôn" })}</th>
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
    </div>
  );
}
