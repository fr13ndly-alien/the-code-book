import type { ReactNode } from "react";
import { gridRows, HEADS, pairFor, type Working } from "@codebook/cipher-engine/adfgvx";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import styles from "./AdfgvxBoard.module.css";
import { working, type AdfgvxState } from "./useAdfgvx";

/** The grid, the pairs it gives, and the table that shuffles them. */
export function AdfgvxBoard({ state, onPick }: { state: AdfgvxState; onPick: (symbol: string) => void }) {
  const rows = gridRows(state.grid);
  const stages = working(state);
  const { picked } = state;

  return (
    <Board>
      <LetterGrid
        label="The ADFGVX grid"
        cells={rows}
        rowHeads={[...HEADS]}
        columnHeads={[...HEADS]}
        mark={(row, column) => (rows[row]![column] === picked ? "on" : undefined)}
        onPick={(row, column) => onPick(rows[row]![column]!)}
      />
      {stages.symbols !== "" && <Stages stages={stages} picked={picked} />}
      <Caption>
        {picked ? (
          <>
            <Letters>{picked}</Letters> sits in row <Letters>{pairFor(state.grid, picked)[0]}</Letters>, column{" "}
            <Letters>{pairFor(state.grid, picked)[1]}</Letters>, so its pair is{" "}
            <Letters>{pairFor(state.grid, picked)}</Letters>.{" "}
          </>
        ) : (
          "Tap a square in the grid to follow it. "
        )}
        {state.mode === "encipher"
          ? "The ciphertext is the sorted table, read down each column in turn."
          : "The ciphertext fills the sorted columns. Put the columns back in keyword order and read across."}
      </Caption>
    </Board>
  );
}

/** Stage one as a row of pairs, then stage two as the table before and after its columns are sorted. */
function Stages({ stages, picked }: { stages: Working; picked?: string }) {
  const { symbols, pairs, keyword, table, order } = stages;
  const width = order.length;
  // Letter number n of stage one belongs to symbol number floor(n / 2).
  const isPicked = (letter: number) => picked !== undefined && symbols[Math.floor(letter / 2)] === picked;

  return (
    <div className={styles.stages}>
      <Stage title="Stage 1: each symbol becomes a pair">
        <LetterGrid
          label="The message and its pairs"
          size="small"
          cells={[[...symbols], pairs]}
          mark={(row, column) => (symbols[column] !== picked ? undefined : row === 0 ? "on" : "cipher")}
        />
      </Stage>
      <Stage title="Stage 2: written under the keyword">
        <LetterGrid
          label="The pairs written in rows under the keyword"
          size="small"
          columnHeads={[...keyword]}
          cells={table}
          mark={(row, column) => (isPicked(row * width + column) ? "cipher" : undefined)}
        />
      </Stage>
      <Stage title="Columns sorted by keyword letter">
        <LetterGrid
          label="The same table with its columns in alphabetical order"
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
