import { digestWorking, sign } from "@codebook/cipher-engine/digital-signatures";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, useT } from "~/i18n";
import { Desk, Line, Working } from "./Desk";
import { ALICE, check, verdict, type SignaturesState } from "./useSignatures";

/** Alice's side: the digest of her message, worked out symbol by symbol, and the signature it gives. */
function AliceDesk({ message }: { message: string }) {
  const t = useT();
  const working = digestWorking(message, ALICE.n);
  return (
    <Desk title={t({ en: "Alice", vi: "Alice" })} note={t({ en: "signs", vi: "ký" })}>
      <Line label={t({ en: "Private key, which only Alice knows", vi: "Khóa riêng, chỉ Alice biết" })} secret>
        d = {ALICE.d}
      </Line>
      <Working
        label={t({ en: "Turning the message into numbers", vi: "Đổi tin nhắn thành các con số" })}
        rows={[
          { label: t({ en: "Message", vi: "Tin nhắn" }), cells: working.symbols },
          { label: t({ en: "As numbers", vi: "Thành số" }), cells: working.codes },
        ]}
      />
      <Line
        label={t({
          en: `Toy digest: add them up, keep the remainder after dividing by ${ALICE.n}`,
          vi: `Bản tóm tắt đồ chơi: cộng tất cả lại, giữ số dư khi chia cho ${ALICE.n}`,
        })}
      >
        {working.digest}
      </Line>
      <Line
        label={t({
          en: `Signature: digest to the power ${ALICE.d}, mod ${ALICE.n}`,
          vi: `Chữ ký: bản tóm tắt lũy thừa ${ALICE.d}, mod ${ALICE.n}`,
        })}
        secret
      >
        {sign(message, ALICE)}
      </Line>
    </Desk>
  );
}

/** What travels: the message in plain sight, and the signature beside it. */
function PostDesk({ state }: { state: SignaturesState }) {
  const t = useT();
  const locale = useLocale();
  return (
    <Desk title={t({ en: "On the way", vi: "Trên đường đi" })} note={t({ en: "anyone can read it, or change it", vi: "ai cũng đọc được, hoặc sửa được" })}>
      <Line label={t({ en: "Message", vi: "Tin nhắn" })}>{state.arrived || t({ en: "nothing sent yet", vi: "chưa gửi gì" })}</Line>
      <Line label={t({ en: "Signature", vi: "Chữ ký" })} secret>
        {state.signature ?? t({ en: "none", vi: "không có" })}
      </Line>
      {state.tries !== null && (
        <Line label={t({ en: "A forger found this signature by trying", vi: "Kẻ giả mạo tìm ra chữ ký này sau khi thử" })}>
          {t({ en: <>{state.tries} numbers</>, vi: <>{state.tries.toLocaleString(locale)} con số</> })}
        </Line>
      )}
    </Desk>
  );
}

/** Bob's side: he works out the digest himself, opens the signature, and compares. */
function BobDesk({ state }: { state: SignaturesState }) {
  const t = useT();
  const locale = useLocale();
  const result = check(state);
  return (
    <Desk title={t({ en: "Bob", vi: "Bob" })} note={t({ en: "checks", vi: "kiểm tra" })}>
      <Line label={t({ en: "Alice's public key, which everyone has", vi: "Khóa công khai của Alice, ai cũng có" })}>
        N = {ALICE.n}, e = {ALICE.e}
      </Line>
      <Line label={t({ en: "Toy digest of the message that arrived", vi: "Bản tóm tắt đồ chơi của tin nhắn đến nơi" })}>
        {digestWorking(state.arrived, ALICE.n).digest}
      </Line>
      <Line label={t({ en: `Signature to the power ${ALICE.e}, mod ${ALICE.n}`, vi: `Chữ ký lũy thừa ${ALICE.e}, mod ${ALICE.n}` })}>
        {result ? result.opened : t({ en: "no signature", vi: "không có chữ ký" })}
      </Line>
      <Line label={t({ en: "Verdict", vi: "Kết luận" })} secret>
        {verdict(state, locale)}
      </Line>
    </Desk>
  );
}

/** A signature's journey as three desks: Alice signs, the note travels, Bob checks. */
export function SignaturesBoard({ state }: { state: SignaturesState }) {
  const t = useT();
  return (
    <Board>
      <AliceDesk message={state.message} />
      <PostDesk state={state} />
      <BobDesk state={state} />
      <Caption>
        {t({
          en: "Everything here is a toy. A real digest comes from a hash function, and real keys are hundreds of digits long.",
          vi: "Mọi thứ ở đây chỉ là đồ chơi. Bản tóm tắt thật do một hàm băm tạo ra, và khóa thật dài hàng trăm chữ số.",
        })}
      </Caption>
    </Board>
  );
}
