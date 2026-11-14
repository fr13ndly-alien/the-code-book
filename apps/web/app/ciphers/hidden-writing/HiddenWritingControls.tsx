import type { Dispatch } from "react";
import { MAX_HEAT, nextCovered, reads } from "@codebook/cipher-engine/hidden-writing";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { report, type HiddenWritingAction, type HiddenWritingState } from "./useHiddenWriting";

/** The HTML controls of the hidden writing page: the hiding place, the message and the guard. */
export function HiddenWritingControls(props: { state: HiddenWritingState; dispatch: Dispatch<HiddenWritingAction> }) {
  const { state, dispatch } = props;
  const { page } = state;
  const wax = page.method === "wax";
  const showing = reads(page);

  return (
    <Controls>
      <Row>
        <Output label="What anyone can read now">{showing || "Nothing. It looks blank."}</Output>
        <Choice
          label="Hide it with"
          value={page.method}
          onChange={(method) => dispatch({ type: "switch", method })}
          options={[
            { value: "wax", label: "Wax" },
            { value: "ink", label: "Invisible ink" },
          ]}
        />
      </Row>
      <Row>
        <TextField
          label="Your message (typing starts a fresh page)"
          value={state.message}
          onChange={(message) => dispatch({ type: "type", message })}
        />
        <Button primary disabled={showing === ""} onClick={() => dispatch({ type: "hide" })}>
          {wax ? "Cover with wax" : "Let the ink dry"}
        </Button>
        {wax ? (
          <Button disabled={nextCovered(page) < 0} onClick={() => dispatch({ type: "scrapeNext" })}>
            Scrape the next strip
          </Button>
        ) : (
          <Button disabled={page.heat >= MAX_HEAT} onClick={() => dispatch({ type: "warm" })}>
            Warm the page
          </Button>
        )}
      </Row>
      <Row>
        <Choice
          label="The guard is"
          value={state.guard}
          onChange={(guard) => dispatch({ type: "post", guard })}
          options={[
            { value: "casual", label: "In a hurry" },
            { value: "thorough", label: "Thorough" },
          ]}
        />
        <Button onClick={() => dispatch({ type: "send" })}>Send it past the guard</Button>
        <Output label="The guard says">{report(state) ?? "He has not looked yet."}</Output>
      </Row>
    </Controls>
  );
}
