import type { Pose } from "@codebook/cipher-engine/dancing-men";
import styles from "./DancingFigure.module.css";
import { FIGURE_HEIGHT, FIGURE_WIDTH, HEAD, asPoints, figureLines, flagShape } from "./layout";

/** One dancing man, drawn from his pose. He takes the colour of the text around him. */
export function DancingFigure({ pose, flag }: { pose: Pose; flag?: boolean }) {
  const held = flag ? flagShape(pose) : undefined;
  return (
    <svg className={styles.figure} viewBox={`0 0 ${FIGURE_WIDTH} ${FIGURE_HEIGHT}`} aria-hidden="true">
      <circle cx={HEAD.x} cy={HEAD.y} r={HEAD.r} />
      {figureLines(pose).map((line, i) => (
        <polyline key={i} points={asPoints(line)} />
      ))}
      {held && (
        <>
          <polyline points={asPoints(held.pole)} />
          <polygon points={asPoints(held.pennant)} />
        </>
      )}
    </svg>
  );
}
