import type { Dispatch } from "react";
import { hasLetters, type Kind } from "@codebook/cipher-engine/codebreakers-challenge";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
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
const KIND_NAMES: Record<Kind, string> = {
  caesar: "Caesar shift",
  substitution: "monoalphabetic substitution",
  vigenere: "Vigenère cipher",
};

/** The codebreaker's workbench: the cryptogram chosen, and the right tool for its kind of cipher. */
export function CodebreakersChallengeBoard(props: { state: ChallengeState; dispatch: Dispatch<ChallengeAction> }) {
  const { state, dispatch } = props;
  const { kind, ciphertext, grouped } = onBench(state);
  const work = currentWork(state);
  const solved = currentIsSolved(state);
  const name = isOwn(state) ? "Your own cryptogram" : `Cryptogram ${state.current + 1}`;

  if (!hasLetters(ciphertext)) {
    return (
      <Board>
        <p className={styles.title}>{name}</p>
        <Caption>
          Nothing is on the bench yet. Paste a cryptogram into the box in the controls, then pick the kind of cipher
          you think it is.
        </Caption>
      </Board>
    );
  }

  return (
    <Board>
      <p className={styles.title} data-solved={solved}>
        {name}: {KIND_NAMES[kind]}
        {solved && ". Solved ✓"}
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
