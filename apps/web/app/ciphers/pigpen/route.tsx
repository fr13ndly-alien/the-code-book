import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as pigpen } from "./meta";
import { PigpenBoard } from "./PigpenBoard";
import { PigpenControls } from "./PigpenControls";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { usePigpen } from "./usePigpen";

export const meta = pageMeta(pigpen);

export default function PigpenRoute() {
  const [state, dispatch] = usePigpen(PRESETS.masons!);

  return (
    <CipherPage
      meta={pigpen}
      stage={<PigpenBoard state={state} onPick={(letter) => dispatch({ type: "pick", letter })} />}
      controls={<PigpenControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
