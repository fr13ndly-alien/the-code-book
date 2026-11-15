import { useLayoutEffect, useMemo, useRef } from "react";
import { Matrix4, QuadraticBezierCurve3, Vector3, type InstancedMesh } from "three";
import { MODEL_FONT, canvasTexture } from "~/three/canvasTexture";
import { CELLS, CELL_OF, COLORS, PLUGS } from "./layout";

const PIXELS_PER_UNIT = 64;

/** A socket's place on the panel, in the panel's own flat coordinates. */
function socketAt(letter: string): [x: number, y: number] {
  const cell = CELL_OF[letter]!;
  return [cell.column * PLUGS.spacing, (1 - cell.row) * PLUGS.rowHeight - 0.15];
}

function drawLabels(ctx: CanvasRenderingContext2D) {
  const width = PLUGS.width * PIXELS_PER_UNIT;
  const height = PLUGS.height * PIXELS_PER_UNIT;
  ctx.fillStyle = COLORS.metal;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#d8d0bf";
  ctx.font = MODEL_FONT.replace("34px", "24px");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const { letter } of CELLS) {
    const [x, y] = socketAt(letter);
    ctx.fillText(letter, width / 2 + x * PIXELS_PER_UNIT, height / 2 - (y + 0.42) * PIXELS_PER_UNIT);
  }
}

function Cable({ cable, color }: { cable: string; color: string }) {
  const curve = useMemo(() => {
    const [ax, ay] = socketAt(cable[0]!);
    const [bx, by] = socketAt(cable[1]!);
    const sag = 0.9 + Math.hypot(bx - ax, by - ay) * 0.12;
    return new QuadraticBezierCurve3(
      new Vector3(ax, ay, 0.1),
      new Vector3((ax + bx) / 2, (ay + by) / 2 - 0.3, sag),
      new Vector3(bx, by, 0.1),
    );
  }, [cable]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 24, 0.08, 8]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

interface PlugboardProps {
  cables: readonly string[];
  /** The socket waiting for the other end of a cable, if any. */
  pending: string | null;
  onPick: (letter: string) => void;
}

/** The sloping front panel: 26 sockets, joined in pairs by cables. */
export function Plugboard({ cables, pending, onPick }: PlugboardProps) {
  const sockets = useRef<InstancedMesh>(null);
  const labels = useMemo(
    () => canvasTexture(PLUGS.width * PIXELS_PER_UNIT, PLUGS.height * PIXELS_PER_UNIT, drawLabels).texture,
    [],
  );

  useLayoutEffect(() => {
    // Cylinders stand along y by default; lay each one flat against the panel.
    const matrix = new Matrix4();
    CELLS.forEach(({ letter }, i) => {
      const [x, y] = socketAt(letter);
      matrix.makeRotationX(Math.PI / 2).setPosition(x, y, 0.05);
      sockets.current!.setMatrixAt(i, matrix);
    });
    sockets.current!.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group position={[0, PLUGS.y, PLUGS.z]} rotation-x={PLUGS.tilt}>
      <mesh position-z={-0.15}>
        <boxGeometry args={[PLUGS.width + 0.6, PLUGS.height + 0.3, 0.3]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.8} />
      </mesh>
      <mesh position-z={0.01}>
        <planeGeometry args={[PLUGS.width, PLUGS.height]} />
        <meshBasicMaterial map={labels} />
      </mesh>

      <instancedMesh
        ref={sockets}
        args={[undefined, undefined, CELLS.length]}
        onClick={(event) => {
          event.stopPropagation();
          onPick(CELLS[event.instanceId!]!.letter);
        }}
      >
        <cylinderGeometry args={[0.24, 0.24, 0.12, 16]} />
        <meshStandardMaterial color={COLORS.brass} metalness={0.7} roughness={0.35} />
      </instancedMesh>

      {pending && (
        <mesh position={[...socketAt(pending), 0.13]}>
          <ringGeometry args={[0.28, 0.38, 24]} />
          <meshBasicMaterial color={COLORS.lampOn} />
        </mesh>
      )}

      {cables.map((cable, i) => (
        <Cable key={cable} cable={cable} color={COLORS.cables[i % COLORS.cables.length]!} />
      ))}
    </group>
  );
}
