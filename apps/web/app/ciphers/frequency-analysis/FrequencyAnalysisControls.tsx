import type { Dispatch } from "react";
import { partialText } from "@codebook/cipher-engine/frequency-analysis";
import { countLetters } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
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
  const t = useT();
  const solved = Object.keys(state.guesses).length;
  const inUse = countLetters(state.ciphertext).filter((count) => count > 0).length;
  const pickedIsSolved = state.picked !== undefined && state.guesses[state.picked] !== undefined;

  return (
    <Controls>
      <Row>
        <Output label={t({ en: `Key so far: ${solved} of ${inUse} cipher letters`, vi: `Chìa khóa tới giờ: ${solved} trên ${inUse} chữ mật mã` })}>{keySoFar(state)}</Output>
        <Button primary onClick={() => dispatch({ type: "guessByRank" })}>
          {t({ en: "Guess every letter by rank", vi: "Đoán mọi chữ theo thứ hạng" })}
        </Button>
      </Row>
      <Row>
        <Button disabled={!pickedIsSolved} onClick={() => dispatch({ type: "rubOut" })}>
          {t({
            en: <>Rub out {state.picked ?? "this letter"}</>,
            vi: <>{state.picked ? `Xóa chữ ${state.picked}` : "Xóa chữ này"}</>,
          })}
        </Button>
        <Button disabled={solved === 0} onClick={() => dispatch({ type: "rubOutAll" })}>
          {t({ en: "Rub out every guess", vi: "Xóa mọi phỏng đoán" })}
        </Button>
      </Row>
      <Row>
        <Output label={t({ en: "The message so far (small letters are your guesses)", vi: "Bức thư tới giờ (chữ in thường là phỏng đoán của bạn)" })}>
          {partialText(state.ciphertext, state.guesses)}
        </Output>
      </Row>
      <Row>
        <TextField
          label={t({ en: "The ciphertext (a new one clears your guesses)", vi: "Bản mật mã (bản mới sẽ xóa các phỏng đoán của bạn)" })}
          value={state.ciphertext}
          rows={3}
          onChange={(ciphertext) => dispatch({ type: "type", ciphertext })}
        />
      </Row>
    </Controls>
  );
}
