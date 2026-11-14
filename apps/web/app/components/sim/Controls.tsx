import type { ReactNode } from "react";
import styles from "./Controls.module.css";

/**
 * The frame for a cipher's HTML controls. Put the state of the cipher and its
 * output in the first <Row>: on a phone only that row shows while the story is open.
 */
export function Controls({ children }: { children: ReactNode }) {
  return <div className={styles.controls}>{children}</div>;
}

/** One line of controls. Wraps on narrow screens. */
export function Row({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>;
}

/** A plain button in the controls. `primary` marks the main action. */
export function Button(props: { children: ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      className={styles.button}
      data-primary={props.primary}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
