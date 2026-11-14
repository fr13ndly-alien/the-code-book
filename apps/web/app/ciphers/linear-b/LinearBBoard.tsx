import {
  NAMES,
  WORDS,
  isRead,
  readSign,
  readWord,
  type Clash,
  type SignId,
  type Values,
  type Word,
  type WordId,
} from "@codebook/cipher-engine/linear-b";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { Glyph } from "./Glyph";
import { clashText, signLabel } from "./labels";
import styles from "./LinearBBoard.module.css";
import { SignGrid } from "./SignGrid";
import { bridgeSigns, shown, solution, stemFound, stemSigns, type LinearBState } from "./useLinearB";

/** One sign of a word: its drawing above, its sound so far below. */
function SignFace({ sign, values }: { sign: SignId; values: Values }) {
  return (
    <span className={styles.face}>
      <Glyph sign={sign} label={signLabel(sign, values)} />
      <span className={styles.sound}>{readSign(sign, values)}</span>
    </span>
  );
}

/** One of Kober's three words: each sign is a button that marks the sign wherever it appears. */
function MarkWord(props: { word: Word; values: Values; marked: SignId[]; bridge: SignId[]; onMark: (sign: SignId) => void }) {
  return (
    <div className={styles.word}>
      {props.word.signs.map((sign, at) => (
        <button
          key={at}
          type="button"
          className={styles.sign}
          data-bridge={props.bridge.includes(sign)}
          aria-pressed={props.marked.includes(sign)}
          onClick={() => props.onMark(sign)}
        >
          <SignFace sign={sign} values={props.values} />
        </button>
      ))}
    </div>
  );
}

/** What the reader is told about a word they may name. */
function heading(id: WordId, state: LinearBState, values: Values, clashes?: Clash[]): string {
  const guess = state.guesses[id];
  if (clashes && guess) return `Your guess: ${NAMES[guess].label}. It does not fit.`;
  if (isRead(WORDS[id], values)) return `You read it: ${WORDS[id].meaning}`;
  return id === "tripods" ? "From a tablet found at Pylos" : "No translation. Which place is it?";
}

/** A word the reader can name: one button for the whole word. */
function GuessWord(props: { id: WordId; state: LinearBState; onPick: (word: WordId) => void }) {
  const { id, state } = props;
  const { values, clashes } = solution(state);
  const word: Word = WORDS[id];

  return (
    <section className={styles.entry}>
      <h3>{heading(id, state, values, clashes[id])}</h3>
      <button
        type="button"
        className={styles.word}
        data-verdict={clashes[id] ? "clashes" : "fits"}
        aria-label={`Word that reads ${readWord(word, values)}`}
        aria-pressed={state.picked === id}
        onClick={() => props.onPick(id)}
      >
        {word.signs.map((sign, at) => (
          <span key={at} className={styles.sign}>
            <SignFace sign={sign} values={values} />
          </span>
        ))}
        {id === "tripods" && (
          <span className={styles.sign}>
            <span className={styles.face}>
              <Glyph sign="tripod" label="picture of a pot on three legs" />
              <span className={styles.count}>2</span>
            </span>
          </span>
        )}
      </button>
    </section>
  );
}

/** The line under the words: what to do next, or why a guess failed. */
function wordsCaption(state: LinearBState): string {
  if (state.view === "triplet") {
    if (stemFound(state)) {
      return "Right. All three words start with these two signs, then split. The two signs that follow are ringed. Kober reasoned that they share a consonant, so the grid puts them in one row.";
    }
    return state.marked.some((sign) => !stemSigns().includes(sign))
      ? "One sign you marked is missing from a word. Tap it again to unmark it."
      : "Three words from the Knossos tablets. Tap each sign that appears in all three.";
  }
  const clash = shown(state).flatMap((id) => solution(state).clashes[id] ?? [])[0];
  if (clash) return `${clashText(clash)} Pick another name.`;
  return state.view === "tripod"
    ? "The first word of the tripod tablet, read with the sounds from your place names. The drawing and the number 2 are the scribe's own."
    : "Tap a word, then pick a place below. A right guess fills a whole row and column of the grid.";
}

/** Words from the tablets above the grid that sorts their signs. */
export function LinearBBoard(props: {
  state: LinearBState;
  onMark: (sign: SignId) => void;
  onPick: (word: WordId) => void;
}) {
  const { state } = props;
  const { values } = solution(state);
  const marked = state.view === "triplet" ? state.marked : [];
  const bridge = state.view === "triplet" && stemFound(state) ? bridgeSigns() : [];

  return (
    <Board>
      <div className={styles.words}>
        {shown(state).map((id) =>
          state.view === "triplet" ? (
            <MarkWord key={id} word={WORDS[id]} values={values} marked={marked} bridge={bridge} onMark={props.onMark} />
          ) : (
            <GuessWord key={id} id={id} state={state} onPick={props.onPick} />
          ),
        )}
      </div>
      <Caption>{wordsCaption(state)}</Caption>
      <SignGrid values={values} marked={marked} bridge={bridge} />
      <Caption>
        The grid: signs in one row share a consonant, signs in one column share a vowel. Which consonant and which vowel,
        nobody knew. The signs are simplified drawings.
      </Caption>
    </Board>
  );
}
