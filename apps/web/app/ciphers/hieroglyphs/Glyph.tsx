import { SIGNS, type SignId } from "@codebook/cipher-engine/hieroglyphs";
import styles from "./Glyph.module.css";

/**
 * Simple outlines of the signs, drawn on a 40 by 40 grid. They are sketches to
 * recognise a sign by, not copies of a carving. Drawn here because many phones
 * have no font for the hieroglyphs in Unicode.
 */
const OUTLINES: Record<SignId, string> = {
  stool: "M9 9h22v22H9z",
  loaf: "M5 29a15 15 0 0 1 30 0z",
  lasso: "M13 5c2 9 15 11 15 21a8 8 0 0 1-16 0c0-10 13-12 15-21",
  lion: "M4 32h29M8 32V19a5 5 0 0 1 10 0v4h10a5 5 0 0 1 5 5v4M33 27c4-2 5-9 1-12M12 18h1",
  rib: "M4 25h24l8-9H12z",
  reeds: "M11 36V11c0-5 6-6 7-2s-1 13-7 15M25 36V11c0-5 6-6 7-2s-1 13-7 15",
  reed: "M18 36V11c0-5 6-6 7-2s-1 13-7 15",
  cloth: "M15 36V9a4 4 0 0 1 8 0v17",
  slope: "M6 32h28V9C23 12 12 20 6 32z",
  vulture: "M11 11a4 4 0 0 1 8 0c0 4 2 6 6 8l10 9H23c-7 0-9-6-9-13M11 11l-6 2 6 1M21 28v8m-4 0h8",
  hand: "M4 18h19c6 0 11 3 13 9H4zM23 18c2-4 6-5 9-4",
  mouth: "M4 20c8-8 24-8 32 0c-8 8-24 8-32 0z",
  basket: "M4 15h32a16 13 0 0 1-32 0zM29 15c3-4 7-4 7 0",
  water: "M4 23l4-6 4 6 4-6 4 6 4-6 4 6 4-6 4 6",
  bolt: "M4 20h32M17 14v12M23 14v12",
  sun: "M20 7a13 13 0 1 0 .1 0zM20 18a2 2 0 1 0 .1 0z",
  skins: "M20 5v9M15 14h10M20 14c-8 4-10 12-10 22M20 14v22M20 14c8 4 10 12 10 22",
};

/** One hieroglyph as a small line drawing, named for screen readers. */
export function Glyph({ sign }: { sign: SignId }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 40 40" role="img" aria-label={SIGNS[sign].name}>
      <path d={OUTLINES[sign]} />
    </svg>
  );
}
