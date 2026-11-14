import { Link } from "react-router";
import { CIPHERS } from "~/ciphers";
import styles from "./home.module.css";

export function meta() {
  return [
    { title: "The Code Book, interactive" },
    { name: "description", content: "Try the ciphers from Simon Singh's The Code Book, from the oldest to the newest." },
  ];
}

export default function Home() {
  return (
    <main className={styles.page}>
      <header>
        <h1 className={styles.title}>The Code Book, interactive</h1>
        <p className={styles.intro}>Every cipher in the book, in the order history invented them. Pick one and try it.</p>
      </header>
      <ol className={styles.timeline}>
        {CIPHERS.map((cipher) => (
          <li key={cipher.slug}>
            <Link to={`/ciphers/${cipher.slug}`} className={styles.card}>
              <span className={styles.era}>{cipher.era}</span>
              <span className={styles.name}>{cipher.title}</span>
              <span className={styles.hook}>{cipher.hook}</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className={styles.note}>This is a prototype. More ciphers are on the way.</p>
    </main>
  );
}
