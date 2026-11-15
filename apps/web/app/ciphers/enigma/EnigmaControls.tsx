import { ALPHABET, MAX_CABLES, ROTOR_NAMES, plugSwap, type RotorName } from "@codebook/cipher-engine";
import { useEffect, useRef, type Dispatch } from "react";
import { ToyScrambler } from "./ToyScrambler";
import type { EnigmaAction, EnigmaState } from "./useEnigma";
import type { ToyAction, ToyState } from "./useToyScrambler";
import styles from "./EnigmaControls.module.css";
import { useT, type Bilingual } from "~/i18n";

const SLOTS = [0, 1, 2] as const;
/** Each slot's short name (above a menu) and its rotor's full name, in both languages. */
const SLOT_NAMES: Bilingual<string>[] = [
  { en: "Left", vi: "Trái" },
  { en: "Middle", vi: "Giữa" },
  { en: "Right", vi: "Phải" },
];
const ROTOR_NAMES_BY_SLOT: Bilingual<string>[] = [
  { en: "Left rotor", vi: "Rôto trái" },
  { en: "Middle rotor", vi: "Rôto giữa" },
  { en: "Right rotor", vi: "Rôto phải" },
];
const RING_LABELS: Bilingual<string>[] = [
  { en: "Ring, left rotor", vi: "Vòng chữ, rôto trái" },
  { en: "Ring, middle rotor", vi: "Vòng chữ, rôto giữa" },
  { en: "Ring, right rotor", vi: "Vòng chữ, rôto phải" },
];
const KEY = { en: "key", vi: "phím" };
const PLUGBOARD = { en: "plugboard", vi: "bảng cắm dây" };
const REFLECTOR = { en: "reflector", vi: "đĩa phản xạ" };
const [LEFT, MIDDLE, RIGHT] = [
  { en: "left rotor", vi: "rôto trái" },
  { en: "middle rotor", vi: "rôto giữa" },
  { en: "right rotor", vi: "rôto phải" },
];
const STAGES: Bilingual<string>[] = [KEY, PLUGBOARD, RIGHT, MIDDLE, LEFT, REFLECTOR, LEFT, MIDDLE, RIGHT, PLUGBOARD];

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
  const t = useT();

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
          <legend className="visually-hidden">{t({ en: "Rotor positions", vi: "Vị trí các rôto" })}</legend>
          {SLOTS.map((slot) => (
            <Stepper
              key={slot}
              label={t(ROTOR_NAMES_BY_SLOT[slot]!)}
              letter={ALPHABET[positions[slot]]!}
              onStep={(by) => dispatch({ type: "turn", slot, by })}
            />
          ))}
        </fieldset>

        <dl className={styles.tape} aria-live="polite">
          <dt>{t({ en: "You typed", vi: "Bạn đã gõ" })}</dt>
          <dd>{inGroups(typed) || "…"}</dd>
          <dt>{t({ en: "Lamps lit", vi: "Đèn đã sáng" })}</dt>
          <dd className={styles.lamps}>{inGroups(lamps) || "…"}</dd>
        </dl>
      </div>

      <div className={styles.row}>
        <label className={styles.typing}>
          <span className="visually-hidden">{t({ en: "Type a message", vi: "Gõ một tin nhắn" })}</span>
          <input
            value=""
            placeholder={t({ en: "Type here, or tap the keys", vi: "Gõ vào đây, hoặc chạm vào các phím" })}
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(event) => typeLetters(event.target.value)}
          />
        </label>
        <button type="button" className={styles.button} onClick={() => dispatch({ type: "rewind" })}>
          {t({ en: "Back to start", vi: "Về lúc đầu" })}
        </button>
      </div>

      <p className={styles.path}>
        <span className={styles.pathLabel}>{t({ en: "Path of the current:", vi: "Đường đi của dòng điện:" })}</span>
        {last
          ? last.trace.map((letter, i) => (
              <span key={i} title={t(STAGES[i]!)} className={styles.hop}>
                {letter}
              </span>
            ))
          : t({ en: "press a key to see it", vi: "nhấn một phím để xem" })}
      </p>

      <details className={styles.setup}>
        <summary>{t({ en: "Set up the machine", vi: "Cài đặt máy" })}</summary>

        <h3>{t({ en: "Rotor order", vi: "Thứ tự rôto" })}</h3>
        <div className={styles.row}>
          {SLOTS.map((slot) => (
            <RotorSelect
              key={slot}
              label={t(SLOT_NAMES[slot]!)}
              value={settings.rotors[slot]}
              onChange={(rotor) => dispatch({ type: "fit", slot, rotor })}
            />
          ))}
        </div>

        <h3>{t({ en: "Ring setting of each rotor", vi: "Vị trí vòng chữ của mỗi rôto" })}</h3>
        <p className={styles.hint}>
          {t({
            en: "Turns a rotor's letters around its wiring. Changing it starts a new message.",
            vi: "Xoay vòng chữ của rôto quanh phần dây bên trong. Đổi nó là bắt đầu một tin nhắn mới.",
          })}
        </p>
        <div className={styles.row}>
          {SLOTS.map((slot) => (
            <RingSelect
              key={slot}
              label={t(SLOT_NAMES[slot]!)}
              ringLabel={t(RING_LABELS[slot]!)}
              value={settings.rings[slot]}
              onChange={(ring) => dispatch({ type: "ring", slot, ring })}
            />
          ))}
        </div>

        <h3>
          {t({
            en: (
              <>
                Plugboard: {settings.cables.length} of {MAX_CABLES} cables
              </>
            ),
            vi: (
              <>
                Bảng cắm dây: {settings.cables.length} trên {MAX_CABLES} dây
              </>
            ),
          })}
        </h3>
        <p className={styles.hint}>
          {t({
            en: "Pick two letters to join them. Pick a joined letter to pull its cable out.",
            vi: "Chọn hai chữ để nối chúng với nhau. Chọn một chữ đã nối để rút dây của nó ra.",
          })}
        </p>
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
                aria-label={
                  partner === letter
                    ? t({ en: `Socket ${letter}`, vi: `Ổ cắm ${letter}` })
                    : t({ en: `Socket ${letter}, joined to ${partner}`, vi: `Ổ cắm ${letter}, nối với ${partner}` })
                }
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
        <summary>{t({ en: "The book's six-letter model", vi: "Mô hình sáu chữ của cuốn sách" })}</summary>
        <ToyScrambler toy={toy} dispatch={toyDispatch} />
      </details>
    </div>
  );
}

function Stepper({ label, letter, onStep }: { label: string; letter: string; onStep: (by: 1 | -1) => void }) {
  const t = useT();
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <button type="button" aria-label={t({ en: `${label}: next letter`, vi: `${label}: chữ tiếp theo` })} onClick={() => onStep(1)}>
        ▲
      </button>
      <output aria-label={t({ en: `${label} shows`, vi: `${label} đang hiện` })}>{letter}</output>
      <button type="button" aria-label={t({ en: `${label}: previous letter`, vi: `${label}: chữ trước đó` })} onClick={() => onStep(-1)}>
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

function RingSelect(props: { label: string; ringLabel: string; value: number; onChange: (ring: number) => void }) {
  return (
    <label className={styles.select}>
      {props.label}
      <select
        aria-label={props.ringLabel}
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
