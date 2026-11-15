import type { Dispatch } from "react";
import { KEY_LENGTH } from "@codebook/cipher-engine/key-escrow";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { Scanner } from "./Scanner";
import { policeView, readers, type Agency, type EscrowAction, type EscrowPageState } from "./useEscrow";

/** Four letters picked by chance. The randomness is made here, in the view, and stored as plain text. */
const randomHalf = () =>
  Array.from({ length: KEY_LENGTH }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");

/** The button that asks one agency for its half. It only works while there is a warrant. */
function AskAgency(props: { state: EscrowPageState; agency: Agency; onAsk: () => void }) {
  const t = useT();
  const { state, agency } = props;
  const name = agency === "one" ? t({ en: "Agency one", vi: "Cơ quan một" }) : t({ en: "Agency two", vi: "Cơ quan hai" });
  if (!state.warrant) {
    return (
      <Button disabled onClick={props.onAsk}>
        {t({ en: <>{name}: no warrant, no half</>, vi: <>{name}: không có lệnh, không giao</> })}
      </Button>
    );
  }
  return (
    <Button primary={!state.released[agency]} disabled={state.released[agency]} onClick={props.onAsk}>
      {state.released[agency]
        ? t({ en: `${name}: half released`, vi: `${name}: đã giao nửa khóa` })
        : t({ en: `${name}: release your half`, vi: `${name}: giao nửa của mình` })}
    </Button>
  );
}

/** The HTML controls of the key escrow page: the warrant, the agencies, the critics' cases and Alice's desk. */
export function EscrowControls({ state, dispatch }: { state: EscrowPageState; dispatch: Dispatch<EscrowAction> }) {
  const t = useT();
  const locale = useLocale();
  return (
    <Controls>
      <Row>
        <Output label={t({ en: "Who can read the message right now", vi: "Ai đọc được tin nhắn lúc này" })}>
          {readers(state, locale)}
        </Output>
        <Output label={t({ en: "What the police see", vi: "Cảnh sát thấy gì" })}>{policeView(state, locale)}</Output>
      </Row>
      <Row>
        <Choice
          label={t({ en: "Warrant from a judge", vi: "Lệnh của tòa án" })}
          value={state.warrant ? "yes" : "no"}
          onChange={(value) => dispatch({ type: "warrant", on: value === "yes" })}
          options={[
            { value: "no", label: t({ en: "No", vi: "Không" }) },
            { value: "yes", label: t({ en: "Yes", vi: "Có" }) },
          ]}
        />
        <AskAgency state={state} agency="one" onAsk={() => dispatch({ type: "release", agency: "one" })} />
        <AskAgency state={state} agency="two" onAsk={() => dispatch({ type: "release", agency: "two" })} />
      </Row>
      <Row>
        <Button onClick={() => dispatch({ type: "leak", agency: "one" })}>
          {t({ en: "An insider at agency one leaks a half", vi: "Người trong cơ quan một làm lộ một nửa" })}
        </Button>
        <Button onClick={() => dispatch({ type: "steal" })}>
          {t({ en: "Both databases are stolen", vi: "Cả hai cơ sở dữ liệu bị đánh cắp" })}
        </Button>
        <Button onClick={() => dispatch({ type: "reset" })}>{t({ en: "Put everything back", vi: "Đặt lại mọi thứ" })}</Button>
      </Row>
      <Row>
        <Choice
          label={t({ en: "The sender uses", vi: "Người gửi dùng" })}
          value={state.escrowed ? "lodged" : "own"}
          onChange={(value) => dispatch({ type: "outlaw", on: value === "own" })}
          options={[
            { value: "lodged", label: t({ en: "The escrowed cipher", vi: "Mật mã có ký gửi khóa" }) },
            { value: "own", label: t({ en: "A cipher that is not escrowed", vi: "Một mật mã không ký gửi khóa" }) },
          ]}
        />
      </Row>
      {!state.sealed && (
        <Row>
          <TextField
            label={t({ en: "Alice's key, 4 letters (a new key starts again)", vi: "Khóa của Alice, 4 chữ (khóa mới thì làm lại từ đầu)" })}
            width="short"
            value={state.key}
            onChange={(text) => dispatch({ type: "rekey", text })}
          />
          <TextField label={t({ en: "Alice's message", vi: "Tin nhắn của Alice" })} value={state.message} onChange={(text) => dispatch({ type: "write", text })} />
          <Button onClick={() => dispatch({ type: "lodge", random: randomHalf() })}>
            {t({ en: "Lodge the key again with new halves", vi: "Ký gửi lại khóa với hai nửa mới" })}
          </Button>
        </Row>
      )}
      <Scanner />
    </Controls>
  );
}
