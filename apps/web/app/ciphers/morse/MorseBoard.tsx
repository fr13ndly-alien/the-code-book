import { useEffect } from "react";
import { candidates, decode, type Pulse, type Sign } from "@codebook/cipher-engine/morse";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { Marks, type MarkState } from "./Marks";
import styles from "./MorseBoard.module.css";
import { MorseChart } from "./MorseChart";
import { halfKeyed, signsOf, timeline, type MorseState } from "./useMorse";

/** How long one dot lasts on the lamp, in milliseconds. A dash and the gaps are multiples of it. */
const DOT_MS = 160;

/** Moves the lamp on one pulse at a time. With reduced motion it shows the whole message at once. */
function useSendTimer(state: MorseState, pulse: Pulse | undefined, onTick: () => void, onFinish: () => void) {
  useEffect(() => {
    if (!state.sending) return;
    if (!pulse || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onFinish();
    const timer = window.setTimeout(onTick, pulse.units * DOT_MS);
    return () => window.clearTimeout(timer);
    // The callbacks are new on every render; only a change of pulse should restart the timer.
  }, [state.sending, state.sent]);
}

/** The lamp, the message as dots and dashes, and the Morse table. */
export function MorseBoard(props: { state: MorseState; onTick: () => void; onFinish: () => void }) {
  const { state } = props;
  const pulses = timeline(state);
  const current = state.sending ? pulses[state.sent] : undefined;
  useSendTimer(state, pulses[state.sent], props.onTick, props.onFinish);

  const signs = signsOf(state);
  const sending = state.mode === "send";
  const stateOf = (sign: number) => (mark: number) => (sending ? markState(state, pulses, sign, mark) : undefined);
  const nowSending = current ? signs[current.sign]?.char : undefined;

  return (
    <Board>
      {sending && <div className={styles.lamp} data-on={current?.on ?? false} role="img" aria-label="Signal lamp" />}
      {!sending && state.tape && <Message label="Signals from the wire" signs={decode(state.tape)} hideLetters />}
      <Message
        label={sending ? "Your message in Morse" : "What you have keyed"}
        signs={signs}
        stateOf={stateOf}
        nowSign={current?.sign}
      />
      <Caption>{captionFor(state)}</Caption>
      <MorseChart on={sending ? (nowSending ? [nowSending] : []) : candidates(halfKeyed(state))} />
    </Board>
  );
}

/** Whether one dot or dash of the message is lit, has been sent, or is still to come. */
function markState(state: MorseState, pulses: Pulse[], sign: number, mark: number): MarkState {
  const at = pulses.findIndex((pulse) => pulse.on && pulse.sign === sign && pulse.mark === mark);
  if (state.sending && at === state.sent) return "now";
  return at < state.sent ? "sent" : undefined;
}

function captionFor(state: MorseState) {
  if (state.mode === "send") return "A dash lasts as long as three dots. The gaps between letters and words are part of the code.";
  const half = halfKeyed(state);
  if (half === "") return "Press Dot or Dash to start a letter. The table shows every letter it could become.";
  const left = candidates(half);
  if (left.length === 0) return "No letter starts like this. Rub out and try again.";
  return `${left.length} of the 36 signs start like this. Press "Next letter" when yours is complete.`;
}

/** A message as a row of cards: each letter above its dots and dashes. */
function Message(props: {
  label: string;
  signs: Sign[];
  hideLetters?: boolean;
  stateOf?: (sign: number) => (mark: number) => MarkState;
  nowSign?: number;
}) {
  return (
    <ol className={styles.message} aria-label={props.label}>
      {props.signs.map((sign, index) =>
        sign.char === " " ? (
          <li key={index} className={styles.wordGap} aria-label="gap between words" />
        ) : (
          <li key={index} className={styles.card} data-now={index === props.nowSign}>
            {!props.hideLetters && <span className={styles.char}>{sign.char}</span>}
            <Marks code={sign.code} stateOf={props.stateOf?.(index)} />
          </li>
        ),
      )}
    </ol>
  );
}
