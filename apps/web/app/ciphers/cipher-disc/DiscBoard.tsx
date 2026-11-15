import { settingsUsed } from "@codebook/cipher-engine/cipher-disc";
import { ALPHABET, indexOfLetter, letterAt, lettersOnly, mod } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useT } from "~/i18n";
import styles from "./DiscBoard.module.css";
import { DISC } from "./layout";
import { output, shownSetting, type DiscState } from "./useDisc";

/** The disc itself, and under it the setting it used for each letter of the message. */
export function DiscBoard({ state, onTurn }: { state: DiscState; onTurn: (by: number) => void }) {
  const setting = shownSetting(state);
  const typed = lettersOnly(state.text);
  const result = lettersOnly(output(state));
  const plain = state.mode === "encipher" ? typed : result;
  const cipher = state.mode === "encipher" ? result : typed;
  // The pair of letters the disc was last used for, as a place on the outer ring.
  const lastPlain = plain === "" ? undefined : indexOfLetter(plain.at(-1)!);
  const t = useT();

  return (
    <Board>
      <Disc
        setting={setting}
        lit={lastPlain}
        // A keyword sets the ring by itself, so taps only turn it in the other two ways of working.
        onPick={state.turning === "keyword" ? undefined : (inner) => onTurn(shortestTurn(inner - setting))}
      />
      <Caption>
        {t({
          en: (
            <>
              The inner <Letters>{letterAt(setting)}</Letters> is beside the outer <Letters>A</Letters>.
            </>
          ),
          vi: (
            <>
              Chữ <Letters>{letterAt(setting)}</Letters> của vòng trong đang nằm cạnh chữ <Letters>A</Letters> của vòng
              ngoài.
            </>
          ),
        })}
        {lastPlain !== undefined && (
          <>
            {" "}
            {t({
              en: (
                <>
                  For the last letter, outer <Letters>{plain.at(-1)}</Letters> meets inner{" "}
                  <Letters>{cipher.at(-1)}</Letters>.
                </>
              ),
              vi: (
                <>
                  Với chữ vừa gõ, chữ <Letters>{plain.at(-1)}</Letters> ở vòng ngoài gặp chữ{" "}
                  <Letters>{cipher.at(-1)}</Letters> ở vòng trong.
                </>
              ),
            })}
          </>
        )}
      </Caption>
      {plain !== "" && (
        <AlphabetRows
          rows={[
            { label: t({ en: "Plain (outer)", vi: "Thường (vòng ngoài)" }), letters: plain },
            { label: t({ en: "Inner letter at A", vi: "Chữ vòng trong ở A" }), letters: settingsUsed(state, typed).map(letterAt) },
            { label: t({ en: "Cipher (inner)", vi: "Mật mã (vòng trong)" }), letters: cipher, kind: "cipher" },
          ]}
          highlight={plain.length - 1}
        />
      )}
    </Board>
  );
}

/** The number of steps, forwards or backwards, that makes a turn of `steps` the short way round. */
const shortestTurn = (steps: number) => mod(steps + 13, 26) - 13;

/** Where a letter sits on a ring: turned to its angle, then moved out from the centre. */
const place = (index: number, radius: number) => `rotate(${index * DISC.step}) translate(0 ${-radius})`;

/** The two rings, drawn from above. The inner one is turned so that `setting` sits beside the outer A. */
function Disc(props: { setting: number; lit?: number; onPick?: (inner: number) => void }) {
  const { setting, lit, onPick } = props;
  const box = `${-DISC.half} ${-DISC.half} ${DISC.half * 2} ${DISC.half * 2}`;
  const litInner = lit === undefined ? undefined : mod(lit + setting, 26);

  return (
    // Hidden from screen readers: the stepper in the controls does the same job, with a name.
    <svg className={styles.disc} viewBox={box} aria-hidden="true">
      <circle className={styles.outer} r={DISC.outerEdge} />
      <g className={styles.plain}>
        {[...ALPHABET].map((letter, index) => (
          <g key={letter} transform={place(index, DISC.outerLetters)} data-on={index === lit}>
            <circle className={styles.mark} r={DISC.tapRadius} />
            <text fontSize={DISC.letterSize} textAnchor="middle" dominantBaseline="central">
              {letter}
            </text>
          </g>
        ))}
      </g>
      <g className={styles.ring} style={{ transform: `rotate(${-setting * DISC.step}deg)` }}>
        <circle className={styles.inner} r={DISC.innerEdge} />
        {[...ALPHABET].map((letter, index) => (
          <g
            key={letter}
            className={onPick && styles.tap}
            transform={place(index, DISC.innerLetters)}
            data-on={index === litInner}
            onClick={() => onPick?.(index)}
          >
            <circle className={styles.mark} r={DISC.tapRadius} />
            <text fontSize={DISC.letterSize} textAnchor="middle" dominantBaseline="central">
              {letter}
            </text>
          </g>
        ))}
        <circle className={styles.hub} r={DISC.hub} />
      </g>
      <circle className={styles.pin} r={DISC.pin} />
    </svg>
  );
}
