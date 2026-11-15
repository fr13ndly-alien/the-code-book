import { KEY_COUNT, squeeze } from "@codebook/cipher-engine/keyword-substitution";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useT } from "~/i18n";
import { alphabet, type KeywordState } from "./useKeyword";

/** How the keyword became the start of the cipher alphabet, in words. */
function KeywordCaption({ keyword }: { keyword: string }) {
  const t = useT();
  const start = squeeze(keyword);
  if (start === "")
    return (
      <Caption>
        {t({
          en: "No keyword yet, so the cipher alphabet is the plain one. Type a keyword.",
          vi: "Chưa có từ khóa, nên bảng chữ mã giống hệt bảng chữ rõ. Hãy gõ một từ khóa.",
        })}
      </Caption>
    );
  return (
    <Caption>
      {t({
        en: (
          <>
            Without spaces and repeated letters the keyword is <Letters>{start}</Letters>. It starts the cipher alphabet. The
            unused letters follow in order, beginning after <Letters>{start.at(-1)}</Letters>.
          </>
        ),
        vi: (
          <>
            Bỏ dấu cách và các chữ lặp lại, từ khóa còn <Letters>{start}</Letters>. Nó đứng đầu bảng chữ mã. Các chữ chưa
            dùng nối theo thứ tự, bắt đầu từ sau chữ <Letters>{start.at(-1)}</Letters>.
          </>
        ),
      })}
    </Caption>
  );
}

/** The plain alphabet above the cipher alphabet that the keyword builds. */
export function KeywordBoard({ state, onPick }: { state: KeywordState; onPick: (column: number) => void }) {
  const t = useT();
  const cipher = alphabet(state);
  const column = state.picked ?? 0;

  return (
    <Board>
      <AlphabetRows
        rows={[
          { label: t({ en: "Plain", vi: "Rõ" }), letters: ALPHABET },
          { label: t({ en: "Cipher", vi: "Mã" }), letters: cipher, kind: "cipher" },
        ]}
        highlight={state.picked}
        onPick={onPick}
      />
      <Caption>
        {t({
          en: (
            <>
              Plain <Letters>{ALPHABET[column]}</Letters> becomes cipher <Letters>{cipher[column]}</Letters>. Tap under a
              letter to follow it.
            </>
          ),
          vi: (
            <>
              Chữ rõ <Letters>{ALPHABET[column]}</Letters> thành chữ mã <Letters>{cipher[column]}</Letters>. Chạm vào ô
              dưới một chữ để lần theo nó.
            </>
          ),
        })}
      </Caption>
      <KeywordCaption keyword={state.keyword} />
      <Caption>
        {t({
          en: <>This is one of {KEY_COUNT} possible cipher alphabets.</>,
          vi: <>Đây là một trong {KEY_COUNT.replaceAll(",", ".")} bảng chữ mã có thể có.</>,
        })}
      </Caption>
    </Board>
  );
}
