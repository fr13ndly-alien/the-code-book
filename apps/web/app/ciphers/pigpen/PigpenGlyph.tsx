import type { Drawing } from "@codebook/cipher-engine/pigpen";
import { ANGLE_DOT, ANGLE_POINTS, GLYPH_DOT, GLYPH_SIZE, TURN, glyphLines } from "./layout";
import styles from "./PigpenGlyph.module.css";

/** One pigpen symbol, drawn from its description. It takes the colour of the text around it. */
export function PigpenGlyph({ glyph }: { glyph: Drawing }) {
  const middle = GLYPH_SIZE / 2;
  return (
    <svg className={styles.glyph} viewBox={`0 0 ${GLYPH_SIZE} ${GLYPH_SIZE}`} aria-hidden="true">
      {glyph.shape === "square" ? (
        <>
          {glyphLines(glyph.walls).map(([[x1, y1], [x2, y2]], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          {glyph.dot && <circle cx={middle} cy={middle} r={GLYPH_DOT} />}
        </>
      ) : (
        <g transform={`rotate(${TURN[glyph.opens!]} ${middle} ${middle})`}>
          <polyline points={ANGLE_POINTS.map((point) => point.join(",")).join(" ")} />
          {glyph.dot && <circle cx={ANGLE_DOT[0]} cy={ANGLE_DOT[1]} r={GLYPH_DOT} />}
        </g>
      )}
    </svg>
  );
}
