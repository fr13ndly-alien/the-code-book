import type { Dispatch } from "react";
import { clashes, ROTOR_POSITIONS } from "@codebook/cipher-engine/cracking-enigma";
import { letterAt } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useLocale, useT, type Bilingual, type Locale } from "~/i18n";
import styles from "./CrackControls.module.css";
import { DAY_CABLES, fingerprint, type CrackAction, type CrackState } from "./useCrack";

interface Props {
  state: CrackState;
  dispatch: Dispatch<CrackAction>;
}

const ROTOR_LABELS: Bilingual<string[]> = {
  en: ["Left rotor", "Middle rotor", "Right rotor"],
  vi: ["Đĩa trái", "Đĩa giữa", "Đĩa phải"],
};

/** The HTML controls of the page: a choice of attack, then the controls of that attack. */
export function CrackControls({ state, dispatch }: Props) {
  const t = useT();
  const locale = useLocale();
  const chains = state.tool === "chains";
  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "Attack", vi: "Cách tấn công" })}
          value={state.tool}
          onChange={(tool) => dispatch({ type: "use", tool })}
          options={[
            { value: "chains", label: t({ en: "Rejewski's chains", vi: "Vòng liên kết của Rejewski" }) },
            { value: "crib", label: t({ en: "Turing's crib", vi: "Crib của Turing" }) },
          ]}
        />
        {chains ? (
          <Output
            label={
              state.table
                ? t({ en: "Chain lengths in the book's table", vi: "Độ dài các vòng trong bảng của sách" })
                : t({ en: "Chain lengths today", vi: "Độ dài các vòng hôm nay" })
            }
          >
            {fingerprint(state)}
          </Output>
        ) : (
          <Output label={t({ en: "Message", vi: "Bức điện" })}>{message(state, locale)}</Output>
        )}
      </Row>
      {chains ? <ChainControls state={state} dispatch={dispatch} /> : <CribControls state={state} dispatch={dispatch} />}
    </Controls>
  );
}

/** What the crib search has revealed so far, in words or as the message itself. */
function message({ stops, illustration }: CrackState, locale: Locale): string {
  const vi = locale === "vi";
  if (illustration) return vi ? "Ví dụ của sách: không có gì để tìm" : "The book's example: nothing to search";
  if (!stops) return vi ? "Chưa thử" : "Not tested yet";
  return stops[0]?.plaintext ?? (vi ? "Không vị trí đĩa mã hóa nào hợp ở đây" : "No rotor setting fits here");
}

/** The day key the reader can change: three rotor starts, six cables, and which letters to compare. */
function ChainControls({ state, dispatch }: Props) {
  const t = useT();
  return (
    <>
      <Row>
        {t(ROTOR_LABELS).map((label, slot) => (
          <Stepper
            key={label}
            label={label}
            value={letterAt(state.start[slot]!)}
            onStep={(by) => dispatch({ type: "turn", slot: slot as 0 | 1 | 2, by })}
          />
        ))}
      </Row>
      <Row>
        <div className={styles.cables} role="group" aria-label={t({ en: "Plugboard cables", vi: "Dây cáp" })}>
          <span>
            {t({
              en: "Plugboard cables (press to pull out or put back)",
              vi: "Dây cáp (nhấn để rút ra hoặc cắm lại)",
            })}
          </span>
          <div>
            {DAY_CABLES.map((cable) => (
              <button
                key={cable}
                type="button"
                aria-pressed={state.cables.includes(cable)}
                onClick={() => dispatch({ type: "plug", cable })}
              >
                {cable[0]}–{cable[1]}
              </button>
            ))}
          </div>
        </div>
        <Choice
          label={t({ en: "Compare letters", vi: "So sánh chữ" })}
          value={String(state.pair)}
          onChange={(pair) => dispatch({ type: "compare", pair: Number(pair) as 0 | 1 | 2 })}
          options={[
            { value: "0", label: t({ en: "1 and 4", vi: "1 và 4" }) },
            { value: "1", label: t({ en: "2 and 5", vi: "2 và 5" }) },
            { value: "2", label: t({ en: "3 and 6", vi: "3 và 6" }) },
          ]}
        />
      </Row>
    </>
  );
}

/** The crib, where it sits, and the button that runs the search. */
function CribControls({ state, dispatch }: Props) {
  const t = useT();
  const clash = clashes(state.ciphertext, state.crib, state.offset).length > 0;
  return (
    <Row>
      <Stepper label={t({ en: "Crib starts at letter", vi: "Crib bắt đầu ở chữ thứ" })} value={state.offset + 1} onStep={(by) => dispatch({ type: "slide", by })} />
      <TextField
        label={t({ en: "Crib (your guess)", vi: "Crib (bạn đoán)" })}
        width="short"
        value={state.crib}
        onChange={(crib) => dispatch({ type: "guess", crib })}
      />
      <Button primary disabled={clash || state.crib === "" || state.illustration} onClick={() => dispatch({ type: "test" })}>
        {t({
          en: `Test ${ROTOR_POSITIONS.toLocaleString("en")} rotor settings`,
          vi: `Thử ${ROTOR_POSITIONS.toLocaleString("vi")} vị trí đĩa mã hóa`,
        })}
      </Button>
    </Row>
  );
}
