import { VERNE_ALPHABET, verneSteps } from "@codebook/cipher-engine/dancing-men";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption } from "~/components/sim/Caption";
import styles from "./VerneSteps.module.css";

/** What happens at each step of the Verne tool. Step 2 is the parchment; steps 3 and 4 undo it. */
export const VERNE_LABELS = [
  "The message",
  "Hide, step 1: swap each letter",
  "Hide, step 2: write it backwards. This is the parchment",
  "Undo, step 1: read it backwards",
  "Undo, step 2: swap each letter back",
];

/** Verne's two-step cipher laid out line by line, as far as the reader has stepped. */
export function VerneSteps({ text, step }: { text: string; step: number }) {
  const lines = verneSteps(text);
  return (
    <>
      <AlphabetRows
        rows={[
          { label: "Plain", letters: ALPHABET },
          { label: "Ours", letters: VERNE_ALPHABET, kind: "cipher" },
        ]}
      />
      <ol className={styles.steps} aria-live="polite">
        {VERNE_LABELS.map((label, at) => (
          <li key={label} data-on={at === step} data-done={at <= step}>
            <span className={styles.label}>{label}</span>
            <span className={styles.line} data-plain={at === 0 || at === 4}>
              {at <= step ? lines[at] || " " : "…"}
            </span>
          </li>
        ))}
      </ol>
      <Caption>
        The swapping alphabet is our own. In the novel the parchment is in runes, and each rune stands for a letter.
        Press ▲ next to "Step" to go on.
      </Caption>
    </>
  );
}
