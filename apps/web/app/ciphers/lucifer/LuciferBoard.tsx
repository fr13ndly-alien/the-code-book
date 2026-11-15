import { BLOCK_BITS, HALF_BITS, toBits, type FeistelTrace } from "@codebook/cipher-engine/lucifer";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useT } from "~/i18n";
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
  const t = useT();

  return (
    <Board>
      <RoundCaption trace={shown} round={picked} deciphering={state.mode === "decipher"} />
      <div className={styles.scroll}>
        <table className={styles.table} aria-label={t({ en: "The two halves after every round", vi: "Hai nửa sau mỗi vòng" })}>
          <thead>
            <tr>
              <th scope="col">{t({ en: "Round", vi: "Vòng" })}</th>
              <th scope="col">{t({ en: "Round key", vi: "Khóa vòng" })}</th>
              <th scope="col" colSpan={HALF_BITS}>
                {t({ en: "Left half", vi: "Nửa trái" })}
              </th>
              <th scope="col" colSpan={HALF_BITS}>
                {t({ en: "Right half", vi: "Nửa phải" })}
              </th>
              {flipping && <th scope="col">{t({ en: "Changed", vi: "Đã đổi" })}</th>}
            </tr>
          </thead>
          <tbody>
            {lines.map((line, row) => (
              <tr key={line.round} data-picked={line.round === picked} data-last={row === lines.length - 1}>
                <th scope="row">{line.round === 0 ? t({ en: "Start", vi: "Đầu" }) : line.round}</th>
                <td className={styles.key}>{line.roundKey === undefined ? "" : byte(line.roundKey)}</td>
                {[...line.bits].map((bit, at) => (
                  <td key={at} className={styles.bit} data-on={bit !== original[row]!.bits[at]} data-gap={at === HALF_BITS}>
                    {line.round === 0 ? (
                      <button
                        type="button"
                        aria-label={t({ en: `Flip bit ${at + 1}`, vi: `Lật bit ${at + 1}` })}
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
          ? t({
              en: `Bit ${state.flipped! + 1} of the top row is flipped. Bright bits differ from the run without the flip. Tap the bit again to put it back.`,
              vi: `Bit ${state.flipped! + 1} của hàng trên cùng đã bị lật. Các bit sáng là những bit khác với lần chạy không lật. Chạm lại vào bit đó để trả nó về như cũ.`,
            })
          : t({
              en: "Tap a bit in the top row to flip it, and see how far the change spreads.",
              vi: "Chạm vào một bit ở hàng trên cùng để lật nó, và xem thay đổi lan xa đến đâu.",
            })}{" "}
        {t({
          en: "This is a toy with 16-bit blocks and an 8-bit key. Real DES uses 64-bit blocks and a 56-bit key.",
          vi: "Đây là một mô hình đồ chơi với khối 16 bit và khóa 8 bit. DES thật dùng khối 64 bit và khóa 56 bit.",
        })}
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
  const t = useT();

  if (deciphering) {
    return (
      <Caption>
        {t({
          en: (
            <>
              Step {round}, undoing a round: scramble the left half <Letters>{byte(before.left)}</Letters> with round key{" "}
              {key} to get {scrambled}. Add that to the right half <Letters>{byte(before.right)}</Letters> and the older
              left half comes back: <Letters>{byte(step.left)}</Letters>. The left half moves back to the right.
            </>
          ),
          vi: (
            <>
              Bước {round}, gỡ một vòng: xáo trộn nửa trái <Letters>{byte(before.left)}</Letters> bằng khóa vòng {key} để
              được {scrambled}. Cộng kết quả đó vào nửa phải <Letters>{byte(before.right)}</Letters> thì nửa trái cũ
              hiện lại: <Letters>{byte(step.left)}</Letters>. Nửa trái chuyển về lại bên phải.
            </>
          ),
        })}
      </Caption>
    );
  }
  return (
    <Caption>
      {t({
        en: (
          <>
            Round {round}: scramble the right half <Letters>{byte(before.right)}</Letters> with round key {key} to get{" "}
            {scrambled}. Add that to the left half <Letters>{byte(before.left)}</Letters> to make the new right half{" "}
            <Letters>{byte(step.right)}</Letters>. The old right half moves across to the left.
          </>
        ),
        vi: (
          <>
            Vòng {round}: xáo trộn nửa phải <Letters>{byte(before.right)}</Letters> bằng khóa vòng {key} để được{" "}
            {scrambled}. Cộng kết quả đó vào nửa trái <Letters>{byte(before.left)}</Letters> để có nửa phải mới{" "}
            <Letters>{byte(step.right)}</Letters>. Nửa phải cũ chuyển sang bên trái.
          </>
        ),
      })}
    </Caption>
  );
}
