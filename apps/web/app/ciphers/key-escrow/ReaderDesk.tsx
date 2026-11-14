import type { ReactNode } from "react";
import { KEY_COUNT, possibilities, type Reading } from "@codebook/cipher-engine/key-escrow";
import { Desk, Line, Working } from "./Desk";
import { numbered } from "./numbered";
import { SUSPECT_KEYS } from "./presets";

/** The sum that rebuilds a key: half one plus half two, letter by letter. */
function Rebuilt({ one, two, keyFound }: { one: string; two: string; keyFound: string }) {
  return (
    <Working
      label="Adding the two halves"
      rows={[
        { label: "Half one", cells: numbered(one) },
        { label: "Plus half two", cells: numbered(two) },
        { label: "Gives the key", cells: numbered(keyFound), secret: true },
      ]}
    />
  );
}

/** Why one half is useless: for any key you suspect, some other half would fit it. */
function StillPossible({ half }: { half: string }) {
  const rows = possibilities(half, SUSPECT_KEYS);
  return (
    <>
      <Working
        label="Keys that fit this half"
        rows={[
          { label: "If the key were", cells: rows.map((row) => row.key) },
          { label: "the missing half is", cells: rows.map((row) => row.otherHalf), secret: true },
        ]}
      />
      <Line label="Keys this half rules out">none of the {KEY_COUNT.toLocaleString("en")}</Line>
    </>
  );
}

/** Somebody outside the conversation: the halves they hold and what those let them read. */
export function ReaderDesk(props: { title: string; note: string; reading: Reading; children?: ReactNode }) {
  const { one, two, key, text, canRead } = props.reading;
  const single = key === null ? (one ?? two) : null;
  return (
    <Desk title={props.title} note={props.note}>
      {props.children}
      <Line label="Half one">{one ?? "not in their hands"}</Line>
      <Line label="Half two">{two ?? "not in their hands"}</Line>
      {key !== null && <Rebuilt one={one!} two={two!} keyFound={key} />}
      {single && <StillPossible half={single} />}
      <Line label={readingLabel(props.reading)} secret>
        {text}
      </Line>
      {key !== null && !canRead && <Line label="Why">the sender used a different key, one that was never lodged</Line>}
    </Desk>
  );
}

/** Says what the last line of a reader's desk is showing. */
function readingLabel(reading: Reading): string {
  if (reading.canRead) return "The message, read with the rebuilt key";
  if (reading.key !== null) return "The rebuilt key gives only nonsense";
  if (reading.one ?? reading.two) return "Trying the one half as a key gives nonsense";
  return "All they have is the ciphertext";
}
