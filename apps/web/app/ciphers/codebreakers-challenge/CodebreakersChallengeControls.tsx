import type { Dispatch } from "react";
import { CRYPTOGRAMS, type Kind } from "@codebook/cipher-engine/codebreakers-challenge";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import {
  OWN,
  currentIsSolved,
  currentWork,
  isOwn,
  keyword,
  onBench,
  reading,
  type ChallengeAction,
  type ChallengeState,
} from "./useCodebreakersChallenge";

type Props = { state: ChallengeState; dispatch: Dispatch<ChallengeAction> };

/** How much of a long reading fits in the first row of the controls. The board shows all of it. */
const PREVIEW_LETTERS = 64;

/** How tall the box for a pasted cryptogram is, in lines. */
const PASTE_ROWS = 3;

/** The kinds of cipher a pasted cryptogram can be worked on as. */
const KINDS: { value: Kind; label: string }[] = [
  { value: "caesar", label: "Caesar shift" },
  { value: "substitution", label: "Substitution" },
  { value: "vigenere", label: "Vigenère" },
];

const preview = (text: string) => (text.length > PREVIEW_LETTERS ? `${text.slice(0, PREVIEW_LETTERS)}…` : text);

/** The working key of a substitution as text, in cipher order: "A=e Y=t". */
const keySoFar = (state: ChallengeState) =>
  Object.entries(currentWork(state).guesses)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cipher, plain]) => `${cipher}=${plain.toLowerCase()}`)
    .join(" ");

/** What the first row calls the reading: we can only judge our own cryptograms. */
function readingLabel(state: ChallengeState): string {
  if (isOwn(state)) return "Your own cryptogram: the reading so far";
  return `Cryptogram ${state.current + 1}: ${currentIsSolved(state) ? "solved" : "not solved yet"}`;
}

/** The HTML controls of the challenge page: which cryptogram, its reading, whether it is solved, and its tool. */
export function CodebreakersChallengeControls({ state, dispatch }: Props) {
  const { kind } = onBench(state);

  return (
    <Controls>
      <Row>
        <Choice
          label="Cryptogram (✓ is solved)"
          value={String(state.current)}
          onChange={(value) => dispatch({ type: "open", cryptogram: Number(value) })}
          options={[
            ...CRYPTOGRAMS.map((each, at) => ({
              value: String(at),
              label: state.solved[at] ? `${each.number} ✓` : `${each.number}`,
            })),
            { value: String(OWN), label: "Your own" },
          ]}
        />
        <Output label={readingLabel(state)}>{preview(reading(state))}</Output>
      </Row>
      {isOwn(state) && <OwnTools state={state} dispatch={dispatch} />}
      {kind === "caesar" && <CaesarTools state={state} dispatch={dispatch} />}
      {kind === "substitution" && <SubstitutionTools state={state} dispatch={dispatch} />}
      {kind === "vigenere" && <VigenereTools state={state} dispatch={dispatch} />}
    </Controls>
  );
}

/** The reader's own cryptogram: the text, and the kind of cipher to treat it as. */
function OwnTools({ state, dispatch }: Props) {
  return (
    <Row>
      <TextField
        label="Paste a cryptogram (a change starts again)"
        value={state.own.text}
        rows={PASTE_ROWS}
        onChange={(text) => dispatch({ type: "paste", text })}
      />
      <Choice
        label="Kind of cipher (a change starts again)"
        value={state.own.kind}
        options={KINDS}
        onChange={(kind) => dispatch({ type: "pickKind", kind })}
      />
    </Row>
  );
}

/** A Caesar cryptogram: the shift to undo. */
function CaesarTools({ state, dispatch }: Props) {
  return (
    <Row>
      <Stepper label="Shift" value={currentWork(state).shift} onStep={(by) => dispatch({ type: "turn", by })} />
    </Row>
  );
}

/** A substitution cryptogram: the key so far, and ways to rub guesses out. */
function SubstitutionTools({ state, dispatch }: Props) {
  const { guesses, picked } = currentWork(state);
  const guessed = Object.keys(guesses).length;
  const pickedIsGuessed = picked !== undefined && guesses[picked] !== undefined;
  return (
    <>
      <Row>
        <Output label={`Key so far: ${guessed} cipher letters`}>{keySoFar(state)}</Output>
      </Row>
      <Row>
        <Button disabled={!pickedIsGuessed} onClick={() => dispatch({ type: "rubOut" })}>
          Rub out {picked ?? "this letter"}
        </Button>
        <Button disabled={guessed === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
          Rub out every guess
        </Button>
        <Button onClick={() => dispatch({ type: "guessByRank" })}>Guess every letter by rank</Button>
      </Row>
    </>
  );
}

/** A Vigenère cryptogram: the key length, then the shift of each key letter. */
function VigenereTools({ state, dispatch }: Props) {
  const { keyLength, keyShifts, position } = currentWork(state);
  const shift = keyShifts[position]!;
  return (
    <Row>
      <Output label="Keyword so far">{keyword(state)}</Output>
      <Stepper label="Key length (resets the keyword)" value={keyLength} onStep={(by) => dispatch({ type: "resize", by })} />
      <Stepper
        label="Key letter"
        value={`${position + 1} of ${keyLength}`}
        onStep={(by) => dispatch({ type: "move", by })}
      />
      <Stepper label="Shift" value={`${letterAt(shift)} ${shift}`} onStep={(by) => dispatch({ type: "slide", by })} />
    </Row>
  );
}
