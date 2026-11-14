import { countNumbers, followers, letterOf, makeTable, plainOf, type Step } from "@codebook/cipher-engine/homophonic";
import { ALPHABET, countLetters, indexOfLetter } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { NumberBars } from "./NumberBars";
import { NumberStrip } from "./NumberStrip";
import { stepsOf, type HomophonicState } from "./useHomophonic";

/** The most numbers any letter has (E, with twelve): the depth of the table. */
const DEPTH = 12;

/** Few enough followers to list by name in the caption. */
const FEW = 4;

/** The table of numbers, the two charts, and the message with a number under every letter. */
export function HomophonicBoard({ state, onPick }: { state: HomophonicState; onPick: (number: string) => void }) {
  const table = makeTable(state.table);
  const steps = stepsOf(state);
  const letterCounts = countLetters(plainOf(steps));
  const letter = state.picked ? letterOf(state.picked, table) : undefined;
  const column = letter ? indexOfLetter(letter) : -1;
  const cells = Array.from({ length: DEPTH }, (_, row) => table.map((numbers) => numbers[row] ?? ""));

  return (
    <Board>
      <LetterGrid
        label="The key: the numbers that may stand for each letter"
        size="small"
        columnHeads={[...ALPHABET]}
        cells={cells}
        mark={(row, col) => (cells[row]![col] === state.picked ? "on" : col === column ? "cipher" : undefined)}
        onPick={(row, col) => onPick(cells[row]![col]!)}
      />
      <FrequencyBars
        label="How often each letter appears in the plaintext"
        symbols={[...ALPHABET]}
        values={letterCounts}
        highlight={column < 0 ? undefined : column}
        onPick={(index) => onPick(table[index]![0]!)}
      />
      <NumberBars counts={countNumbers(steps)} full={Math.max(...letterCounts)} lit={table[column] ?? []} />
      <Caption>
        {state.picked && letter ? (
          <PickedNote steps={steps} picked={state.picked} letter={letter} shares={table[column]!.length} />
        ) : (
          "Top: the letters of the message. Bottom: the numbers that replace them, drawn to the same scale. Tap a bar or a number."
        )}
      </Caption>
      <NumberStrip steps={steps} picked={state.picked} onPick={onPick} />
    </Board>
  );
}

/** What the counts say about the number being looked at, and what follows it. */
function PickedNote(props: { steps: Step[]; picked: string; letter: string; shares: number }) {
  const { steps, picked, letter, shares } = props;
  const ofLetter = steps.filter((step) => step.plain === letter).length;
  const ofNumber = steps.filter((step) => step.number === picked).length;
  const after = followers(steps, picked);
  return (
    <>
      <Letters>{picked}</Letters> is {shares === 1 ? "the only number" : `one of ${shares} numbers`} for{" "}
      <Letters>{letter}</Letters>. Here {letter} appears {ofLetter} times and {picked} appears {ofNumber} times.{" "}
      {after.length === 0
        ? ""
        : after.length <= FEW
          ? `After ${picked} come only: ${after.join(", ")}.`
          : `After ${picked} come ${after.length} different numbers.`}
    </>
  );
}
