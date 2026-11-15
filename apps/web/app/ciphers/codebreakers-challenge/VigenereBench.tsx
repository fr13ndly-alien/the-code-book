import { useMemo } from "react";
import { applyKey, countsAfterShift, findRepeats, slices } from "@codebook/cipher-engine/babbage";
import { ALPHABET, ENGLISH_FREQUENCY, letterAt } from "@codebook/cipher-engine/text";
import { LetterBlock } from "~/ciphers/babbage/LetterBlock";
import { RepeatsTable } from "~/ciphers/babbage/RepeatsTable";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import { useT } from "~/i18n";
import styles from "./Bench.module.css";

/** The table shows the longest repeats only: they are the least likely to be accidents. */
const ROWS_SHOWN = 8;

/** Letters are sent in groups of this size, with one space after each group. */
const GROUP = 5;

/** Which letter of the message a character of the grouped text is, or -1 for the space after a group. */
const letterIndex = (at: number) => (at % (GROUP + 1) === GROUP ? -1 : at - Math.floor(at / (GROUP + 1)));

/** The tools for a Vigenère cryptogram, sent in groups of five: the repeats and their spacings, then one frequency chart per key letter. */
export function VigenereBench(props: {
  ciphertext: string;
  keyLength: number;
  keyShifts: number[];
  position: number;
  repeat?: number;
  onPickRepeat: (row: number) => void;
}) {
  const t = useT();
  const { ciphertext, keyLength, keyShifts, position } = props;
  const repeats = useMemo(() => findRepeats(ciphertext).slice(0, ROWS_SHOWN), [ciphertext]);
  const picked = props.repeat === undefined ? undefined : repeats[props.repeat];
  const inCopy = (letter: number, start: number) => letter >= start && letter < start + picked!.sequence.length;
  const fits = repeats.filter((repeat) => repeat.spacing % keyLength === 0).length;
  const slice = slices(ciphertext, keyLength)[position]!;
  const shift = keyShifts[position]!;

  return (
    <>
      <LetterBlock
        label={t({ en: "The ciphertext", vi: "Bản mật mã" })}
        letters={ciphertext}
        lit={(at) => picked !== undefined && (inCopy(letterIndex(at), picked.first) || inCopy(letterIndex(at), picked.second))}
      />
      <div className={styles.scroll}>
        <RepeatsTable repeats={repeats} keyLength={keyLength} picked={props.repeat} onPick={props.onPickRepeat} />
      </div>
      <Caption>
        {picked &&
          t({
            en: (
              <>
                <Letters>{picked.sequence}</Letters> appears twice, {picked.spacing} letters apart.{" "}
              </>
            ),
            vi: (
              <>
                <Letters>{picked.sequence}</Letters> xuất hiện hai lần, cách nhau {picked.spacing} chữ.{" "}
              </>
            ),
          })}
        {repeats.length === 0
          ? t({
              en: "No run of four letters appears twice in this text, so there is no gap to measure.",
              vi: "Trong văn bản này không có chuỗi bốn chữ nào xuất hiện hai lần, nên không có khoảng cách nào để đo.",
            })
          : t({
              en: `A keyword of ${keyLength} letters would explain ${fits} of these ${repeats.length} repeats.`,
              vi: `Một từ khóa dài ${keyLength} chữ sẽ giải thích được ${fits} trong số ${repeats.length} lần lặp này.`,
            })}
      </Caption>
      <Caption>
        {t({
          en: (
            <>
              Key letter {position + 1} of {keyLength} enciphered {slice.length} of the letters. Trying{" "}
              <Letters>{letterAt(shift)}</Letters>: solid bars are these letters, outlines are ordinary English.
            </>
          ),
          vi: (
            <>
              Chữ khóa thứ {position + 1} trên {keyLength} đã mã hóa {slice.length} chữ. Đang thử{" "}
              <Letters>{letterAt(shift)}</Letters>: cột đặc là các chữ này, cột viền là tiếng Anh bình thường.
            </>
          ),
        })}
      </Caption>
      <div className={styles.scroll}>
        <FrequencyBars
          label={t({
            en: `Letter counts for key letter ${position + 1} with a shift of ${shift}, compared with English`,
            vi: `Số lần xuất hiện của mỗi chữ với chữ khóa thứ ${position + 1}, độ dịch ${shift}, so với tiếng Anh`,
          })}
          symbols={[...ALPHABET]}
          values={countsAfterShift(slice, shift)}
          compare={ENGLISH_FREQUENCY}
        />
      </div>
      <LetterBlock
        label={t({ en: "The plaintext so far", vi: "Bản rõ tới giờ" })}
        letters={applyKey(ciphertext, keyShifts)}
        lit={(at) => letterIndex(at) >= 0 && letterIndex(at) % keyLength === position}
        tone="lamp"
      />
    </>
  );
}
