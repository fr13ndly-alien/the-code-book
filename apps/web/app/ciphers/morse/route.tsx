import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as morse } from "./meta";
import { MorseBoard } from "./MorseBoard";
import { MorseControls } from "./MorseControls";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useMorse } from "./useMorse";

export const meta = pageMeta(morse);

export default function MorseRoute() {
  const [state, dispatch] = useMorse(PRESETS.sos!);

  return (
    <CipherPage
      meta={morse}
      stage={
        <MorseBoard
          state={state}
          onTick={() => dispatch({ type: "tick" })}
          onFinish={() => dispatch({ type: "finish" })}
        />
      }
      controls={<MorseControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
