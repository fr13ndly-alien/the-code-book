import { TOY_KEYS, TOY_LAMPS, toyAlphabet } from "@codebook/cipher-engine";
import type { Dispatch } from "react";
import type { ToyAction, ToyState } from "./useToyScrambler";
import styles from "./ToyScrambler.module.css";

/** The drawing's own units. The SVG scales to the width it is given. */
const VIEW = { width: 280, rowHeight: 26, top: 18 };
/** Where each part sits across the drawing, left to right. */
const X = { key: 14, keyEdge: 28, scramblerIn: 92, scramblerOut: 188, lampEdge: 252, lamp: 266 };
const LAMP_RADIUS = 10;
const HEIGHT = VIEW.top * 2 + VIEW.rowHeight * (TOY_KEYS.length - 1);

const rowY = (row: number) => VIEW.top + VIEW.rowHeight * row;

interface ToyScramblerProps {
  toy: ToyState;
  dispatch: Dispatch<ToyAction>;
}

/** The book's six-letter machine: six keys, one scrambler, six lamps. */
export function ToyScrambler({ toy, dispatch }: ToyScramblerProps) {
  const { last, rotating } = toy;
  // The drawing shows the scrambler as it stood when the last lamp lit, like the book's figures.
  const drawn = last ? last.position : toy.position;
  const alphabet = toyAlphabet(drawn);

  return (
    <div className={styles.toy}>
      <p className={styles.hint}>
        The book explains Enigma with six letters and one scrambler. Each key has a wire through the scrambler to
        one lamp.
      </p>

      <Wiring alphabet={alphabet} litKey={last?.key ?? null} />

      <p className={styles.table}>
        {[...TOY_KEYS].map((key, row) => (
          <span key={key} data-lit={key === last?.key}>
            {key}→{alphabet[row]}
          </span>
        ))}
      </p>

      <p className={styles.hint} aria-live="polite">
        {describe(toy)}
      </p>

      <div className={styles.keys} role="group" aria-label="Keys of the six-letter model">
        {[...TOY_KEYS].map((key) => (
          <button key={key} type="button" aria-label={`Press ${key}`} onClick={() => dispatch({ type: "press", key })}>
            {key}
          </button>
        ))}
      </div>

      <dl className={styles.tape} aria-live="polite">
        <dt>You typed</dt>
        <dd>{toy.typed || "…"}</dd>
        <dt>Lamps lit</dt>
        <dd className={styles.lamps}>{toy.lamps || "…"}</dd>
      </dl>

      <label className={styles.turning}>
        <input
          type="checkbox"
          checked={rotating}
          onChange={(event) => dispatch({ type: "setTurning", rotating: event.target.checked })}
        />
        The scrambler turns after each letter (starts again)
      </label>

      <button type="button" className={styles.button} onClick={() => dispatch({ type: "restart" })}>
        Start again
      </button>
    </div>
  );
}

/** Says in words what the drawing shows. */
function describe({ last, rotating }: ToyState): string {
  if (!last) return "Press a key to follow its wire.";
  const lit = `${last.key} lit ${last.output}.`;
  if (!rotating) return `${lit} The scrambler stays still, so ${last.key} always lights ${last.output}.`;
  return `${lit} Then the scrambler turned one place, so every wire sits one row lower for the next letter.`;
}

/** Keys on the left, lamps on the right, and the six wires through the scrambler between them. */
function Wiring({ alphabet, litKey }: { alphabet: string; litKey: string | null }) {
  const litLamp = litKey ? alphabet[TOY_KEYS.indexOf(litKey)] : null;
  const label = [...TOY_KEYS].map((key, row) => `${key} to ${alphabet[row]}`).join(", ");

  return (
    <svg className={styles.wiring} viewBox={`0 0 ${VIEW.width} ${HEIGHT}`} role="img" aria-label={`Wiring: ${label}`}>
      <rect
        className={styles.scrambler}
        x={X.scramblerIn}
        y={VIEW.top / 2}
        width={X.scramblerOut - X.scramblerIn}
        height={HEIGHT - VIEW.top}
        rx={LAMP_RADIUS}
      />
      {[...TOY_KEYS].map((key, row) => {
        const lampRow = TOY_LAMPS.indexOf(alphabet[row]!);
        const points = [
          [X.keyEdge, rowY(row)],
          [X.scramblerIn, rowY(row)],
          [X.scramblerOut, rowY(lampRow)],
          [X.lampEdge, rowY(lampRow)],
        ];
        return <polyline key={key} className={styles.wire} data-lit={key === litKey} points={points.join(" ")} />;
      })}
      {[...TOY_KEYS].map((key, row) => (
        <text key={key} className={styles.keyLetter} data-lit={key === litKey} x={X.key} y={rowY(row)}>
          {key}
        </text>
      ))}
      {[...TOY_LAMPS].map((lamp, row) => (
        <g key={lamp} className={styles.lamp} data-lit={lamp === litLamp}>
          <circle cx={X.lamp} cy={rowY(row)} r={LAMP_RADIUS} />
          <text x={X.lamp} y={rowY(row)}>
            {lamp}
          </text>
        </g>
      ))}
    </svg>
  );
}
