import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as pinprick } from "./meta";
import { PinprickBoard } from "./PinprickBoard";
import { PinprickControls } from "./PinprickControls";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { usePinprick } from "./usePinprick";

export const meta = pageMeta(pinprick);

export default function PinprickRoute() {
  const [state, dispatch] = usePinprick(PRESETS.meeting!);

  return (
    <CipherPage
      meta={pinprick}
      stage={<PinprickBoard state={state} onPrick={(position) => dispatch({ type: "prick", position })} />}
      controls={<PinprickControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
