import type { Dispatch } from "react";
import { tryAllStaffs } from "@codebook/cipher-engine/scytale";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import styles from "./ScytaleControls.module.css";
import {
  MAX_LETTERS,
  MAX_PER_TURN,
  MIN_PER_TURN,
  linesOnStaff,
  output,
  stripTurns,
  type ScytaleAction,
  type ScytaleState,
} from "./useScytale";

/** The HTML controls of the scytale page: the staff, the message, the strip and the result. */
export function ScytaleControls({ state, dispatch }: { state: ScytaleState; dispatch: Dispatch<ScytaleAction> }) {
  const t = useT();
  const enciphering = state.mode === "encipher";

  return (
    <Controls>
      <Row>
        <Stepper
          label={t({ en: "Thickness: letters a turn", vi: "Độ dày: số chữ mỗi vòng" })}
          value={state.perTurn}
          onStep={(by) => dispatch({ type: "resize", by })}
        />
        <Output label={
            enciphering
              ? t({ en: "Ciphertext: the unwound strip", vi: "Bản mật mã: dải da đã tháo ra" })
              : t({ en: "Plaintext: read along the staff", vi: "Văn bản thường: đọc dọc theo khúc gỗ" })
          }>
          {output(state)}
        </Output>
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: `Your message (${MAX_LETTERS} letters at most)`, vi: `Tin nhắn của bạn (tối đa ${MAX_LETTERS} chữ)` })
              : t({ en: "The letters on the strip", vi: "Các chữ trên dải da" })
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
          label={t({ en: "Turn the staff", vi: "Xoay khúc gỗ" })}
          value={t({ en: `Line ${state.facing + 1}`, vi: `Dòng ${state.facing + 1}` })}
          onStep={(by) => dispatch({ type: "roll", by })}
        />
        <Output label={t({ en: "The lines on the staff", vi: "Các dòng trên khúc gỗ" })}>{linesOnStaff(state).join("\n")}</Output>
      </Row>
      <Row>
        <Output label={t({ en: "The unwound strip, one group for each turn", vi: "Dải da đã tháo ra, mỗi vòng một nhóm" })}>{stripTurns(state).join(" ")}</Output>
      </Row>
      {!enciphering && (
        <details className={styles.attack}>
          <summary>{t({ en: "Try every staff at once", vi: "Thử mọi khúc gỗ cùng lúc" })}</summary>
          <ol start={MIN_PER_TURN}>
            {tryAllStaffs(state.text, MAX_PER_TURN).map((reading, index) => (
              <li key={index} data-on={index + MIN_PER_TURN === state.perTurn}>
                {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
