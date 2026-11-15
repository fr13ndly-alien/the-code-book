import { CONSONANTS, VOWELS, readSign, signAt, type SignId, type Values } from "@codebook/cipher-engine/linear-b";
import { useLocale, useT } from "~/i18n";
import { Glyph } from "./Glyph";
import { columnSound, lineName, rowSound, signLabel } from "./labels";
import styles from "./SignGrid.module.css";

/** The heading of a row or column: its fixed name, and its sound once a guess has found it. */
function Heading(props: { scope: "row" | "col"; name: string; sound?: string }) {
  return (
    <th scope={props.scope}>
      {props.name}
      <span className={styles.found}>{props.sound ?? ""}</span>
    </th>
  );
}

/** One cell of the grid: a sign and its sound so far, or nothing. */
function Cell(props: { sign?: SignId; values: Values; marked: boolean; bridge: boolean }) {
  const { sign, values } = props;
  const locale = useLocale();
  return (
    <td data-marked={props.marked} data-bridge={props.bridge}>
      {sign && (
        <>
          <Glyph sign={sign} label={signLabel(sign, values, locale)} />
          <span className={styles.sound}>{readSign(sign, values)}</span>
        </>
      )}
    </td>
  );
}

/**
 * Ventris's grid: every sign sorted by its unknown consonant (row) and unknown
 * vowel (column). Headings and sounds fill in as guesses succeed.
 */
export function SignGrid(props: { values: Values; marked: SignId[]; bridge: SignId[] }) {
  const { values } = props;
  const t = useT();
  const has = (list: SignId[], sign?: SignId) => !!sign && list.includes(sign);

  return (
    <table className={styles.grid} aria-label={t({
        en: "Grid of signs: rows share a consonant, columns share a vowel",
        vi: "Lưới ký hiệu: mỗi hàng chung một phụ âm, mỗi cột chung một nguyên âm",
      })}>
      <thead>
        <tr>
          <td />
          {VOWELS.map((vowel, column) => (
            <Heading key={vowel} scope="col" name={lineName("column", column)} sound={columnSound(column, values)} />
          ))}
        </tr>
      </thead>
      <tbody>
        {CONSONANTS.map((consonant, row) => (
          <tr key={consonant}>
            <Heading scope="row" name={lineName("row", row)} sound={rowSound(row, values)} />
            {VOWELS.map((vowel, column) => {
              const sign = signAt(row, column);
              return (
                <Cell
                  key={vowel}
                  sign={sign}
                  values={values}
                  marked={has(props.marked, sign)}
                  bridge={has(props.bridge, sign)}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
