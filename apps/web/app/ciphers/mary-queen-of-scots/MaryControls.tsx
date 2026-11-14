import type { Dispatch } from "react";
import { lookUp, plainOf, symbolsOf } from "@codebook/cipher-engine/mary-queen-of-scots";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import styles from "./MaryControls.module.css";
import { tokensOf, type MaryAction, type MaryState } from "./useMary";

/** The picked sign and its meaning as text: "2 = THE", "∴ = nothing (a null)". */
function pickedAsText(symbol: string | undefined): string {
  if (!symbol) return "";
  const { kind, plain } = lookUp(symbol);
  if (kind === "null") return `${symbol} = nothing (a null)`;
  if (kind === "doubler") return `${symbol} = double the next sign`;
  return `${symbol} = ${plain}`;
}

/** The HTML controls of the Mary Queen of Scots page: the message, the tricks and the result. */
export function MaryControls({ state, dispatch }: { state: MaryState; dispatch: Dispatch<MaryAction> }) {
  const writing = state.mode === "write";
  const tokens = tokensOf(state);

  return (
    <Controls>
      <Row>
        {writing ? (
          <Output label="Ciphertext, in stand-in signs">{symbolsOf(tokens)}</Output>
        ) : (
          <Output label="The sign you tapped">{pickedAsText(state.picked)}</Output>
        )}
        <Choice
          label="I want to"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "write", label: "Write a letter" },
            { value: "read", label: "Read one" },
          ]}
        />
      </Row>
      <Row>
        <TextField
          label={writing ? "Your message" : "The ciphertext"}
          value={state.text}
          rows={2}
          onChange={(text) => dispatch({ type: "type", text })}
        />
      </Row>
      {writing ? (
        <Row>
          <Choice
            label="Nulls"
            value={state.nulls}
            onChange={(nulls) => dispatch({ type: "sprinkle", nulls })}
            options={[
              { value: "none", label: "None" },
              { value: "few", label: "A few" },
              { value: "many", label: "Many" },
            ]}
          />
          <Choice
            label="Word signs"
            value={state.useWords ? "on" : "off"}
            onChange={(value) => dispatch({ type: "useWords", on: value === "on" })}
            options={[
              { value: "on", label: "On" },
              { value: "off", label: "Off" },
            ]}
          />
          <Stepper label="Null pattern" value={state.seed} onStep={(by) => dispatch({ type: "shuffle", by })} />
        </Row>
      ) : (
        <details className={styles.reveal}>
          <summary>Decipher the whole message for me</summary>
          <p aria-live="polite">{plainOf(tokens)}</p>
        </details>
      )}
    </Controls>
  );
}
