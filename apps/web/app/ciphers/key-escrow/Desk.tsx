import type { ReactNode } from "react";
import styles from "./Desk.module.css";

/** One place in the story of an escrowed key: Alice's desk, an agency, the wire, the police. */
export function Desk({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className={styles.desk}>
      <h2 className={styles.title}>
        {title}
        {note && <span className={styles.note}> {note}</span>}
      </h2>
      {children}
    </section>
  );
}

/** A labelled value on a desk. `secret` values are drawn in the lamp colour, like all cipher output. */
export function Line({ label, children, secret }: { label: string; children: ReactNode; secret?: boolean }) {
  return (
    <p className={styles.line}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value} data-secret={secret}>
        {children}
      </span>
    </p>
  );
}

/** A small table of working: one labelled row per stage of a sum, one column per letter. */
export function Working({ label, rows }: { label: string; rows: { label: string; cells: string[]; secret?: boolean }[] }) {
  return (
    <div className={styles.scroll}>
      <table className={styles.working} aria-label={label}>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} data-secret={row.secret}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, column) => (
                <td key={column}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
