import { Link } from "react-router";
import { MENU } from "~/ciphers";
import styles from "./home.module.css";

export function meta() {
  return [
    { title: "The Code Book, interactive" },
    { name: "description", content: "Try every cipher from Simon Singh's The Code Book, chapter by chapter." },
  ];
}

/** The menu: the chapters of the book, each with its ciphers. */
export default function Home() {
  return (
    <main className={styles.page}>
      <header>
        <h1 className={styles.title}>The Code Book, interactive</h1>
        <p className={styles.intro}>
          Every cipher in Simon Singh's book, chapter by chapter. Pick one, read its story and try it yourself.
        </p>
      </header>

      <nav className={styles.contents} aria-label="Chapters">
        {MENU.map(({ chapter }) => (
          <a key={chapter.number} href={`#chapter-${chapter.number}`}>
            {chapter.number}. {chapter.title}
          </a>
        ))}
      </nav>

      {MENU.map(({ chapter, ciphers }) => (
        <section key={chapter.number} id={`chapter-${chapter.number}`} className={styles.chapter}>
          <p className={styles.number}>{chapter.number === 7 ? "After the last chapter" : `Chapter ${chapter.number}`}</p>
          <h2 className={styles.chapterTitle}>{chapter.title}</h2>
          <p className={styles.summary}>{chapter.summary}</p>
          <ol className={styles.ciphers}>
            {ciphers.map((cipher) => (
              <li key={cipher.slug}>
                <Link to={`/ciphers/${cipher.slug}`} className={styles.card}>
                  <span className={styles.era}>
                    {cipher.era}
                    {cipher.fullEditionOnly && <span className={styles.badge}>Full edition</span>}
                  </span>
                  <span className={styles.name}>{cipher.title}</span>
                  <span className={styles.hook}>{cipher.hook}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <p className={styles.note}>
        Pages marked “Full edition” cover ciphers from the full edition of the book that the abridged edition leaves out.
        Two ciphers have no page because this edition names them without saying how they work: the Japanese Purple
        machine, and the Linear B script.
      </p>
    </main>
  );
}
