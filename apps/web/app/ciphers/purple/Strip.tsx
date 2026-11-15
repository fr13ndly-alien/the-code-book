import type { Step } from "@codebook/cipher-engine/purple";
import { useLocale } from "~/i18n";
import { GROUP_WORDS, PAGE } from "./layout";
import styles from "./Strip.module.css";

/** A stretch of the message: each letter going in, above the letter that came out. Tap one to follow it. */
export function Strip(props: { steps: Step[]; picked: number; onPick: (at: number) => void }) {
  const locale = useLocale();
  const vi = locale === "vi";
  const first = Math.floor(props.picked / PAGE) * PAGE;
  const shown = props.steps.slice(first, first + PAGE);
  return (
    <div className={styles.frame}>
      <span className={styles.label}>
        {vi
          ? `Chữ ${first + 1} đến ${first + shown.length} trên tổng số ${props.steps.length}: vào ở trên, ra ở dưới`
          : `Letters ${first + 1} to ${first + shown.length} of ${props.steps.length}: in above, out below`}
      </span>
      <div className={styles.strip}>
        {shown.map((step, offset) => (
          <button
            key={first + offset}
            type="button"
            className={styles.column}
            data-group={step.group}
            aria-label={
              vi
                ? `Chữ ${first + offset + 1}: ${step.input} thành ${step.output}, ${step.group === "garble" ? "bị mất" : GROUP_WORDS[step.group].vi}`
                : `Letter ${first + offset + 1}: ${step.input} becomes ${step.output}, ${step.group}`
            }
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
