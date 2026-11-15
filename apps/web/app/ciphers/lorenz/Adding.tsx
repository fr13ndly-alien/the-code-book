import { WHEEL_LENGTHS, WHEEL_PINS, type Step } from "@codebook/cipher-engine/lorenz";
import { useT } from "~/i18n";
import styles from "./Adding.module.css";

/** How many pins to show on each side of the pin in use. */
const SIDE = 2;

/** A short stretch of one wheel's pins, with the pin in use in the middle. */
function Pins({ wheel, pin }: { wheel: number; pin: number }) {
  const length = WHEEL_LENGTHS[wheel]!;
  const window = Array.from({ length: 2 * SIDE + 1 }, (_, offset) => (pin + offset - SIDE + length) % length);
  return (
    <span className={styles.pins} aria-hidden="true">
      {window.map((at, offset) => (
        <span key={offset} data-up={WHEEL_PINS[wheel]![at] === "1"} data-now={offset === SIDE} />
      ))}
    </span>
  );
}

/** The sum for one character, impulse by impulse: message hole, plus wheel pin, gives output hole. */
export function Adding({ step }: { step: Step }) {
  const t = useT();
  return (
    <table className={styles.table}>
      <caption>
        {t({
          en: (
            <>
              Adding the key to <b>{step.input}</b>. Alike gives 0, different gives 1.
            </>
          ),
          vi: (
            <>
              Cộng khóa vào <b>{step.input}</b>. Giống nhau cho 0, khác nhau cho 1.
            </>
          ),
        })}
      </caption>
      <thead>
        <tr>
          <th scope="col">{t({ en: "Wheel, pin in use", vi: "Bánh xe, chốt đang dùng" })}</th>
          <th scope="col">{t({ en: "Tape", vi: "Băng" })}</th>
          <th scope="col">{t({ en: "+ Key", vi: "+ Khóa" })}</th>
          <th scope="col">{t({ en: "= Out", vi: "= Ra" })}</th>
        </tr>
      </thead>
      <tbody>
        {step.pins.map((pin, wheel) => (
          <tr key={wheel}>
            <th scope="row">
              {wheel + 1}: {pin + 1} {t({ en: "of", vi: "/" })} {WHEEL_LENGTHS[wheel]} <Pins wheel={wheel} pin={pin} />
            </th>
            <td>{step.inputBits[wheel]}</td>
            <td className={styles.key}>{step.keyBits[wheel]}</td>
            <td className={styles.out}>{step.outputBits[wheel]}</td>
          </tr>
        ))}
        <tr>
          <th scope="row">{t({ en: "As a character", vi: "Thành ký tự" })}</th>
          <td>{step.input}</td>
          <td />
          <td className={styles.out}>{step.output}</td>
        </tr>
      </tbody>
    </table>
  );
}
