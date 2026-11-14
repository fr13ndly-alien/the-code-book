import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as railFence } from "./meta";
import { PRESETS } from "./presets";
import { RailFenceBoard } from "./RailFenceBoard";
import { RailFenceControls } from "./RailFenceControls";
import StoryText from "./story.mdx";
import { useRailFence } from "./useRailFence";

export const meta = pageMeta(railFence);

export default function RailFenceRoute() {
  const [state, dispatch] = useRailFence(PRESETS.wax!);

  return (
    <CipherPage
      meta={railFence}
      stage={<RailFenceBoard state={state} onPick={(rail) => dispatch({ type: "pick", rail })} />}
      controls={<RailFenceControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
