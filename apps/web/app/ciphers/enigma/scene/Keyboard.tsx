import { useState } from "react";
import { useLetterTexture } from "~/three/useLetterTexture";
import { CELLS, COLORS, KEYS, type Cell } from "./layout";

const CAP_HEIGHT = 0.32;

function Key({ cell, onPress }: { cell: Cell; onPress: (key: string) => void }) {
  const [down, setDown] = useState(false);

  const label = useLetterTexture(cell.letter, "#f4f0e6", COLORS.keyCap);

  return (
    <group
      position={[cell.column * KEYS.spacing, down ? -KEYS.travel : 0, KEYS.z + cell.row * KEYS.rowDepth]}
      onPointerDown={(event) => {
        event.stopPropagation();
        setDown(true);
        onPress(cell.letter);
      }}
      onPointerUp={() => setDown(false)}
      onPointerOut={() => setDown(false)}
    >
      <mesh position-y={CAP_HEIGHT / 2}>
        <cylinderGeometry args={[KEYS.radius, KEYS.radius, CAP_HEIGHT, 24]} />
        <meshStandardMaterial color={COLORS.keyRim} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position-y={CAP_HEIGHT + 0.005} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[KEYS.radius * 0.86, 24]} />
        <meshBasicMaterial map={label} />
      </mesh>
    </group>
  );
}

/** The 26 keys. Pressing one calls `onPress` with its letter. */
export function Keyboard({ onPress }: { onPress: (key: string) => void }) {
  return CELLS.map((cell) => <Key key={cell.letter} cell={cell} onPress={onPress} />);
}
