import { fence, readRails } from "@codebook/cipher-engine/rail-fence";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { useT } from "~/i18n";
import { RailReadout } from "./RailReadout";
import { plaintext, type RailFenceState } from "./useRailFence";

/** Messages longer than this are drawn with small cells, to keep the fence short. */
const LARGE_CELLS_UP_TO = 8;

/** The message written zig-zag on the rails, and the rails read off below it. */
export function RailFenceBoard({ state, onPick }: { state: RailFenceState; onPick: (rail: number) => void }) {
  const t = useT();
  const plain = plaintext(state);
  const cells = fence(plain, state.rails);
  const columns = cells[0]?.length ?? 0;

  return (
    <Board>
      <LetterGrid
        label={t({ en: "The message written on the rails", vi: "Tin nhắn viết trên các thanh rào" })}
        cells={cells}
        rowHeads={cells.map((_, rail) => String(rail + 1))}
        size={columns > LARGE_CELLS_UP_TO ? "small" : "large"}
        mark={(rail) => (rail === state.picked ? "on" : undefined)}
        onPick={(rail) => onPick(rail)}
      />
      <RailReadout rails={readRails(plain, state.rails)} picked={state.picked} onPick={onPick} />
      <Caption>
        {state.mode === "encipher"
          ? t({
              en: "Write the message down and up the rails. Then read rail 1, rail 2 and so on: that is the ciphertext.",
              vi: "Viết tin nhắn đi xuống rồi đi lên qua các thanh rào. Rồi đọc thanh 1, thanh 2, cứ thế: đó là bản mật mã.",
            })
          : t({
              en: "The ciphertext is cut into rails and laid back on the fence. Follow the zig-zag to read the message.",
              vi: "Bản mật mã được cắt thành từng thanh và đặt lại lên hàng rào. Đi theo đường zíc zắc để đọc tin nhắn.",
            })}
      </Caption>
    </Board>
  );
}
