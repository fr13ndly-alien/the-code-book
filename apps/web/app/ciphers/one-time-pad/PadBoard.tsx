import type { ReactNode } from "react";
import { decipher, encipher, padFor, sums } from "@codebook/cipher-engine/one-time-pad";
import { indexOfLetter, inGroups, lettersOnly } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, useT } from "~/i18n";
import styles from "./PadBoard.module.css";
import { ciphertext, plaintext, type PadState } from "./usePad";

/** The sheet of random letters, the sums it makes, and the two ways to test its secrecy. */
export function PadBoard({ state, onPick }: { state: PadState; onPick: (column: number) => void }) {
  const t = useT();
  const cipher = ciphertext(state);
  const plain = plaintext(state);
  const pad = state.pad.slice(0, cipher.length);
  const padLabel = t({ en: "Pad", vi: "Tờ khóa" });
  const message = { label: t({ en: "Message", vi: "Tin nhắn" }), letters: plain };
  const sent = { label: t({ en: "Ciphertext", vi: "Bản mật mã" }), letters: cipher, kind: "cipher" as const };

  return (
    <Board>
      <Sheet pad={state.pad} used={cipher.length} />
      <AlphabetRows
        rows={
          state.mode === "encipher"
            ? [message, { label: padLabel, letters: pad }, sent]
            : [sent, { label: padLabel, letters: pad }, message]
        }
        highlight={state.picked}
        onPick={onPick}
      />
      <Caption>
        <Sum plain={plain} pad={pad} column={state.picked} />
      </Caption>
      {state.claim !== "" && <Claim cipher={cipher} claim={state.claim} />}
      {state.second !== "" && <Reuse state={state} />}
    </Board>
  );
}

/** The sheet in groups of five letters, with the letters this message has used crossed out. */
function Sheet({ pad, used }: { pad: string; used: number }) {
  const t = useT();
  const groups = inGroups(pad).split(" ");
  return (
    <ul className={styles.sheet} aria-label={t({ en: "The top sheet of the pad", vi: "Tờ trên cùng của sổ tay" })}>
      {groups.map((group, at) => {
        const spent = Math.max(0, Math.min(5, used - at * 5));
        return (
          <li key={at}>
            <s>{group.slice(0, spent)}</s>
            {group.slice(spent)}
          </li>
        );
      })}
    </ul>
  );
}

/** The arithmetic for the highlighted letter, in words. */
function Sum({ plain, pad, column }: { plain: string; pad: string; column?: number }) {
  const t = useT();
  const locale = useLocale();
  const sum = column === undefined ? undefined : sums(plain, pad)[column];
  if (!sum)
    return (
      <>
        {t({
          en: "Tap under a letter to see its sum. Each letter has its own pad letter.",
          vi: "Chạm vào dưới một chữ để xem phép cộng của nó. Mỗi chữ có một chữ khóa riêng.",
        })}
      </>
    );
  const key = indexOfLetter(sum.pad);
  if (locale === "vi")
    return (
      <>
        Coi A là 0. <Letters>{sum.plain}</Letters> ({sum.sum - key}) cộng chữ khóa <Letters>{sum.pad}</Letters> ({key})
        bằng {sum.sum}
        {sum.sum >= 26 && `. Vượt quá Z rồi, nên trừ đi 26: ${sum.sum - 26}`}. Chữ mã là <Letters>{sum.cipher}</Letters>.
      </>
    );
  return (
    <>
      Count A as 0. <Letters>{sum.plain}</Letters> ({sum.sum - key}) plus pad <Letters>{sum.pad}</Letters> ({key}) is{" "}
      {sum.sum}
      {sum.sum >= 26 && `. That is past Z, so take away 26: ${sum.sum - 26}`}. The cipher letter is{" "}
      <Letters>{sum.cipher}</Letters>.
    </>
  );
}

/** The proof of secrecy: another message, and the pad that would make the same ciphertext from it. */
function Claim({ cipher, claim }: { cipher: string; claim: string }) {
  const t = useT();
  const other = lettersOnly(claim).slice(0, cipher.length);
  return (
    <Part title={t({ en: "The same ciphertext, a different story", vi: "Cùng một bản mật mã, một câu chuyện khác" })}>
      <AlphabetRows
        rows={[
          { label: t({ en: "Ciphertext", vi: "Bản mật mã" }), letters: cipher.slice(0, other.length), kind: "cipher" },
          { label: t({ en: "Could be", vi: "Có thể là" }), letters: other },
          { label: t({ en: "With pad", vi: "Với tờ khóa" }), letters: padFor(cipher, other) },
        ]}
      />
      <Caption>
        {t({
          en: "This pad is just as likely as the real one. Nothing in the ciphertext says which message is true.",
          vi: "Tờ khóa này cũng có khả năng đúng như tờ thật. Không gì trong bản mật mã cho biết tin nhắn nào là thật.",
        })}
      </Caption>
    </Part>
  );
}

/** The mistake: a second message on the same sheet, and what a guess at the first message does to it. */
function Reuse({ state }: { state: PadState }) {
  const first = ciphertext(state);
  const second = encipher(state.second, state.pad);
  const t = useT();
  const guessedPad = padFor(first, state.claim);
  const second2 = t({ en: "Ciphertext 2", vi: "Bản mật mã 2" });
  return (
    <Part title={t({ en: "A second message on the same sheet", vi: "Tin nhắn thứ hai trên cùng một tờ" })}>
      <AlphabetRows
        rows={[
          { label: t({ en: "Message 2", vi: "Tin nhắn 2" }), letters: lettersOnly(state.second).slice(0, second.length) },
          { label: t({ en: "Same pad", vi: "Cùng tờ khóa" }), letters: state.pad.slice(0, second.length) },
          { label: second2, letters: second, kind: "cipher" },
        ]}
      />
      {guessedPad !== "" && (
        <AlphabetRows
          rows={[
            { label: second2, letters: second.slice(0, guessedPad.length), kind: "cipher" },
            { label: t({ en: "Guessed pad", vi: "Tờ khóa đoán" }), letters: guessedPad.slice(0, second.length) },
            { label: t({ en: "Reads as", vi: "Đọc thành" }), letters: decipher(second, guessedPad) },
          ]}
        />
      )}
      <Caption>
        {guessedPad === ""
          ? t({
              en: 'Type a guess at message 1 in "Another message it could be".',
              vi: "Gõ một phỏng đoán về tin nhắn 1 vào ô “Một tin nhắn khác mà nó có thể là”.",
            })
          : t({
              en: "The guessed pad is tried on ciphertext 2. Real words mean the guess was right. A pad used twice lets a codebreaker check.",
              vi: "Tờ khóa đoán được đem thử trên bản mật mã 2. Ra từ thật nghĩa là đoán đúng. Một tờ khóa dùng hai lần cho phép nhà giải mã kiểm tra.",
            })}
      </Caption>
    </Part>
  );
}

/** One titled section of the board. */
function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className={styles.part}>
      <figcaption>{title}</figcaption>
      {children}
    </figure>
  );
}
