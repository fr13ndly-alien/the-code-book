import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useT, type Bilingual } from "~/i18n";
import { AliceDesk } from "./AliceDesk";
import { BobDesk } from "./BobDesk";
import { EnvelopeDesk } from "./EnvelopeDesk";
import { EveDesk } from "./EveDesk";
import type { PgpState } from "./usePgp";

/** What has just happened at each stage, for readers who never open the story. */
const CAPTIONS: Bilingual[] = [
  {
    en: "Alice has written a message for Bob. Nothing is locked yet.",
    vi: "Alice đã viết một bức thư cho Bob. Chưa có gì được mã hóa.",
  },
  {
    en: "Alice's computer picks a session key at random. It will be used for this message only.",
    vi: "Máy tính của Alice chọn ngẫu nhiên một khóa phiên. Khóa này chỉ dùng cho bức thư này.",
  },
  {
    en: "The fast lock: each letter of the message is shifted by a letter of the session key.",
    vi: "Mật mã nhanh: mỗi chữ của bức thư được dịch theo một chữ của khóa phiên.",
  },
  {
    en: "The slow lock: each letter of the session key becomes a number, locked with Bob's public key.",
    vi: "Mật mã chậm: mỗi chữ của khóa phiên thành một con số, dùng chìa khóa công khai của Bob để mã hóa.",
  },
  {
    en: "Both locked parts travel together. Bob's private key stays at home.",
    vi: "Hai phần đã mã hóa được gửi đi cùng nhau. Chìa khóa riêng của Bob vẫn ở nhà.",
  },
  {
    en: "Bob's private key turns part 2 back into the session key.",
    vi: "Chìa khóa riêng của Bob biến phần 2 trở lại thành khóa phiên.",
  },
  {
    en: "The session key turns part 1 back into the message. Only Bob could do both steps.",
    vi: "Khóa phiên biến phần 1 trở lại thành bức thư. Chỉ Bob làm được cả hai bước.",
  },
];

const EVE_CAPTION: Bilingual = {
  en: "Eve can copy everything that travels. Without d she cannot unlock part 2, so she cannot unlock part 1.",
  vi: "Eve chép được mọi thứ được gửi đi. Không có d, cô không giải mã được phần 2, nên cũng không giải mã được phần 1.",
};
const CRACKED_CAPTION: Bilingual = {
  en: "A toy N is easy to split. A real one is hundreds of digits long, and nobody knows a quick way.",
  vi: "Số N đồ chơi thì dễ tách. Số N thật dài hàng trăm chữ số, và không ai biết cách tách nhanh.",
};

/** The hybrid scheme as three desks: Alice's, the envelope and Bob's. Or Eve's desk alone. */
export function PgpBoard({ state }: { state: PgpState }) {
  const t = useT();
  if (state.viewer === "eve") {
    return (
      <Board>
        <EveDesk state={state} />
        <Caption>{t(state.cracked ? CRACKED_CAPTION : EVE_CAPTION)}</Caption>
      </Board>
    );
  }
  return (
    <Board>
      <AliceDesk state={state} />
      <EnvelopeDesk state={state} />
      <BobDesk state={state} />
      <Caption>
        {t(CAPTIONS[state.stage]!)}{" "}
        {t({
          en: "These are toy locks: real PGP used a cipher called IDEA and far bigger numbers.",
          vi: "Đây chỉ là mật mã đồ chơi: PGP thật dùng một mật mã tên là IDEA và những con số lớn hơn nhiều.",
        })}
      </Caption>
    </Board>
  );
}
