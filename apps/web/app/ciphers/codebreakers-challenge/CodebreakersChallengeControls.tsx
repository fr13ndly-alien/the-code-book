import type { Dispatch } from "react";
import { CRYPTOGRAMS, type Kind } from "@codebook/cipher-engine/codebreakers-challenge";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT, type Bilingual } from "~/i18n";
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
const KINDS: { value: Kind; label: Bilingual }[] = [
  { value: "caesar", label: { en: "Caesar shift", vi: "Mã Caesar" } },
  { value: "substitution", label: { en: "Substitution", vi: "Thay thế" } },
  { value: "vigenere", label: { en: "Vigenère", vi: "Vigenère" } },
];

const preview = (text: string) => (text.length > PREVIEW_LETTERS ? `${text.slice(0, PREVIEW_LETTERS)}…` : text);

/** The working key of a substitution as text, in cipher order: "A=e Y=t". */
const keySoFar = (state: ChallengeState) =>
  Object.entries(currentWork(state).guesses)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cipher, plain]) => `${cipher}=${plain.toLowerCase()}`)
    .join(" ");

/** What the first row calls the reading: we can only judge our own cryptograms. */
function readingLabel(state: ChallengeState): Bilingual {
  if (isOwn(state)) {
    return { en: "Your own cryptogram: the reading so far", vi: "Bản mật mã của riêng bạn: cách đọc tới giờ" };
  }
  const solved = currentIsSolved(state);
  return {
    en: `Cryptogram ${state.current + 1}: ${solved ? "solved" : "not solved yet"}`,
    vi: `Bản mật mã ${state.current + 1}: ${solved ? "đã giải được" : "chưa giải được"}`,
  };
}

/** The HTML controls of the challenge page: which cryptogram, its reading, whether it is solved, and its tool. */
export function CodebreakersChallengeControls({ state, dispatch }: Props) {
  const t = useT();
  const { kind } = onBench(state);

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "Cryptogram (✓ is solved)", vi: "Bản mật mã (✓ là đã giải được)" })}
          value={String(state.current)}
          onChange={(value) => dispatch({ type: "open", cryptogram: Number(value) })}
          options={[
            ...CRYPTOGRAMS.map((each, at) => ({
              value: String(at),
              label: state.solved[at] ? `${each.number} ✓` : `${each.number}`,
            })),
            { value: String(OWN), label: t({ en: "Your own", vi: "Của riêng bạn" }) },
          ]}
        />
        <Output label={t(readingLabel(state))}>{preview(reading(state))}</Output>
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
  const t = useT();
  return (
    <Row>
      <TextField
        label={t({ en: "Paste a cryptogram (a change starts again)", vi: "Dán một bản mật mã (thay đổi thì làm lại từ đầu)" })}
        value={state.own.text}
        rows={PASTE_ROWS}
        onChange={(text) => dispatch({ type: "paste", text })}
      />
      <Choice
        label={t({ en: "Kind of cipher (a change starts again)", vi: "Loại mật mã (thay đổi thì làm lại từ đầu)" })}
        value={state.own.kind}
        options={KINDS.map(({ value, label }) => ({ value, label: t(label) }))}
        onChange={(kind) => dispatch({ type: "pickKind", kind })}
      />
    </Row>
  );
}

/** A Caesar cryptogram: the shift to undo. */
function CaesarTools({ state, dispatch }: Props) {
  const t = useT();
  return (
    <Row>
      <Stepper label={t({ en: "Shift", vi: "Độ dịch" })} value={currentWork(state).shift} onStep={(by) => dispatch({ type: "turn", by })} />
    </Row>
  );
}

/** A substitution cryptogram: the key so far, and ways to rub guesses out. */
function SubstitutionTools({ state, dispatch }: Props) {
  const t = useT();
  const { guesses, picked } = currentWork(state);
  const guessed = Object.keys(guesses).length;
  const pickedIsGuessed = picked !== undefined && guesses[picked] !== undefined;
  return (
    <>
      <Row>
        <Output label={t({ en: `Key so far: ${guessed} cipher letters`, vi: `Chìa khóa tới giờ: ${guessed} chữ mật mã` })}>{keySoFar(state)}</Output>
      </Row>
      <Row>
        <Button disabled={!pickedIsGuessed} onClick={() => dispatch({ type: "rubOut" })}>
          {t({ en: <>Rub out {picked ?? "this letter"}</>, vi: <>Xóa {picked ?? "chữ này"}</> })}
        </Button>
        <Button disabled={guessed === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
          {t({ en: "Rub out every guess", vi: "Xóa mọi phỏng đoán" })}
        </Button>
        <Button onClick={() => dispatch({ type: "guessByRank" })}>
          {t({ en: "Guess every letter by rank", vi: "Đoán mọi chữ theo thứ hạng" })}
        </Button>
      </Row>
    </>
  );
}

/** A Vigenère cryptogram: the key length, then the shift of each key letter. */
function VigenereTools({ state, dispatch }: Props) {
  const t = useT();
  const { keyLength, keyShifts, position } = currentWork(state);
  const shift = keyShifts[position]!;
  return (
    <Row>
      <Output label={t({ en: "Keyword so far", vi: "Từ khóa tới giờ" })}>{keyword(state)}</Output>
      <Stepper label={t({ en: "Key length (resets the keyword)", vi: "Độ dài từ khóa (đặt lại từ khóa)" })} value={keyLength} onStep={(by) => dispatch({ type: "resize", by })} />
      <Stepper
        label={t({ en: "Key letter", vi: "Chữ khóa" })}
        value={t({ en: `${position + 1} of ${keyLength}`, vi: `${position + 1} / ${keyLength}` })}
        onStep={(by) => dispatch({ type: "move", by })}
      />
      <Stepper label={t({ en: "Shift", vi: "Độ dịch" })} value={`${letterAt(shift)} ${shift}`} onStep={(by) => dispatch({ type: "slide", by })} />
    </Row>
  );
}
