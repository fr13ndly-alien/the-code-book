import { readGroup, type CodeWord } from "@codebook/cipher-engine/navajo";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./NavajoBoard.module.css";
import { groupsOf, isOpen, type NavajoState } from "./useNavajo";
import { LETTER_MEANING_VI, TERM_MEANING_VI } from "./vi";

/** A code word's everyday meaning as shown on the page. A letter's English word stays: it spells the letter. */
function meaningOf(word: CodeWord, locale: Locale, withGloss: boolean): string {
  if (locale === "en") return word.meaning;
  if (word.kind === "term") return TERM_MEANING_VI[word.meaning] ?? word.meaning;
  const gloss = LETTER_MEANING_VI[word.meaning];
  return withGloss && gloss ? `${word.meaning} (${gloss})` : word.meaning;
}

/** The three links of one code word: what is said, what it means, what it stands for. */
function Chain({ word }: { word: CodeWord }) {
  const t = useT();
  const locale = useLocale();
  const why =
    word.kind === "term"
      ? t({
          en: "The lexicon gives this picture to a military term.",
          vi: "Bảng từ vựng dùng hình ảnh này cho một thuật ngữ quân sự.",
        })
      : word.stands === "X"
        ? t({
            en: "The alphabet uses a cross for the letter X.",
            vi: "Bảng đánh vần dùng chữ thập (cross) cho chữ X.",
          })
        : t({
            en: `"${word.meaning}" starts with ${word.stands}, so it spells that letter.`,
            vi: `Từ tiếng Anh “${word.meaning}” bắt đầu bằng chữ ${word.stands}, nên nó đánh vần chữ đó.`,
          });
  return (
    <div className={styles.chain} aria-live="polite">
      <dl>
        <div>
          <dt>{t({ en: "Spoken", vi: "Lời nói" })}</dt>
          <dd className={styles.navajo}>{word.navajo}</dd>
        </div>
        <div>
          <dt>{t({ en: "Means", vi: "Nghĩa là" })}</dt>
          <dd>{meaningOf(word, locale, true)}</dd>
        </div>
        <div>
          <dt>{t({ en: "Stands for", vi: "Thay cho" })}</dt>
          <dd className={styles.stands}>{word.stands}</dd>
        </div>
      </dl>
      <p>{why}</p>
    </div>
  );
}

/** A message as a row of spoken Navajo code words, grouped by English word. */
export function NavajoBoard({ state, onTap }: { state: NavajoState; onTap: (word: number) => void }) {
  const t = useT();
  const locale = useLocale();
  const groups = groupsOf(state);
  const words = groups.flat();
  const picked = state.picked === undefined ? undefined : words[state.picked];
  let count = 0;

  return (
    <Board>
      <ol className={styles.message} aria-label={t({ en: "The message in code", vi: "Tin nhắn bằng mật mã" })}>
        {groups.map((group, at) => {
          const first = count;
          count += group.length;
          const known = group.every((_, offset) => isOpen(state, first + offset));
          return (
            <li key={at} className={styles.group}>
              <span className={styles.english}>{known ? readGroup(group) : "?"}</span>
              <span className={styles.words}>
                {group.map((word, offset) => (
                  <button
                    key={offset}
                    type="button"
                    className={styles.word}
                    aria-pressed={first + offset === state.picked}
                    onClick={() => onTap(first + offset)}
                  >
                    <span className={styles.navajo}>{word.navajo}</span>
                    <span className={styles.meaning}>{isOpen(state, first + offset) ? meaningOf(word, locale, false) : "?"}</span>
                  </button>
                ))}
              </span>
            </li>
          );
        })}
      </ol>
      {picked ? (
        <Chain word={picked} />
      ) : (
        <Caption>
          {words.length === 0
            ? t({ en: "Type a message below to hear it in code.", vi: "Gõ một tin nhắn ở dưới để nghe nó bằng mật mã." })
            : t({
                en: "Each box is one spoken word. Tap one to follow it from Navajo to English.",
                vi: "Mỗi ô là một từ được nói ra. Chạm vào một ô để lần theo nó từ tiếng Navajo sang tiếng Anh.",
              })}
        </Caption>
      )}
    </Board>
  );
}
