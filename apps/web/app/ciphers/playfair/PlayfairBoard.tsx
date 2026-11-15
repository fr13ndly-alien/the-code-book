import { SIZE, buildSquare, type PlayfairStep } from "@codebook/cipher-engine/playfair";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid, type CellMark } from "~/components/sim/LetterGrid";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./PlayfairBoard.module.css";
import { steps, type PlayfairState } from "./usePlayfair";

/** The square as rows of cells. The shared cell is labelled with both of its letters. */
function squareCells(keyword: string): string[][] {
  const letters = [...buildSquare(keyword)].map((letter) => (letter === "I" ? "I/J" : letter));
  return Array.from({ length: SIZE }, (_, row) => letters.slice(row * SIZE, row * SIZE + SIZE));
}

/** What each rule tells you to do, in the direction being used. */
function ruleText(step: PlayfairStep, enciphering: boolean, locale: Locale): string {
  if (locale === "vi") {
    switch (step.rule) {
      case "row":
        return enciphering
          ? "nằm cùng một hàng, nên mỗi chữ đổi thành chữ bên phải nó, tới mép thì vòng lại"
          : "nằm cùng một hàng, nên mỗi chữ đổi thành chữ bên trái nó, tới mép thì vòng lại";
      case "column":
        return enciphering
          ? "nằm cùng một cột, nên mỗi chữ đổi thành chữ ngay bên dưới nó, tới mép thì vòng lại"
          : "nằm cùng một cột, nên mỗi chữ đổi thành chữ ngay bên trên nó, tới mép thì vòng lại";
      case "rectangle":
        return "là hai góc của một hình chữ nhật, nên mỗi chữ đổi thành góc còn lại trên hàng của nó";
    }
  }
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
function paddingText(step: PlayfairStep, locale: Locale): string {
  if (locale === "vi") {
    if (step.padded === "double") return ` Chữ ${step.plain[1]} được thêm vào để tách hai chữ ${step.plain[0]} liền nhau.`;
    if (step.padded === "end") return ` Chữ ${step.plain[1]} được thêm vào cho đủ cặp cuối cùng.`;
    return "";
  }
  if (step.padded === "double") return ` The ${step.plain[1]} was added to split a double ${step.plain[0]}.`;
  if (step.padded === "end") return ` The ${step.plain[1]} was added to complete the last pair.`;
  return "";
}

/** The message in pairs, and the Playfair square with the pair in view lit. */
export function PlayfairBoard({ state, onPick }: { state: PlayfairState; onPick: (position: number) => void }) {
  const t = useT();
  const locale = useLocale();
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
              { label: t({ en: "Plain", vi: "Thường" }), letters: all.map((each) => each.plain) },
              { label: t({ en: "Cipher", vi: "Mật mã" }), letters: all.map((each) => each.cipher), kind: "cipher" },
            ]}
            highlight={state.position}
            onPick={onPick}
          />
        </div>
      )}
      <LetterGrid label={t({ en: "Playfair square", vi: "Hình vuông Playfair" })} cells={squareCells(state.keyword)} mark={mark} />
      <Caption>
        {step ? (
          <>
            <Letters>{enciphering ? step.plain : step.cipher}</Letters> {ruleText(step, enciphering, locale)}:{" "}
            <Letters>{enciphering ? step.cipher : step.plain}</Letters>.{enciphering && paddingText(step, locale)}
          </>
        ) : (
          t({
            en: "Type a message below to see it pass through the square.",
            vi: "Gõ một tin nhắn ở bên dưới để xem nó đi qua hình vuông.",
          })
        )}
      </Caption>
    </Board>
  );
}
