import { createContext, useContext, useId, useState, type ReactNode } from "react";
import styles from "./Story.module.css";

/**
 * The building blocks a story.mdx may use, besides plain Markdown.
 * See docs/STANDARDS.md for when to use each one.
 */

/** Lets a story set up the simulator. The cipher page decides what each action name does. */
const StoryActions = createContext<(action: string) => void>(() => {});

export function Story({ onAction, children }: { onAction: (action: string) => void; children: ReactNode }) {
  return (
    <StoryActions.Provider value={onAction}>
      <div className={styles.story}>{children}</div>
    </StoryActions.Provider>
  );
}

/** The one-paragraph opening under the title. */
export function Standfirst({ children }: { children: ReactNode }) {
  return <div className={styles.standfirst}>{children}</div>;
}

/** The fixed section name that sits above each heading, e.g. "How it works". */
export function Label({ children }: { children: ReactNode }) {
  return <p className={styles.label}>{children}</p>;
}

/** An invitation to do something on the simulator, with an optional button that sets it up. */
export function Try({ action, button, children }: { action?: string; button?: string; children?: ReactNode }) {
  const run = useContext(StoryActions);
  if (!children) {
    return (
      <button type="button" className={styles.button} onClick={() => run(action!)}>
        {button}
      </button>
    );
  }
  return (
    <div className={styles.try}>
      <strong className={styles.tag}>Try it</strong>
      {children}
      {action && (
        <button type="button" className={styles.button} onClick={() => run(action)}>
          {button}
        </button>
      )}
    </div>
  );
}

/** A quick question. The reader thinks first, then opens the answer. */
export function Check({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className={styles.check}>
      <summary>{question}</summary>
      {children}
    </details>
  );
}

/** Extra history that the main line of the story does not need. Closed until asked for. */
export function DigDeeper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className={styles.deeper}>
      <summary>{title}</summary>
      {children}
    </details>
  );
}

const lettersOnly = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "");

/** A puzzle with one right answer. Spaces and letter case are ignored. */
export function Challenge({ answer, children }: { answer: string; children: ReactNode }) {
  const id = useId();
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"right" | "wrong" | null>(null);

  return (
    <form
      className={styles.challenge}
      onSubmit={(event) => {
        event.preventDefault();
        setResult(lettersOnly(guess) === lettersOnly(answer) ? "right" : "wrong");
      }}
    >
      <strong className={styles.tag}>Challenge</strong>
      {children}
      <label htmlFor={id}>Your answer</label>
      <div className={styles.answerRow}>
        <input id={id} value={guess} onChange={(event) => setGuess(event.target.value)} autoComplete="off" />
        <button type="submit" className={styles.button}>
          Check
        </button>
      </div>
      <p role="status" className={styles.result} data-result={result}>
        {result === "right" && "Correct. You just read a secret message."}
        {result === "wrong" && "Not yet. Check the setup, go back to the start and type the message again."}
      </p>
    </form>
  );
}
