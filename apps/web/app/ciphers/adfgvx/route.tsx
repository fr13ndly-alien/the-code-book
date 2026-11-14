import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { AdfgvxBoard } from "./AdfgvxBoard";
import { AdfgvxControls } from "./AdfgvxControls";
import { meta as adfgvx } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useAdfgvx } from "./useAdfgvx";

export const meta = pageMeta(adfgvx);

export default function AdfgvxRoute() {
  const [state, dispatch] = useAdfgvx(PRESETS.book!);

  return (
    <CipherPage
      meta={adfgvx}
      stage={<AdfgvxBoard state={state} onPick={(symbol) => dispatch({ type: "pick", symbol })} />}
      controls={<AdfgvxControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
