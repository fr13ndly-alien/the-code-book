import { isHidden, legibility, MAX_HEAT, READABLE, reads, rowShows, type Page } from "@codebook/cipher-engine/hidden-writing";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import styles from "./HiddenWritingBoard.module.css";
import { report, type HiddenWritingState } from "./useHiddenWriting";

/** A wooden tablet. Each row is bare wood with writing on it, or a strip of wax to scrape. */
function Tablet({ page, onScrape }: { page: Page; onScrape: (row: number) => void }) {
  return (
    <div className={styles.tablet} role="group" aria-label="Wooden writing tablet">
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
            aria-label={`Strip ${index + 1}: blank wax. Scrape it.`}
            onClick={() => onScrape(index)}
          />
        ),
      )}
    </div>
  );
}

/** A sheet of paper whose ink darkens as the page is warmed. */
function Sheet({ page }: { page: Page }) {
  const darkness = legibility(page.heat);
  return (
    <>
      <div className={styles.sheet} role="group" aria-label="Sheet of paper">
        {page.rows.map((row, index) => (
          <div key={index} className={styles.ink} style={{ opacity: darkness }} aria-hidden={darkness < READABLE}>
            {row}
          </div>
        ))}
      </div>
      <ol className={styles.heat} aria-label={`Warmth: ${page.heat} of ${MAX_HEAT}`}>
        {Array.from({ length: MAX_HEAT }, (_, step) => (
          <li key={step} data-on={step < page.heat} />
        ))}
      </ol>
    </>
  );
}

/** One line saying what state the page is in and what to do next. */
function hint(page: Page): string {
  if (page.rows.length === 0) return "Nothing is written yet. Type a message in the controls.";
  if (page.method === "wax") {
    if (!isHidden(page)) return "The message is cut into the bare wood. Anyone who picks the tablet up can read it.";
    if (reads(page) === "") return "Fresh wax covers the wood. The tablet looks blank. Tap a strip to scrape it.";
    return "Some of the wax is gone. Tap another strip to scrape it.";
  }
  if (page.heat === 0) return "The ink has dried clear. The sheet looks blank until it is warmed.";
  if (isHidden(page)) return "Faint marks appear, too pale to read. Warm the page again.";
  if (page.heat < MAX_HEAT) return "The heat has charred the ink brown. It can be read now.";
  return "The writing shows. Anyone who picks the sheet up can read it.";
}

/** The wax tablet or the sheet of invisible ink, with the guard's report when he has looked. */
export function HiddenWritingBoard({ state, onScrape }: { state: HiddenWritingState; onScrape: (row: number) => void }) {
  const said = report(state);
  return (
    <Board>
      {state.page.method === "wax" ? <Tablet page={state.page} onScrape={onScrape} /> : <Sheet page={state.page} />}
      <Caption>{hint(state.page)}</Caption>
      {said && (
        <p className={styles.guard} data-caught={state.found !== ""}>
          The guard: {said}
        </p>
      )}
    </Board>
  );
}
