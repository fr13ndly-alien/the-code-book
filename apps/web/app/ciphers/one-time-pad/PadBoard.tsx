import type { ReactNode } from "react";
import { decipher, encipher, padFor, sums } from "@codebook/cipher-engine/one-time-pad";
import { indexOfLetter, inGroups, lettersOnly } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import styles from "./PadBoard.module.css";
import { ciphertext, plaintext, type PadState } from "./usePad";

/** The sheet of random letters, the sums it makes, and the two ways to test its secrecy. */
export function PadBoard({ state, onPick }: { state: PadState; onPick: (column: number) => void }) {
  const cipher = ciphertext(state);
  const plain = plaintext(state);
  const pad = state.pad.slice(0, cipher.length);
  const message = { label: "Message", letters: plain };
  const sent = { label: "Ciphertext", letters: cipher, kind: "cipher" as const };

  return (
    <Board>
      <Sheet pad={state.pad} used={cipher.length} />
      <AlphabetRows
        rows={
          state.mode === "encipher"
            ? [message, { label: "Pad", letters: pad }, sent]
            : [sent, { label: "Pad", letters: pad }, message]
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
  const groups = inGroups(pad).split(" ");
  return (
    <ul className={styles.sheet} aria-label="The top sheet of the pad">
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
  const sum = column === undefined ? undefined : sums(plain, pad)[column];
  if (!sum) return <>Tap under a letter to see its sum. Each letter has its own pad letter.</>;
  const key = indexOfLetter(sum.pad);
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
  const other = lettersOnly(claim).slice(0, cipher.length);
  return (
    <Part title="The same ciphertext, a different story">
      <AlphabetRows
        rows={[
          { label: "Ciphertext", letters: cipher.slice(0, other.length), kind: "cipher" },
          { label: "Could be", letters: other },
          { label: "With pad", letters: padFor(cipher, other) },
        ]}
      />
      <Caption>
        This pad is just as likely as the real one. Nothing in the ciphertext says which message is true.
      </Caption>
    </Part>
  );
}

/** The mistake: a second message on the same sheet, and what a guess at the first message does to it. */
function Reuse({ state }: { state: PadState }) {
  const first = ciphertext(state);
  const second = encipher(state.second, state.pad);
  const guessedPad = padFor(first, state.claim);
  return (
    <Part title="A second message on the same sheet">
      <AlphabetRows
        rows={[
          { label: "Message 2", letters: lettersOnly(state.second).slice(0, second.length) },
          { label: "Same pad", letters: state.pad.slice(0, second.length) },
          { label: "Ciphertext 2", letters: second, kind: "cipher" },
        ]}
      />
      {guessedPad !== "" && (
        <AlphabetRows
          rows={[
            { label: "Ciphertext 2", letters: second.slice(0, guessedPad.length), kind: "cipher" },
            { label: "Guessed pad", letters: guessedPad.slice(0, second.length) },
            { label: "Reads as", letters: decipher(second, guessedPad) },
          ]}
        />
      )}
      <Caption>
        {guessedPad === ""
          ? 'Type a guess at message 1 in "Another message it could be".'
          : "The guessed pad is tried on ciphertext 2. Real words mean the guess was right. A pad used twice lets a codebreaker check."}
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
