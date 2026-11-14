import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { LuciferBoard } from "./LuciferBoard";
import { LuciferControls } from "./LuciferControls";
import { meta as lucifer } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useLucifer } from "./useLucifer";

export const meta = pageMeta(lucifer);

export default function LuciferRoute() {
  const [state, dispatch] = useLucifer(PRESETS.lucifer!);

  return (
    <CipherPage
      meta={lucifer}
      stage={<LuciferBoard state={state} onFlip={(bit) => dispatch({ type: "flip", bit })} />}
      controls={<LuciferControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
