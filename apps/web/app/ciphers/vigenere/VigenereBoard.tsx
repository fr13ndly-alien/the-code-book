import { SQUARE, keyLetters } from "@codebook/cipher-engine/vigenere";
import { ALPHABET, indexOfLetter } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid, type CellMark } from "~/components/sim/LetterGrid";
import styles from "./VigenereBoard.module.css";
import { steps, type VigenereState } from "./useVigenere";

const SQUARE_CELLS = SQUARE.map((row) => [...row]);

/** The message under its keyword, and the Vigenère square with one letter's row and column lit. */
export function VigenereBoard({ state, onPick }: { state: VigenereState; onPick: (position: number) => void }) {
  const all = steps(state);
  const step = all[state.position];
  const keyRow = step ? indexOfLetter(step.key) : -1;
  const plainColumn = step ? indexOfLetter(step.plain) : -1;
  const keywordRows = new Set([...keyLetters(state.keyword)].map(indexOfLetter));

  const mark = (row: number, column: number): CellMark => {
    if (row === keyRow && column === plainColumn) return "on";
    if (row === keyRow || column === plainColumn) return "cipher";
    return keywordRows.has(row) ? undefined : "dim";
  };

  return (
    <Board>
      {all.length > 0 && (
        <div className={styles.scroll}>
          <AlphabetRows
            rows={[
              { label: "Key", letters: all.map((each) => each.key) },
              { label: "Plain", letters: all.map((each) => each.plain) },
              { label: "Cipher", letters: all.map((each) => each.cipher), kind: "cipher" },
            ]}
            highlight={state.position}
            onPick={onPick}
          />
        </div>
      )}
      <Caption>{step ? <StepCaption state={state} /> : "Type a message below to see it pass through the square."}</Caption>
      <div className={styles.scroll}>
        <LetterGrid
          label="Vigenère square: one row for each key letter, one column for each plain letter"
          cells={SQUARE_CELLS}
          columnHeads={[...ALPHABET]}
          rowHeads={[...ALPHABET]}
          mark={mark}
          size="small"
        />
      </div>
    </Board>
  );
}

/** One sentence saying how the lit row and column give the current letter. */
function StepCaption({ state }: { state: VigenereState }) {
  const step = steps(state)[state.position]!;
  if (state.mode === "encipher") {
    return (
      <>
        Key letter <Letters>{step.key}</Letters> picks the row. Plain <Letters>{step.plain}</Letters> picks the column.
        They meet at cipher <Letters>{step.cipher}</Letters>.
      </>
    );
  }
  return (
    <>
      Key letter <Letters>{step.key}</Letters> picks the row. Find cipher <Letters>{step.cipher}</Letters> in that row.
      The top of its column is plain <Letters>{step.plain}</Letters>.
    </>
  );
}
