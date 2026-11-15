import {
  POSES,
  encipher,
  isSolved,
  tally,
  type Figure,
} from "@codebook/cipher-engine/dancing-men";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { Board } from "~/components/sim/Board";
import { Caption, Letters } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import { DancedMessage } from "./DancedMessage";
import { FigureTiles } from "./FigureTiles";
import { LetterPicker } from "./LetterPicker";
import type { DancingMenState } from "./useDancingMen";
import { VerneSteps } from "./VerneSteps";
import { describePose } from "./vi";

/** The pose key: all 26 figures of our set, each over its letter. */
const KEY_TILES = [...ALPHABET].map((letter) => ({ letter, pose: POSES[letter]!, under: letter }));

interface BoardProps {
  state: DancingMenState;
  onPick: (letter: string) => void;
  onAssign: (plain: string) => void;
}

/** The simulator of the page: a danced message with its key, Holmes's desk, or Verne's parchment. */
export function DancingMenBoard(props: BoardProps) {
  const { mode } = props.state;
  return (
    <Board>
      {mode === "dance" && <DanceBoard {...props} />}
      {mode === "desk" && <DeskBoard {...props} />}
      {mode === "verne" && <VerneSteps text={props.state.verneText} step={props.state.verneStep} />}
    </Board>
  );
}

/** A message in dancing men above the key that reads it. */
function DanceBoard({ state, onPick }: BoardProps) {
  const t = useT();
  const locale = useLocale();
  const figures = encipher(state.text);
  return (
    <>
      <DancedMessage
        figures={figures}
        letterUnder={(figure) => (state.hidden ? undefined : figure.letter)}
        picked={state.picked}
        onPick={onPick}
      />
      <Caption>{danceNote(state, figures, locale)}</Caption>
      <FigureTiles
        title={t({
          en: "The key: our own 26 poses, in the spirit of the story. They are not Conan Doyle's drawings.",
          vi: "Khóa: 26 tư thế do chúng tôi tự vẽ, theo tinh thần câu chuyện. Đây không phải hình vẽ của Conan Doyle.",
        })}
        tiles={KEY_TILES}
        picked={state.picked}
        onPick={onPick}
      />
    </>
  );
}

/** What the board says about the figure the reader tapped in a danced message. */
function danceNote(state: DancingMenState, figures: Figure[], locale: Locale) {
  const vi = locale === "vi";
  if (figures.length === 0)
    return vi ? "Gõ một tin nhắn ở phần điều khiển và xem nó nhảy múa." : "Type a message in the controls and watch it dance.";
  if (!state.picked)
    return vi
      ? "Chạm vào một hình nhân. Lá cờ trên tay nghĩa là một từ kết thúc ở đó."
      : "Tap a dancing man. A flag in his hand means a word ends there.";
  if (state.hidden)
    return vi
      ? "Cũng hình nhân đó đang sáng trong khóa bên dưới. Đọc chữ của nó ở đó."
      : "The same figure is bright in the key below. Read his letter there.";
  const count = figures.filter((figure) => figure.letter === state.picked).length;
  if (vi)
    return (
      <>
        <Letters>{state.picked}</Letters> luôn nhảy cùng một kiểu: {describePose(POSES[state.picked]!, locale)}. Ở đây
        nó xuất hiện {count} lần. Lá cờ chỉ đánh dấu chỗ kết thúc một từ.
      </>
    );
  return (
    <>
      <Letters>{state.picked}</Letters> always dances the same way: {describePose(POSES[state.picked]!, locale)}. He appears{" "}
      {count} {count === 1 ? "time" : "times"} here. A flag only marks the end of a word.
    </>
  );
}

/** Holmes's desk: the count of each figure, the letters to try, and the message filling in. */
function DeskBoard({ state, onPick, onAssign }: BoardProps) {
  const t = useT();
  const locale = useLocale();
  const figures = encipher(state.text);
  const { guesses, picked } = state;
  const tiles = tally(figures).map(({ letter, pose, count }) => ({
    letter,
    pose,
    under: guesses[letter] ? `${count} ${guesses[letter]}` : String(count),
  }));
  return (
    <>
      <FigureTiles
        title={t({ en: "How often each figure dances, commonest first", vi: "Mỗi hình nhân nhảy bao nhiêu lần, hay gặp nhất đứng trước" })}
        tiles={tiles}
        picked={picked}
        onPick={onPick}
      />
      <LetterPicker
        used={Object.values(guesses)}
        current={picked ? guesses[picked] : undefined}
        disabled={!picked}
        onAssign={onAssign}
      />
      <Caption>{deskNote(state, figures, locale)}</Caption>
      <DancedMessage figures={figures} letterUnder={(figure) => guesses[figure.letter]} picked={picked} onPick={onPick} />
    </>
  );
}

/** What the counts say about the figure being worked on at the desk. */
function deskNote(state: DancingMenState, figures: Figure[], locale: Locale): string {
  const vi = locale === "vi";
  if (isSolved(figures, state.guesses))
    return vi
      ? "Hình nhân nào cũng đã có đúng chữ của mình. Bạn đã đọc nó theo cách của Holmes."
      : "Every figure has its right letter. You have read it the way Holmes did.";
  if (!state.picked)
    return vi
      ? "Chạm vào một hình nhân trong bảng đếm hoặc trong tin nhắn. Rồi chọn chữ mà bạn nghĩ nó đang giấu."
      : "Tap a figure in the counts or in the message. Then pick the letter you think he hides.";
  const same = figures.filter((figure) => figure.letter === state.picked);
  const percent = ((100 * same.length) / figures.length).toFixed(0);
  const ends = same.filter((figure) => figure.flag).length;
  const guess = state.guesses[state.picked];
  if (vi)
    return (
      `Hình nhân này nhảy ${same.length} lần (${percent}% tin nhắn) và cầm cờ ở cuối ${ends} từ. ` +
      (guess ? `Bạn đọc nó là ${guess}.` : "Hãy chọn chữ của nó ở trên.")
    );
  return (
    `This figure dances ${same.length} times (${percent}% of the message) and ends ${ends} ` +
    `${ends === 1 ? "word" : "words"} with a flag. ` +
    (guess ? `You read him as ${guess}.` : "Pick his letter above.")
  );
}
