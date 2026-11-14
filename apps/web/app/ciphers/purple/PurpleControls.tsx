import type { Dispatch } from "react";
import { PART_1_SETTINGS, VOWEL_PLUGBOARD, toKeys } from "@codebook/cipher-engine/purple";
import { inGroups } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { SHORT_OUTPUT, SWITCH_NAMES, speedOf } from "./layout";
import styles from "./PurpleControls.module.css";
import { output, type PurpleAction, type PurpleState } from "./usePurple";

/** The plugboards the reader can choose between. */
const PLUGBOARDS = [
  { value: VOWEL_PLUGBOARD, label: "Vowels as sixes" },
  { value: PART_1_SETTINGS.plugboard, label: "7 December 1941" },
];

/** The HTML controls of the Purple page: the switches, the message, the output and the letter count. */
export function PurpleControls({ state, dispatch }: { state: PurpleState; dispatch: Dispatch<PurpleAction> }) {
  const enciphering = state.mode === "encipher";
  const length = toKeys(state.text).length;
  const result = output(state);
  const long = result.length > SHORT_OUTPUT;

  return (
    <Controls>
      <Row>
        <Output label="Switches start at (sixes, I, II, III)">{state.start.map((at) => at + 1).join(" ")}</Output>
        <Output label={enciphering ? "Ciphertext" : "Plaintext"}>
          {inGroups(result.slice(0, SHORT_OUTPUT))}
          {long && ` … ${result.length} letters`}
        </Output>
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Your message" : "The ciphertext"}
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
        />
        <Choice
          label="I want to"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encipher", label: "Encipher" },
            { value: "decipher", label: "Decipher" },
          ]}
        />
      </Row>
      <Row>
        <Stepper
          label="Letter shown"
          value={length ? `${state.picked + 1} of ${length}` : "none"}
          onStep={(by) => dispatch({ type: "move", by })}
        />
        {state.start.map((at, index) => (
          <Stepper
            key={index}
            label={index === 0 ? "Sixes switch" : `Switch ${SWITCH_NAMES[index]} (${speedOf(index, state.motion)})`}
            value={at + 1}
            onStep={(by) => dispatch({ type: "turn", switch: index, by })}
          />
        ))}
      </Row>
      <Row>
        <Stepper
          label="Fast, medium, slow"
          value={[...state.motion].map((index) => SWITCH_NAMES[Number(index)]).join(" ")}
          onStep={(by) => dispatch({ type: "reorder", by })}
        />
        <Choice
          label="Plugboard"
          value={state.plugboard}
          onChange={(plugboard) => dispatch({ type: "plug", plugboard })}
          options={PLUGBOARDS}
        />
      </Row>
      <Row>
        <Button primary onClick={() => dispatch({ type: "feedBack" })} disabled={length === 0}>
          Feed the output back in
        </Button>
      </Row>
      <Row>
        <Choice
          label="Show"
          value={state.view}
          onChange={(view) => dispatch({ type: "look", view })}
          options={[
            { value: "machine", label: "The machine" },
            { value: "count", label: "Letter counts" },
          ]}
        />
        {state.view === "count" && (
          <Choice
            label="Order of the bars"
            value={state.sixesFirst ? "sixes" : "alphabet"}
            onChange={(order) => dispatch({ type: "sort", sixesFirst: order === "sixes" })}
            options={[
              { value: "alphabet", label: "A to Z" },
              { value: "sixes", label: "Sixes first" },
            ]}
          />
        )}
      </Row>
      {long && (
        <details className={styles.whole}>
          <summary>Read the whole output</summary>
          <p>{inGroups(result)}</p>
        </details>
      )}
    </Controls>
  );
}
