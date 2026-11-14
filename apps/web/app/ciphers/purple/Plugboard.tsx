import { sixesOf, twentiesOf } from "@codebook/cipher-engine/purple";
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
  return (
    <div className={styles.board} role="group" aria-label="Plugboard">
      <Group name="Sixes: one switch" kind="sixes" letters={sixesOf(plugboard)} lit={lit} />
      <Group name="Twenties: three switches" kind="twenties" letters={twentiesOf(plugboard)} lit={lit} />
    </div>
  );
}
