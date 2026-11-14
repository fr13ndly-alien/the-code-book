import {
  CARTOUCHES,
  SIGNS,
  check,
  isRead,
  read,
  type Cartouche,
  type CartoucheId,
} from "@codebook/cipher-engine/hieroglyphs";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { Glyph } from "./Glyph";
import styles from "./HieroglyphsBoard.module.css";
import { pickedSign, shown, type HieroglyphsState } from "./useHieroglyphs";

/** What the reader is told about a cartouche before reading it. */
function heading(cartouche: Cartouche, solved: boolean): string {
  if (cartouche.greek) return `The Greek text says: ${cartouche.name}`;
  return solved ? `You read it: ${cartouche.name}` : "No translation. Whose name is it?";
}

/** One royal name: a ring of signs, the Greek letters above and the reader's sounds below. */
function Ring(props: { id: CartoucheId; state: HieroglyphsState; onTap: (cartouche: CartoucheId, at: number) => void }) {
  const { id, state } = props;
  const cartouche: Cartouche = CARTOUCHES[id];
  const sounds = read(cartouche, state.assignment);
  const verdicts = check(cartouche, state.assignment);
  const chosen = pickedSign(state);

  return (
    <section className={styles.cartouche} aria-label={`Cartouche: ${heading(cartouche, false)}`}>
      <h3>{heading(cartouche, isRead(cartouche, state.assignment))}</h3>
      <div className={styles.ring}>
        {cartouche.signs.map((sign, at) => (
          <button
            key={at}
            type="button"
            className={styles.sign}
            data-same={sign === chosen}
            data-verdict={cartouche.greek ? verdicts[at] : "unknown"}
            aria-label={`${SIGNS[sign].name}: ${sounds[at] ?? "no sound yet"}`}
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
  const chosen = pickedSign(props.state);
  const sound = chosen && props.state.assignment[chosen];

  return (
    <Board>
      {shown(props.state).map((id) => (
        <Ring key={id} id={id} state={props.state} onTap={props.onTap} />
      ))}
      <Caption>
        {chosen ? (
          <>
            The {SIGNS[chosen].name} is lit wherever it appears.{" "}
            {sound ? (
              <>
                You say it sounds like <Letters>{sound}</Letters>.
              </>
            ) : (
              "Pick a sound for it below."
            )}
          </>
        ) : (
          "Top row of each ring: the name in Greek letters. Bottom row: your sounds. Tap a sign to start."
        )}
      </Caption>
    </Board>
  );
}
