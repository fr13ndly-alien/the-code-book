import { ALPHABET, type Positions } from "@codebook/cipher-engine";
import { useLetterTexture } from "~/three/useLetterTexture";
import type { Slot } from "../useEnigma";
import { COLORS, ROTOR } from "./layout";

const STEP = (Math.PI * 2) / ALPHABET.length;

interface RotorProps {
  x: number;
  position: number;
  onTurn: () => void;
}

/** One rotor as the operator sees it: a window showing a letter, and a thumbwheel beside it. */
function Rotor({ x, position, onTurn }: RotorProps) {
  const letter = useLetterTexture(ALPHABET[position]!, "#1a1612", "#efe8d8");

  return (
    <group
      position={[x, 0, ROTOR.z]}
      onClick={(event) => {
        event.stopPropagation();
        onTurn();
      }}
    >
      <mesh position={[-0.25, ROTOR.coverHeight + 0.01, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial map={letter} />
      </mesh>
      {/* 26 flat faces, so you can see the wheel turn one letter at a time. */}
      <mesh position={[0.55, ROTOR.y, 0]} rotation={[-position * STEP, 0, Math.PI / 2]}>
        <cylinderGeometry args={[ROTOR.radius, ROTOR.radius, 0.3, ALPHABET.length]} />
        <meshStandardMaterial color={COLORS.brass} metalness={0.7} roughness={0.35} flatShading />
      </mesh>
    </group>
  );
}

interface RotorsProps {
  positions: Positions;
  /** Called when a rotor is tapped, to turn it one letter on. */
  onTurn: (slot: Slot) => void;
}

/** The three rotors under their cover plate, at the back of the machine. */
export function Rotors({ positions, onTurn }: RotorsProps) {
  return (
    <>
      <mesh position={[0, ROTOR.coverHeight / 2, ROTOR.z]}>
        <boxGeometry args={[ROTOR.gap * 2 + 2.6, ROTOR.coverHeight, 2.4]} />
        <meshStandardMaterial color={COLORS.metal} roughness={0.5} metalness={0.3} />
      </mesh>
      {([0, 1, 2] as const).map((slot) => (
        <Rotor key={slot} x={(slot - 1) * ROTOR.gap} position={positions[slot]} onTurn={() => onTurn(slot)} />
      ))}
    </>
  );
}
