import type { ReactNode } from "react";
import { gridRows, HEADS, pairFor, type Working } from "@codebook/cipher-engine/adfgvx";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { useT } from "~/i18n";
import styles from "./AdfgvxBoard.module.css";
import { working, type AdfgvxState } from "./useAdfgvx";

/** The grid, the pairs it gives, and the table that shuffles them. */
export function AdfgvxBoard({ state, onPick }: { state: AdfgvxState; onPick: (symbol: string) => void }) {
  const t = useT();
  const rows = gridRows(state.grid);
  const stages = working(state);
  const { picked } = state;

  return (
    <Board>
      <LetterGrid
        label={t({ en: "The ADFGVX grid", vi: "Lưới ADFGVX" })}
        cells={rows}
        rowHeads={[...HEADS]}
        columnHeads={[...HEADS]}
        mark={(row, column) => (rows[row]![column] === picked ? "on" : undefined)}
        onPick={(row, column) => onPick(rows[row]![column]!)}
      />
      {stages.symbols !== "" && <Stages stages={stages} picked={picked} />}
      <Caption>
        {picked ? (
          t({
            en: (
              <>
                <Letters>{picked}</Letters> sits in row <Letters>{pairFor(state.grid, picked)[0]}</Letters>, column{" "}
                <Letters>{pairFor(state.grid, picked)[1]}</Letters>, so its pair is{" "}
                <Letters>{pairFor(state.grid, picked)}</Letters>.{" "}
              </>
            ),
            vi: (
              <>
                <Letters>{picked}</Letters> nằm ở hàng <Letters>{pairFor(state.grid, picked)[0]}</Letters>, cột{" "}
                <Letters>{pairFor(state.grid, picked)[1]}</Letters>, nên cặp của nó là{" "}
                <Letters>{pairFor(state.grid, picked)}</Letters>.{" "}
              </>
            ),
          })
        ) : (
          t({ en: "Tap a square in the grid to follow it. ", vi: "Chạm vào một ô trong lưới để lần theo nó. " })
        )}
        {state.mode === "encipher"
          ? t({
              en: "The ciphertext is the sorted table, read down each column in turn.",
              vi: "Bản mật mã là bảng đã sắp xếp, đọc từ trên xuống, lần lượt từng cột.",
            })
          : t({
              en: "The ciphertext fills the sorted columns. Put the columns back in keyword order and read across.",
              vi: "Bản mật mã lấp đầy các cột đã sắp xếp. Đặt các cột về lại thứ tự của từ khóa rồi đọc theo hàng ngang.",
            })}
      </Caption>
    </Board>
  );
}

/** Stage one as a row of pairs, then stage two as the table before and after its columns are sorted. */
function Stages({ stages, picked }: { stages: Working; picked?: string }) {
  const t = useT();
  const { symbols, pairs, keyword, table, order } = stages;
  const width = order.length;
  // Letter number n of stage one belongs to symbol number floor(n / 2).
  const isPicked = (letter: number) => picked !== undefined && symbols[Math.floor(letter / 2)] === picked;

  return (
    <div className={styles.stages}>
      <Stage title={t({ en: "Stage 1: each symbol becomes a pair", vi: "Giai đoạn 1: mỗi ký hiệu thành một cặp" })}>
        <LetterGrid
          label={t({ en: "The message and its pairs", vi: "Tin nhắn và các cặp của nó" })}
          size="small"
          cells={[[...symbols], pairs]}
          mark={(row, column) => (symbols[column] !== picked ? undefined : row === 0 ? "on" : "cipher")}
        />
      </Stage>
      <Stage title={t({ en: "Stage 2: written under the keyword", vi: "Giai đoạn 2: viết dưới từ khóa" })}>
        <LetterGrid
          label={t({ en: "The pairs written in rows under the keyword", vi: "Các cặp viết thành hàng dưới từ khóa" })}
          size="small"
          columnHeads={[...keyword]}
          cells={table}
          mark={(row, column) => (isPicked(row * width + column) ? "cipher" : undefined)}
        />
      </Stage>
      <Stage title={t({ en: "Columns sorted by keyword letter", vi: "Các cột sắp theo chữ của từ khóa" })}>
        <LetterGrid
          label={t({ en: "The same table with its columns in alphabetical order", vi: "Cũng bảng đó, các cột xếp theo thứ tự chữ cái" })}
          size="small"
          columnHeads={order.map((column) => keyword[column]!)}
          cells={table.map((row) => order.map((column) => row[column] ?? ""))}
          mark={(row, column) => (isPicked(row * width + order[column]!) ? "cipher" : undefined)}
        />
      </Stage>
    </div>
  );
}

/** One titled step of the working. */
function Stage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className={styles.stage}>
      <figcaption>{title}</figcaption>
      {children}
    </figure>
  );
}
