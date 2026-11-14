import { BLOCK_BITS, HALF_BITS, toBits, type FeistelTrace } from "@codebook/cipher-engine/lucifer";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import styles from "./LuciferBoard.module.css";
import { flippedRun, pickedRound, run, type LuciferState } from "./useLucifer";

/** One line of the table: the two halves after a round, as sixteen bits. */
interface Line {
  /** 0 is the block before any round. */
  round: number;
  roundKey?: number;
  bits: string;
}

const byte = (value: number) => toBits(value, HALF_BITS);

/** The block before the first round and after each round, top to bottom. */
const linesOf = (trace: FeistelTrace): Line[] => [
  { round: 0, bits: toBits(trace.input, BLOCK_BITS) },
  ...trace.rounds.map((step) => ({ round: step.round, roundKey: step.roundKey, bits: byte(step.left) + byte(step.right) })),
];

/** How many bits of a line differ from the same line of the unflipped run. */
const changedBits = (line: Line, original: Line) => [...line.bits].filter((bit, at) => bit !== original.bits[at]).length;

/** The toy Feistel network: the left and right halves as rows of bits, one row per round. */
export function LuciferBoard({ state, onFlip }: { state: LuciferState; onFlip: (bit: number) => void }) {
  const original = linesOf(run(state));
  const shown = flippedRun(state) ?? run(state);
  const lines = linesOf(shown);
  const picked = pickedRound(state);
  const flipping = state.flipped !== undefined;

  return (
    <Board>
      <RoundCaption trace={shown} round={picked} deciphering={state.mode === "decipher"} />
      <div className={styles.scroll}>
        <table className={styles.table} aria-label="The two halves after every round">
          <thead>
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Round key</th>
              <th scope="col" colSpan={HALF_BITS}>
                Left half
              </th>
              <th scope="col" colSpan={HALF_BITS}>
                Right half
              </th>
              {flipping && <th scope="col">Changed</th>}
            </tr>
          </thead>
          <tbody>
            {lines.map((line, row) => (
              <tr key={line.round} data-picked={line.round === picked} data-last={row === lines.length - 1}>
                <th scope="row">{line.round === 0 ? "Start" : line.round}</th>
                <td className={styles.key}>{line.roundKey === undefined ? "" : byte(line.roundKey)}</td>
                {[...line.bits].map((bit, at) => (
                  <td key={at} className={styles.bit} data-on={bit !== original[row]!.bits[at]} data-gap={at === HALF_BITS}>
                    {line.round === 0 ? (
                      <button
                        type="button"
                        aria-label={`Flip bit ${at + 1}`}
                        aria-pressed={at === state.flipped}
                        onClick={() => onFlip(at)}
                      >
                        {bit}
                      </button>
                    ) : (
                      bit
                    )}
                  </td>
                ))}
                {flipping && <td className={styles.count}>{changedBits(line, original[row]!)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Caption>
        {flipping
          ? `Bit ${state.flipped! + 1} of the top row is flipped. Bright bits differ from the run without the flip. Tap the bit again to put it back.`
          : "Tap a bit in the top row to flip it, and see how far the change spreads."}{" "}
        This is a toy with 16-bit blocks and an 8-bit key. Real DES uses 64-bit blocks and a 56-bit key.
      </Caption>
    </Board>
  );
}

/** Spells out the arithmetic of one round, forwards or backwards. */
function RoundCaption({ trace, round, deciphering }: { trace: FeistelTrace; round: number; deciphering: boolean }) {
  const step = trace.rounds[round - 1]!;
  const before = trace.rounds[round - 2] ?? { left: trace.input >> HALF_BITS, right: trace.input & 0xff };
  const key = <Letters>{byte(step.roundKey)}</Letters>;
  const scrambled = <Letters>{byte(step.scrambled)}</Letters>;

  if (deciphering) {
    return (
      <Caption>
        Step {round}, undoing a round: scramble the left half <Letters>{byte(before.left)}</Letters> with round key {key}{" "}
        to get {scrambled}. Add that to the right half <Letters>{byte(before.right)}</Letters> and the older left half
        comes back: <Letters>{byte(step.left)}</Letters>. The left half moves back to the right.
      </Caption>
    );
  }
  return (
    <Caption>
      Round {round}: scramble the right half <Letters>{byte(before.right)}</Letters> with round key {key} to get{" "}
      {scrambled}. Add that to the left half <Letters>{byte(before.left)}</Letters> to make the new right half{" "}
      <Letters>{byte(step.right)}</Letters>. The old right half moves across to the left.
    </Caption>
  );
}
