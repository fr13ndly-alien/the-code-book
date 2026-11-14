import { KEY_COUNT, squeeze } from "@codebook/cipher-engine/keyword-substitution";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { alphabet, type KeywordState } from "./useKeyword";

/** How the keyword became the start of the cipher alphabet, in words. */
function KeywordCaption({ keyword }: { keyword: string }) {
  const start = squeeze(keyword);
  if (start === "") return <Caption>No keyword yet, so the cipher alphabet is the plain one. Type a keyword.</Caption>;
  return (
    <Caption>
      Without spaces and repeated letters the keyword is <Letters>{start}</Letters>. It starts the cipher alphabet. The
      unused letters follow in order, beginning after <Letters>{start.at(-1)}</Letters>.
    </Caption>
  );
}

/** The plain alphabet above the cipher alphabet that the keyword builds. */
export function KeywordBoard({ state, onPick }: { state: KeywordState; onPick: (column: number) => void }) {
  const cipher = alphabet(state);
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
        Plain <Letters>{ALPHABET[column]}</Letters> becomes cipher <Letters>{cipher[column]}</Letters>. Tap under a
        letter to follow it.
      </Caption>
      <KeywordCaption keyword={state.keyword} />
      <Caption>This is one of {KEY_COUNT} possible cipher alphabets.</Caption>
    </Board>
  );
}
