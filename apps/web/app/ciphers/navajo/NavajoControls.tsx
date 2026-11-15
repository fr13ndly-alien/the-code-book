import type { Dispatch } from "react";
import { TERM_WORDS } from "@codebook/cipher-engine/navajo";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useT } from "~/i18n";
import styles from "./NavajoControls.module.css";
import { output, type NavajoAction, type NavajoState } from "./useNavajo";
import { TERM_MEANING_VI, TERM_VI } from "./vi";

/** The HTML controls of the Navajo page: send or listen, the message and the result. */
export function NavajoControls({ state, dispatch }: { state: NavajoState; dispatch: Dispatch<NavajoAction> }) {
  const t = useT();
  const sending = state.mode === "send";

  return (
    <Controls>
      <Row>
        <Choice
          label={t({ en: "I want to", vi: "Tôi muốn" })}
          value={state.mode}
          onChange={(mode) => dispatch({ type: "switch", mode })}
          options={[
            { value: "send", label: t({ en: "Send", vi: "Gửi" }) },
            { value: "listen", label: t({ en: "Listen", vi: "Nghe" }) },
          ]}
        />
        <Output label={sending ? t({ en: "Spoken in code", vi: "Nói bằng mã" }) : t({ en: "Decoded so far", vi: "Đã giải mã được" })}>{output(state)}</Output>
      </Row>
      {sending ? (
        <Row>
          <TextField label={t({ en: "Your message", vi: "Tin nhắn của bạn" })} value={state.text} onChange={(text) => dispatch({ type: "type", text })} />
        </Row>
      ) : (
        <Row>
          <Button onClick={() => dispatch({ type: "openAll" })}>{t({ en: "Open every word", vi: "Mở mọi từ" })}</Button>
          <Button onClick={() => dispatch({ type: "closeAll" })}>{t({ en: "Hide them again", vi: "Giấu lại" })}</Button>
        </Row>
      )}
      <details className={styles.lexicon}>
        <summary>{t({ en: "Terms this page has a code word for", vi: "Các thuật ngữ có từ mã trên trang này" })}</summary>
        <ul>
          {TERM_WORDS.map((term) => (
            <li key={term.stands}>
              {t({
                en: (
                  <>
                    {term.stands.toLowerCase()}: <span>{term.navajo}</span>, {term.meaning}
                  </>
                ),
                vi: (
                  <>
                    {term.stands.toLowerCase()} ({TERM_VI[term.stands] ?? term.stands}): <span>{term.navajo}</span>,{" "}
                    {TERM_MEANING_VI[term.meaning] ?? term.meaning}
                  </>
                ),
              })}
            </li>
          ))}
        </ul>
      </details>
    </Controls>
  );
}
