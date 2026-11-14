import styles from "./Marks.module.css";

/** How one dot or dash is drawn: lit now, already sent, or plain. */
export type MarkState = "now" | "sent" | undefined;

const NAMES: Record<string, string> = { ".": "dot", "-": "dash" };

/** A pattern of dots and dashes drawn as shapes, with the words for screen readers. */
export function Marks({ code, stateOf }: { code: string; stateOf?: (mark: number) => MarkState }) {
  const spoken = [...code].map((symbol) => NAMES[symbol]).join(" ");
  return (
    <span className={styles.marks} role="img" aria-label={spoken}>
      {[...code].map((symbol, mark) => (
        <span key={mark} className={styles.mark} data-kind={NAMES[symbol]} data-state={stateOf?.(mark)} />
      ))}
    </span>
  );
}
