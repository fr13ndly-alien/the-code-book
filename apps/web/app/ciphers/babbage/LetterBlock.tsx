import styles from "./LetterBlock.module.css";

/** Cuts text into runs of letters that are all lit or all unlit. */
function runs(letters: string, lit: (index: number) => boolean): { text: string; lit: boolean }[] {
  const found: { text: string; lit: boolean }[] = [];
  [...letters].forEach((letter, index) => {
    const last = found[found.length - 1];
    if (last && last.lit === lit(index)) last.text += letter;
    else found.push({ text: letter, lit: lit(index) });
  });
  return found;
}

/** A long run of cipher letters that wraps like a paragraph, with some letters picked out. */
export function LetterBlock(props: {
  /** Read by screen readers, e.g. "The ciphertext". */
  label: string;
  letters: string;
  lit: (index: number) => boolean;
  /** "brass" suits whole sequences, "lamp" suits scattered single letters. */
  tone?: "brass" | "lamp";
}) {
  return (
    <p className={styles.block} aria-label={props.label} data-tone={props.tone ?? "brass"}>
      {runs(props.letters, props.lit).map((run, index) =>
        run.lit ? <mark key={index}>{run.text}</mark> : <span key={index}>{run.text}</span>,
      )}
    </p>
  );
}
