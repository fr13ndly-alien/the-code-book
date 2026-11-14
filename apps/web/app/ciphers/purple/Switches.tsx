import { POSITIONS, type Step } from "@codebook/cipher-engine/purple";
import { SWITCH_NAMES, speedOf } from "./layout";
import styles from "./Switches.module.css";

/** One stepping switch: its name, where its wiper stands among the 25 positions, and whether it steps next. */
function Switch(props: { name: string; position: number; used: boolean; steps: boolean }) {
  return (
    <div className={styles.switch} data-used={props.used}>
      <span className={styles.name}>{props.name}</span>
      <span className={styles.position}>{props.position + 1}</span>
      <span className={styles.dial} aria-hidden="true">
        {Array.from({ length: POSITIONS }, (_, at) => (
          <span key={at} data-now={at === props.position} />
        ))}
      </span>
      <span className={styles.next}>{props.steps ? "steps next" : "stays"}</span>
    </div>
  );
}

/** The four stepping switches as they stand for one letter. The ones the letter passes through are lit. */
export function Switches({ step, motion }: { step: Step; motion: string }) {
  return (
    <div className={styles.switches} role="group" aria-label="Stepping switches">
      {step.positions.map((position, index) => (
        <Switch
          key={index}
          name={index === 0 ? SWITCH_NAMES[0]! : `${SWITCH_NAMES[index]} ${speedOf(index, motion)}`}
          position={position}
          used={index === 0 ? step.group === "sixes" : step.group === "twenties"}
          steps={index === 0 || index === step.moves}
        />
      ))}
    </div>
  );
}
