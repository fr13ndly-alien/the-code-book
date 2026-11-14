import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { BreakerDesk } from "./BreakerDesk";
import { ClerkDesk } from "./ClerkDesk";
import { progress, type ZimmermannState } from "./useZimmermann";

/** The clerk's desk (a codebook and a telegram form) or the codebreaker's (intercepts and guesses). */
export function ZimmermannBoard(props: {
  state: ZimmermannState;
  onTap: (word: string) => void;
  onPick: (group: number) => void;
  onGuess: (word: string) => void;
}) {
  const { state } = props;
  return (
    <Board>
      {state.mode === "encode" ? (
        <ClerkDesk words={state.words} onTap={props.onTap} />
      ) : (
        <BreakerDesk state={state} onPick={props.onPick} onGuess={props.onGuess} />
      )}
      <Caption>{captionFor(state)}</Caption>
    </Board>
  );
}

function captionFor(state: ZimmermannState) {
  if (state.mode === "encode") return "Each word leaves the desk as one group of figures. Groups marked * are made up.";
  const { right, made, toFind } = progress(state);
  if (right === toFind) return "Every group is right. You have rebuilt the codebook, and all four telegrams read clearly.";
  if (made === 0) return "Tap a group marked ? and then the word you think it stands for.";
  return `${right} of your ${made} guesses fit the real codebook. There are ${toFind} groups to find.`;
}
