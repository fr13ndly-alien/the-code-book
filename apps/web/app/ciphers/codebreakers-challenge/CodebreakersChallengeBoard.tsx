import type { Dispatch } from "react";
import type { Kind } from "@codebook/cipher-engine/codebreakers-challenge";
import { Board } from "~/components/sim/Board";
import styles from "./Bench.module.css";
import { CaesarBench } from "./CaesarBench";
import { SubstitutionBench } from "./SubstitutionBench";
import { VigenereBench } from "./VigenereBench";
import {
  currentCryptogram,
  currentIsSolved,
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
  const cryptogram = currentCryptogram(state);
  const solved = currentIsSolved(state);

  return (
    <Board>
      <p className={styles.title} data-solved={solved}>
        Cryptogram {cryptogram.number}: {KIND_NAMES[cryptogram.kind]}
        {solved && ". Solved ✓"}
      </p>
      {cryptogram.kind === "caesar" && (
        <CaesarBench
          cryptogram={cryptogram}
          shift={state.shifts[state.current]!}
          onChoose={(shift) => dispatch({ type: "choose", shift })}
        />
      )}
      {cryptogram.kind === "substitution" && (
        <SubstitutionBench
          cryptogram={cryptogram}
          guesses={state.guesses}
          picked={state.picked}
          onPick={(cipher) => dispatch({ type: "pick", cipher })}
          onAssign={(plain) => dispatch({ type: "assign", plain })}
        />
      )}
      {cryptogram.kind === "vigenere" && (
        <VigenereBench
          cryptogram={cryptogram}
          keyLength={state.keyLength}
          keyShifts={state.keyShifts}
          position={state.position}
          repeat={state.repeat}
          onPickRepeat={(row) => dispatch({ type: "pickRepeat", row })}
        />
      )}
    </Board>
  );
}
