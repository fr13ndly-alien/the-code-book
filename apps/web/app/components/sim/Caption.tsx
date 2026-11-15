import type { ReactNode } from "react";
import styles from "./Caption.module.css";

/** A short line of explanation on a 2D board, e.g. "Shift of 3: A becomes D". */
export function Caption({ children }: { children: ReactNode }) {
  return <p className={styles.caption}>{children}</p>;
}

/** Cipher letters inside a caption or a control, in the cipher font and lamp colour. */
export function Letters({ children }: { children: ReactNode }) {
  return <span className={styles.letters}>{children}</span>;
}
