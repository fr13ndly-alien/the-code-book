import { ALPHABET, MAX_CABLES, ROTOR_NAMES, plugSwap, type RotorName } from "@codebook/cipher-engine";
import { useEffect, useRef, type Dispatch } from "react";
import { ToyScrambler } from "./ToyScrambler";
import type { EnigmaAction, EnigmaState } from "./useEnigma";
import type { ToyAction, ToyState } from "./useToyScrambler";
import styles from "./EnigmaControls.module.css";

const SLOTS = [0, 1, 2] as const;
const SLOT_NAMES = ["Left", "Middle", "Right"];
const STAGES = ["key", "plugboard", "right rotor", "middle rotor", "left rotor", "reflector", "left rotor", "middle rotor", "right rotor", "plugboard"];

/** Splits text into the five-letter groups radio operators used. */
const inGroups = (text: string) => text.replace(/(.{5})(?=.)/g, "$1 ");

interface EnigmaControlsProps {
  state: EnigmaState;
  dispatch: Dispatch<EnigmaAction>;
  pendingSocket: string | null;
  onPickSocket: (letter: string) => void;
  toy: ToyState;
  toyDispatch: Dispatch<ToyAction>;
}

/** Everything the 3D machine can do, as ordinary HTML controls. */
export function EnigmaControls(props: EnigmaControlsProps) {
  const { state, dispatch, pendingSocket, onPickSocket, toy, toyDispatch } = props;
  const { settings, positions, typed, lamps, last } = state;
  const toyPanel = useRef<HTMLDetailsElement>(null);

  // On a phone the controls are a short scrolling strip while the story is open,
  // so a story button that opens the model must also bring it into view.
  useEffect(() => {
    if (toy.open) toyPanel.current?.scrollIntoView({ block: "nearest" });
  }, [toy.open]);

  function typeLetters(text: string) {
    for (const key of text.toUpperCase()) {
      if (ALPHABET.includes(key)) dispatch({ type: "press", key });
    }
  }

  return (
    <div className={styles.controls}>
      <div className={styles.row}>
        <fieldset className={styles.rotors}>
          <legend className="visually-hidden">Rotor positions</legend>
          {SLOTS.map((slot) => (
            <Stepper
              key={slot}
              label={`${SLOT_NAMES[slot]} rotor`}
              letter={ALPHABET[positions[slot]]!}
              onStep={(by) => dispatch({ type: "turn", slot, by })}
            />
          ))}
        </fieldset>

        <dl className={styles.tape} aria-live="polite">
          <dt>You typed</dt>
          <dd>{inGroups(typed) || "…"}</dd>
          <dt>Lamps lit</dt>
          <dd className={styles.lamps}>{inGroups(lamps) || "…"}</dd>
        </dl>
      </div>

      <div className={styles.row}>
        <label className={styles.typing}>
          <span className="visually-hidden">Type a message</span>
          <input
            value=""
            placeholder="Type here, or tap the keys"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(event) => typeLetters(event.target.value)}
          />
        </label>
        <button type="button" className={styles.button} onClick={() => dispatch({ type: "rewind" })}>
          Back to start
        </button>
      </div>

      <p className={styles.path}>
        <span className={styles.pathLabel}>Path of the current:</span>
        {last
          ? last.trace.map((letter, i) => (
              <span key={i} title={STAGES[i]} className={styles.hop}>
                {letter}
              </span>
            ))
          : "press a key to see it"}
      </p>

      <details className={styles.setup}>
        <summary>Set up the machine</summary>

        <h3>Rotor order</h3>
        <div className={styles.row}>
          {SLOTS.map((slot) => (
            <RotorSelect
              key={slot}
              label={SLOT_NAMES[slot]!}
              value={settings.rotors[slot]}
              onChange={(rotor) => dispatch({ type: "fit", slot, rotor })}
            />
          ))}
        </div>

        <h3>Ring setting of each rotor</h3>
        <p className={styles.hint}>
          Turns a rotor's letters around its wiring. Changing it starts a new message.
        </p>
        <div className={styles.row}>
          {SLOTS.map((slot) => (
            <RingSelect
              key={slot}
              label={SLOT_NAMES[slot]!}
              value={settings.rings[slot]}
              onChange={(ring) => dispatch({ type: "ring", slot, ring })}
            />
          ))}
        </div>

        <h3>
          Plugboard: {settings.cables.length} of {MAX_CABLES} cables
        </h3>
        <p className={styles.hint}>Pick two letters to join them. Pick a joined letter to pull its cable out.</p>
        <div className={styles.sockets}>
          {[...ALPHABET].map((letter) => {
            const partner = plugSwap(settings.cables, letter);
            return (
              <button
                key={letter}
                type="button"
                className={styles.socket}
                data-wired={partner !== letter}
                aria-pressed={pendingSocket === letter}
                aria-label={partner === letter ? `Socket ${letter}` : `Socket ${letter}, joined to ${partner}`}
                onClick={() => onPickSocket(letter)}
              >
                {letter}
                {partner !== letter && <small>{partner}</small>}
              </button>
            );
          })}
        </div>
      </details>

      <details
        ref={toyPanel}
        className={styles.setup}
        open={toy.open}
        onToggle={(event) => {
          const { open } = event.currentTarget;
          if (open !== toy.open) toyDispatch({ type: "show", open });
        }}
      >
        <summary>The book's six-letter model</summary>
        <ToyScrambler toy={toy} dispatch={toyDispatch} />
      </details>
    </div>
  );
}

function Stepper({ label, letter, onStep }: { label: string; letter: string; onStep: (by: 1 | -1) => void }) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button type="button" aria-label={`${label}: next letter`} onClick={() => onStep(1)}>
        ▲
      </button>
      <output aria-label={`${label} shows`}>{letter}</output>
      <button type="button" aria-label={`${label}: previous letter`} onClick={() => onStep(-1)}>
        ▼
      </button>
    </div>
  );
}

function RotorSelect(props: { label: string; value: RotorName; onChange: (rotor: RotorName) => void }) {
  return (
    <label className={styles.select}>
      {props.label}
      <select value={props.value} onChange={(event) => props.onChange(event.target.value as RotorName)}>
        {ROTOR_NAMES.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    </label>
  );
}

function RingSelect(props: { label: string; value: number; onChange: (ring: number) => void }) {
  return (
    <label className={styles.select}>
      {props.label}
      <select
        aria-label={`Ring, ${props.label.toLowerCase()} rotor`}
        value={props.value}
        onChange={(event) => props.onChange(Number(event.target.value))}
      >
        {[...ALPHABET].map((letter, ring) => (
          <option key={letter} value={ring}>
            {letter}
          </option>
        ))}
      </select>
    </label>
  );
}
