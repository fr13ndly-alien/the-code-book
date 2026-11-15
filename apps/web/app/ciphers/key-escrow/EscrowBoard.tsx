import {
  ciphertext,
  cleanKey,
  keyInUse,
  lodged,
  whatPoliceCanRead,
  whatThiefCanRead,
} from "@codebook/cipher-engine/key-escrow";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useT, type Bilingual } from "~/i18n";
import { Desk, Line, Working } from "./Desk";
import { numbered } from "./numbered";
import { ReaderDesk } from "./ReaderDesk";
import type { Agency, EscrowPageState } from "./useEscrow";

/** Alice's side: her key, the sum that splits it, and her message. Covered during the challenge. */
function AliceDesk({ state }: { state: EscrowPageState }) {
  const t = useT();
  if (state.sealed) {
    return (
      <Desk title={t({ en: "Alice", vi: "Alice" })} note={t({ en: "has lodged a key", vi: "đã gửi giao kèo một chìa khóa" })}>
        <Line label={t({ en: "Her desk", vi: "Bàn của cô" })}>
          {t({ en: "covered: you are the police now", vi: "bị che: giờ bạn là cảnh sát" })}
        </Line>
      </Desk>
    );
  }
  const halves = lodged(state);
  return (
    <Desk
      title={t({ en: "Alice", vi: "Alice" })}
      note={t({ en: "lodges her key, then writes to Bob", vi: "gửi giao kèo chìa khóa, rồi viết cho Bob" })}
    >
      <Working
        label={t({ en: "Splitting the key in two", vi: "Chia chìa khóa làm đôi" })}
        rows={[
          { label: t({ en: "Her key", vi: "Chìa khóa của cô" }), cells: numbered(cleanKey(state.key)), secret: true },
          {
            label: t({ en: "Half one: letters picked by chance", vi: "Nửa thứ nhất: các chữ chọn ngẫu nhiên" }),
            cells: numbered(halves.one),
          },
          {
            label: t({ en: "Half two: key minus half one", vi: "Nửa thứ hai: chìa khóa trừ nửa thứ nhất" }),
            cells: numbered(halves.two),
          },
        ]}
      />
      <Line label={t({ en: "How to count", vi: "Cách đếm" })}>
        {t({ en: "A is 0 and Z is 25. Below 0, add 26.", vi: "A là 0 và Z là 25. Dưới 0 thì cộng 26." })}
      </Line>
      {!state.escrowed && (
        <Line label={t({ en: "Her own key, which she never lodged", vi: "Chìa khóa của riêng cô, chưa bao giờ gửi giao kèo" })} secret>
          {keyInUse(state)}
        </Line>
      )}
      <Line label={t({ en: "Message to Bob", vi: "Tin nhắn cho Bob" })}>
        {state.message || t({ en: "nothing yet", vi: "chưa có gì" })}
      </Line>
    </Desk>
  );
}

/** Where an agency's half is now, in words. */
function status(state: EscrowPageState, agency: Agency): Bilingual {
  const released = state.warrant && state.released[agency];
  if (released && state.stolen[agency]) {
    return { en: "released to the police, and a thief has a copy", vi: "đã giao cho cảnh sát, và một kẻ trộm có bản sao" };
  }
  if (released) return { en: "released to the police under the warrant", vi: "đã giao cho cảnh sát theo lệnh của tòa án" };
  if (state.stolen[agency]) return { en: "a thief has a copy", vi: "một kẻ trộm có bản sao" };
  return state.warrant
    ? { en: "locked away, waiting to be asked", vi: "đang cất kỹ, chờ được hỏi" }
    : { en: "locked away: no warrant, no release", vi: "đang cất kỹ: không có lệnh thì không giao" };
}

/** One of the two agencies: the half it stores and where that half has gone. */
function AgencyDesk({ state, agency }: { state: EscrowPageState; agency: Agency }) {
  const t = useT();
  const out = (state.warrant && state.released[agency]) || state.stolen[agency];
  return (
    <Desk
      title={agency === "one" ? t({ en: "Agency one", vi: "Cơ quan một" }) : t({ en: "Agency two", vi: "Cơ quan hai" })}
      note={t({ en: "stores half the key", vi: "cất giữ một nửa chìa khóa" })}
    >
      <Line
        label={t({
          en: `Half ${agency} in its database`,
          vi: `${agency === "one" ? "Nửa thứ nhất" : "Nửa thứ hai"} trong cơ sở dữ liệu của nó`,
        })}
        secret
      >
        {state.sealed && !out ? t({ en: "hidden", vi: "bị giấu" }) : lodged(state)[agency]}
      </Line>
      <Line label={t({ en: "Where it is", vi: "Nó đang ở đâu" })}>{t(status(state, agency))}</Line>
    </Desk>
  );
}

/** Key escrow as desks: Alice lodges a key, two agencies hold the halves, the police ask for them. */
export function EscrowBoard({ state }: { state: EscrowPageState }) {
  const t = useT();
  const thief = whatThiefCanRead(state);
  return (
    <Board>
      <AliceDesk state={state} />
      <AgencyDesk state={state} agency="one" />
      <AgencyDesk state={state} agency="two" />
      <Desk title={t({ en: "On the wire", vi: "Trên đường dây" })} note={t({ en: "anyone can copy it", vi: "ai cũng chép được" })}>
        <Line
          label={
            state.escrowed
              ? t({ en: "Ciphertext, made with the lodged key", vi: "Bản mật mã, làm bằng chìa khóa đã gửi giao kèo" })
              : t({ en: "Ciphertext, made with a key nobody lodged", vi: "Bản mật mã, làm bằng một chìa khóa không ai gửi giao kèo" })
          }
          secret
        >
          {ciphertext(state)}
        </Line>
      </Desk>
      <ReaderDesk
        title={t({ en: "The police", vi: "Cảnh sát" })}
        note={t({ en: "want to read it", vi: "muốn đọc nó" })}
        reading={whatPoliceCanRead(state)}
      >
        <Line label={t({ en: "Warrant from a judge", vi: "Lệnh của tòa án" })}>
          {state.warrant ? t({ en: "yes", vi: "có" }) : t({ en: "no", vi: "không" })}
        </Line>
      </ReaderDesk>
      {(thief.one ?? thief.two) && (
        <ReaderDesk
          title={t({ en: "A thief", vi: "Một kẻ trộm" })}
          note={t({ en: "has no warrant and needs none", vi: "không có lệnh và cũng chẳng cần" })}
          reading={thief}
        />
      )}
      <Caption>
        {t({
          en: "Everything here is a toy. A real escrowed key was a long binary number sealed inside a chip, not four letters.",
          vi: "Mọi thứ ở đây chỉ là đồ chơi. Một chìa khóa giao kèo thật là một số nhị phân dài, niêm kín trong một con chip, chứ không phải bốn chữ cái.",
        })}
      </Caption>
    </Board>
  );
}
