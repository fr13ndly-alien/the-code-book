import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { HomophonicBoard } from "./HomophonicBoard";
import { HomophonicControls } from "./HomophonicControls";
import { meta as homophonic } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useHomophonic } from "./useHomophonic";

export const meta = pageMeta(homophonic);

export default function HomophonicRoute() {
  const [state, dispatch] = useHomophonic(PRESETS.duke!);

  return (
    <CipherPage
      meta={homophonic}
      stage={<HomophonicBoard state={state} onPick={(number) => dispatch({ type: "pick", number })} />}
      controls={<HomophonicControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
