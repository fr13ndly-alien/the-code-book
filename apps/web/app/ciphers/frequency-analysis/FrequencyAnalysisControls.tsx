import type { Dispatch } from "react";
import { partialText } from "@codebook/cipher-engine/frequency-analysis";
import { countLetters } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import type { FrequencyAnalysisAction, FrequencyAnalysisState } from "./useFrequencyAnalysis";

/** The working key as text, in cipher order: "B=h L=t O=e". */
const keySoFar = (state: FrequencyAnalysisState) =>
  Object.entries(state.guesses)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cipher, plain]) => `${cipher}=${plain.toLowerCase()}`)
    .join(" ");

/** The HTML controls of the frequency analysis page: the key so far, the reading and the message. */
export function FrequencyAnalysisControls(props: {
  state: FrequencyAnalysisState;
  dispatch: Dispatch<FrequencyAnalysisAction>;
}) {
  const { state, dispatch } = props;
  const solved = Object.keys(state.guesses).length;
  const inUse = countLetters(state.ciphertext).filter((count) => count > 0).length;
  const pickedIsSolved = state.picked !== undefined && state.guesses[state.picked] !== undefined;

  return (
    <Controls>
      <Row>
        <Output label={`Key so far: ${solved} of ${inUse} cipher letters`}>{keySoFar(state)}</Output>
        <Button primary onClick={() => dispatch({ type: "guessByRank" })}>
          Guess every letter by rank
        </Button>
      </Row>
      <Row>
        <Button disabled={!pickedIsSolved} onClick={() => dispatch({ type: "rubOut" })}>
          Rub out {state.picked ?? "this letter"}
        </Button>
        <Button disabled={solved === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
          Rub out every guess
        </Button>
      </Row>
      <Row>
        <Output label="The message so far (small letters are your guesses)">
          {partialText(state.ciphertext, state.guesses)}
        </Output>
      </Row>
      <Row>
        <TextField
          label="The ciphertext (a new one clears your guesses)"
          value={state.ciphertext}
          rows={3}
          onChange={(ciphertext) => dispatch({ type: "type", ciphertext })}
        />
      </Row>
    </Controls>
  );
}
