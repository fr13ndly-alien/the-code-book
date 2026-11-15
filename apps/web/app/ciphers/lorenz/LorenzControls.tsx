import type { Dispatch } from "react";
import { toTape } from "@codebook/cipher-engine/lorenz";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { output, type LorenzAction, type LorenzState } from "./useLorenz";

/** The HTML controls of the Lorenz page: the tapes, the wheel settings and the letter being studied. */
export function LorenzControls({ state, dispatch }: { state: LorenzState; dispatch: Dispatch<LorenzAction> }) {
  const length = toTape(state.text).length;
  const t = useT();

  return (
    <Controls>
      <Row>
        <Output label={t({ en: "Wheels start at", vi: "Bánh xe bắt đầu ở" })}>{state.start.map((at) => at + 1).join(" ")}</Output>
        <Output label={t({ en: "Output tape (9 is a space)", vi: "Băng ra (9 là dấu cách)" })}>{output(state)}</Output>
      </Row>
      <Row>
        <TextField label={t({ en: "Input tape", vi: "Băng vào" })} value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
        <Stepper
          label={t({ en: "Letter shown", vi: "Chữ đang xem" })}
          value={
            length
              ? t({ en: `${state.picked + 1} of ${length}`, vi: `${state.picked + 1} / ${length}` })
              : t({ en: "none", vi: "không có" })
          }
          onStep={(by) => dispatch({ type: "move", by })}
        />
      </Row>
      <Row>
        {state.start.map((at, wheel) => (
          <Stepper
            key={wheel}
            label={t({ en: `Wheel ${wheel + 1}`, vi: `Bánh xe ${wheel + 1}` })}
            value={at + 1}
            onStep={(by) => dispatch({ type: "turn", wheel, by })}
          />
        ))}
      </Row>
      <Row>
        <Button primary onClick={() => dispatch({ type: "feedBack" })} disabled={length === 0}>
          {t({ en: "Feed the output back in", vi: "Đưa băng ra vào lại máy" })}
        </Button>
        <Button onClick={() => dispatch({ type: "rewind" })}>
          {t({ en: "All wheels to 1", vi: "Đưa mọi bánh xe về 1" })}
        </Button>
      </Row>
    </Controls>
  );
}
