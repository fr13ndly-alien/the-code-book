import type { Dispatch } from "react";
import { PART_1_SETTINGS, VOWEL_PLUGBOARD, toKeys } from "@codebook/cipher-engine/purple";
import { inGroups } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { SHORT_OUTPUT, SWITCH_NAMES, speedOf } from "./layout";
import styles from "./PurpleControls.module.css";
import { output, type PurpleAction, type PurpleState } from "./usePurple";

/** The plugboards the reader can choose between. */
const PLUGBOARDS = {
  en: [
    { value: VOWEL_PLUGBOARD, label: "Vowels as sixes" },
    { value: PART_1_SETTINGS.plugboard, label: "7 December 1941" },
  ],
  vi: [
    { value: VOWEL_PLUGBOARD, label: "Nguyên âm làm nhóm sáu" },
    { value: PART_1_SETTINGS.plugboard, label: "Ngày 7 tháng 12 năm 1941" },
  ],
};

/** The HTML controls of the Purple page: the switches, the message, the output and the letter count. */
export function PurpleControls({ state, dispatch }: { state: PurpleState; dispatch: Dispatch<PurpleAction> }) {
  const t = useT();
  const locale = useLocale();
  const enciphering = state.mode === "encipher";
  const length = toKeys(state.text).length;
  const result = output(state);
  const long = result.length > SHORT_OUTPUT;

  return (
    <Controls>
      <Row>
        <Output label={t({ en: "Switches start at (sixes, I, II, III)", vi: "Công tắc bắt đầu ở (nhóm sáu, I, II, III)" })}>{state.start.map((at) => at + 1).join(" ")}</Output>
        <Output label={enciphering ? t({ en: "Ciphertext", vi: "Bản mật mã" }) : t({ en: "Plaintext", vi: "Văn bản thường" })}>
          {inGroups(result.slice(0, SHORT_OUTPUT))}
          {long && t({ en: ` … ${result.length} letters`, vi: ` … ${result.length} chữ` })}
        </Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: "Your message", vi: "Tin nhắn của bạn" })
              : t({ en: "The ciphertext", vi: "Bản mật mã" })
          }
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
        />
        <Choice
          label={t({ en: "I want to", vi: "Tôi muốn" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "encipher", label: t({ en: "Encipher", vi: "Mã hóa" }) },
            { value: "decipher", label: t({ en: "Decipher", vi: "Giải mã" }) },
          ]}
        />
      </Row>
      <Row>
        <Stepper
          label={t({ en: "Letter shown", vi: "Chữ đang xem" })}
          value={
            length
              ? t({ en: `${state.picked + 1} of ${length}`, vi: `${state.picked + 1} / ${length}` })
              : t({ en: "none", vi: "chưa có" })
          }
          onStep={(by) => dispatch({ type: "move", by })}
        />
        {state.start.map((at, index) => (
          <Stepper
            key={index}
            label={
              index === 0
                ? t({ en: "Sixes switch", vi: "Công tắc nhóm sáu" })
                : t({
                    en: `Switch ${SWITCH_NAMES[index]} (${speedOf(index, state.motion)})`,
                    vi: `Công tắc ${SWITCH_NAMES[index]} (${speedOf(index, state.motion, locale)})`,
                  })
            }
            value={at + 1}
            onStep={(by) => dispatch({ type: "turn", switch: index, by })}
          />
        ))}
      </Row>
      <Row>
        <Stepper
          label={t({ en: "Fast, medium, slow", vi: "Nhanh, vừa, chậm" })}
          value={[...state.motion].map((index) => SWITCH_NAMES[Number(index)]).join(" ")}
          onStep={(by) => dispatch({ type: "reorder", by })}
        />
        <Choice
          label={t({ en: "Plugboard", vi: "Bảng ổ nối" })}
          value={state.plugboard}
          onChange={(plugboard) => dispatch({ type: "plug", plugboard })}
          options={t(PLUGBOARDS)}
        />
      </Row>
      <Row>
        <Button primary onClick={() => dispatch({ type: "feedBack" })} disabled={length === 0}>
          {t({ en: "Feed the output back in", vi: "Đưa kết quả trở lại máy" })}
        </Button>
      </Row>
      <Row>
        <Choice
          label={t({ en: "Show", vi: "Hiển thị" })}
          value={state.view}
          onChange={(view) => dispatch({ type: "look", view })}
          options={[
            { value: "machine", label: t({ en: "The machine", vi: "Cỗ máy" }) },
            { value: "count", label: t({ en: "Letter counts", vi: "Đếm chữ" }) },
          ]}
        />
        {state.view === "count" && (
          <Choice
            label={t({ en: "Order of the bars", vi: "Thứ tự các cột" })}
            value={state.sixesFirst ? "sixes" : "alphabet"}
            onChange={(order) => dispatch({ type: "sort", sixesFirst: order === "sixes" })}
            options={[
              { value: "alphabet", label: t({ en: "A to Z", vi: "Từ A đến Z" }) },
              { value: "sixes", label: t({ en: "Sixes first", vi: "Nhóm sáu trước" }) },
            ]}
          />
        )}
      </Row>
      {long && (
        <details className={styles.whole}>
          <summary>{t({ en: "Read the whole output", vi: "Đọc toàn bộ kết quả" })}</summary>
          <p>{inGroups(result)}</p>
        </details>
      )}
    </Controls>
  );
}
