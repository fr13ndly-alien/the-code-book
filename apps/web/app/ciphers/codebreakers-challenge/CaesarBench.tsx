import { decipher, shiftedAlphabet } from "@codebook/cipher-engine/caesar";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption } from "~/components/sim/Caption";
import styles from "./Bench.module.css";
import { ShiftList } from "./ShiftList";

/** The tools for a Caesar cryptogram: the two alphabets, the current reading and every other reading. */
export function CaesarBench(props: {
  ciphertext: string;
  /** True when the word spaces were removed. */
  grouped: boolean;
  shift: number;
  onChoose: (shift: number) => void;
}) {
  const { ciphertext, grouped, shift } = props;
  return (
    <>
      <p className={styles.message} data-kind="cipher" aria-label="The ciphertext">
        {ciphertext}
      </p>
      <AlphabetRows
        rows={[
          { label: "Cipher", letters: ALPHABET, kind: "cipher" },
          { label: "Plain", letters: shiftedAlphabet(-shift) },
        ]}
      />
      <Caption>
        Undoing a shift of {shift} reads the message like this
        {grouped ? ". The word spaces were removed, so look for words inside the groups:" : ":"}
      </Caption>
      <p className={styles.message} aria-label="The reading with this shift" aria-live="polite">
        {decipher(ciphertext, shift)}
      </p>
      <ShiftList ciphertext={ciphertext} shift={shift} onChoose={props.onChoose} />
    </>
  );
}
