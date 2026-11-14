import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as purple } from "./meta";
import { PRESETS } from "./presets";
import { PurpleBoard } from "./PurpleBoard";
import { PurpleControls } from "./PurpleControls";
import StoryText from "./story.mdx";
import { usePurple } from "./usePurple";

export const meta = pageMeta(purple);

export default function PurpleRoute() {
  const [state, dispatch] = usePurple(PRESETS.start!);

  return (
    <CipherPage
      meta={purple}
      stage={<PurpleBoard state={state} onPick={(at) => dispatch({ type: "pick", at })} />}
      controls={<PurpleControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
