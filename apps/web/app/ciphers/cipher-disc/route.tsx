import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { DiscBoard } from "./DiscBoard";
import { DiscControls } from "./DiscControls";
import { meta as cipherDisc } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useDisc } from "./useDisc";

export const meta = pageMeta(cipherDisc);

export default function CipherDiscRoute() {
  const [state, dispatch] = useDisc(PRESETS.five!);

  return (
    <CipherPage
      meta={cipherDisc}
      stage={<DiscBoard state={state} onTurn={(by) => dispatch({ type: "turn", by })} />}
      controls={<DiscControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
