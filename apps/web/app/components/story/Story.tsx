import type { MDXContent } from "mdx/types";
import { createContext, useContext, useId, useState, type ComponentProps, type ReactNode } from "react";
import { Link } from "react-router";
import { UI, localePath, useLocale, type Bilingual } from "~/i18n";
import styles from "./Story.module.css";

/**
 * The building blocks a story.mdx may use, besides plain Markdown.
 * See docs/STANDARDS.md for when to use each one.
 */

/** Lets a story set up the simulator. The cipher page decides what each action name does. */
const StoryActions = createContext<(action: string) => void>(() => {});

/**
 * A cipher's story, in the page's language: story.mdx for English, story.vi.mdx for Vietnamese.
 * Both share the same action names, so their buttons load the same presets.
 */
export function Story({ onAction, text }: { onAction: (action: string) => void; text: Bilingual<MDXContent> }) {
  const Text = text[useLocale()];
  return (
    <StoryActions.Provider value={onAction}>
      <div className={styles.story}>
        <Text components={STORY_BLOCKS} />
      </div>
    </StoryActions.Provider>
  );
}

/** Links in a story. A link to another page of the site stays in the reader's language. */
function StoryLink({ href = "", ...rest }: ComponentProps<"a">) {
  const locale = useLocale();
  if (href.startsWith("/")) return <Link to={localePath(href, locale)} {...rest} />;
  return <a href={href} {...rest} />;
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
  const locale = useLocale();
  if (!children) {
    return (
      <button type="button" className={styles.button} onClick={() => run(action!)}>
        {button}
      </button>
    );
  }
  return (
    <div className={styles.try}>
      <strong className={styles.tag}>{UI.tryIt[locale]}</strong>
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
  const locale = useLocale();
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
      <strong className={styles.tag}>{UI.challenge[locale]}</strong>
      {children}
      <label htmlFor={id}>{UI.yourAnswer[locale]}</label>
      <div className={styles.answerRow}>
        <input id={id} value={guess} onChange={(event) => setGuess(event.target.value)} autoComplete="off" />
        <button type="submit" className={styles.button}>
          {UI.check[locale]}
        </button>
      </div>
      <p role="status" className={styles.result} data-result={result}>
        {result === "right" && UI.correct[locale]}
        {result === "wrong" && UI.notYet[locale]}
      </p>
    </form>
  );
}

/** Every block a story can use. <Story> hands them to the MDX. */
export const STORY_BLOCKS = { Standfirst, Label, Try, Check, Challenge, DigDeeper, a: StoryLink };
