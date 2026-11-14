import { ENGLISH_RANK, neighbours, rankLetters } from "@codebook/cipher-engine/frequency-analysis";
import { ENGLISH_FREQUENCY, countLetters, indexOfLetter, lettersOnly } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import { PlainLetters } from "./PlainLetters";
import type { FrequencyAnalysisState } from "./useFrequencyAnalysis";
import { WorkingText } from "./WorkingText";

/** English letter frequencies, tallest first, to lay behind the ciphertext's bars. */
const ENGLISH_BY_RANK = ENGLISH_RANK.map((letter) => ENGLISH_FREQUENCY[indexOfLetter(letter)]!);

/** The codebreaker's desk: the letter counts, the plain letters to try, and the message filling in. */
export function FrequencyAnalysisBoard(props: {
  state: FrequencyAnalysisState;
  onPick: (cipher: string) => void;
  onAssign: (plain: string) => void;
}) {
  const { ciphertext, guesses, picked } = props.state;
  const counts = countLetters(ciphertext);
  const ranked = rankLetters(counts);

  return (
    <Board>
      <FrequencyBars
        label="Letter counts in the ciphertext, most common first, over the letters of normal English"
        symbols={ranked}
        values={ranked.map((letter) => counts[indexOfLetter(letter)]!)}
        compare={ENGLISH_BY_RANK}
        highlight={picked ? ranked.indexOf(picked) : undefined}
        onPick={(index) => props.onPick(ranked[index]!)}
      />
      <PlainLetters
        used={Object.values(guesses)}
        current={picked ? guesses[picked] : undefined}
        disabled={!picked}
        onAssign={props.onAssign}
      />
      <WorkingText ciphertext={ciphertext} guesses={guesses} picked={picked} onPick={props.onPick} />
      <Caption>{picked ? <PickedNote state={props.state} picked={picked} /> : NOTHING_PICKED}</Caption>
    </Board>
  );
}

const NOTHING_PICKED =
  "Solid bars count the cipher letters. Outlines show normal English. Tap a bar or a letter of the message to work on it.";

/** What the counts say about the cipher letter being worked on. */
function PickedNote({ state, picked }: { state: FrequencyAnalysisState; picked: string }) {
  const count = countLetters(state.ciphertext)[indexOfLetter(picked)]!;
  const percent = (100 * count) / Math.max(1, lettersOnly(state.ciphertext).length);
  const plain = state.guesses[picked];
  return (
    <>
      Cipher <Letters>{picked}</Letters> appears {count} times ({percent.toFixed(1)}%) and touches{" "}
      {neighbours(state.ciphertext, picked).different} different letters.{" "}
      {plain ? `You read it as ${plain.toLowerCase()}.` : "Pick the plain letter you think it hides."}
    </>
  );
}
