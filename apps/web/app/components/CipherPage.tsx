import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { localize, neighbours } from "~/ciphers";
import type { CipherMeta } from "~/ciphers/types";
import { UI, localePath, useLocale } from "~/i18n";
import styles from "./CipherPage.module.css";
import { LanguageToggle } from "./LanguageToggle";

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
export function CipherPage({ meta: plain, stage, controls, story }: CipherPageProps) {
  const [storyOpen, setStoryOpen] = useState(true);
  const locale = useLocale();
  const meta = localize(plain, locale);
  const around = neighbours(meta.slug);
  const previous = around.previous && localize(around.previous, locale);
  const next = around.next && localize(around.next, locale);

  return (
    <div className={styles.page} data-story-open={storyOpen}>
      <header className={styles.header}>
        <Link to={localePath("/", locale)} className={styles.back} aria-label={UI.backToMenu[locale]}>
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
          {storyOpen ? UI.hideStory[locale] : UI.readStory[locale]}
        </button>
        <LanguageToggle />
      </header>

      <main className={styles.workbench}>
        <div className={styles.stage}>
          {stage}
          <p className={styles.firstStep}>{meta.firstStep}</p>
        </div>
        <div className={styles.controls}>{controls}</div>
      </main>

      <aside id="story" className={styles.story} aria-label={UI.theStory[locale]} hidden={!storyOpen}>
        <article className={styles.article}>
          {story}
          <nav className={styles.neighbours} aria-label={UI.otherCiphers[locale]}>
            {previous && (
              <Link to={localePath(`/ciphers/${previous.slug}`, locale)} rel="prev">
                <span>{UI.previous[locale]}</span>
                {previous.title}
              </Link>
            )}
            {next && (
              <Link to={localePath(`/ciphers/${next.slug}`, locale)} rel="next" data-next>
                <span>{UI.next[locale]}</span>
                {next.title}
              </Link>
            )}
          </nav>
          <footer className={styles.source}>{UI.basedOn[locale](meta.source)}</footer>
        </article>
      </aside>
    </div>
  );
}

/** What the stage shows while a 3D scene is loading. */
export function StageLoading() {
  const locale = useLocale();
  return <p className={styles.stageLoading}>{UI.loadingModel[locale]}</p>;
}
