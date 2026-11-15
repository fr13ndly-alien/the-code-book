import { positions } from "@codebook/cipher-engine/bible-code";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { useLocale, useT, type Locale } from "~/i18n";
import { gridView, positionAt, type GridView } from "./gridView";
import { letters, output, type BibleCodeState } from "./useBibleCode";
import { textTitle } from "./vi";

/** Says which way the highlighted letters run through the grid. */
function shape(state: BibleCodeState, locale: Locale): string {
  if (locale === "vi") {
    if (state.skip === 1) return state.direction === 1 ? "Bước nhảy 1 là cách đọc bình thường." : "Bước nhảy 1, đọc ngược lại.";
    const way = state.direction === 1 ? "từ trên xuống" : "từ dưới lên";
    return `Mỗi hàng có ${state.skip} chữ, nên mỗi lần nhảy ${state.skip} chữ sẽ rơi vào cùng một cột. Hãy đọc cột đó ${way}.`;
  }
  if (state.skip === 1) return state.direction === 1 ? "A skip of 1 is ordinary reading." : "A skip of 1, read backwards.";
  const way = state.direction === 1 ? "down" : "up";
  return `Each row holds ${state.skip} letters, so a jump of ${state.skip} lands in the same column. Read ${way} it.`;
}

/** Says which part of the whole grid is on show. */
function extent(view: GridView, locale: Locale): string {
  const lastRow = view.firstRow + view.cells.length;
  const columns = view.cells[0]?.length ?? 0;
  if (locale === "vi") {
    const across = columns < view.width ? `, cột ${view.firstColumn + 1} đến ${view.firstColumn + columns}` : "";
    return `Đang hiện hàng ${view.firstRow + 1} đến ${lastRow} trong ${view.rows} hàng${across}.`;
  }
  const across = columns < view.width ? `, columns ${view.firstColumn + 1} to ${view.firstColumn + columns}` : "";
  return `Showing rows ${view.firstRow + 1} to ${lastRow} of ${view.rows}${across}.`;
}

/** The passage as a grid as wide as the skip, with the equidistant letters lit. */
export function BibleCodeBoard({ state, onPick }: { state: BibleCodeState; onPick: (position: number) => void }) {
  const t = useT();
  const locale = useLocale();
  const text = letters(state);
  const step = state.skip * state.direction;
  const view = gridView(text, state.start, step, state.length);
  const landed = new Set(positions(text.length, state.start, step, state.length));
  const title = textTitle(state.text, locale);

  return (
    <Board>
      <LetterGrid
        label={t({ en: `${title}, in rows of ${view.width} letters`, vi: `${title}, xếp thành hàng ${view.width} chữ` })}
        cells={view.cells}
        size="small"
        mark={(row, column) => (landed.has(positionAt(view, row, column)) ? "on" : undefined)}
        onPick={(row, column) => onPick(positionAt(view, row, column))}
      />
      <Caption>
        {t({
          en: (
            <>
              The lit letters spell <Letters>{output(state)}</Letters>. {shape(state, locale)} {extent(view, locale)} Tap a
              letter to start from it.
            </>
          ),
          vi: (
            <>
              Các chữ sáng ghép thành <Letters>{output(state)}</Letters>. {shape(state, locale)} {extent(view, locale)} Chạm
              vào một chữ để bắt đầu từ chữ đó.
            </>
          ),
        })}
      </Caption>
    </Board>
  );
}
