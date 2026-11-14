import { partnerOf } from "@codebook/cipher-engine/kama-sutra";
import { indexOfLetter } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid, type CellMark } from "~/components/sim/LetterGrid";
import { PairCards } from "./PairCards";
import { output, pairs, type KamaSutraState } from "./useKamaSutra";

/** Only letters are drawn in the message grid; a space or a comma leaves a gap. */
const cellsOf = (text: string) => [...text.toUpperCase()].map((char) => (indexOfLetter(char) < 0 ? "" : char));

/** The thirteen pairs, and the message with each letter's partner written under it. */
export function KamaSutraBoard({ state, onPick }: { state: KamaSutraState; onPick: (letter: string) => void }) {
  const inUse = pairs(state);
  const partner = state.picked ? partnerOf(state.picked, inUse) : undefined;
  const cells = [cellsOf(state.text), cellsOf(output(state))];
  const mark = (row: number, column: number): CellMark => {
    const letter = cells[row]![column];
    return letter === state.picked ? "on" : letter === partner ? "cipher" : undefined;
  };

  return (
    <Board>
      <PairCards pairs={inUse} picked={state.picked} partner={partner} onPick={onPick} />
      {state.text !== "" && (
        <LetterGrid
          label="Your text on the top line, and each letter's partner below it"
          cells={cells}
          size="small"
          mark={mark}
          onPick={(row, column) => onPick(cells[row]![column]!)}
        />
      )}
      <Caption>
        {state.picked && partner ? (
          <>
            <Letters>{state.picked}</Letters> and <Letters>{partner}</Letters> are partners. Every{" "}
            <Letters>{state.picked}</Letters> becomes <Letters>{partner}</Letters>, and every{" "}
            <Letters>{partner}</Letters> becomes <Letters>{state.picked}</Letters>.
          </>
        ) : (
          "Thirteen pairs hold all 26 letters. Tap a letter to light up its partner."
        )}
      </Caption>
    </Board>
  );
}
