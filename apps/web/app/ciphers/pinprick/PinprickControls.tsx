import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import { hiding, output, type PinprickAction, type PinprickState } from "./usePinprick";

/** The HTML controls of the pinprick page: the light, the secret and what the holes spell. */
export function PinprickControls({ state, dispatch }: { state: PinprickState; dispatch: Dispatch<PinprickAction> }) {
  const t = useT();
  const auto = state.mode === "auto";
  const left = auto ? hiding(state).left : "";

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "The page is", vi: "Tờ báo đang" })}
          value={state.light ? "light" : "table"}
          onChange={(where) => dispatch({ type: "hold", light: where === "light" })}
          options={[
            { value: "table", label: t({ en: "On the table", vi: "Nằm trên bàn" }) },
            { value: "light", label: t({ en: "Held up to the light", vi: "Giơ lên trước ánh sáng" }) },
          ]}
        />
        <Output label={t({ en: "The holes spell", vi: "Các lỗ ghép thành" })}>{output(state)}</Output>
      </Row>
      <Row>
        <Choice
          label={t({ en: "Who pricks the holes", vi: "Ai châm lỗ" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "auto", label: t({ en: "Prick them for me", vi: "Châm giúp tôi" }) },
            { value: "hand", label: t({ en: "I prick by hand", vi: "Tôi tự châm bằng tay" }) },
          ]}
        />
        {auto ? (
          <TextField
            label={
              left === ""
                ? t({ en: "Your secret", vi: "Bí mật của bạn" })
                : t({ en: `Your secret (no room for ${left})`, vi: `Bí mật của bạn (không còn chỗ cho ${left})` })
            }
            value={state.secret}
            onChange={(secret) => dispatch({ type: "type", secret })}
          />
        ) : (
          <Button onClick={() => dispatch({ type: "mend" })}>{t({ en: "Mend every hole", vi: "Vá mọi lỗ" })}</Button>
        )}
      </Row>
    </Controls>
  );
}
