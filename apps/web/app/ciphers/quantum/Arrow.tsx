import styles from "./Arrow.module.css";

const NAMES: Record<number, string> = { 0: "flat", 90: "upright", 45: "leaning right", 135: "leaning left" };

/** A photon's polarisation, drawn as a two-headed arrow at the given angle in degrees. */
export function Arrow({ angle }: { angle: number }) {
  return (
    <svg className={styles.arrow} viewBox="0 0 24 24" role="img" aria-label={NAMES[angle] ?? `${angle} degrees`}>
      {/* SVG angles turn clockwise, polarisation angles anticlockwise: hence the minus. */}
      <path
        transform={`rotate(${-angle} 12 12)`}
        d="M3 12H21M3 12l4-3M3 12l4 3M21 12l-4-3M21 12l-4 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
