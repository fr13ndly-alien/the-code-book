import { useMemo } from "react";
import { countsAfterShift, findRepeats, type Repeat } from "@codebook/cipher-engine/babbage";
import { ALPHABET, ENGLISH_FREQUENCY, letterAt } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import styles from "./BabbageBoard.module.css";
import { LetterBlock } from "./LetterBlock";
import { RepeatsTable } from "./RepeatsTable";
import { currentSlice, plaintext, type BabbageState } from "./useBabbage";

/** The table shows the longest repeats only: they are the least likely to be accidents. */
const ROWS_SHOWN = 8;

/** The codebreaker's desk: the repeats and their spacings, then one frequency chart per key letter. */
export function BabbageBoard({ state, onPick }: { state: BabbageState; onPick: (row: number) => void }) {
  const repeats = useMemo(() => findRepeats(state.ciphertext).slice(0, ROWS_SHOWN), [state.ciphertext]);
  return (
    <Board>
      {state.stage === "length" ? (
        <LengthStage state={state} repeats={repeats} onPick={onPick} />
      ) : (
        <LettersStage state={state} />
      )}
    </Board>
  );
}

/** Step 1: the ciphertext with one repeat lit, and the table of spacings and factors. */
function LengthStage(props: { state: BabbageState; repeats: Repeat[]; onPick: (row: number) => void }) {
  const { state, repeats } = props;
  const picked = state.picked === undefined ? undefined : repeats[state.picked];
  const inCopy = (index: number, start: number) => index >= start && index < start + picked!.sequence.length;
  const fits = repeats.filter((repeat) => repeat.spacing % state.keyLength === 0).length;

  return (
    <>
      <LetterBlock
        label="The ciphertext"
        letters={state.ciphertext}
        lit={(index) => picked !== undefined && (inCopy(index, picked.first) || inCopy(index, picked.second))}
      />
      <Caption>
        {picked ? (
          <>
            <Letters>{picked.sequence}</Letters> appears twice, {picked.spacing} letters apart. The keyword must fit a
            whole number of times into {picked.spacing}.
          </>
        ) : (
          "Tap a repeated sequence in the table to find both copies."
        )}
      </Caption>
      <div className={styles.scroll}>
        <RepeatsTable repeats={repeats} keyLength={state.keyLength} picked={state.picked} onPick={props.onPick} />
      </div>
      <Caption>
        A keyword of {state.keyLength} letters would explain {fits} of these {repeats.length} repeats.
      </Caption>
    </>
  );
}

/** Step 2: the letter counts of one slice against English, and the plaintext so far. */
function LettersStage({ state }: { state: BabbageState }) {
  const slice = currentSlice(state);
  const shift = state.shifts[state.position]!;

  return (
    <>
      <Caption>
        Key letter {state.position + 1} of {state.keyLength} enciphered {slice.length} of the letters. Trying{" "}
        <Letters>{letterAt(shift)}</Letters>: solid bars are these letters, outlines are ordinary English.
      </Caption>
      <div className={styles.scroll}>
        <FrequencyBars
          label={`Letter counts for key letter ${state.position + 1} with a shift of ${shift}, compared with English`}
          symbols={[...ALPHABET]}
          values={countsAfterShift(slice, shift)}
          compare={ENGLISH_FREQUENCY}
        />
      </div>
      <LetterBlock
        label="The plaintext so far"
        letters={plaintext(state)}
        lit={(index) => index % state.keyLength === state.position}
        tone="lamp"
      />
    </>
  );
}
