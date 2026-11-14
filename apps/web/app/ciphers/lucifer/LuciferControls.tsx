import type { Dispatch } from "react";
import { BLOCK_BITS, countDifferentBits, tryKeyLetters } from "@codebook/cipher-engine/lucifer";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import styles from "./LuciferControls.module.css";
import {
  flippedRun,
  inputBlock,
  output,
  pickedRound,
  run,
  type LuciferAction,
  type LuciferState,
} from "./useLucifer";

/** The HTML controls of the Lucifer page: rounds, message, key and the result. */
export function LuciferControls({ state, dispatch }: { state: LuciferState; dispatch: Dispatch<LuciferAction> }) {
  const enciphering = state.mode === "encipher";
  const flipped = flippedRun(state);

  return (
    <Controls>
      <Row>
        <Stepper label="Rounds" value={state.rounds} onStep={(by) => dispatch({ type: "step", by })} />
        <Output label={enciphering ? "Ciphertext, in hex" : "Plaintext"}>{output(state)}</Output>
        {flipped && (
          <Output label="Bits changed by the flip">
            {countDifferentBits(flipped.output, run(state).output)} of {BLOCK_BITS}
          </Output>
        )}
      </Row>
      <Row>
        <TextField
          label={enciphering ? "Two letters" : "Ciphertext: four hex digits"}
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
          width="short"
        />
        <TextField
          label="Key letter"
          value={state.keyLetter}
          onChange={(letter) => dispatch({ type: "key", letter })}
          width="short"
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
        <Stepper label="Explain round" value={pickedRound(state)} onStep={(by) => dispatch({ type: "explain", by })} />
        <Button onClick={() => dispatch({ type: "unflip" })} disabled={!flipped}>
          Put the flipped bit back
        </Button>
      </Row>
      {!enciphering && (
        <details className={styles.attack}>
          <summary>Try every key letter, A to Z</summary>
          <ol>
            {tryKeyLetters(inputBlock(state), state.rounds).map(({ letter, reading }) => (
              <li key={letter} data-on={letter === state.keyLetter}>
                {letter}: {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
