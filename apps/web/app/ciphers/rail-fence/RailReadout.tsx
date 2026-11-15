import { useT } from "~/i18n";
import styles from "./RailReadout.module.css";

/**
 * The letters of each rail, in the order they are read off. Joined end to
 * end they are the ciphertext. Tapping a rail highlights it on the fence.
 */
export function RailReadout(props: { rails: string[]; picked?: number; onPick: (rail: number) => void }) {
  const t = useT();
  return (
    <ol className={styles.readout} aria-label={t({ en: "The rails, read off in order", vi: "Các thanh rào, đọc lần lượt" })}>
      {props.rails.map((letters, rail) => (
        <li key={rail}>
          <button type="button" aria-pressed={rail === props.picked} onClick={() => props.onPick(rail)}>
            <span className={styles.name}>
              {t({ en: "Rail", vi: "Thanh" })} {rail + 1}
            </span>
            <span className={styles.letters}>{letters || "–"}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
