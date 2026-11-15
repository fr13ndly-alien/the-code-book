import { SQUARE, keyLetters } from "@codebook/cipher-engine/vigenere";
import { ALPHABET, indexOfLetter } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid, type CellMark } from "~/components/sim/LetterGrid";
import { useT } from "~/i18n";
import styles from "./VigenereBoard.module.css";
import { steps, type VigenereState } from "./useVigenere";

const SQUARE_CELLS = SQUARE.map((row) => [...row]);

/** The message under its keyword, and the Vigenère square with one letter's row and column lit. */
export function VigenereBoard({ state, onPick }: { state: VigenereState; onPick: (position: number) => void }) {
  const t = useT();
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
              { label: t({ en: "Key", vi: "Chìa khóa" }), letters: all.map((each) => each.key) },
              { label: t({ en: "Plain", vi: "Thường" }), letters: all.map((each) => each.plain) },
              { label: t({ en: "Cipher", vi: "Mật mã" }), letters: all.map((each) => each.cipher), kind: "cipher" },
            ]}
            highlight={state.position}
            onPick={onPick}
          />
        </div>
      )}
      <Caption>
        {step ? (
          <StepCaption state={state} />
        ) : (
          t({
            en: "Type a message below to see it pass through the square.",
            vi: "Gõ một tin nhắn ở bên dưới để xem nó đi qua hình vuông.",
          })
        )}
      </Caption>
      <div className={styles.scroll}>
        <LetterGrid
          label={t({
            en: "Vigenère square: one row for each key letter, one column for each plain letter",
            vi: "Hình vuông Vigenère: mỗi chữ khóa một dòng, mỗi chữ thường một cột",
          })}
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
  const t = useT();
  const step = steps(state)[state.position]!;
  if (state.mode === "encipher") {
    return t({
      en: (
        <>
          Key letter <Letters>{step.key}</Letters> picks the row. Plain <Letters>{step.plain}</Letters> picks the
          column. They meet at cipher <Letters>{step.cipher}</Letters>.
        </>
      ),
      vi: (
        <>
          Chữ khóa <Letters>{step.key}</Letters> chọn dòng. Chữ thường <Letters>{step.plain}</Letters> chọn cột. Chúng
          gặp nhau ở chữ mật mã <Letters>{step.cipher}</Letters>.
        </>
      ),
    });
  }
  return t({
    en: (
      <>
        Key letter <Letters>{step.key}</Letters> picks the row. Find cipher <Letters>{step.cipher}</Letters> in that
        row. The top of its column is plain <Letters>{step.plain}</Letters>.
      </>
    ),
    vi: (
      <>
        Chữ khóa <Letters>{step.key}</Letters> chọn dòng. Tìm chữ mật mã <Letters>{step.cipher}</Letters> trên dòng
        đó. Đầu cột của nó là chữ thường <Letters>{step.plain}</Letters>.
      </>
    ),
  });
}
