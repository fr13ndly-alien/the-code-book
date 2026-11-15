import type { Step } from "@codebook/cipher-engine/homophonic";
import { useT } from "~/i18n";
import styles from "./NumberStrip.module.css";

/** The message letter by letter, each plain letter above the number that stands for it. */
export function NumberStrip(props: { steps: Step[]; picked?: string; onPick: (number: string) => void }) {
  const t = useT();
  return (
    <div
      className={styles.strip}
      role="group"
      aria-label={t({ en: "The message, each letter above its number", vi: "Tin nhắn, mỗi chữ nằm trên con số của nó" })}
    >
      {props.steps.map((step, i) => (
        <button
          key={i}
          type="button"
          aria-pressed={step.number === props.picked}
          aria-label={t({ en: `${step.plain} is ${step.number}`, vi: `${step.plain} là ${step.number}` })}
          onClick={() => props.onPick(step.number)}
        >
          <span className={styles.plain}>{step.plain}</span>
          <span className={styles.number}>{step.number}</span>
        </button>
      ))}
    </div>
  );
}
