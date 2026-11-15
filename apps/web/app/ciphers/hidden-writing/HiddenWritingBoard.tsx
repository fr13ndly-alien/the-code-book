import { isHidden, legibility, MAX_HEAT, READABLE, reads, rowShows, type Page } from "@codebook/cipher-engine/hidden-writing";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, useT, type Bilingual } from "~/i18n";
import styles from "./HiddenWritingBoard.module.css";
import { report, type HiddenWritingState } from "./useHiddenWriting";

/** A wooden tablet. Each row is bare wood with writing on it, or a strip of wax to scrape. */
function Tablet({ page, onScrape }: { page: Page; onScrape: (row: number) => void }) {
  const t = useT();
  return (
    <div className={styles.tablet} role="group" aria-label={t({ en: "Wooden writing tablet", vi: "Bảng viết bằng gỗ" })}>
      {page.rows.length === 0 && <div className={styles.wood} />}
      {page.rows.map((row, index) =>
        rowShows(page, index) ? (
          <div key={index} className={styles.wood}>
            {row}
          </div>
        ) : (
          <button
            key={index}
            type="button"
            className={styles.wax}
            aria-label={t({ en: `Strip ${index + 1}: blank wax. Scrape it.`, vi: `Dải ${index + 1}: sáp trơn. Cạo nó đi.` })}
            onClick={() => onScrape(index)}
          />
        ),
      )}
    </div>
  );
}

/** A sheet of paper whose ink darkens as the page is warmed. */
function Sheet({ page }: { page: Page }) {
  const t = useT();
  const darkness = legibility(page.heat);
  return (
    <>
      <div className={styles.sheet} role="group" aria-label={t({ en: "Sheet of paper", vi: "Tờ giấy" })}>
        {page.rows.map((row, index) => (
          <div key={index} className={styles.ink} style={{ opacity: darkness }} aria-hidden={darkness < READABLE}>
            {row}
          </div>
        ))}
      </div>
      <ol className={styles.heat} aria-label={t({ en: `Warmth: ${page.heat} of ${MAX_HEAT}`, vi: `Độ nóng: ${page.heat} trên ${MAX_HEAT}` })}>
        {Array.from({ length: MAX_HEAT }, (_, step) => (
          <li key={step} data-on={step < page.heat} />
        ))}
      </ol>
    </>
  );
}

/** One line saying what state the page is in and what to do next. */
function hint(page: Page): Bilingual {
  if (page.rows.length === 0)
    return { en: "Nothing is written yet. Type a message in the controls.", vi: "Chưa có chữ nào. Hãy gõ một tin nhắn ở ô bên dưới." };
  if (page.method === "wax") {
    if (!isHidden(page))
      return {
        en: "The message is cut into the bare wood. Anyone who picks the tablet up can read it.",
        vi: "Tin nhắn được khắc thẳng lên mặt gỗ. Ai cầm tấm bảng lên cũng đọc được.",
      };
    if (reads(page) === "")
      return {
        en: "Fresh wax covers the wood. The tablet looks blank. Tap a strip to scrape it.",
        vi: "Lớp sáp mới phủ kín mặt gỗ. Tấm bảng trông như để trống. Chạm vào một dải sáp để cạo.",
      };
    return { en: "Some of the wax is gone. Tap another strip to scrape it.", vi: "Một phần sáp đã bị cạo. Chạm vào dải khác để cạo tiếp." };
  }
  if (page.heat === 0)
    return {
      en: "The ink has dried clear. The sheet looks blank until it is warmed.",
      vi: "Mực đã khô và trong suốt. Tờ giấy trông như để trắng, cho tới khi được hơ nóng.",
    };
  if (isHidden(page)) return { en: "Faint marks appear, too pale to read. Warm the page again.", vi: "Hiện ra vài vết mờ, quá nhạt để đọc. Hãy hơ nóng tờ giấy thêm lần nữa." };
  if (page.heat < MAX_HEAT) return { en: "The heat has charred the ink brown. It can be read now.", vi: "Hơi nóng đã làm mực cháy sém thành màu nâu. Giờ đã đọc được." };
  return { en: "The writing shows. Anyone who picks the sheet up can read it.", vi: "Chữ đã hiện rõ. Ai cầm tờ giấy lên cũng đọc được." };
}

/** The wax tablet or the sheet of invisible ink, with the guard's report when he has looked. */
export function HiddenWritingBoard({ state, onScrape }: { state: HiddenWritingState; onScrape: (row: number) => void }) {
  const t = useT();
  const said = report(state, useLocale());
  return (
    <Board>
      {state.page.method === "wax" ? <Tablet page={state.page} onScrape={onScrape} /> : <Sheet page={state.page} />}
      <Caption>{t(hint(state.page))}</Caption>
      {said && (
        <p className={styles.guard} data-caught={state.found !== ""}>
          {t({ en: "The guard:", vi: "Lính gác:" })} {said}
        </p>
      )}
    </Board>
  );
}
