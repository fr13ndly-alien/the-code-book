import type { Dispatch } from "react";
import { hasLetters, type Kind } from "@codebook/cipher-engine/codebreakers-challenge";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useT, type Bilingual } from "~/i18n";
import styles from "./Bench.module.css";
import { CaesarBench } from "./CaesarBench";
import { SubstitutionBench } from "./SubstitutionBench";
import { VigenereBench } from "./VigenereBench";
import {
  currentIsSolved,
  currentWork,
  isOwn,
  onBench,
  type ChallengeAction,
  type ChallengeState,
} from "./useCodebreakersChallenge";

/** What each kind of cipher is called on the bench. */
const KIND_NAMES: Record<Kind, Bilingual> = {
  caesar: { en: "Caesar shift", vi: "mã Caesar" },
  substitution: { en: "monoalphabetic substitution", vi: "mật mã thay thế đơn bảng" },
  vigenere: { en: "Vigenère cipher", vi: "mật mã Vigenère" },
};

/** The codebreaker's workbench: the cryptogram chosen, and the right tool for its kind of cipher. */
export function CodebreakersChallengeBoard(props: { state: ChallengeState; dispatch: Dispatch<ChallengeAction> }) {
  const t = useT();
  const { state, dispatch } = props;
  const { kind, ciphertext, grouped } = onBench(state);
  const work = currentWork(state);
  const solved = currentIsSolved(state);
  const name = isOwn(state)
    ? t({ en: "Your own cryptogram", vi: "Bức mật thư của riêng bạn" })
    : t({ en: `Cryptogram ${state.current + 1}`, vi: `Bức mật thư ${state.current + 1}` });

  if (!hasLetters(ciphertext)) {
    return (
      <Board>
        <p className={styles.title}>{name}</p>
        <Caption>
          {t({
            en: "Nothing is on the bench yet. Paste a cryptogram into the box in the controls, then pick the kind of cipher you think it is.",
            vi: "Trên bàn chưa có gì. Hãy dán một bức mật thư vào ô trong phần điều khiển, rồi chọn loại mật mã mà bạn nghĩ nó dùng.",
          })}
        </Caption>
      </Board>
    );
  }

  return (
    <Board>
      <p className={styles.title} data-solved={solved}>
        {name}: {t(KIND_NAMES[kind])}
        {solved && t({ en: ". Solved ✓", vi: ". Đã giải được ✓" })}
      </p>
      {kind === "caesar" && (
        <CaesarBench
          ciphertext={ciphertext}
          grouped={grouped}
          shift={work.shift}
          onChoose={(shift) => dispatch({ type: "choose", shift })}
        />
      )}
      {kind === "substitution" && (
        <SubstitutionBench
          ciphertext={ciphertext}
          guesses={work.guesses}
          picked={work.picked}
          onPick={(cipher) => dispatch({ type: "pick", cipher })}
          onAssign={(plain) => dispatch({ type: "assign", plain })}
        />
      )}
      {kind === "vigenere" && (
        <VigenereBench
          ciphertext={ciphertext}
          keyLength={work.keyLength}
          keyShifts={work.keyShifts}
          position={work.position}
          repeat={work.repeat}
          onPickRepeat={(row) => dispatch({ type: "pickRepeat", row })}
        />
      )}
    </Board>
  );
}
