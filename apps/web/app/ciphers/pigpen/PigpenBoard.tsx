import { glyphOf } from "@codebook/cipher-engine/pigpen";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, useT } from "~/i18n";
import { PigpenGrids } from "./PigpenGrids";
import { PigpenMessage } from "./PigpenMessage";
import { SymbolCounts } from "./SymbolCounts";
import type { PigpenState } from "./usePigpen";
import { describe } from "./vi";

/** The four grids of the key, the message in symbols, and a count of the symbols. */
export function PigpenBoard({ state, onPick }: { state: PigpenState; onPick: (letter: string) => void }) {
  const t = useT();
  const locale = useLocale();
  const glyph = state.picked ? glyphOf(state.picked) : undefined;

  return (
    <Board>
      <PigpenGrids picked={state.picked} onPick={onPick} />
      <Caption>
        {glyph
          ? t({
              en: (
                <>
                  <Letters>{glyph.letter}</Letters> lives in grid {glyph.grid + 1}. Sketch the lines around it and you
                  get its symbol: {describe(glyph, locale)}.
                </>
              ),
              vi: (
                <>
                  <Letters>{glyph.letter}</Letters> nằm ở lưới {glyph.grid + 1}. Vẽ các nét quanh nó là bạn có ký hiệu
                  của nó: {describe(glyph, locale)}.
                </>
              ),
            })
          : t({
              en: "Tap a letter in a grid, or a symbol in the message. The bright lines around the letter are its symbol.",
              vi: "Chạm vào một chữ trong lưới, hoặc một ký hiệu trong bức thư. Các nét sáng quanh chữ đó là ký hiệu của nó.",
            })}
      </Caption>
      <PigpenMessage text={state.text} hidden={state.hidden} picked={state.picked} onPick={onPick} />
      <SymbolCounts text={state.text} picked={state.picked} onPick={onPick} />
    </Board>
  );
}
