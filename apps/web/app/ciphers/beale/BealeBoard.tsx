import { useEffect, useRef } from "react";
import { keyText, letterFor } from "@codebook/cipher-engine/beale";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./BealeBoard.module.css";
import { stepsOf, wordsOf, type BealeState } from "./useBeale";
import { KEY_TEXT_TITLES } from "./vi";

/** The message as numbers and letters, above the key text with every word numbered. */
export function BealeBoard({ state, onPick }: { state: BealeState; onPick: (number: number) => void }) {
  const t = useT();
  const locale = useLocale();
  const title = KEY_TEXT_TITLES[state.keyId];
  const words = wordsOf(state);
  const steps = stepsOf(state);
  const used = new Set(steps.map((step) => step.number));
  const numberFirst = state.mode === "decipher";

  return (
    <Board>
      <ol
        className={styles.message}
        aria-label={t({ en: "The message, one number for each letter", vi: "Tin nhắn, mỗi chữ một con số" })}
      >
        {steps.map((step, index) => (
          <li key={index}>
            <button
              type="button"
              className={styles.step}
              data-number-first={numberFirst}
              aria-pressed={step.number !== 0 && step.number === state.picked}
              disabled={step.number === 0}
              onClick={() => onPick(step.number)}
            >
              <span className={styles.number}>{step.number === 0 ? "?" : step.number}</span>
              <span className={styles.letter}>{step.letter}</span>
            </button>
          </li>
        ))}
      </ol>
      <Caption>{captionFor(state.picked, words, locale)}</Caption>
      <KeyTextBox
        title={title ? t(title) : keyText(state.keyId).title}
        words={words} used={used} picked={state.picked} onPick={onPick} />
    </Board>
  );
}

function captionFor(picked: number | undefined, words: string[], locale: Locale) {
  const vi = locale === "vi";
  if (picked === undefined)
    return vi
      ? "Chạm vào một con số, hoặc một từ, để xem nó thay cho chữ nào."
      : "Tap a number, or a word, to see which letter it stands for.";
  const word = words[picked - 1];
  if (word === undefined)
    return vi
      ? `Ở đây văn bản khóa này chỉ có ${words.length} từ, nên số ${picked} không chỉ vào từ nào cả.`
      : `This key text has only ${words.length} words here, so ${picked} points at nothing.`;
  if (vi)
    return (
      <>
        Từ số {picked} là “{word}”. Nó bắt đầu bằng <Letters>{letterFor(picked, words)}</Letters>, nên số {picked} thay
        cho <Letters>{letterFor(picked, words)}</Letters>.
      </>
    );
  return (
    <>
      Word {picked} is "{word}". It starts with <Letters>{letterFor(picked, words)}</Letters>, so {picked} stands for{" "}
      <Letters>{letterFor(picked, words)}</Letters>.
    </>
  );
}

/** The key text in a box that scrolls, with the picked word kept in view. */
function KeyTextBox(props: {
  title: string;
  words: string[];
  used: Set<number>;
  picked?: number;
  onPick: (number: number) => void;
}) {
  const t = useT();
  const box = useRef<HTMLOListElement>(null);
  const pickedWord = useRef<HTMLLIElement>(null);

  // Scroll only the box, by hand: scrollIntoView would also move the page behind it.
  useEffect(() => {
    if (box.current && pickedWord.current) {
      box.current.scrollTop = pickedWord.current.offsetTop - box.current.clientHeight / 2;
    }
  }, [props.picked, props.words]);

  return (
    <section className={styles.keyText} aria-label={t({ en: `Key text: ${props.title}`, vi: `Văn bản khóa: ${props.title}` })}>
      <h2 className={styles.title}>
        {t({ en: "Key text:", vi: "Văn bản khóa:" })} {props.title}
      </h2>
      <ol ref={box} className={styles.words}>
        {props.words.map((word, index) => (
          <li key={index} ref={index + 1 === props.picked ? pickedWord : undefined}>
            <button
              type="button"
              className={styles.word}
              data-used={props.used.has(index + 1)}
              aria-pressed={index + 1 === props.picked}
              onClick={() => props.onPick(index + 1)}
            >
              <span className={styles.number}>{index + 1}</span>
              <span>{word}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
