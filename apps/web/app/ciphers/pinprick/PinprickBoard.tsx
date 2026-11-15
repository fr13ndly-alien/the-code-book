import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./PinprickBoard.module.css";
import { hiding, pricks, type PinprickState } from "./usePinprick";

const IS_LETTER = /[a-z]/i;

/** The words of a text, each with the position of its first character. */
const wordsOf = (text: string) => [...text.matchAll(/\S+/g)].map((match) => ({ start: match.index, text: match[0] }));

/** A newspaper page whose letters can be pricked. Held to the light, only the pricked ones show. */
export function PinprickBoard({ state, onPrick }: { state: PinprickState; onPrick: (position: number) => void }) {
  const locale = useLocale();
  const holes = new Set(pricks(state));

  return (
    <Board>
      <div className={styles.paper} data-light={state.light}>
        <p className={styles.masthead}>The Harbour Gazette</p>
        <div className={styles.text}>
          {wordsOf(state.cover).map((word) => (
            <span key={word.start} className={styles.word}>
              {[...word.text].map((char, offset) => (
                <Character
                  key={offset}
                  char={char}
                  pricked={holes.has(word.start + offset)}
                  onPrick={() => onPrick(word.start + offset)}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
      <Caption>{captionFor(state, locale)}</Caption>
    </Board>
  );
}

/** One character of the page: a button if it is a letter, plain text if it is punctuation. */
function Character(props: { char: string; pricked: boolean; onPrick: () => void }) {
  const t = useT();
  if (!IS_LETTER.test(props.char)) return <span className={styles.mark}>{props.char}</span>;
  return (
    <button
      type="button"
      className={styles.letter}
      aria-label={props.pricked ? t({ en: `${props.char}, pricked`, vi: `${props.char}, đã châm lỗ` }) : props.char}
      aria-pressed={props.pricked}
      onClick={props.onPrick}
    >
      {props.char}
    </button>
  );
}

function captionFor(state: PinprickState, locale: Locale) {
  const vi = locale === "vi";
  if (state.mode === "hand") {
    return vi
      ? "Chạm vào một chữ để châm một lỗ dưới nó. Chạm lần nữa để vá lỗ."
      : "Tap a letter to prick a hole under it. Tap it again to mend the hole.";
  }
  const { positions, left } = hiding(state);
  if (left !== "" && vi) {
    return (
      <>
        Hết trang rồi. Sau lỗ cuối cùng không còn chữ <Letters>{left[0]}</Letters> nào, nên không thể giấu{" "}
        <Letters>{left}</Letters>.
      </>
    );
  }
  if (left !== "") {
    return (
      <>
        The page ran out. There is no <Letters>{left[0]}</Letters> after the last hole, so{" "}
        <Letters>{left}</Letters> cannot be hidden.
      </>
    );
  }
  if (vi) return `${positions.length} lỗ, mỗi lỗ dưới một chữ, ứng với từng chữ trong bí mật của bạn, theo đúng thứ tự.`;
  return `${positions.length} holes, one under a letter for each letter of your secret, in order.`;
}
