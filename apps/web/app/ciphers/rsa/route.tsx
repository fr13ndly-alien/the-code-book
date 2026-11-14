import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as rsa } from "./meta";
import { PRESETS } from "./presets";
import { RsaBoard } from "./RsaBoard";
import { RsaControls } from "./RsaControls";
import StoryText from "./story.mdx";
import { useRsa } from "./useRsa";

export const meta = pageMeta(rsa);

export default function RsaRoute() {
  const [state, dispatch] = useRsa(PRESETS.book!);

  return (
    <CipherPage
      meta={rsa}
      stage={<RsaBoard state={state} />}
      controls={<RsaControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
