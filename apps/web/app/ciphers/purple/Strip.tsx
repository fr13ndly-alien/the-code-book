import type { Step } from "@codebook/cipher-engine/purple";
import { PAGE } from "./layout";
import styles from "./Strip.module.css";

/** A stretch of the message: each letter going in, above the letter that came out. Tap one to follow it. */
export function Strip(props: { steps: Step[]; picked: number; onPick: (at: number) => void }) {
  const first = Math.floor(props.picked / PAGE) * PAGE;
  const shown = props.steps.slice(first, first + PAGE);
  return (
    <div className={styles.frame}>
      <span className={styles.label}>
        Letters {first + 1} to {first + shown.length} of {props.steps.length}: in above, out below
      </span>
      <div className={styles.strip}>
        {shown.map((step, offset) => (
          <button
            key={first + offset}
            type="button"
            className={styles.column}
            data-group={step.group}
            aria-label={`Letter ${first + offset + 1}: ${step.input} becomes ${step.output}, ${step.group}`}
            aria-pressed={first + offset === props.picked}
            onClick={() => props.onPick(first + offset)}
          >
            <span>{step.input}</span>
            <span className={styles.out}>{step.output}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
