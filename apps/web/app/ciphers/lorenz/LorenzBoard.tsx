import { outputOf, toTape } from "@codebook/cipher-engine/lorenz";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useT } from "~/i18n";
import { Adding } from "./Adding";
import { Tape } from "./Tape";
import { stepsOf, type LorenzState } from "./useLorenz";

/** The input tape, the sum for one character, and the output tape. */
export function LorenzBoard({ state, onPick }: { state: LorenzState; onPick: (at: number) => void }) {
  const steps = stepsOf(state);
  const step = steps[state.picked];
  const t = useT();

  return (
    <Board>
      <Tape label={t({ en: "Input tape", vi: "Băng vào" })} symbols={toTape(state.text)} picked={state.picked} onPick={onPick} />
      {step && <Adding step={step} />}
      <Tape label={t({ en: "Output tape", vi: "Băng ra" })} symbols={outputOf(steps)} kind="cipher" picked={state.picked} onPick={onPick} />
      <Caption>
        {step
          ? t({
              en: "A simplified model: five wheels that all step once per character, with invented pins. The real machine had twelve wheels.",
              vi: "Một mô hình đơn giản: năm bánh xe, cứ mỗi ký tự lại cùng quay một nấc, các chốt là bịa ra. Máy thật có mười hai bánh xe.",
            })
          : t({ en: "Type a message below to punch a tape.", vi: "Gõ một tin nhắn ở dưới để đục lỗ một cuộn băng." })}
      </Caption>
    </Board>
  );
}
