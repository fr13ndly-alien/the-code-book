import { COLORS, STAFF } from "./layout";

const SIDES = 32;

/** The wooden staff: a rod a little thinner than the strip, with a cap on each end. Stands along the y axis. */
export function Staff({ radius, length }: { radius: number; length: number }) {
  const rod = radius - STAFF.inset;
  const full = length + 2 * STAFF.overhang;
  const capAt = (full + STAFF.capLength) / 2;

  return (
    <>
      <mesh>
        <cylinderGeometry args={[rod, rod, full, SIDES]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.8} />
      </mesh>
      {[-capAt, capAt].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[rod + STAFF.capGrow, rod + STAFF.capGrow, STAFF.capLength, SIDES]} />
          <meshStandardMaterial color={COLORS.cap} roughness={0.7} />
        </mesh>
      ))}
    </>
  );
}
