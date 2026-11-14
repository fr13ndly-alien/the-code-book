import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as oneTimePad } from "./meta";
import { PadBoard } from "./PadBoard";
import { PadControls } from "./PadControls";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { usePad } from "./usePad";

export const meta = pageMeta(oneTimePad);

export default function OneTimePadRoute() {
  const [state, dispatch] = usePad(PRESETS.book!);

  return (
    <CipherPage
      meta={oneTimePad}
      stage={<PadBoard state={state} onPick={(column) => dispatch({ type: "pick", column })} />}
      controls={<PadControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
