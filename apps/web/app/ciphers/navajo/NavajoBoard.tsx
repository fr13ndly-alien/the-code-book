import { readGroup, type CodeWord } from "@codebook/cipher-engine/navajo";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import styles from "./NavajoBoard.module.css";
import { groupsOf, isOpen, type NavajoState } from "./useNavajo";

/** The three links of one code word: what is said, what it means, what it stands for. */
function Chain({ word }: { word: CodeWord }) {
  const why =
    word.kind === "term"
      ? "The lexicon gives this picture to a military term."
      : word.stands === "X"
        ? "The alphabet uses a cross for the letter X."
        : `"${word.meaning}" starts with ${word.stands}, so it spells that letter.`;
  return (
    <div className={styles.chain} aria-live="polite">
      <dl>
        <div>
          <dt>Spoken</dt>
          <dd className={styles.navajo}>{word.navajo}</dd>
        </div>
        <div>
          <dt>Means</dt>
          <dd>{word.meaning}</dd>
        </div>
        <div>
          <dt>Stands for</dt>
          <dd className={styles.stands}>{word.stands}</dd>
        </div>
      </dl>
      <p>{why}</p>
    </div>
  );
}

/** A message as a row of spoken Navajo code words, grouped by English word. */
export function NavajoBoard({ state, onTap }: { state: NavajoState; onTap: (word: number) => void }) {
  const groups = groupsOf(state);
  const words = groups.flat();
  const picked = state.picked === undefined ? undefined : words[state.picked];
  let count = 0;

  return (
    <Board>
      <ol className={styles.message} aria-label="The message in code">
        {groups.map((group, at) => {
          const first = count;
          count += group.length;
          const known = group.every((_, offset) => isOpen(state, first + offset));
          return (
            <li key={at} className={styles.group}>
              <span className={styles.english}>{known ? readGroup(group) : "?"}</span>
              <span className={styles.words}>
                {group.map((word, offset) => (
                  <button
                    key={offset}
                    type="button"
                    className={styles.word}
                    aria-pressed={first + offset === state.picked}
                    onClick={() => onTap(first + offset)}
                  >
                    <span className={styles.navajo}>{word.navajo}</span>
                    <span className={styles.meaning}>{isOpen(state, first + offset) ? word.meaning : "?"}</span>
                  </button>
                ))}
              </span>
            </li>
          );
        })}
      </ol>
      {picked ? (
        <Chain word={picked} />
      ) : (
        <Caption>
          {words.length === 0
            ? "Type a message below to hear it in code."
            : "Each box is one spoken word. Tap one to follow it from Navajo to English."}
        </Caption>
      )}
    </Board>
  );
}
