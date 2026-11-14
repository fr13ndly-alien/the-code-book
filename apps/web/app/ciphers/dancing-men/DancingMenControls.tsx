import type { Dispatch } from "react";
import { decipher, encipher, readWith, tally, verneSteps } from "@codebook/cipher-engine/dancing-men";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { PRESETS } from "./presets";
import { LAST_VERNE_STEP, type DancingMenAction, type DancingMenState, type Mode } from "./useDancingMen";
import { VERNE_LABELS } from "./VerneSteps";

/** The setup each tool starts from when the reader chooses it. */
const START_OF: Record<Mode, string> = { dance: "slaney", desk: "desk", verne: "verne" };

interface ControlsProps {
  state: DancingMenState;
  dispatch: Dispatch<DancingMenAction>;
}

/** The HTML controls of the Dancing Men page: the result as text, the tool, and what that tool needs. */
export function DancingMenControls({ state, dispatch }: ControlsProps) {
  return (
    <Controls>
      {state.mode === "dance" && <DanceResult state={state} dispatch={dispatch} />}
      {state.mode === "desk" && <DeskResult state={state} dispatch={dispatch} />}
      {state.mode === "verne" && <VerneResult state={state} dispatch={dispatch} />}
      <Row>
        <Choice
          label="Tool (choosing one starts it afresh)"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "load", preset: PRESETS[START_OF[mode]]! })}
          options={[
            { value: "dance", label: "Dance a message" },
            { value: "desk", label: "Holmes's desk" },
            { value: "verne", label: "Verne's parchment" },
          ]}
        />
      </Row>
      {state.mode === "dance" && !state.hidden && (
        <Row>
          <TextField label="Your message" value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
        </Row>
      )}
      {state.mode === "desk" && <DeskButtons state={state} dispatch={dispatch} />}
      {state.mode === "verne" && (
        <Row>
          <TextField
            label="Your message (typing goes back to step 0)"
            value={state.verneText}
            onChange={(text) => dispatch({ type: "typeVerne", text })}
          />
        </Row>
      )}
    </Controls>
  );
}

/** First row when dancing: the message read back from the poses, or only its size while it is hidden. */
function DanceResult({ state, dispatch }: ControlsProps) {
  const figures = encipher(state.text);
  const flags = figures.filter((figure) => figure.flag).length;
  if (!state.hidden) return <Row><Output label="Read back from the poses and flags">{decipher(figures)}</Output></Row>;
  return (
    <Row>
      <Output label="The message you found">{`${figures.length} figures, ${flags} flags`}</Output>
      <Button onClick={() => dispatch({ type: "reveal" })}>Show every letter</Button>
    </Row>
  );
}

/** First row at the desk: the message as the reader's guesses read it, and a hint. */
function DeskResult({ state, dispatch }: ControlsProps) {
  const figures = encipher(state.text);
  const named = Object.keys(state.guesses).length;
  return (
    <Row>
      <Output label={`Your reading so far: ${named} of ${tally(figures).length} figures named`}>
        {readWith(figures, state.guesses)}
      </Output>
      <Button primary onClick={() => dispatch({ type: "hint" })}>
        Give me a letter
      </Button>
    </Row>
  );
}

/** The rubbers of the desk: for one figure, or for every guess. */
function DeskButtons({ state, dispatch }: ControlsProps) {
  const pickedIsNamed = state.picked !== undefined && state.guesses[state.picked] !== undefined;
  return (
    <Row>
      <Button disabled={!pickedIsNamed} onClick={() => dispatch({ type: "rubOut" })}>
        Rub out the bright figure
      </Button>
      <Button disabled={Object.keys(state.guesses).length === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
        Rub out every guess
      </Button>
    </Row>
  );
}

/** First row for Verne: the step the reader is on and the text at that step. */
function VerneResult({ state, dispatch }: ControlsProps) {
  return (
    <Row>
      <Stepper
        label="Step"
        value={`${state.verneStep} of ${LAST_VERNE_STEP}`}
        onStep={(by) => dispatch({ type: "stepVerne", by })}
      />
      <Output label={VERNE_LABELS[state.verneStep]!}>{verneSteps(state.verneText)[state.verneStep]}</Output>
    </Row>
  );
}
