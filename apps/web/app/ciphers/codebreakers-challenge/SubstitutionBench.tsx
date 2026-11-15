import { ENGLISH_RANK, rankLetters, type Guesses } from "@codebook/cipher-engine/frequency-analysis";
import { ENGLISH_FREQUENCY, countLetters, indexOfLetter } from "@codebook/cipher-engine/text";
import { PlainLetters } from "~/ciphers/frequency-analysis/PlainLetters";
import { WorkingText } from "~/ciphers/frequency-analysis/WorkingText";
import { Caption, Letters } from "~/components/sim/Caption";
import { FrequencyBars } from "~/components/sim/FrequencyBars";
import { useT } from "~/i18n";

/** English letter frequencies, tallest first, to lay behind the ciphertext's bars. */
const ENGLISH_BY_RANK = ENGLISH_RANK.map((letter) => ENGLISH_FREQUENCY[indexOfLetter(letter)]!);

/** The tools for a substitution cryptogram: the letter counts, the plain letters to try and the text filling in. */
export function SubstitutionBench(props: {
  ciphertext: string;
  guesses: Guesses;
  picked?: string;
  onPick: (cipher: string) => void;
  onAssign: (plain: string) => void;
}) {
  const t = useT();
  const { ciphertext, guesses, picked } = props;
  const counts = countLetters(ciphertext);
  const ranked = rankLetters(counts);
  const plain = picked ? guesses[picked] : undefined;

  return (
    <>
      <FrequencyBars
        label={t({
          en: "Letter counts in the ciphertext, most common first, over the letters of normal English",
          vi: "Số lần xuất hiện của mỗi chữ trong bản mật mã, chữ hay gặp nhất đứng đầu, đặt trên các chữ của tiếng Anh bình thường",
        })}
        symbols={ranked}
        values={ranked.map((letter) => counts[indexOfLetter(letter)]!)}
        compare={ENGLISH_BY_RANK}
        highlight={picked ? ranked.indexOf(picked) : undefined}
        onPick={(index) => props.onPick(ranked[index]!)}
      />
      <PlainLetters used={Object.values(guesses)} current={plain} disabled={!picked} onAssign={props.onAssign} />
      <WorkingText ciphertext={ciphertext} guesses={guesses} picked={picked} onPick={props.onPick} />
      <Caption>
        {picked
          ? t({
              en: (
                <>
                  Cipher <Letters>{picked}</Letters> appears {counts[indexOfLetter(picked)]} times.{" "}
                  {plain ? `You read it as ${plain.toLowerCase()}.` : "Pick the plain letter you think it hides."}
                </>
              ),
              vi: (
                <>
                  Chữ mật mã <Letters>{picked}</Letters> xuất hiện {counts[indexOfLetter(picked)]} lần.{" "}
                  {plain ? `Bạn đọc nó là ${plain.toLowerCase()}.` : "Hãy chọn chữ thường mà bạn nghĩ nó đang che giấu."}
                </>
              ),
            })
          : t({
              en: "Solid bars count the cipher letters. Outlines show normal English. Tap a bar or a letter of the message to work on it.",
              vi: "Cột đặc đếm các chữ mật mã. Cột viền cho thấy tiếng Anh bình thường. Chạm vào một cột hoặc một chữ của tin nhắn để làm việc với nó.",
            })}
      </Caption>
    </>
  );
}
