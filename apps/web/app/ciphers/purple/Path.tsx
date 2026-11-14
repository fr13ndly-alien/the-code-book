import { shuffleAt, type Hop, type Mode, type Settings, type Step } from "@codebook/cipher-engine/purple";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption, Letters } from "~/components/sim/Caption";
import { SWITCH_NAMES } from "./layout";

/** One switch on the path, in words: "Switch II at 24 joins contact 3 to contact 7". */
const hopInWords = (hop: Hop) =>
  `${hop.switch === 0 ? "The sixes switch" : `Switch ${SWITCH_NAMES[hop.switch]}`} at ${hop.position + 1} joins contact ${hop.from} to contact ${hop.to}`;

/** The shuffle in force for the chosen letter, and the switches it passed through. */
export function Path({ step, settings, mode }: { step: Step; settings: Settings; mode: Mode }) {
  if (step.group === "garble") {
    return <Caption>This letter was lost on the radio. The switches step past it and keep their place.</Caption>;
  }
  const { from, to } = shuffleAt(step, settings, mode);
  return (
    <>
      <AlphabetRows
        rows={[
          { label: "In", letters: from },
          { label: "Out", letters: to, kind: "cipher" },
        ]}
        highlight={from.indexOf(step.input)}
      />
      <Caption>
        <Letters>{step.input}</Letters> is one of the {step.group}. {step.hops.map(hopInWords).join(". ")}. Out comes{" "}
        <Letters>{step.output}</Letters>. The table shows this moment's shuffle of all the {step.group}.
      </Caption>
    </>
  );
}
