import { compare, type Photon } from "@codebook/cipher-engine/quantum";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { PhotonTable } from "./PhotonTable";
import { MEASURED, photons, type QuantumState } from "./useQuantum";

/** What has just happened at each stage, for readers who never open the story. */
const CAPTIONS = [
  "",
  "Alice picks a bit and a scheme at random for each photon. The arrow shows how the photon is polarised.",
  "Bob picks a detector at random. The right one reads Alice's bit. The wrong one reads 0 or 1 by chance.",
  "Alice and Bob tell each other their schemes, never their bits. They keep the photons where the two match.",
  "They read half the kept bits aloud. If all agree, nobody measured the photons, and the rest is their key.",
];

const name = (scheme: Photon["aliceScheme"]) => (scheme === "+" ? "+" : "×");

/** What Eve did to one photon, in a sentence. */
function eveSentence(photon: Photon): string {
  if (!photon.eve) return "";
  const right = photon.eve.scheme === photon.aliceScheme;
  return right
    ? ` Eve used ${name(photon.eve.scheme)}, the right detector, and passed it on unchanged.`
    : ` Eve used ${name(photon.eve.scheme)}, the wrong detector. She read ${photon.eve.bit} by chance and sent on a new photon in her scheme.`;
}

/** What Bob made of one photon, in a sentence. */
function bobSentence(photon: Photon): string {
  if (!photon.kept) return ` Bob used ${name(photon.bobScheme)}, a different scheme, so this photon is thrown away.`;
  const verdict = photon.wrong ? "but his bit is wrong: somebody disturbed the photon" : "and his bit is right";
  return ` Bob used ${name(photon.bobScheme)}, the same scheme, ${verdict}.`;
}

/** The story of the photon the reader tapped. */
function describe(photon: Photon, number: number, state: QuantumState): string {
  const start = `Photon ${number}: Alice sent ${photon.aliceBit} in the ${name(photon.aliceScheme)} scheme.`;
  const eve = state.eveHidden ? "" : eveSentence(photon);
  return start + eve + (state.stage >= MEASURED ? bobSentence(photon) : "");
}

/** The exchange as a table of photons, with a caption for the step or for the photon picked. */
export function QuantumBoard({ state, onPick }: { state: QuantumState; onPick: (column: number) => void }) {
  const all = photons(state);
  const picked = state.picked === undefined ? undefined : all[state.picked];

  return (
    <Board>
      <PhotonTable
        photons={all}
        result={compare(all)}
        stage={state.stage}
        showEve={state.eve && !state.eveHidden}
        picked={state.picked}
        onPick={onPick}
      />
      <Caption>
        {picked ? describe(picked, state.picked! + 1, state) : `${CAPTIONS[state.stage]} Tap a number to follow one photon.`}
      </Caption>
    </Board>
  );
}
