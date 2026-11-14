import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { hiding, output, type PinprickAction, type PinprickState } from "./usePinprick";

/** The HTML controls of the pinprick page: the light, the secret and what the holes spell. */
export function PinprickControls({ state, dispatch }: { state: PinprickState; dispatch: Dispatch<PinprickAction> }) {
  const auto = state.mode === "auto";
  const left = auto ? hiding(state).left : "";

  return (
    <Controls>
      <Row>
        <Choice
          label="The page is"
          value={state.light ? "light" : "table"}
          onChange={(where) => dispatch({ type: "hold", light: where === "light" })}
          options={[
            { value: "table", label: "On the table" },
            { value: "light", label: "Held up to the light" },
          ]}
        />
        <Output label="The holes spell">{output(state)}</Output>
      </Row>
      <Row>
        <Choice
          label="Who pricks the holes"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "auto", label: "Prick them for me" },
            { value: "hand", label: "I prick by hand" },
          ]}
        />
        {auto ? (
          <TextField
            label={left === "" ? "Your secret" : `Your secret (no room for ${left})`}
            value={state.secret}
            onChange={(secret) => dispatch({ type: "type", secret })}
          />
        ) : (
          <Button onClick={() => dispatch({ type: "mend" })}>Mend every hole</Button>
        )}
      </Row>
    </Controls>
  );
}
