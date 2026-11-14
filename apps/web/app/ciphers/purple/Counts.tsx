import { SIXES, sixesOf, twentiesOf } from "@codebook/cipher-engine/purple";
import { countLetters, indexOfLetter } from "@codebook/cipher-engine/text";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import styles from "./Counts.module.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** The mean of some numbers, to one decimal place. */
const mean = (numbers: number[]) => (numbers.reduce((sum, n) => sum + n, 0) / Math.max(1, numbers.length)).toFixed(1);

/** Letter counts of the ciphertext. With `sixesFirst` the six sixes letters stand together on the left, marked. */
export function Counts(props: { ciphertext: string; plugboard: string; sixesFirst: boolean }) {
  const counts = countLetters(props.ciphertext);
  const order = props.sixesFirst ? props.plugboard : ALPHABET;
  const values = [...order].map((letter) => counts[indexOfLetter(letter)]!);
  const of = (letters: string) => [...letters].map((letter) => counts[indexOfLetter(letter)]!);

  return (
    <>
      <div className={styles.chart} data-sixes-first={props.sixesFirst}>
        <FrequencyBars label="Letter counts in the ciphertext" symbols={[...order]} values={values} />
      </div>
      <Caption>
        {props.sixesFirst ? (
          <>
            The sixes <Letters>{order.slice(0, SIXES)}</Letters> appear {mean(of(sixesOf(props.plugboard)))} times each
            on average. The twenties appear {mean(of(twentiesOf(props.plugboard)))} times each.
          </>
        ) : (
          "How often each letter appears in the ciphertext. Which six stand apart? Pick “Sixes first” to check."
        )}
      </Caption>
    </>
  );
}
