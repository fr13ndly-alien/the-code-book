import type { SubstitutionCryptogram } from "@codebook/cipher-engine/codebreakers-challenge";
import { ENGLISH_RANK, rankLetters, type Guesses } from "@codebook/cipher-engine/frequency-analysis";
import { ENGLISH_FREQUENCY, countLetters, indexOfLetter } from "@codebook/cipher-engine/text";
import { PlainLetters } from "~/ciphers/frequency-analysis/PlainLetters";
import { WorkingText } from "~/ciphers/frequency-analysis/WorkingText";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";

/** English letter frequencies, tallest first, to lay behind the ciphertext's bars. */
const ENGLISH_BY_RANK = ENGLISH_RANK.map((letter) => ENGLISH_FREQUENCY[indexOfLetter(letter)]!);

/** The tools for the substitution cryptogram: the letter counts, the plain letters to try and the text filling in. */
export function SubstitutionBench(props: {
  cryptogram: SubstitutionCryptogram;
  guesses: Guesses;
  picked?: string;
  onPick: (cipher: string) => void;
  onAssign: (plain: string) => void;
}) {
  const { cryptogram, guesses, picked } = props;
  const counts = countLetters(cryptogram.ciphertext);
  const ranked = rankLetters(counts);
  const plain = picked ? guesses[picked] : undefined;

  return (
    <>
      <FrequencyBars
        label="Letter counts in the ciphertext, most common first, over the letters of normal English"
        symbols={ranked}
        values={ranked.map((letter) => counts[indexOfLetter(letter)]!)}
        compare={ENGLISH_BY_RANK}
        highlight={picked ? ranked.indexOf(picked) : undefined}
        onPick={(index) => props.onPick(ranked[index]!)}
      />
      <PlainLetters used={Object.values(guesses)} current={plain} disabled={!picked} onAssign={props.onAssign} />
      <WorkingText ciphertext={cryptogram.ciphertext} guesses={guesses} picked={picked} onPick={props.onPick} />
      <Caption>
        {picked ? (
          <>
            Cipher <Letters>{picked}</Letters> appears {counts[indexOfLetter(picked)]} times.{" "}
            {plain ? `You read it as ${plain.toLowerCase()}.` : "Pick the plain letter you think it hides."}
          </>
        ) : (
          "Solid bars count the cipher letters. Outlines show normal English. Tap a bar or a letter of the message to work on it."
        )}
      </Caption>
    </>
  );
}
