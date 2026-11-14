import type { Dispatch } from "react";
import { CRYPTOGRAMS } from "@codebook/cipher-engine/codebreakers-challenge";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper } from "~/components/sim/Fields";
import {
  currentCryptogram,
  currentIsSolved,
  keyword,
  reading,
  type ChallengeAction,
  type ChallengeState,
} from "./useCodebreakersChallenge";

type Props = { state: ChallengeState; dispatch: Dispatch<ChallengeAction> };

/** How much of a long reading fits in the first row of the controls. The board shows all of it. */
const PREVIEW_LETTERS = 64;

const preview = (text: string) => (text.length > PREVIEW_LETTERS ? `${text.slice(0, PREVIEW_LETTERS)}…` : text);

/** The working key of cryptogram 3 as text, in cipher order: "A=e Y=t". */
const keySoFar = (state: ChallengeState) =>
  Object.entries(state.guesses)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cipher, plain]) => `${cipher}=${plain.toLowerCase()}`)
    .join(" ");

/** The HTML controls of the challenge page: which cryptogram, its reading, whether it is solved, and its tool. */
export function CodebreakersChallengeControls({ state, dispatch }: Props) {
  const { number, kind } = currentCryptogram(state);
  const status = currentIsSolved(state) ? "solved" : "not solved yet";

  return (
    <Controls>
      <Row>
        <Choice
          label="Cryptogram (✓ is solved)"
          value={String(state.current)}
          onChange={(value) => dispatch({ type: "open", cryptogram: Number(value) })}
          options={CRYPTOGRAMS.map((each, at) => ({
            value: String(at),
            label: state.solved[at] ? `${each.number} ✓` : `${each.number}`,
          }))}
        />
        <Output label={`Cryptogram ${number}: ${status}`}>{preview(reading(state))}</Output>
      </Row>
      {kind === "caesar" && <CaesarTools state={state} dispatch={dispatch} />}
      {kind === "substitution" && <SubstitutionTools state={state} dispatch={dispatch} />}
      {kind === "vigenere" && <VigenereTools state={state} dispatch={dispatch} />}
    </Controls>
  );
}

/** Cryptograms 1 and 2: the shift to undo. */
function CaesarTools({ state, dispatch }: Props) {
  return (
    <Row>
      <Stepper label="Shift" value={state.shifts[state.current]!} onStep={(by) => dispatch({ type: "turn", by })} />
    </Row>
  );
}

/** Cryptogram 3: the key so far, and ways to rub guesses out. */
function SubstitutionTools({ state, dispatch }: Props) {
  const guessed = Object.keys(state.guesses).length;
  const pickedIsGuessed = state.picked !== undefined && state.guesses[state.picked] !== undefined;
  return (
    <>
      <Row>
        <Output label={`Key so far: ${guessed} cipher letters`}>{keySoFar(state)}</Output>
      </Row>
      <Row>
        <Button disabled={!pickedIsGuessed} onClick={() => dispatch({ type: "rubOut" })}>
          Rub out {state.picked ?? "this letter"}
        </Button>
        <Button disabled={guessed === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
          Rub out every guess
        </Button>
        <Button onClick={() => dispatch({ type: "guessByRank" })}>Guess every letter by rank</Button>
      </Row>
    </>
  );
}

/** Cryptogram 4: the key length, then the shift of each key letter. */
function VigenereTools({ state, dispatch }: Props) {
  const shift = state.keyShifts[state.position]!;
  return (
    <Row>
      <Output label="Keyword so far">{keyword(state)}</Output>
      <Stepper
        label="Key length (resets the keyword)"
        value={state.keyLength}
        onStep={(by) => dispatch({ type: "resize", by })}
      />
      <Stepper
        label="Key letter"
        value={`${state.position + 1} of ${state.keyLength}`}
        onStep={(by) => dispatch({ type: "move", by })}
      />
      <Stepper label="Shift" value={`${letterAt(shift)} ${shift}`} onStep={(by) => dispatch({ type: "slide", by })} />
    </Row>
  );
}
