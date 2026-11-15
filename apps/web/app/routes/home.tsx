import { Link, type MetaArgs } from "react-router";
import { MENU, localize, localizeChapter } from "~/ciphers";
import { LanguageToggle } from "~/components/LanguageToggle";
import { UI, localeOf, localePath, useLocale } from "~/i18n";
import styles from "./home.module.css";

export function meta({ location }: MetaArgs) {
  const locale = localeOf(location.pathname);
  return [{ title: UI.siteName[locale] }, { name: "description", content: UI.siteDescription[locale] }];
}

/** The menu: the chapters of the book, each with its ciphers. */
export default function Home() {
  const locale = useLocale();
  const menu = MENU.map(({ chapter, ciphers }) => ({
    chapter: localizeChapter(chapter, locale),
    ciphers: ciphers.map((cipher) => localize(cipher, locale)),
  }));

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{UI.siteName[locale]}</h1>
          <p className={styles.intro}>{UI.intro[locale]}</p>
        </div>
        <LanguageToggle />
      </header>

      <nav className={styles.contents} aria-label={UI.chapters[locale]}>
        {menu.map(({ chapter }) => (
          <a key={chapter.number} href={`#chapter-${chapter.number}`}>
            {chapter.number}. {chapter.title}
          </a>
        ))}
      </nav>

      {menu.map(({ chapter, ciphers }) => (
        <section key={chapter.number} id={`chapter-${chapter.number}`} className={styles.chapter}>
          <p className={styles.number}>
            {chapter.number === 7 ? UI.afterLastChapter[locale] : `${UI.chapter[locale]} ${chapter.number}`}
          </p>
          <h2 className={styles.chapterTitle}>{chapter.title}</h2>
          <p className={styles.summary}>{chapter.summary}</p>
          <ol className={styles.ciphers}>
            {ciphers.map((cipher) => (
              <li key={cipher.slug}>
                <Link to={localePath(`/ciphers/${cipher.slug}`, locale)} className={styles.card}>
                  <span className={styles.era}>
                    {cipher.era}
                    {cipher.fullEditionOnly && <span className={styles.badge}>{UI.fullEdition[locale]}</span>}
                  </span>
                  <span className={styles.name}>{cipher.title}</span>
                  <span className={styles.hook}>{cipher.hook}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <p className={styles.note}>{UI.fullEditionNote[locale]}</p>
    </main>
  );
}
