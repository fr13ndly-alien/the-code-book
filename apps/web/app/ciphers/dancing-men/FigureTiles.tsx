import { describe, type Pose } from "@codebook/cipher-engine/dancing-men";
import { DancingFigure } from "./DancingFigure";
import styles from "./FigureTiles.module.css";

/** One tile: a figure with a short line under it, such as its letter or its count. */
export interface FigureTile {
  /** The figure's true letter. It names the tile and is never shown unless `under` shows it. */
  letter: string;
  pose: Pose;
  under: string;
}

/** A titled row of figures to tap: the pose key, or the count of each figure in a message. */
export function FigureTiles(props: {
  title: string;
  tiles: FigureTile[];
  picked?: string;
  onPick: (letter: string) => void;
}) {
  if (props.tiles.length === 0) return null;
  return (
    <div className={styles.tiles}>
      <span className={styles.title}>{props.title}</span>
      <ol>
        {props.tiles.map((tile) => (
          <li key={tile.letter}>
            <button
              type="button"
              aria-pressed={tile.letter === props.picked}
              aria-label={`${describe(tile.pose)}: ${tile.under}`}
              onClick={() => props.onPick(tile.letter)}
            >
              <DancingFigure pose={tile.pose} />
              <span className={styles.under}>{tile.under}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
