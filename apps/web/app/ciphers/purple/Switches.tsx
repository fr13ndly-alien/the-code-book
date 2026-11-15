import { POSITIONS, type Step } from "@codebook/cipher-engine/purple";
import { useLocale, useT } from "~/i18n";
import { speedOf, switchName } from "./layout";
import styles from "./Switches.module.css";

/** One stepping switch: its name, where its wiper stands among the 25 positions, and whether it steps next. */
function Switch(props: { name: string; position: number; used: boolean; steps: boolean }) {
  const t = useT();
  return (
    <div className={styles.switch} data-used={props.used}>
      <span className={styles.name}>{props.name}</span>
      <span className={styles.position}>{props.position + 1}</span>
      <span className={styles.dial} aria-hidden="true">
        {Array.from({ length: POSITIONS }, (_, at) => (
          <span key={at} data-now={at === props.position} />
        ))}
      </span>
      <span className={styles.next}>{props.steps ? t({ en: "steps next", vi: "bước tiếp" }) : t({ en: "stays", vi: "đứng yên" })}</span>
    </div>
  );
}

/** The four stepping switches as they stand for one letter. The ones the letter passes through are lit. */
export function Switches({ step, motion }: { step: Step; motion: string }) {
  const t = useT();
  const locale = useLocale();
  return (
    <div className={styles.switches} role="group" aria-label={t({ en: "Stepping switches", vi: "Các công tắc bước" })}>
      {step.positions.map((position, index) => (
        <Switch
          key={index}
          name={index === 0 ? switchName(0, locale) : `${switchName(index, locale)} ${speedOf(index, motion, locale)}`}
          position={position}
          used={index === 0 ? step.group === "sixes" : step.group === "twenties"}
          steps={index === 0 || index === step.moves}
        />
      ))}
    </div>
  );
}
