import type { Dispatch } from "react";
import { TERM_WORDS } from "@codebook/cipher-engine/navajo";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import styles from "./NavajoControls.module.css";
import { output, type NavajoAction, type NavajoState } from "./useNavajo";

/** The HTML controls of the Navajo page: send or listen, the message and the result. */
export function NavajoControls({ state, dispatch }: { state: NavajoState; dispatch: Dispatch<NavajoAction> }) {
  const sending = state.mode === "send";

  return (
    <Controls>
      <Row>
        <Choice
          label="I want to"
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "send", label: "Send" },
            { value: "listen", label: "Listen" },
          ]}
        />
        <Output label={sending ? "Spoken in code" : "Decoded so far"}>{output(state)}</Output>
      </Row>
      {sending ? (
        <Row>
          <TextField label="Your message" value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
        </Row>
      ) : (
        <Row>
          <Button onClick={() => dispatch({ type: "openAll" })}>Open every word</Button>
          <Button onClick={() => dispatch({ type: "closeAll" })}>Hide them again</Button>
        </Row>
      )}
      <details className={styles.lexicon}>
        <summary>Terms this page has a code word for</summary>
        <ul>
          {TERM_WORDS.map((term) => (
            <li key={term.stands}>
              {term.stands.toLowerCase()}: <span>{term.navajo}</span>, {term.meaning}
            </li>
          ))}
        </ul>
      </details>
    </Controls>
  );
}
