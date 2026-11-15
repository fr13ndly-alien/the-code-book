import { COLORS, lengthFor, radiusFor } from "./layout";
import { useStripTexture } from "./useStripTexture";

/** Enough flat faces for the strip to look round. */
const SIDES = 48;

interface StripProps {
  /** The lines of writing, top line first. */
  lines: string[];
  /** How many times the strip goes round the staff. */
  turns: number;
  /** The line that faces the reader. */
  facing: number;
  /** Called when the strip is tapped, to turn the staff by one line. */
  onRoll: () => void;
}

/**
 * The leather strip wound round the staff, drawn as one cylinder with the
 * letters painted on its side. It stands along the y axis; the scene lays it down.
 */
export function Strip({ lines, turns, facing, onRoll }: StripProps) {
  const texture = useStripTexture(lines, turns);
  const perTurn = lines.length;
  // The picture starts at the side facing +z. Spin the middle of the chosen line round to there.
  const spin = (-2 * Math.PI * (facing + 0.5)) / perTurn;

  return (
    <mesh
      rotation-y={spin}
      onClick={(event) => {
        event.stopPropagation();
        onRoll();
      }}
    >
      <cylinderGeometry args={[radiusFor(perTurn), radiusFor(perTurn), lengthFor(turns), SIDES]} />
      {/* A cylinder has three surfaces: the side, then the two ends. */}
      <meshStandardMaterial attach="material-0" map={texture} roughness={0.9} />
      <meshStandardMaterial attach="material-1" color={COLORS.seam} roughness={0.9} />
      <meshStandardMaterial attach="material-2" color={COLORS.seam} roughness={0.9} />
    </mesh>
  );
}
