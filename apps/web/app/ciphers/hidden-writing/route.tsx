import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { HiddenWritingBoard } from "./HiddenWritingBoard";
import { HiddenWritingControls } from "./HiddenWritingControls";
import { meta as hiddenWriting } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useHiddenWriting } from "./useHiddenWriting";

export const meta = pageMeta(hiddenWriting);

export default function HiddenWritingRoute() {
  const [state, dispatch] = useHiddenWriting(PRESETS.tablet!);

  return (
    <CipherPage
      meta={hiddenWriting}
      stage={<HiddenWritingBoard state={state} onScrape={(row) => dispatch({ type: "scrape", row })} />}
      controls={<HiddenWritingControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
