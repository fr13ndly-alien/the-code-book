import { useT, type Bilingual } from "~/i18n";
import styles from "./Arrow.module.css";

const NAMES: Record<number, Bilingual> = {
  0: { en: "flat", vi: "nằm ngang" },
  90: { en: "upright", vi: "thẳng đứng" },
  45: { en: "leaning right", vi: "chéo sang phải" },
  135: { en: "leaning left", vi: "chéo sang trái" },
};

/** A photon's polarisation, drawn as a two-headed arrow at the given angle in degrees. */
export function Arrow({ angle }: { angle: number }) {
  const t = useT();
  const named = NAMES[angle];
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 24 24"
      role="img"
      aria-label={named ? t(named) : t({ en: `${angle} degrees`, vi: `${angle} độ` })}
    >
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
