import { useReducer } from "react";
import {
  cover,
  nextCovered,
  scrape,
  search,
  warm,
  write,
  type Guard,
  type Method,
  type Page,
} from "@codebook/cipher-engine/hidden-writing";

/** Everything the hidden writing page remembers. */
export interface HiddenWritingState {
  /** What the reader typed. */
  message: string;
  /** The tablet or sheet, and how much of its writing shows. */
  page: Page;
  /** How hard the guard on the road looks. */
  guard: Guard;
  /** What the guard read when the page was last sent past him. Not set until he has looked. */
  found?: string;
}

export type HiddenWritingAction =
  | { type: "type"; message: string }
  | { type: "switch"; method: Method }
  | { type: "hide" }
  | { type: "scrape"; row: number }
  | { type: "scrapeNext" }
  | { type: "warm" }
  | { type: "post"; guard: Guard }
  | { type: "send" }
  | { type: "load"; preset: HiddenWritingState };

/** The page after something the reader did to it. Anything but the guard's search wipes his last report. */
function changed(state: HiddenWritingState, action: HiddenWritingAction): Page {
  switch (action.type) {
    case "type":
      return write(action.message, state.page.method);
    case "switch":
      return write(state.message, action.method);
    case "hide":
      return cover(state.page);
    case "scrape":
      return scrape(state.page, action.row);
    case "scrapeNext":
      return scrape(state.page, nextCovered(state.page));
    case "warm":
      return warm(state.page);
    default:
      return state.page;
  }
}

function reduce(state: HiddenWritingState, action: HiddenWritingAction): HiddenWritingState {
  switch (action.type) {
    case "load":
      return action.preset;
    case "send":
      return { ...state, ...search(state.page, state.guard) };
    case "post":
      return { ...state, guard: action.guard, found: undefined };
    case "type":
      return { ...state, message: action.message, page: changed(state, action), found: undefined };
    default:
      return { ...state, page: changed(state, action), found: undefined };
  }
}

/** What the guard says after his search, or nothing if he has not looked yet. */
export function report(state: HiddenWritingState): string | undefined {
  if (state.found === undefined) return undefined;
  const thing = state.page.method === "wax" ? "tablet" : "sheet";
  if (state.found === "") return `"A blank ${thing}. On your way."`;
  const how = state.page.method === "wax" ? "I scraped off the wax" : "I held it over a flame";
  return state.guard === "thorough" ? `"${how}. Seize the messenger!"` : '"I can read this. Seize the messenger!"';
}

/** The state of the hidden writing page and the way to change it. */
export const useHiddenWriting = (start: HiddenWritingState) => useReducer(reduce, start);
