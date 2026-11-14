import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { LinearBBoard } from "./LinearBBoard";
import { LinearBControls } from "./LinearBControls";
import { meta as linearB } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useLinearB } from "./useLinearB";

export const meta = pageMeta(linearB);

export default function LinearBRoute() {
  const [state, dispatch] = useLinearB(PRESETS.start!);

  return (
    <CipherPage
      meta={linearB}
      stage={
        <LinearBBoard
          state={state}
          onMark={(sign) => dispatch({ type: "mark", sign })}
          onPick={(word) => dispatch({ type: "pick", word })}
        />
      }
      controls={<LinearBControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
