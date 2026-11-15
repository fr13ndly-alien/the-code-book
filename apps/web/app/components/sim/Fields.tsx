import { useId, type ReactNode } from "react";
import { UI, useLocale } from "~/i18n";
import styles from "./Fields.module.css";

/** A labelled box for typing a message or a key. `rows` above 1 makes it a text area. */
export function TextField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  /** Narrow fields suit a keyword or a number. */
  width?: "full" | "short";
}) {
  const id = useId();
  const shared = {
    id,
    value: props.value,
    placeholder: props.placeholder,
    autoComplete: "off",
    autoCapitalize: "characters",
    spellCheck: false,
    className: styles.input,
  };
  return (
    <div className={styles.field} data-width={props.width ?? "full"}>
      <label htmlFor={id}>{props.label}</label>
      {(props.rows ?? 1) > 1 ? (
        <textarea {...shared} rows={props.rows} onChange={(event) => props.onChange(event.target.value)} />
      ) : (
        <input {...shared} onChange={(event) => props.onChange(event.target.value)} />
      )}
    </div>
  );
}

/** What the cipher produced, as real text. Screen readers announce changes. */
export function Output({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <output className={styles.output} aria-live="polite">
        {children || " "}
      </output>
    </div>
  );
}

/** A value with buttons to step it down and up, such as a shift or a rotor position. */
export function Stepper(props: { label: string; value: string | number; onStep: (by: 1 | -1) => void }) {
  const locale = useLocale();
  return (
    <div className={styles.stepper} role="group" aria-label={props.label}>
      <span className={styles.label}>{props.label}</span>
      <div className={styles.stepperRow}>
        <button type="button" aria-label={UI.oneBack[locale](props.label)} onClick={() => props.onStep(-1)}>
          ▼
        </button>
        <output aria-live="polite">{props.value}</output>
        <button type="button" aria-label={UI.oneForward[locale](props.label)} onClick={() => props.onStep(1)}>
          ▲
        </button>
      </div>
    </div>
  );
}

/** A small set of options where one is always chosen, such as "Encipher" and "Decipher". */
export function Choice<T extends string>(props: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className={styles.stepper} role="group" aria-label={props.label}>
      <span className={styles.label}>{props.label}</span>
      <div className={styles.choice}>
        {props.options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === props.value}
            onClick={() => props.onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
