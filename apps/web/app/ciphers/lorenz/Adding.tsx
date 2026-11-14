import { WHEEL_LENGTHS, WHEEL_PINS, type Step } from "@codebook/cipher-engine/lorenz";
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
  return (
    <table className={styles.table}>
      <caption>
        Adding the key to <b>{step.input}</b>. Alike gives 0, different gives 1.
      </caption>
      <thead>
        <tr>
          <th scope="col">Wheel, pin in use</th>
          <th scope="col">Tape</th>
          <th scope="col">+ Key</th>
          <th scope="col">= Out</th>
        </tr>
      </thead>
      <tbody>
        {step.pins.map((pin, wheel) => (
          <tr key={wheel}>
            <th scope="row">
              {wheel + 1}: {pin + 1} of {WHEEL_LENGTHS[wheel]} <Pins wheel={wheel} pin={pin} />
            </th>
            <td>{step.inputBits[wheel]}</td>
            <td className={styles.key}>{step.keyBits[wheel]}</td>
            <td className={styles.out}>{step.outputBits[wheel]}</td>
          </tr>
        ))}
        <tr>
          <th scope="row">As a character</th>
          <td>{step.input}</td>
          <td />
          <td className={styles.out}>{step.output}</td>
        </tr>
      </tbody>
    </table>
  );
}
