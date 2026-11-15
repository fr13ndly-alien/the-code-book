import type { Dispatch } from "react";
import { BLOCK_BITS, countDifferentBits, tryKeyLetters } from "@codebook/cipher-engine/lucifer";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import styles from "./LuciferControls.module.css";
import {
  flippedRun,
  inputBlock,
  output,
  pickedRound,
  run,
  type LuciferAction,
  type LuciferState,
} from "./useLucifer";

/** The HTML controls of the Lucifer page: rounds, message, key and the result. */
export function LuciferControls({ state, dispatch }: { state: LuciferState; dispatch: Dispatch<LuciferAction> }) {
  const enciphering = state.mode === "encipher";
  const flipped = flippedRun(state);
  const t = useT();

  return (
    <Controls>
      <Row>
        <Stepper label={t({ en: "Rounds", vi: "Số vòng" })} value={state.rounds} onStep={(by) => dispatch({ type: "step", by })} />
        <Output
          label={
            enciphering ? t({ en: "Ciphertext, in hex", vi: "Bản mật mã, hệ thập lục phân" }) : t({ en: "Plaintext", vi: "Văn bản thường" })
          }
        >{output(state)}</Output>
        {flipped && (
          <Output label={t({ en: "Bits changed by the flip", vi: "Số bit đổi vì lần lật" })}>
            {countDifferentBits(flipped.output, run(state).output)} {t({ en: "of", vi: "/" })} {BLOCK_BITS}
          </Output>
        )}
      </Row>
      <Row>
        <TextField
          label={
            enciphering
              ? t({ en: "Two letters", vi: "Hai chữ cái" })
              : t({ en: "Ciphertext: four hex digits", vi: "Bản mật mã: bốn chữ số thập lục phân" })
          }
          value={state.text}
          onChange={(text) => dispatch({ type: "type", text })}
          width="short"
        />
        <TextField
          label={t({ en: "Key letter", vi: "Chữ khóa" })}
          value={state.keyLetter}
          onChange={(letter) => dispatch({ type: "key", letter })}
          width="short"
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
          label={t({ en: "Explain round", vi: "Giải thích vòng" })} value={pickedRound(state)} onStep={(by) => dispatch({ type: "explain", by })} />
        <Button onClick={() => dispatch({ type: "unflip" })} disabled={!flipped}>
          {t({ en: "Put the flipped bit back", vi: "Trả bit đã lật về như cũ" })}
        </Button>
      </Row>
      {!enciphering && (
        <details className={styles.attack}>
          <summary>{t({ en: "Try every key letter, A to Z", vi: "Thử mọi chữ khóa, từ A đến Z" })}</summary>
          <ol>
            {tryKeyLetters(inputBlock(state), state.rounds).map(({ letter, reading }) => (
              <li key={letter} data-on={letter === state.keyLetter}>
                {letter}: {reading}
              </li>
            ))}
          </ol>
        </details>
      )}
    </Controls>
  );
}
