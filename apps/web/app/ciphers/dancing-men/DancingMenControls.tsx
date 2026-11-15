import type { Dispatch } from "react";
import { decipher, encipher, readWith, tally, verneSteps } from "@codebook/cipher-engine/dancing-men";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
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
  const t = useT();
  return (
    <Controls>
      {state.mode === "dance" && <DanceResult state={state} dispatch={dispatch} />}
      {state.mode === "desk" && <DeskResult state={state} dispatch={dispatch} />}
      {state.mode === "verne" && <VerneResult state={state} dispatch={dispatch} />}
      <Row>
        <Choice
          label={t({ en: "Tool (choosing one starts it afresh)", vi: "Công cụ (chọn một công cụ sẽ bắt đầu lại từ đầu)" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "load", preset: PRESETS[START_OF[mode]]! })}
          options={[
            { value: "dance", label: t({ en: "Dance a message", vi: "Cho tin nhắn nhảy múa" }) },
            { value: "desk", label: t({ en: "Holmes's desk", vi: "Bàn làm việc của Holmes" }) },
            { value: "verne", label: t({ en: "Verne's parchment", vi: "Tấm da cổ của Verne" }) },
          ]}
        />
      </Row>
      {state.mode === "dance" && !state.hidden && (
        <Row>
          <TextField label={t({ en: "Your message", vi: "Tin nhắn của bạn" })} value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
        </Row>
      )}
      {state.mode === "desk" && <DeskButtons state={state} dispatch={dispatch} />}
      {state.mode === "verne" && (
        <Row>
          <TextField
            label={t({ en: "Your message (typing goes back to step 0)", vi: "Tin nhắn của bạn (gõ chữ sẽ quay về bước 0)" })}
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
  const t = useT();
  const figures = encipher(state.text);
  const flags = figures.filter((figure) => figure.flag).length;
  if (!state.hidden)
    return (
      <Row>
        <Output label={t({ en: "Read back from the poses and flags", vi: "Đọc lại từ các tư thế và lá cờ" })}>
          {decipher(figures)}
        </Output>
      </Row>
    );
  return (
    <Row>
      <Output label={t({ en: "The message you found", vi: "Tin nhắn bạn tìm thấy" })}>
        {t({ en: `${figures.length} figures, ${flags} flags`, vi: `${figures.length} hình nhân, ${flags} lá cờ` })}
      </Output>
      <Button onClick={() => dispatch({ type: "reveal" })}>{t({ en: "Show every letter", vi: "Hiện mọi chữ" })}</Button>
    </Row>
  );
}

/** First row at the desk: the message as the reader's guesses read it, and a hint. */
function DeskResult({ state, dispatch }: ControlsProps) {
  const t = useT();
  const figures = encipher(state.text);
  const named = Object.keys(state.guesses).length;
  const total = tally(figures).length;
  return (
    <Row>
      <Output
        label={t({
          en: `Your reading so far: ${named} of ${total} figures named`,
          vi: `Bạn đọc được đến đây: đã gọi tên ${named} trên ${total} hình nhân`,
        })}
      >
        {readWith(figures, state.guesses)}
      </Output>
      <Button primary onClick={() => dispatch({ type: "hint" })}>
        {t({ en: "Give me a letter", vi: "Cho tôi một chữ" })}
      </Button>
    </Row>
  );
}

/** The rubbers of the desk: for one figure, or for every guess. */
function DeskButtons({ state, dispatch }: ControlsProps) {
  const t = useT();
  const pickedIsNamed = state.picked !== undefined && state.guesses[state.picked] !== undefined;
  return (
    <Row>
      <Button disabled={!pickedIsNamed} onClick={() => dispatch({ type: "rubOut" })}>
        {t({ en: "Rub out the bright figure", vi: "Xóa chữ của hình nhân đang sáng" })}
      </Button>
      <Button disabled={Object.keys(state.guesses).length === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
        {t({ en: "Rub out every guess", vi: "Xóa mọi phỏng đoán" })}
      </Button>
    </Row>
  );
}

/** First row for Verne: the step the reader is on and the text at that step. */
function VerneResult({ state, dispatch }: ControlsProps) {
  const t = useT();
  return (
    <Row>
      <Stepper
        label={t({ en: "Step", vi: "Bước" })}
        value={t({ en: `${state.verneStep} of ${LAST_VERNE_STEP}`, vi: `${state.verneStep} trên ${LAST_VERNE_STEP}` })}
        onStep={(by) => dispatch({ type: "stepVerne", by })}
      />
      <Output label={t(VERNE_LABELS[state.verneStep]!)}>{verneSteps(state.verneText)[state.verneStep]}</Output>
    </Row>
  );
}
