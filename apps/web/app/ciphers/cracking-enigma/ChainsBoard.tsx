import { chains } from "@codebook/cipher-engine/cracking-enigma";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption } from "~/components/sim/Caption";
import styles from "./CrackBoard.module.css";
import { openings, table, type CrackState } from "./useCrack";

/** The names of the six opening letters. */
const PLACES = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

/** Rejewski's working: the day's message openings, the table made from them, and its chains. */
export function ChainsBoard({ state, onPick }: { state: CrackState; onPick: (column: number) => void }) {
  const { pair, picked } = state;
  const links = table(state);
  const followed = picked === undefined ? undefined : ALPHABET[picked];

  return (
    <>
      {!state.table && (
        <ul className={styles.openings} aria-label="The first six letters of today's messages">
          {openings(state).map((opening) => (
            <li key={opening}>
              {[...opening].map((letter, at) => (at % 3 === pair ? <b key={at}>{letter}</b> : letter))}
            </li>
          ))}
        </ul>
      )}
      <AlphabetRows
        rows={[
          { label: `${PLACES[pair]} letter`, letters: ALPHABET },
          { label: `${PLACES[pair + 3]} letter`, letters: links, kind: "cipher" },
        ]}
        highlight={picked}
        onPick={onPick}
      />
      <ol className={styles.chains} aria-label="Chains">
        {chains(links).map((chain) => (
          <li key={chain} data-on={followed !== undefined && chain.includes(followed)}>
            {[...chain, chain[0]].join(" → ")}
            <span>{chain.length === 1 ? "1 link" : `${chain.length} links`}</span>
          </li>
        ))}
      </ol>
      <Caption>
        {state.table
          ? "This is the finished table printed in the book. The book does not give the day key behind it. Turn a " +
            "rotor or pull a cable to go back to today's messages."
          : "Each chain goes from a top letter to the one below it, then on from there, until it comes home. Pull a " +
            "cable and the letters change but the lengths stay. Turn a rotor and the lengths change."}
      </Caption>
    </>
  );
}
