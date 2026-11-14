/**
 * Steganography: hiding the fact that a message exists. Two old methods are
 * modelled here. A wax tablet has writing on the wood under a coat of wax,
 * which is scraped away strip by strip. Invisible ink shows nothing until the
 * page is warmed, and then darkens step by step.
 */

/** How the message is hidden: under wax, or in ink that needs heat. */
export type Method = "wax" | "ink";

/** How hard a guard looks: a casual one only looks, a thorough one scrapes and heats. */
export type Guard = "casual" | "thorough";

/** A tablet or sheet carrying a message, and how much of it is uncovered. */
export interface Page {
  method: Method;
  /** The message, wrapped into lines. On a tablet each line is one strip of wax. */
  rows: string[];
  /** Wax only: the rows scraped clean, lowest number first. */
  cleared: number[];
  /** Ink only: how much the page has been warmed, 0 to MAX_HEAT. */
  heat: number;
}

/** What a guard did to a page and what he could read afterwards. */
export interface Search {
  page: Page;
  /** The words the guard read. Empty when the page looked blank to him. */
  found: string;
}

/** Letters across a tablet. Twelve fit a phone screen. */
export const WIDTH = 12;

/** The number of times a page can be warmed before the ink is as dark as it gets. */
export const MAX_HEAT = 4;

/** Ink fainter than this share of full darkness cannot be read. */
export const READABLE = 0.5;

/** Cuts a word that is too long for one line into pieces that fit. */
const pieces = (word: string, width: number) => word.match(new RegExp(`.{1,${width}}`, "g")) ?? [];

/** The message in capitals, wrapped into lines of at most `width` characters without splitting short words. */
export function wrap(message: string, width = WIDTH): string[] {
  const words = message.toUpperCase().split(/\s+/).flatMap((word) => pieces(word, width));
  const rows: string[] = [];
  for (const word of words) {
    const last = rows[rows.length - 1];
    if (last !== undefined && last.length + 1 + word.length <= width) rows[rows.length - 1] = `${last} ${word}`;
    else rows.push(word);
  }
  return rows;
}

/** A page with everything hidden: fresh wax over every row, or ink that has dried clear. */
export const cover = (page: Page): Page => ({ ...page, cleared: [], heat: 0 });

/** A page with everything showing: every row scraped, or the ink fully browned. */
export const uncover = (page: Page): Page => ({ ...page, cleared: page.rows.map((_, row) => row), heat: MAX_HEAT });

/** A freshly written page. The writing is still in plain view until it is covered. */
export const write = (message: string, method: Method, width = WIDTH): Page =>
  uncover({ method, rows: wrap(message, width), cleared: [], heat: 0 });

/** Scrapes the wax off one row of a tablet. */
export function scrape(page: Page, row: number): Page {
  if (row < 0 || row >= page.rows.length || page.cleared.includes(row)) return page;
  return { ...page, cleared: [...page.cleared, row].sort((a, b) => a - b) };
}

/** The first row still under wax, or -1 when the whole tablet is clean. */
export const nextCovered = (page: Page) => page.rows.findIndex((_, row) => !page.cleared.includes(row));

/** Warms an ink page by one step. */
export const warm = (page: Page): Page => ({ ...page, heat: Math.min(MAX_HEAT, page.heat + 1) });

/** How dark the ink is after warming: 0 is invisible, 1 is fully brown. */
export const legibility = (heat: number) => Math.min(MAX_HEAT, Math.max(0, heat)) / MAX_HEAT;

/** Whether a row can be read as the page is now. */
export const rowShows = (page: Page, row: number) =>
  page.method === "wax" ? page.cleared.includes(row) : legibility(page.heat) >= READABLE;

/** Everything that can be read from the page as it is now. Empty when it looks blank. */
export const reads = (page: Page) => page.rows.filter((_, row) => rowShows(page, row)).join(" ");

/** Whether any part of the page is still hidden. */
export const isHidden = (page: Page) => page.rows.some((_, row) => !rowShows(page, row));

/**
 * A guard inspects the page. A casual guard reads only what already shows.
 * A thorough guard scrapes all the wax and heats the sheet first, so he reads everything.
 */
export function search(page: Page, guard: Guard): Search {
  const after = guard === "thorough" ? uncover(page) : page;
  return { page: after, found: reads(after) };
}
