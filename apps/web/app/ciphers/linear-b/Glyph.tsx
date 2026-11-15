import type { SignId } from "@codebook/cipher-engine/linear-b";
import styles from "./Glyph.module.css";

/** Something the page can draw: a sign of the syllabary, or the picture of a tripod from the Pylos tablet. */
export type Drawing = SignId | "tripod";

/**
 * Simplified drawings of the signs on a 40 by 40 grid, after the standard
 * printed forms of the Linear B syllabary. They are sketches to recognise a
 * sign by, not copies of a scribe's hand. Drawn here because many phones have
 * no font for Linear B in Unicode.
 */
const OUTLINES: Record<Drawing, string> = {
  a: "M12 7v13M28 7v13M12 13h16M20 13v21",
  de: "M11 17l2-10 4 8 3-8 3 8 4-8 2 10M12 20h16M14 20c2 6 8 8 12 14M26 20c-2 6-8 8-12 14",
  ja: "M13 6h14v28H13zM13 15h14M13 27h14",
  jo: "M12 14V8h17M12 14c6-1 9 2 6 6s-3 9 0 14",
  ko: "M20 6a8 8 0 1 0 .1 0M17 10v21a3 3 0 0 0 6 0V10",
  mi: "M12 8c3 0 4 2 4 5v21L29 14c2-3-2-4 0-7",
  ni: "M20 34V20M20 20L13 8M20 20l7-12M10 14l7-8M30 14l-7-8",
  no: "M11 6l1 16M17 6v16M23 6v16M29 6l-1 16M10 22h20M20 22l-6 12M20 22l6 12M18 31h4",
  po: "M13 6v13M13 10h16M13 18h13v16",
  ri: "M20 15a4 4 0 1 0-3-6M12 16h16M20 15l-5 19M20 15l5 19",
  si: "M20 6v28M15 11l-4 23M25 11l4 23M14 17h12M17 28h6",
  so: "M26 34V23c0-4 5-5 5-9s-3-4-5-7M15 8v12M15 9h5M15 14h5M15 19h3",
  ti: "M11 34C13 16 16 6 20 6s7 10 9 28M20 15v13",
  tu: "M20 34C8 26 6 18 9 14c3-4 9-3 11 2c2-5 8-6 11-2c3 4 1 12-11 20M20 34V12c0-4 3-6 6-5",
  tripod: "M9 12h22c0 8-5 12-11 12S9 20 9 12zM11 12c-2-4 2-6 3-3M29 12c2-4-2-6-3-3M13 22l-3 13M20 24v11M27 22l3 13",
};

/** One sign as a small line drawing, with a name for screen readers. */
export function Glyph({ sign, label }: { sign: Drawing; label: string }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 40 40" role="img" aria-label={label}>
      <path d={OUTLINES[sign]} />
    </svg>
  );
}
