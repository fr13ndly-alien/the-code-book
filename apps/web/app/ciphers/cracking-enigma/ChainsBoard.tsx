import { chains } from "@codebook/cipher-engine/cracking-enigma";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption } from "~/components/sim/Caption";
import { useT } from "~/i18n";
import styles from "./CrackBoard.module.css";
import { openings, table, type CrackState } from "./useCrack";

/** The names of the six opening letters, as row labels: "1st letter", "chữ thứ 1". */
const PLACE_LABELS = {
  en: ["1st", "2nd", "3rd", "4th", "5th", "6th"].map((place) => `${place} letter`),
  vi: [1, 2, 3, 4, 5, 6].map((place) => `Chữ thứ ${place}`),
};

/** Rejewski's working: the day's message openings, the table made from them, and its chains. */
export function ChainsBoard({ state, onPick }: { state: CrackState; onPick: (column: number) => void }) {
  const t = useT();
  const places = t(PLACE_LABELS);
  const { pair, picked } = state;
  const links = table(state);
  const followed = picked === undefined ? undefined : ALPHABET[picked];

  return (
    <>
      {!state.table && (
        <ul className={styles.openings} aria-label={t({
            en: "The first six letters of today's messages",
            vi: "Sáu chữ đầu của các bức điện hôm nay",
          })}>
          {openings(state).map((opening) => (
            <li key={opening}>
              {[...opening].map((letter, at) => (at % 3 === pair ? <b key={at}>{letter}</b> : letter))}
            </li>
          ))}
        </ul>
      )}
      <AlphabetRows
        rows={[
          { label: places[pair]!, letters: ALPHABET },
          { label: places[pair + 3]!, letters: links, kind: "cipher" },
        ]}
        highlight={picked}
        onPick={onPick}
      />
      <ol className={styles.chains} aria-label={t({ en: "Chains", vi: "Các vòng liên kết" })}>
        {chains(links).map((chain) => (
          <li key={chain} data-on={followed !== undefined && chain.includes(followed)}>
            {[...chain, chain[0]].join(" → ")}
            <span>
              {t({ en: chain.length === 1 ? "1 link" : `${chain.length} links`, vi: `${chain.length} liên kết` })}
            </span>
          </li>
        ))}
      </ol>
      <Caption>
        {state.table
          ? t({
              en:
                "This is the finished table printed in the book. The book does not give the day key behind it. Turn a " +
                "rotor or pull a cable to go back to today's messages.",
              vi:
                "Đây là bảng hoàn chỉnh in trong sách. Sách không cho biết khóa mã ngày nào tạo ra nó. Xoay một đĩa mã " +
                "hóa hoặc rút một dây cáp để quay về các bức điện hôm nay.",
            })
          : t({
              en:
                "Each chain goes from a top letter to the one below it, then on from there, until it comes home. Pull a " +
                "cable and the letters change but the lengths stay. Turn a rotor and the lengths change.",
              vi:
                "Mỗi vòng liên kết đi từ một chữ ở hàng trên xuống chữ nằm dưới nó, rồi cứ thế đi tiếp cho tới khi về chỗ cũ. " +
                "Rút một dây cáp thì các chữ đổi, nhưng độ dài giữ nguyên. Xoay một đĩa mã hóa thì độ dài thay đổi.",
            })}
      </Caption>
    </>
  );
}
