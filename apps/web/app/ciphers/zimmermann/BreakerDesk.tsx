import { INTERCEPT, UNKNOWN } from "@codebook/cipher-engine/zimmermann";
import styles from "./Desk.module.css";
import { readingsOf, type ZimmermannState } from "./useZimmermann";

/** The codebreaker's desk: intercepted telegrams with gaps, and the words that might fill them. */
export function BreakerDesk(props: {
  state: ZimmermannState;
  onPick: (group: number) => void;
  onGuess: (word: string) => void;
}) {
  const { state } = props;
  const readings = readingsOf(state);
  const used = Object.values(state.guesses);

  return (
    <>
      {INTERCEPT.telegrams.map((telegram, row) => (
        <ol key={row} className={styles.telegram} aria-label={`Intercepted telegram ${row + 1}`}>
          {telegram.map((group, index) => (
            <li key={index}>
              <Group
                group={group}
                word={readings[group] ?? UNKNOWN}
                known={INTERCEPT.known.includes(group)}
                picked={group === state.picked}
                onPick={() => props.onPick(group)}
              />
            </li>
          ))}
        </ol>
      ))}
      <ul className={styles.suspects} aria-label="Words it might be">
        {INTERCEPT.suspects.map((word) => (
          <li key={word}>
            <button
              type="button"
              className={styles.suspect}
              data-used={used.includes(word)}
              disabled={state.picked === undefined}
              onClick={() => props.onGuess(word)}
            >
              {word}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/** One group of an intercepted telegram. Known groups are plain; the rest can be picked and guessed. */
function Group(props: { group: number; word: string; known: boolean; picked: boolean; onPick: () => void }) {
  const lines = (
    <>
      <span className={styles.group}>{props.group}</span>
      <span className={styles.word}>{props.word}</span>
    </>
  );
  if (props.known) return <span className={styles.chip}>{lines}</span>;
  return (
    <button
      type="button"
      className={styles.chip}
      data-guess={props.word !== UNKNOWN}
      aria-pressed={props.picked}
      onClick={props.onPick}
    >
      {lines}
    </button>
  );
}
