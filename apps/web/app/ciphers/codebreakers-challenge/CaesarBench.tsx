import { decipher, shiftedAlphabet } from "@codebook/cipher-engine/caesar";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption } from "~/components/sim/Caption";
import { useT } from "~/i18n";
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
  const t = useT();
  const { ciphertext, grouped, shift } = props;
  return (
    <>
      <p className={styles.message} data-kind="cipher" aria-label={t({ en: "The ciphertext", vi: "Bản mật mã" })}>
        {ciphertext}
      </p>
      <AlphabetRows
        rows={[
          { label: t({ en: "Cipher", vi: "Mã" }), letters: ALPHABET, kind: "cipher" },
          { label: t({ en: "Plain", vi: "Rõ" }), letters: shiftedAlphabet(-shift) },
        ]}
      />
      <Caption>
        {t({
          en: (
            <>
              Undoing a shift of {shift} reads the message like this
              {grouped ? ". The word spaces were removed, so look for words inside the groups:" : ":"}
            </>
          ),
          vi: (
            <>
              Gỡ độ dịch {shift} thì đọc được tin nhắn như sau
              {grouped ? ". Khoảng trống giữa các từ đã bị bỏ, nên hãy tìm từ bên trong các nhóm:" : ":"}
            </>
          ),
        })}
      </Caption>
      <p className={styles.message} aria-label={t({ en: "The reading with this shift", vi: "Cách đọc với độ dịch này" })} aria-live="polite">
        {decipher(ciphertext, shift)}
      </p>
      <ShiftList ciphertext={ciphertext} shift={shift} onChoose={props.onChoose} />
    </>
  );
}
