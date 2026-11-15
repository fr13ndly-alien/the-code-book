import {
  NAMES,
  WORDS,
  isRead,
  readSign,
  readWord,
  type Clash,
  type SignId,
  type Values,
  type Word,
  type WordId,
} from "@codebook/cipher-engine/linear-b";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import { Glyph } from "./Glyph";
import { clashText, signLabel } from "./labels";
import styles from "./LinearBBoard.module.css";
import { SignGrid } from "./SignGrid";
import { bridgeSigns, shown, solution, stemFound, stemSigns, type LinearBState } from "./useLinearB";
import { MEANING_VI, NAME_LABEL_VI } from "./vi";

/** One sign of a word: its drawing above, its sound so far below. */
function SignFace({ sign, values }: { sign: SignId; values: Values }) {
  const locale = useLocale();
  return (
    <span className={styles.face}>
      <Glyph sign={sign} label={signLabel(sign, values, locale)} />
      <span className={styles.sound}>{readSign(sign, values)}</span>
    </span>
  );
}

/** One of Kober's three words: each sign is a button that marks the sign wherever it appears. */
function MarkWord(props: { word: Word; values: Values; marked: SignId[]; bridge: SignId[]; onMark: (sign: SignId) => void }) {
  return (
    <div className={styles.word}>
      {props.word.signs.map((sign, at) => (
        <button
          key={at}
          type="button"
          className={styles.sign}
          data-bridge={props.bridge.includes(sign)}
          aria-pressed={props.marked.includes(sign)}
          onClick={() => props.onMark(sign)}
        >
          <SignFace sign={sign} values={props.values} />
        </button>
      ))}
    </div>
  );
}

/** What the reader is told about a word they may name. */
function heading(id: WordId, state: LinearBState, values: Values, locale: Locale, clashes?: Clash[]): string {
  const guess = state.guesses[id];
  if (locale === "vi") {
    if (clashes && guess) return `Bạn đoán: ${NAME_LABEL_VI[guess]}. Không khớp.`;
    if (isRead(WORDS[id], values)) return `Bạn đã đọc được: ${MEANING_VI[id]}`;
    return id === "tripods" ? "Từ một tấm bảng tìm thấy ở Pylos" : "Không có bản dịch. Đây là nơi nào?";
  }
  if (clashes && guess) return `Your guess: ${NAMES[guess].label}. It does not fit.`;
  if (isRead(WORDS[id], values)) return `You read it: ${WORDS[id].meaning}`;
  return id === "tripods" ? "From a tablet found at Pylos" : "No translation. Which place is it?";
}

/** A word the reader can name: one button for the whole word. */
function GuessWord(props: { id: WordId; state: LinearBState; onPick: (word: WordId) => void }) {
  const { id, state } = props;
  const t = useT();
  const locale = useLocale();
  const { values, clashes } = solution(state);
  const word: Word = WORDS[id];

  return (
    <section className={styles.entry}>
      <h3>{heading(id, state, values, locale, clashes[id])}</h3>
      <button
        type="button"
        className={styles.word}
        data-verdict={clashes[id] ? "clashes" : "fits"}
        aria-label={t({ en: `Word that reads ${readWord(word, values)}`, vi: `Từ đọc là ${readWord(word, values)}` })}
        aria-pressed={state.picked === id}
        onClick={() => props.onPick(id)}
      >
        {word.signs.map((sign, at) => (
          <span key={at} className={styles.sign}>
            <SignFace sign={sign} values={values} />
          </span>
        ))}
        {id === "tripods" && (
          <span className={styles.sign}>
            <span className={styles.face}>
              <Glyph sign="tripod" label={t({ en: "picture of a pot on three legs", vi: "hình một cái vạc có ba chân" })} />
              <span className={styles.count}>2</span>
            </span>
          </span>
        )}
      </button>
    </section>
  );
}

/** The line under the words: what to do next, or why a guess failed. */
function wordsCaption(state: LinearBState, locale: Locale): string {
  const vi = locale === "vi";
  if (state.view === "triplet") {
    if (stemFound(state)) {
      return vi
        ? "Đúng rồi. Cả ba từ đều bắt đầu bằng hai ký hiệu này, rồi mới rẽ khác nhau. Hai ký hiệu đứng ngay sau được khoanh tròn. Kober suy ra rằng chúng có chung một phụ âm, nên lưới xếp chúng vào cùng một hàng."
        : "Right. All three words start with these two signs, then split. The two signs that follow are ringed. Kober reasoned that they share a consonant, so the grid puts them in one row.";
    }
    if (state.marked.some((sign) => !stemSigns().includes(sign))) {
      return vi
        ? "Có một ký hiệu bạn đánh dấu không có mặt trong một từ. Chạm lại vào nó để bỏ đánh dấu."
        : "One sign you marked is missing from a word. Tap it again to unmark it.";
    }
    return vi
      ? "Ba từ trên các tấm đất sét ở Knossos. Chạm vào từng ký hiệu có mặt trong cả ba từ."
      : "Three words from the Knossos tablets. Tap each sign that appears in all three.";
  }
  const clash = shown(state).flatMap((id) => solution(state).clashes[id] ?? [])[0];
  if (clash) return vi ? `${clashText(clash, locale)} Hãy chọn tên khác.` : `${clashText(clash, locale)} Pick another name.`;
  if (state.view === "tripod") {
    return vi
      ? "Từ đầu tiên trên tấm đất sét có hình vạc ba chân, đọc bằng các âm lấy từ những địa danh của bạn. Hình vẽ và con số 2 là do chính người chép ghi."
      : "The first word of the tripod tablet, read with the sounds from your place names. The drawing and the number 2 are the scribe's own.";
  }
  return vi
    ? "Chạm vào một từ, rồi chọn một địa danh ở bên dưới. Đoán đúng thì cả một hàng và một cột của lưới được điền."
    : "Tap a word, then pick a place below. A right guess fills a whole row and column of the grid.";
}

/** Words from the tablets above the grid that sorts their signs. */
export function LinearBBoard(props: {
  state: LinearBState;
  onMark: (sign: SignId) => void;
  onPick: (word: WordId) => void;
}) {
  const { state } = props;
  const t = useT();
  const locale = useLocale();
  const { values } = solution(state);
  const marked = state.view === "triplet" ? state.marked : [];
  const bridge = state.view === "triplet" && stemFound(state) ? bridgeSigns() : [];

  return (
    <Board>
      <div className={styles.words}>
        {shown(state).map((id) =>
          state.view === "triplet" ? (
            <MarkWord key={id} word={WORDS[id]} values={values} marked={marked} bridge={bridge} onMark={props.onMark} />
          ) : (
            <GuessWord key={id} id={id} state={state} onPick={props.onPick} />
          ),
        )}
      </div>
      <Caption>{wordsCaption(state, locale)}</Caption>
      <SignGrid values={values} marked={marked} bridge={bridge} />
      <Caption>
        {t({
          en: (
            <>
              The grid: signs in one row share a consonant, signs in one column share a vowel. Which consonant and which
              vowel, nobody knew. The signs are simplified drawings.
            </>
          ),
          vi: (
            <>
              Lưới: các ký hiệu cùng một hàng có chung phụ âm, các ký hiệu cùng một cột có chung nguyên âm. Phụ âm nào,
              nguyên âm nào thì không ai biết. Các ký hiệu ở đây là hình vẽ đơn giản hóa.
            </>
          ),
        })}
      </Caption>
    </Board>
  );
}
