import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { CAMERA, ORBIT, STAFF, lengthFor, radiusFor } from "./layout";
import { Staff } from "./Staff";
import { Strip } from "./Strip";

/** Pulls the camera back far enough to fit the staff, whatever shape the canvas is. */
function FitCamera({ halfLength, radius }: { halfLength: number; radius: number }) {
  const camera = useThree((three) => three.camera);
  const aspect = useThree((three) => three.size.width / three.size.height);
  const invalidate = useThree((three) => three.invalidate);

  useLayoutEffect(() => {
    const slope = Math.tan((CAMERA.fov * Math.PI) / 360);
    const forLength = (halfLength + CAMERA.margin) / (slope * aspect);
    const forHeight = (radius + CAMERA.margin) / slope;
    const distance = Math.max(forLength, forHeight) + radius;
    camera.position.set(0, distance * Math.sin(CAMERA.tilt), distance * Math.cos(CAMERA.tilt));
    camera.lookAt(0, 0, 0);
    invalidate();
  }, [camera, aspect, halfLength, radius, invalidate]);

  return null;
}

export interface ScytaleSceneProps {
  /** The lines of writing on the staff, top line first. One line per letter of thickness. */
  lines: string[];
  /** The line that faces the reader. */
  facing: number;
  /** Called when the staff is tapped, to turn it by one line. */
  onRoll: () => void;
}

/**
 * The 3D scytale. It only draws the lines it is given and reports a tap; it
 * keeps no cipher state of its own.
 */
export default function ScytaleScene({ lines, facing, onRoll }: ScytaleSceneProps) {
  const turns = lines[0]?.length ?? 0;
  const radius = radiusFor(lines.length);
  const length = lengthFor(turns);
  const halfLength = length / 2 + STAFF.overhang + STAFF.capLength;

  return (
    <Canvas frameloop="demand" dpr={[1, 2]} camera={{ fov: CAMERA.fov }} aria-hidden>
      <FitCamera halfLength={halfLength} radius={radius} />
      <OrbitControls
        enablePan={false}
        minDistance={ORBIT.minDistance}
        maxDistance={ORBIT.maxDistance}
        minPolarAngle={ORBIT.minPolar}
        maxPolarAngle={ORBIT.maxPolar}
        minAzimuthAngle={-ORBIT.maxAzimuth}
        maxAzimuthAngle={ORBIT.maxAzimuth}
      />
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 6, 10]} intensity={1.8} />

      {/* The parts stand along the y axis. A quarter turn lays them down, left end first. */}
      <group rotation-z={-Math.PI / 2}>
        <Staff radius={radius} length={length} />
        <Strip lines={lines} turns={turns} facing={facing} onRoll={onRoll} />
      </group>
    </Canvas>
  );
}
