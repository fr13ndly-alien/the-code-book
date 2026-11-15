import type { ReactNode } from "react";
import styles from "./Board.module.css";

/**
 * The stage for a 2D simulator: a padded area that centres its content and
 * scrolls when the content is larger than the space. 3D scenes do not use it.
 */
export function Board({ children }: { children: ReactNode }) {
  return (
    <div className={styles.board}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
