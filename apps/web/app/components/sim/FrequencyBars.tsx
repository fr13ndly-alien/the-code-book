import styles from "./FrequencyBars.module.css";

/**
 * A bar chart with one bar per symbol, for counting letters. `compare` draws a
 * second, outlined set of bars behind the first, e.g. the letters of normal English.
 */
export function FrequencyBars(props: {
  /** Read by screen readers, e.g. "Letter counts in the ciphertext". */
  label: string;
  /** One entry per bar, usually the 26 letters. */
  symbols: string[];
  /** The value of each bar. Any unit: the tallest bar fills the chart. */
  values: number[];
  /** Optional second series in the same order, scaled on its own. */
  compare?: number[];
  highlight?: number;
  onPick?: (index: number) => void;
}) {
  const { symbols, values, compare, highlight, onPick } = props;
  const share = (series: number[], index: number) => `${(100 * (series[index] ?? 0)) / Math.max(1, ...series)}%`;

  return (
    <ol className={styles.chart} aria-label={props.label}>
      {symbols.map((symbol, index) => {
        const bars = (
          <>
            <span className={styles.track} aria-hidden="true">
              {compare && <span className={styles.compare} style={{ height: share(compare, index) }} />}
              <span className={styles.bar} style={{ height: share(values, index) }} />
            </span>
            <span className={styles.symbol}>{symbol}</span>
            <span className="visually-hidden">: {values[index]}</span>
          </>
        );
        return (
          <li key={index} data-on={index === highlight}>
            {onPick ? (
              <button type="button" onClick={() => onPick(index)}>
                {bars}
              </button>
            ) : (
              bars
            )}
          </li>
        );
      })}
    </ol>
  );
}
