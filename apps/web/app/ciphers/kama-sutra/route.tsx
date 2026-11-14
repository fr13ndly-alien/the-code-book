import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { KamaSutraBoard } from "./KamaSutraBoard";
import { KamaSutraControls } from "./KamaSutraControls";
import { meta as kamaSutra } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useKamaSutra } from "./useKamaSutra";

export const meta = pageMeta(kamaSutra);

export default function KamaSutraRoute() {
  const [state, dispatch] = useKamaSutra(PRESETS.book!);

  return (
    <CipherPage
      meta={kamaSutra}
      stage={<KamaSutraBoard state={state} onPick={(letter) => dispatch({ type: "pick", letter })} />}
      controls={<KamaSutraControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
