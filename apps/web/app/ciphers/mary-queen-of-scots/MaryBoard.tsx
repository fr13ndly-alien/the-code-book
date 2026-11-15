import { lookUp, tally, type Token } from "@codebook/cipher-engine/mary-queen-of-scots";
import { ENGLISH_FREQUENCY } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./MaryBoard.module.css";
import { SignKey } from "./SignKey";
import { SignStrip } from "./SignStrip";
import { tokensOf, type MaryState } from "./useMary";

/** English letter frequencies, tallest first, to lay behind the count of signs. */
const ENGLISH_BY_RANK = [...ENGLISH_FREQUENCY].sort((a, b) => b - a);

/** What one sign does, in words. */
function meaningOf({ kind, plain }: Token, locale: Locale): string {
  if (locale === "vi") {
    if (kind === "letter") return `là ký hiệu của chữ ${plain}`;
    if (kind === "word") return `thay cho cả từ ${plain}`;
    if (kind === "null") return "là một chữ đệm. Nó không có nghĩa gì, nên người đọc bỏ qua nó";
    if (kind === "doubler") return "cho biết ký hiệu tiếp theo là một chữ kép";
    return "không có trong khóa";
  }
  if (kind === "letter") return `is the sign for the letter ${plain}`;
  if (kind === "word") return `stands for the whole word ${plain}`;
  if (kind === "null") return "is a null. It means nothing, so the reader skips it";
  if (kind === "doubler") return "says that the next sign is a double letter";
  return "is not in the key";
}

/** The desk of the nomenclator: the message in signs, the count of the signs, and the key. */
export function MaryBoard({ state, onPick }: { state: MaryState; onPick: (symbol: string) => void }) {
  const t = useT();
  const locale = useLocale();
  const tokens = tokensOf(state);
  const counts = tally(tokens);
  const reading = state.mode === "read";
  const at = counts.findIndex(({ symbol }) => symbol === state.picked);

  return (
    <Board>
      <SignStrip tokens={tokens} hidden={reading} picked={state.picked} onPick={onPick} />
      <Caption>
        {state.picked
          ? t({
              en: (
                <>
                  <Letters>{state.picked}</Letters> {meaningOf(lookUp(state.picked), locale)}. It appears{" "}
                  {counts[at]?.count ?? 0} times here.
                </>
              ),
              vi: (
                <>
                  <Letters>{state.picked}</Letters> {meaningOf(lookUp(state.picked), locale)}. Nó xuất hiện{" "}
                  {counts[at]?.count ?? 0} lần ở đây.
                </>
              ),
            })
          : reading
            ? t({
                en: "Only the signs are showing. Tap a sign to look it up in the key.",
                vi: "Chỉ có các ký hiệu đang hiện. Chạm vào một ký hiệu để tra nó trong khóa.",
              })
            : t({
                en: "Each sign sits under what it stands for. Tap a sign to find it in the key.",
                vi: "Mỗi ký hiệu nằm dưới điều nó thay thế. Chạm vào một ký hiệu để tìm nó trong khóa.",
              })}
      </Caption>
      <div className={styles.scroll}>
        <FrequencyBars
          label={t({
            en: "How often each sign appears, most common first, over the letters of normal English",
            vi: "Số lần mỗi ký hiệu xuất hiện, phổ biến nhất trước, đặt trên các chữ của tiếng Anh thông thường",
          })}
          symbols={counts.map(({ symbol }) => symbol)}
          values={counts.map(({ count }) => count)}
          compare={ENGLISH_BY_RANK}
          highlight={at < 0 ? undefined : at}
          onPick={(index) => onPick(counts[index]!.symbol)}
        />
      </div>
      <Caption>
        {t({
          en: "Solid bars count the signs. Outlines show normal English, where E is the tallest. Tap the tallest bar to see what it hides.",
          vi: "Cột đặc đếm các ký hiệu. Đường viền cho thấy tiếng Anh thông thường, trong đó E cao nhất. Chạm vào cột cao nhất để xem nó giấu chữ gì.",
        })}
      </Caption>
      <SignKey picked={state.picked} onPick={onPick} />
    </Board>
  );
}
