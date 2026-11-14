import { SIZE, buildSquare, type PlayfairStep } from "@codebook/cipher-engine/playfair";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid, type CellMark } from "~/components/sim/LetterGrid";
import styles from "./PlayfairBoard.module.css";
import { steps, type PlayfairState } from "./usePlayfair";

/** The square as rows of cells. The shared cell is labelled with both of its letters. */
function squareCells(keyword: string): string[][] {
  const letters = [...buildSquare(keyword)].map((letter) => (letter === "I" ? "I/J" : letter));
  return Array.from({ length: SIZE }, (_, row) => letters.slice(row * SIZE, row * SIZE + SIZE));
}

/** What each rule tells you to do, in the direction being used. */
function ruleText(step: PlayfairStep, enciphering: boolean): string {
  switch (step.rule) {
    case "row":
      return `share a row, so each becomes the letter on its ${enciphering ? "right" : "left"}, going round at the edge`;
    case "column":
      return `share a column, so each becomes the letter ${enciphering ? "below" : "above"} it, going round at the edge`;
    case "rectangle":
      return "are corners of a rectangle, so each becomes the corner in its own row";
  }
}

/** Why a pair holds a letter that was not in the message, if it does. */
function paddingText(step: PlayfairStep): string {
  if (step.padded === "double") return ` The ${step.plain[1]} was added to split a double ${step.plain[0]}.`;
  if (step.padded === "end") return ` The ${step.plain[1]} was added to complete the last pair.`;
  return "";
}

/** The message in pairs, and the Playfair square with the pair in view lit. */
export function PlayfairBoard({ state, onPick }: { state: PlayfairState; onPick: (position: number) => void }) {
  const all = steps(state);
  const step = all[state.position];
  const enciphering = state.mode === "encipher";
  // "from" is the pair the reader gave, "to" the pair the square gives back.
  const cells: number[][] = step ? [step.plainCells, step.cipherCells] : [[], []];
  const [from, to] = enciphering ? [cells[0]!, cells[1]!] : [cells[1]!, cells[0]!];

  const mark = (row: number, column: number): CellMark => {
    const cell = row * SIZE + column;
    if (from.includes(cell)) return "on";
    return to.includes(cell) ? "cipher" : undefined;
  };

  return (
    <Board>
      {all.length > 0 && (
        <div className={styles.scroll}>
          <AlphabetRows
            rows={[
              { label: "Plain", letters: all.map((each) => each.plain) },
              { label: "Cipher", letters: all.map((each) => each.cipher), kind: "cipher" },
            ]}
            highlight={state.position}
            onPick={onPick}
          />
        </div>
      )}
      <LetterGrid label="Playfair square" cells={squareCells(state.keyword)} mark={mark} />
      <Caption>
        {step ? (
          <>
            <Letters>{enciphering ? step.plain : step.cipher}</Letters> {ruleText(step, enciphering)}:{" "}
            <Letters>{enciphering ? step.cipher : step.plain}</Letters>.{enciphering && paddingText(step)}
          </>
        ) : (
          "Type a message below to see it pass through the square."
        )}
      </Caption>
    </Board>
  );
}
