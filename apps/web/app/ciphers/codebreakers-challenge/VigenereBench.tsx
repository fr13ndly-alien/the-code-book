import { useMemo } from "react";
import { applyKey, countsAfterShift, findRepeats, slices } from "@codebook/cipher-engine/babbage";
import type { VigenereCryptogram } from "@codebook/cipher-engine/codebreakers-challenge";
import { ALPHABET, ENGLISH_FREQUENCY, letterAt } from "@codebook/cipher-engine/text";
import { LetterBlock } from "~/ciphers/babbage/LetterBlock";
import { RepeatsTable } from "~/ciphers/babbage/RepeatsTable";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import styles from "./Bench.module.css";

/** The table shows the longest repeats only: they are the least likely to be accidents. */
const ROWS_SHOWN = 8;

/** Letters are sent in groups of this size, with one space after each group. */
const GROUP = 5;

/** Which letter of the message a character of the grouped text is, or -1 for the space after a group. */
const letterIndex = (at: number) => (at % (GROUP + 1) === GROUP ? -1 : at - Math.floor(at / (GROUP + 1)));

/** The tools for the Vigenère cryptogram: the repeats and their spacings, then one frequency chart per key letter. */
export function VigenereBench(props: {
  cryptogram: VigenereCryptogram;
  keyLength: number;
  keyShifts: number[];
  position: number;
  repeat?: number;
  onPickRepeat: (row: number) => void;
}) {
  const { ciphertext } = props.cryptogram;
  const { keyLength, keyShifts, position } = props;
  const repeats = useMemo(() => findRepeats(ciphertext).slice(0, ROWS_SHOWN), [ciphertext]);
  const picked = props.repeat === undefined ? undefined : repeats[props.repeat];
  const inCopy = (letter: number, start: number) => letter >= start && letter < start + picked!.sequence.length;
  const fits = repeats.filter((repeat) => repeat.spacing % keyLength === 0).length;
  const slice = slices(ciphertext, keyLength)[position]!;
  const shift = keyShifts[position]!;

  return (
    <>
      <LetterBlock
        label="The ciphertext"
        letters={ciphertext}
        lit={(at) => picked !== undefined && (inCopy(letterIndex(at), picked.first) || inCopy(letterIndex(at), picked.second))}
      />
      <div className={styles.scroll}>
        <RepeatsTable repeats={repeats} keyLength={keyLength} picked={props.repeat} onPick={props.onPickRepeat} />
      </div>
      <Caption>
        {picked && (
          <>
            <Letters>{picked.sequence}</Letters> appears twice, {picked.spacing} letters apart.{" "}
          </>
        )}
        A keyword of {keyLength} letters would explain {fits} of these {repeats.length} repeats.
      </Caption>
      <Caption>
        Key letter {position + 1} of {keyLength} enciphered {slice.length} of the letters. Trying{" "}
        <Letters>{letterAt(shift)}</Letters>: solid bars are these letters, outlines are ordinary English.
      </Caption>
      <div className={styles.scroll}>
        <FrequencyBars
          label={`Letter counts for key letter ${position + 1} with a shift of ${shift}, compared with English`}
          symbols={[...ALPHABET]}
          values={countsAfterShift(slice, shift)}
          compare={ENGLISH_FREQUENCY}
        />
      </div>
      <LetterBlock
        label="The plaintext so far"
        letters={applyKey(ciphertext, keyShifts)}
        lit={(at) => letterIndex(at) >= 0 && letterIndex(at) % keyLength === position}
        tone="lamp"
      />
    </>
  );
}
