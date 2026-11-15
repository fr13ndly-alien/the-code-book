import {
  CARTOUCHES,
  check,
  isRead,
  read,
  type Cartouche,
  type CartoucheId,
} from "@codebook/cipher-engine/hieroglyphs";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import { Glyph } from "./Glyph";
import styles from "./HieroglyphsBoard.module.css";
import { pickedSign, shown, type HieroglyphsState } from "./useHieroglyphs";
import { signName } from "./vi";

/** What the reader is told about a cartouche before reading it. */
function heading(cartouche: Cartouche, solved: boolean, locale: Locale): string {
  if (locale === "vi") {
    if (cartouche.greek) return `Bản tiếng Hy Lạp ghi: ${cartouche.name}`;
    return solved ? `Bạn đã đọc ra: ${cartouche.name}` : "Không có bản dịch. Đây là tên của ai?";
  }
  if (cartouche.greek) return `The Greek text says: ${cartouche.name}`;
  return solved ? `You read it: ${cartouche.name}` : "No translation. Whose name is it?";
}

/** One royal name: a ring of signs, the Greek letters above and the reader's sounds below. */
function Ring(props: { id: CartoucheId; state: HieroglyphsState; onTap: (cartouche: CartoucheId, at: number) => void }) {
  const { id, state } = props;
  const t = useT();
  const locale = useLocale();
  const cartouche: Cartouche = CARTOUCHES[id];
  const sounds = read(cartouche, state.assignment);
  const verdicts = check(cartouche, state.assignment);
  const chosen = pickedSign(state);

  return (
    <section className={styles.cartouche} aria-label={t({
        en: `Cartouche: ${heading(cartouche, false, locale)}`,
        vi: `Khung tên: ${heading(cartouche, false, locale)}`,
      })}>
      <h3>{heading(cartouche, isRead(cartouche, state.assignment), locale)}</h3>
      <div className={styles.ring}>
        {cartouche.signs.map((sign, at) => (
          <button
            key={at}
            type="button"
            className={styles.sign}
            data-same={sign === chosen}
            data-verdict={cartouche.greek ? verdicts[at] : "unknown"}
            aria-label={`${signName(sign, locale)}: ${sounds[at] ?? t({ en: "no sound yet", vi: "chưa có âm" })}`}
            aria-pressed={state.picked?.cartouche === id && state.picked.at === at}
            onClick={() => props.onTap(id, at)}
          >
            <span className={styles.greek}>{cartouche.greek?.[at] ?? ""}</span>
            <Glyph sign={sign} />
            <span className={styles.sound}>{sounds[at] ?? "?"}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/** The cartouches side by side, so a sound found in one can be tested in the others. */
export function HieroglyphsBoard(props: {
  state: HieroglyphsState;
  onTap: (cartouche: CartoucheId, at: number) => void;
}) {
  const t = useT();
  const locale = useLocale();
  const chosen = pickedSign(props.state);
  const sound = chosen && props.state.assignment[chosen];

  return (
    <Board>
      {shown(props.state).map((id) => (
        <Ring key={id} id={id} state={props.state} onTap={props.onTap} />
      ))}
      <Caption>
        {chosen ? (
          t({
            en: (
              <>
                The {signName(chosen, locale)} is lit wherever it appears.{" "}
                {sound ? (
                  <>
                    You say it sounds like <Letters>{sound}</Letters>.
                  </>
                ) : (
                  "Pick a sound for it below."
                )}
              </>
            ),
            vi: (
              <>
                Hình {signName(chosen, locale)} sáng lên ở mọi chỗ nó xuất hiện.{" "}
                {sound ? (
                  <>
                    Bạn nói nó đọc là <Letters>{sound}</Letters>.
                  </>
                ) : (
                  "Hãy chọn một âm cho nó ở bên dưới."
                )}
              </>
            ),
          })
        ) : (
          t({
            en: "Top row of each ring: the name in Greek letters. Bottom row: your sounds. Tap a sign to start.",
            vi: "Hàng trên của mỗi khung: tên viết bằng chữ Hy Lạp. Hàng dưới: các âm bạn chọn. Chạm vào một ký hiệu để bắt đầu.",
          })
        )}
      </Caption>
    </Board>
  );
}
