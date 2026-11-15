import { tryAllShifts } from "@codebook/cipher-engine/caesar";
import { useT } from "~/i18n";
import styles from "./ShiftList.module.css";

/**
 * The brute-force attack on a Caesar shift: all 26 readings of the ciphertext,
 * folded away until asked for. Tapping a reading tries that shift.
 */
export function ShiftList(props: { ciphertext: string; shift: number; onChoose: (shift: number) => void }) {
  const t = useT();
  return (
    <details className={styles.attack}>
      <summary>{t({ en: "Try every shift at once", vi: "Thử mọi độ dịch cùng lúc" })}</summary>
      <ol>
        {tryAllShifts(props.ciphertext).map((reading, shift) => (
          <li key={shift}>
            <button
              type="button"
              aria-pressed={shift === props.shift}
              aria-label={t({ en: `Shift ${shift}: ${reading}`, vi: `Độ dịch ${shift}: ${reading}` })}
              onClick={() => props.onChoose(shift)}
            >
              <span className={styles.shift}>{shift}</span>
              <span className={styles.reading}>{reading}</span>
            </button>
          </li>
        ))}
      </ol>
    </details>
  );
}
