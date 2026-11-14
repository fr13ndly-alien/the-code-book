import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import type { CipherMeta } from "~/ciphers/types";
import styles from "./CipherPage.module.css";

interface CipherPageProps {
  meta: CipherMeta;
  /** The simulator: a 3D scene or a 2D widget. It fills the space it is given. */
  stage: ReactNode;
  /** Controls that mirror the simulator in plain HTML. */
  controls: ReactNode;
  /** The article, normally the cipher's story.mdx. */
  story: ReactNode;
}

/**
 * The layout every cipher page uses: the simulator and its controls on one
 * side, the story in a panel the reader can fold away on the other.
 */
export function CipherPage({ meta, stage, controls, story }: CipherPageProps) {
  const [storyOpen, setStoryOpen] = useState(true);

  return (
    <div className={styles.page} data-story-open={storyOpen}>
      <header className={styles.header}>
        <Link to="/" className={styles.back} aria-label="Back to the timeline">
          ←
        </Link>
        <h1 className={styles.title}>{meta.title}</h1>
        <span className={styles.era}>{meta.era}</span>
        <button
          type="button"
          className={styles.storyToggle}
          aria-expanded={storyOpen}
          aria-controls="story"
          onClick={() => setStoryOpen(!storyOpen)}
        >
          {storyOpen ? "Hide story" : "Read the story"}
        </button>
      </header>

      <main className={styles.workbench}>
        <div className={styles.stage}>
          {stage}
          <p className={styles.firstStep}>{meta.firstStep}</p>
        </div>
        <div className={styles.controls}>{controls}</div>
      </main>

      <aside id="story" className={styles.story} aria-label="The story" hidden={!storyOpen}>
        <article className={styles.article}>
          {story}
          <footer className={styles.source}>Based on {meta.source}, by Simon Singh. Retold in our own words.</footer>
        </article>
      </aside>
    </div>
  );
}

/** What the stage shows while a 3D scene is loading. */
export function StageLoading() {
  return <p className={styles.stageLoading}>Loading the model…</p>;
}
