import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import type { EnigmaState, Slot } from "../useEnigma";
import { Keyboard } from "./Keyboard";
import { Lampboard } from "./Lampboard";
import { BODY, COLORS } from "./layout";
import { Plugboard } from "./Plugboard";
import { Rotors } from "./Rotors";

const TARGET = [0, -0.8, 0.6] as const;

/** Pulls the camera back far enough to fit the machine, whatever shape the canvas is. */
function FitCamera() {
  const camera = useThree((three) => three.camera);
  const aspect = useThree((three) => three.size.width / three.size.height);
  const invalidate = useThree((three) => three.invalidate);

  useLayoutEffect(() => {
    const distance = Math.max(22, 23 / aspect);
    camera.position.set(0, distance * 0.78, distance * 0.62);
    camera.lookAt(...TARGET);
    invalidate();
  }, [camera, aspect, invalidate]);

  return null;
}

function Body() {
  return (
    <>
      <mesh position={[0, -BODY.height / 2, BODY.centerZ]}>
        <boxGeometry args={[BODY.width, BODY.height, BODY.depth]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.7} />
      </mesh>
      <mesh position={[0, -BODY.height - 0.2, BODY.centerZ + 0.9]}>
        <boxGeometry args={[BODY.width + 0.6, 0.4, BODY.depth + 2.6]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.85} />
      </mesh>
    </>
  );
}

export interface EnigmaSceneProps {
  state: EnigmaState;
  pendingSocket: string | null;
  onPress: (key: string) => void;
  onTurn: (slot: Slot) => void;
  onPickSocket: (letter: string) => void;
}

/**
 * The 3D machine. It only draws what `state` says and reports what the user
 * touched; it keeps no cipher state of its own.
 */
export default function EnigmaScene({ state, pendingSocket, onPress, onTurn, onPickSocket }: EnigmaSceneProps) {
  return (
    <Canvas frameloop="demand" dpr={[1, 2]} camera={{ fov: 35 }} aria-hidden>
      <FitCamera />
      <OrbitControls
        target={TARGET}
        enablePan={false}
        minDistance={12}
        maxDistance={40}
        minPolarAngle={0.15}
        maxPolarAngle={1.35}
        minAzimuthAngle={-0.9}
        maxAzimuthAngle={0.9}
      />
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 12, 8]} intensity={2} />

      <Body />
      <Rotors positions={state.positions} onTurn={onTurn} />
      <Lampboard lit={state.last?.output ?? null} />
      <Keyboard onPress={onPress} />
      <Plugboard cables={state.settings.cables} pending={pendingSocket} onPick={onPickSocket} />
    </Canvas>
  );
}
