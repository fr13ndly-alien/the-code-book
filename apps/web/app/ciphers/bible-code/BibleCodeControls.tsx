import type { Dispatch } from "react";
import { sequencesSearched } from "@codebook/cipher-engine/bible-code";
import { TEXTS, type TextId } from "@codebook/cipher-engine/bible-code";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { hits, letters, output, type BibleCodeAction, type BibleCodeState } from "./useBibleCode";

const TEXT_OPTIONS = (Object.keys(TEXTS) as TextId[]).map((value) => ({ value, label: TEXTS[value].title }));

/** A whole number with commas, the same on every device: 259,602. */
const withCommas = (count: number) => count.toLocaleString("en-GB");

/** One sentence saying how often the word was found and how many sequences were tried. */
function report(word: string, found: number, textLength: number): string {
  if (word.length < 2) return "Type a word of two letters or more.";
  const tried = withCommas(sequencesSearched(textLength, word.length, Infinity));
  const times = found === 1 ? "once" : `${withCommas(found)} times`;
  return found === 0 ? `No ${word} in ${tried} sequences.` : `${word} hides ${times} in ${tried} sequences.`;
}

/** The HTML controls of the Bible code page: start, skip, the letters read and the word search. */
export function BibleCodeControls({ state, dispatch }: { state: BibleCodeState; dispatch: Dispatch<BibleCodeAction> }) {
  const text = letters(state);
  const found = hits(state);

  return (
    <Controls>
      <Row>
        <Stepper
          label="Start at letter"
          value={`${state.start + 1} ${text[state.start]}`}
          onStep={(by) => dispatch({ type: "step", what: "start", by })}
        />
        <Stepper label="Skip" value={state.skip} onStep={(by) => dispatch({ type: "step", what: "skip", by })} />
        <Output label={state.direction === 1 ? "The letters read" : "The letters read, going backwards"}>
          {output(state)}
        </Output>
      </Row>
      <Row>
        <Choice
          label="Search in"
          value={state.text}
          onChange={(id) => dispatch({ type: "read", text: id })}
          options={TEXT_OPTIONS}
        />
        <TextField
          label="Word to find"
          width="short"
          value={state.word}
          onChange={(word) => dispatch({ type: "type", word })}
        />
      </Row>
      <Row>
        {found.length > 0 && (
          <Stepper
            label="Hit"
            value={state.hit === undefined ? `– of ${found.length}` : `${state.hit + 1} of ${found.length}`}
            onStep={(by) => dispatch({ type: "show", by })}
          />
        )}
        <Output label="The search found">{report(state.word, found.length, text.length)}</Output>
      </Row>
    </Controls>
  );
}
