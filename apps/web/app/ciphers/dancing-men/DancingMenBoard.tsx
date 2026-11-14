import {
  POSES,
  describe,
  encipher,
  isSolved,
  tally,
  type Figure,
} from "@codebook/cipher-engine/dancing-men";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { DancedMessage } from "./DancedMessage";
import { FigureTiles } from "./FigureTiles";
import { LetterPicker } from "./LetterPicker";
import type { DancingMenState } from "./useDancingMen";
import { VerneSteps } from "./VerneSteps";

/** The pose key: all 26 figures of our set, each over its letter. */
const KEY_TILES = [...ALPHABET].map((letter) => ({ letter, pose: POSES[letter]!, under: letter }));

interface BoardProps {
  state: DancingMenState;
  onPick: (letter: string) => void;
  onAssign: (plain: string) => void;
}

/** The simulator of the page: a danced message with its key, Holmes's desk, or Verne's parchment. */
export function DancingMenBoard(props: BoardProps) {
  const { mode } = props.state;
  return (
    <Board>
      {mode === "dance" && <DanceBoard {...props} />}
      {mode === "desk" && <DeskBoard {...props} />}
      {mode === "verne" && <VerneSteps text={props.state.verneText} step={props.state.verneStep} />}
    </Board>
  );
}

/** A message in dancing men above the key that reads it. */
function DanceBoard({ state, onPick }: BoardProps) {
  const figures = encipher(state.text);
  return (
    <>
      <DancedMessage
        figures={figures}
        letterUnder={(figure) => (state.hidden ? undefined : figure.letter)}
        picked={state.picked}
        onPick={onPick}
      />
      <Caption>{danceNote(state, figures)}</Caption>
      <FigureTiles
        title="The key: our own 26 poses, in the spirit of the story. They are not Conan Doyle's drawings."
        tiles={KEY_TILES}
        picked={state.picked}
        onPick={onPick}
      />
    </>
  );
}

/** What the board says about the figure the reader tapped in a danced message. */
function danceNote(state: DancingMenState, figures: Figure[]) {
  if (figures.length === 0) return "Type a message in the controls and watch it dance.";
  if (!state.picked) return "Tap a dancing man. A flag in his hand means a word ends there.";
  if (state.hidden) return "The same figure is bright in the key below. Read his letter there.";
  const count = figures.filter((figure) => figure.letter === state.picked).length;
  return (
    <>
      <Letters>{state.picked}</Letters> always dances the same way: {describe(POSES[state.picked]!)}. He appears{" "}
      {count} {count === 1 ? "time" : "times"} here. A flag only marks the end of a word.
    </>
  );
}

/** Holmes's desk: the count of each figure, the letters to try, and the message filling in. */
function DeskBoard({ state, onPick, onAssign }: BoardProps) {
  const figures = encipher(state.text);
  const { guesses, picked } = state;
  const tiles = tally(figures).map(({ letter, pose, count }) => ({
    letter,
    pose,
    under: guesses[letter] ? `${count} ${guesses[letter]}` : String(count),
  }));
  return (
    <>
      <FigureTiles title="How often each figure dances, commonest first" tiles={tiles} picked={picked} onPick={onPick} />
      <LetterPicker
        used={Object.values(guesses)}
        current={picked ? guesses[picked] : undefined}
        disabled={!picked}
        onAssign={onAssign}
      />
      <Caption>{deskNote(state, figures)}</Caption>
      <DancedMessage figures={figures} letterUnder={(figure) => guesses[figure.letter]} picked={picked} onPick={onPick} />
    </>
  );
}

/** What the counts say about the figure being worked on at the desk. */
function deskNote(state: DancingMenState, figures: Figure[]): string {
  if (isSolved(figures, state.guesses)) return "Every figure has its right letter. You have read it the way Holmes did.";
  if (!state.picked) return "Tap a figure in the counts or in the message. Then pick the letter you think he hides.";
  const same = figures.filter((figure) => figure.letter === state.picked);
  const percent = ((100 * same.length) / figures.length).toFixed(0);
  const ends = same.filter((figure) => figure.flag).length;
  const guess = state.guesses[state.picked];
  return (
    `This figure dances ${same.length} times (${percent}% of the message) and ends ${ends} ` +
    `${ends === 1 ? "word" : "words"} with a flag. ` +
    (guess ? `You read him as ${guess}.` : "Pick his letter above.")
  );
}
