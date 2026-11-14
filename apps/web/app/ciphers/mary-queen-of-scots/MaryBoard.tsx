import { lookUp, tally, type Token } from "@codebook/cipher-engine/mary-queen-of-scots";
import { ENGLISH_FREQUENCY } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import styles from "./MaryBoard.module.css";
import { SignKey } from "./SignKey";
import { SignStrip } from "./SignStrip";
import { tokensOf, type MaryState } from "./useMary";

/** English letter frequencies, tallest first, to lay behind the count of signs. */
const ENGLISH_BY_RANK = [...ENGLISH_FREQUENCY].sort((a, b) => b - a);

/** What one sign does, in words. */
function meaningOf({ kind, plain }: Token): string {
  if (kind === "letter") return `is the sign for the letter ${plain}`;
  if (kind === "word") return `stands for the whole word ${plain}`;
  if (kind === "null") return "is a null. It means nothing, so the reader skips it";
  if (kind === "doubler") return "says that the next sign is a double letter";
  return "is not in the key";
}

/** The desk of the nomenclator: the message in signs, the count of the signs, and the key. */
export function MaryBoard({ state, onPick }: { state: MaryState; onPick: (symbol: string) => void }) {
  const tokens = tokensOf(state);
  const counts = tally(tokens);
  const reading = state.mode === "read";
  const at = counts.findIndex(({ symbol }) => symbol === state.picked);

  return (
    <Board>
      <SignStrip tokens={tokens} hidden={reading} picked={state.picked} onPick={onPick} />
      <Caption>
        {state.picked ? (
          <>
            <Letters>{state.picked}</Letters> {meaningOf(lookUp(state.picked))}. It appears {counts[at]?.count ?? 0}{" "}
            times here.
          </>
        ) : reading ? (
          "Only the signs are showing. Tap a sign to look it up in the key."
        ) : (
          "Each sign sits under what it stands for. Tap a sign to find it in the key."
        )}
      </Caption>
      <div className={styles.scroll}>
        <FrequencyBars
          label="How often each sign appears, most common first, over the letters of normal English"
          symbols={counts.map(({ symbol }) => symbol)}
          values={counts.map(({ count }) => count)}
          compare={ENGLISH_BY_RANK}
          highlight={at < 0 ? undefined : at}
          onPick={(index) => onPick(counts[index]!.symbol)}
        />
      </div>
      <Caption>
        Solid bars count the signs. Outlines show normal English, where E is the tallest. Tap the tallest bar to see
        what it hides.
      </Caption>
      <SignKey picked={state.picked} onPick={onPick} />
    </Board>
  );
}
