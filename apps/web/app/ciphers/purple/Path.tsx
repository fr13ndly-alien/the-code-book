import { shuffleAt, type Hop, type Mode, type Settings, type Step } from "@codebook/cipher-engine/purple";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, type Locale } from "~/i18n";
import { GROUP_WORDS, SWITCH_NAMES } from "./layout";

/** One switch on the path, in words: "Switch II at 24 joins contact 3 to contact 7". */
const hopInWords = (hop: Hop, locale: Locale) =>
  locale === "vi"
    ? `${hop.switch === 0 ? "Công tắc nhóm sáu" : `Công tắc ${SWITCH_NAMES[hop.switch]}`} ở vị trí ${hop.position + 1} nối tiếp điểm ${hop.from} với tiếp điểm ${hop.to}`
    : `${hop.switch === 0 ? "The sixes switch" : `Switch ${SWITCH_NAMES[hop.switch]}`} at ${hop.position + 1} joins contact ${hop.from} to contact ${hop.to}`;

/** The shuffle in force for the chosen letter, and the switches it passed through. */
export function Path({ step, settings, mode }: { step: Step; settings: Settings; mode: Mode }) {
  const locale = useLocale();
  if (step.group === "garble") {
    return (
      <Caption>
        {locale === "vi"
          ? "Chữ này bị mất trên đường truyền vô tuyến. Các công tắc vẫn bước qua nó và giữ đúng nhịp."
          : "This letter was lost on the radio. The switches step past it and keep their place."}
      </Caption>
    );
  }
  const hops = step.hops.map((hop) => hopInWords(hop, locale)).join(". ");
  const group = GROUP_WORDS[step.group][locale];
  const { from, to } = shuffleAt(step, settings, mode);
  return (
    <>
      <AlphabetRows
        rows={[
          { label: locale === "vi" ? "Vào" : "In", letters: from },
          { label: locale === "vi" ? "Ra" : "Out", letters: to, kind: "cipher" },
        ]}
        highlight={from.indexOf(step.input)}
      />
      {locale === "vi" ? (
        <Caption>
          Chữ <Letters>{step.input}</Letters> thuộc {group}. {hops}. Chữ đi ra là <Letters>{step.output}</Letters>.
          Bảng cho thấy cách xáo trộn toàn bộ {group} ở thời điểm này.
        </Caption>
      ) : (
        <Caption>
          <Letters>{step.input}</Letters> is one of the {group}. {hops}. Out comes <Letters>{step.output}</Letters>.
          The table shows this moment's shuffle of all the {group}.
        </Caption>
      )}
    </>
  );
}
