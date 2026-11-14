import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { BinaryBoard } from "./BinaryBoard";
import { BinaryControls } from "./BinaryControls";
import { meta as binary } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useBinary } from "./useBinary";

export const meta = pageMeta(binary);

export default function BinaryRoute() {
  const [state, dispatch] = useBinary(PRESETS.hello!);

  return (
    <CipherPage
      meta={binary}
      stage={<BinaryBoard state={state} onFlip={(digit) => dispatch({ type: "flip", digit })} />}
      controls={<BinaryControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
