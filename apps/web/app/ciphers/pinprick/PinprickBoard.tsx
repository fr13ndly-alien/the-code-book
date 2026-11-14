import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import styles from "./PinprickBoard.module.css";
import { hiding, pricks, type PinprickState } from "./usePinprick";

const IS_LETTER = /[a-z]/i;

/** The words of a text, each with the position of its first character. */
const wordsOf = (text: string) => [...text.matchAll(/\S+/g)].map((match) => ({ start: match.index, text: match[0] }));

/** A newspaper page whose letters can be pricked. Held to the light, only the pricked ones show. */
export function PinprickBoard({ state, onPrick }: { state: PinprickState; onPrick: (position: number) => void }) {
  const holes = new Set(pricks(state));

  return (
    <Board>
      <div className={styles.paper} data-light={state.light}>
        <p className={styles.masthead}>The Harbour Gazette</p>
        <div className={styles.text}>
          {wordsOf(state.cover).map((word) => (
            <span key={word.start} className={styles.word}>
              {[...word.text].map((char, offset) => (
                <Character
                  key={offset}
                  char={char}
                  pricked={holes.has(word.start + offset)}
                  onPrick={() => onPrick(word.start + offset)}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
      <Caption>{captionFor(state)}</Caption>
    </Board>
  );
}

/** One character of the page: a button if it is a letter, plain text if it is punctuation. */
function Character(props: { char: string; pricked: boolean; onPrick: () => void }) {
  if (!IS_LETTER.test(props.char)) return <span className={styles.mark}>{props.char}</span>;
  return (
    <button
      type="button"
      className={styles.letter}
      aria-label={props.pricked ? `${props.char}, pricked` : props.char}
      aria-pressed={props.pricked}
      onClick={props.onPrick}
    >
      {props.char}
    </button>
  );
}

function captionFor(state: PinprickState) {
  if (state.mode === "hand") return "Tap a letter to prick a hole under it. Tap it again to mend the hole.";
  const { positions, left } = hiding(state);
  if (left !== "") {
    return (
      <>
        The page ran out. There is no <Letters>{left[0]}</Letters> after the last hole, so{" "}
        <Letters>{left}</Letters> cannot be hidden.
      </>
    );
  }
  return `${positions.length} holes, one under a letter for each letter of your secret, in order.`;
}
