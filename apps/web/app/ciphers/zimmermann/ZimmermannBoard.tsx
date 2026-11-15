import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, type Locale } from "~/i18n";
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
  const locale = useLocale();
  return (
    <Board>
      {state.mode === "encode" ? (
        <ClerkDesk words={state.words} onTap={props.onTap} />
      ) : (
        <BreakerDesk state={state} onPick={props.onPick} onGuess={props.onGuess} />
      )}
      <Caption>{captionFor(state, locale)}</Caption>
    </Board>
  );
}

function captionFor(state: ZimmermannState, locale: Locale) {
  if (locale === "vi") {
    if (state.mode === "encode")
      return "Mỗi từ rời bàn làm việc thành một nhóm chữ số. Các nhóm có dấu * là do chúng tôi tự đặt.";
    const { right, made, toFind } = progress(state);
    if (right === toFind)
      return "Nhóm nào cũng đúng. Bạn đã dựng lại sổ mã, và cả bốn bức điện đều đọc được rõ ràng.";
    if (made === 0) return "Chạm vào một nhóm có dấu ? rồi chạm vào từ mà bạn nghĩ nó thay cho.";
    return `${right} trên ${made} phỏng đoán của bạn khớp với sổ mã thật. Có ${toFind} nhóm cần tìm.`;
  }
  if (state.mode === "encode") return "Each word leaves the desk as one group of figures. Groups marked * are made up.";
  const { right, made, toFind } = progress(state);
  if (right === toFind) return "Every group is right. You have rebuilt the codebook, and all four telegrams read clearly.";
  if (made === 0) return "Tap a group marked ? and then the word you think it stands for.";
  return `${right} of your ${made} guesses fit the real codebook. There are ${toFind} groups to find.`;
}
