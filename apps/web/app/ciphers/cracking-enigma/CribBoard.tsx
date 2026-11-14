import { clashes, ROTOR_POSITIONS } from "@codebook/cipher-engine/cracking-enigma";
import { letterAt, lettersOnly } from "@codebook/cipher-engine/text";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import type { CrackState } from "./useCrack";

const TESTED = ROTOR_POSITIONS.toLocaleString("en");

/** Turing's working: the crib laid under the ciphertext, the clashes, and the result of the search. */
export function CribBoard({ state }: { state: CrackState }) {
  const cipher = [...lettersOnly(state.ciphertext)];
  const { crib, offset, stops } = state;
  const clashing = clashes(state.ciphertext, crib, offset).map((at) => at + offset);
  const underCrib = (column: number) => column >= offset && column < offset + crib.length;
  const found = stops?.[0];
  const rows = [cipher, cipher.map((_, column) => (underCrib(column) ? crib[column - offset]! : ""))];

  return (
    <>
      <LetterGrid
        label="The crib under the ciphertext"
        size="small"
        rowHeads={found ? ["Ciphertext", "Crib", "Message"] : ["Ciphertext", "Crib"]}
        cells={found ? [...rows, [...found.plaintext]] : rows}
        mark={(row, column) => {
          if (row < 2 && clashing.includes(column)) return "on";
          return row !== 1 && underCrib(column) ? "cipher" : undefined;
        }}
      />
      <Caption>
        {clashing.length > 0 ? (
          <>
            <Letters>{cipher[clashing[0]!]}</Letters> sits under <Letters>{cipher[clashing[0]!]}</Letters>. Enigma never
            turns a letter into itself, so the crib cannot be here. Slide it along.
          </>
        ) : !stops ? (
          <>No letter sits under itself. The crib could be here. Test the rotor settings to find out.</>
        ) : found ? (
          <>
            {TESTED} rotor settings tested. With <Letters>{found.start.map(letterAt).join(" ")}</Letters> in the
            windows, the machine turns these letters into <Letters>{crib}</Letters>. Read the whole message in the
            bottom row.
          </>
        ) : (
          <>
            {TESTED} rotor settings tested. Not one turns these letters into <Letters>{crib}</Letters>. The crib is in
            the wrong place. Slide it along.
          </>
        )}
      </Caption>
    </>
  );
}
