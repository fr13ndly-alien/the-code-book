import { sixesOf, twentiesOf } from "@codebook/cipher-engine/purple";
import { useT } from "~/i18n";
import styles from "./Plugboard.module.css";

/** One half of the plugboard: its letters in socket order, with the letter in use lit. */
function Group(props: { name: string; kind: "sixes" | "twenties"; letters: string; lit?: string }) {
  return (
    <div className={styles.group} data-kind={props.kind}>
      <span className={styles.name}>{props.name}</span>
      <span className={styles.letters}>
        {[...props.letters].map((letter) => (
          <span key={letter} data-on={letter === props.lit}>
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}

/** The plugboard, which splits the alphabet in two: six letters for one switch, twenty for the other three. */
export function Plugboard({ plugboard, lit }: { plugboard: string; lit?: string }) {
  const t = useT();
  return (
    <div className={styles.board} role="group" aria-label={t({ en: "Plugboard", vi: "Bảng cắm dây" })}>
      <Group
        name={t({ en: "Sixes: one switch", vi: "Nhóm sáu: một công tắc" })}
        kind="sixes"
        letters={sixesOf(plugboard)}
        lit={lit}
      />
      <Group
        name={t({ en: "Twenties: three switches", vi: "Nhóm hai mươi: ba công tắc" })}
        kind="twenties"
        letters={twentiesOf(plugboard)}
        lit={lit}
      />
    </div>
  );
}
