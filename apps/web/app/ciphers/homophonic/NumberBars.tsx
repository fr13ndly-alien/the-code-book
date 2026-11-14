import styles from "./NumberBars.module.css";

/**
 * A slim bar chart of the hundred numbers, 00 to 99, with no room for a label
 * under each bar. It is drawn to the same scale as the chart of letters above it.
 */
export function NumberBars(props: {
  /** 100 counts, "00" first. */
  counts: number[];
  /** The count that would fill the chart: the tallest bar of the letter chart. */
  full: number;
  /** The numbers to light up: those of the letter being looked at. */
  lit: string[];
}) {
  const height = (count: number) => `${Math.min(100, (100 * count) / Math.max(1, props.full))}%`;
  return (
    <div className={styles.chart}>
      <ol className={styles.bars} aria-label="How often each number from 00 to 99 appears in the ciphertext">
        {props.counts.map((count, n) => {
          const number = String(n).padStart(2, "0");
          return (
            <li key={number} data-on={props.lit.includes(number)}>
              <span className={styles.bar} style={{ height: height(count) }} />
              <span className="visually-hidden">
                {number}: {count}
              </span>
            </li>
          );
        })}
      </ol>
      <div className={styles.axis} aria-hidden="true">
        <span>00</span>
        <span>50</span>
        <span>99</span>
      </div>
    </div>
  );
}
