import { shiftedAlphabet } from "@codebook/cipher-engine/caesar";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import type { CaesarState } from "./useCaesar";

/** The two alphabets of a Caesar shift, one above the other. */
export function CaesarBoard({ state, onPick }: { state: CaesarState; onPick: (column: number) => void }) {
  const cipher = shiftedAlphabet(state.shift);
  const column = state.picked ?? 0;

  return (
    <Board>
      <AlphabetRows
        rows={[
          { label: "Plain", letters: ALPHABET },
          { label: "Cipher", letters: cipher, kind: "cipher" },
        ]}
        highlight={state.picked}
        onPick={onPick}
      />
      <Caption>
        A shift of {state.shift}: plain <Letters>{ALPHABET[column]}</Letters> becomes cipher{" "}
        <Letters>{cipher[column]}</Letters>. Tap under a letter to follow it.
      </Caption>
    </Board>
  );
}
