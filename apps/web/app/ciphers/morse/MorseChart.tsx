import { CHARACTERS, MORSE } from "@codebook/cipher-engine/morse";
import { useT } from "~/i18n";
import { Marks } from "./Marks";
import styles from "./MorseChart.module.css";

/** The Morse table: every letter and figure with its dots and dashes. `on` picks out some of them. */
export function MorseChart({ on }: { on: string[] }) {
  const t = useT();
  const some = on.length > 0 && on.length < CHARACTERS.length;
  return (
    <ul className={styles.chart} aria-label={t({ en: "The Morse table", vi: "Bảng mã Morse" })}>
      {CHARACTERS.map((char) => (
        <li key={char} data-on={some && on.includes(char)} data-dim={some && !on.includes(char)}>
          <span className={styles.char}>{char}</span>
          <Marks code={MORSE[char]!} />
        </li>
      ))}
    </ul>
  );
}
