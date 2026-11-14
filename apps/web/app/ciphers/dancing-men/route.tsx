import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { DancingMenBoard } from "./DancingMenBoard";
import { DancingMenControls } from "./DancingMenControls";
import { meta as dancingMen } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useDancingMen } from "./useDancingMen";

export const meta = pageMeta(dancingMen);

export default function DancingMenRoute() {
  const [state, dispatch] = useDancingMen(PRESETS.slaney!);

  return (
    <CipherPage
      meta={dancingMen}
      stage={
        <DancingMenBoard
          state={state}
          onPick={(letter) => dispatch({ type: "pick", letter })}
          onAssign={(plain) => dispatch({ type: "assign", plain })}
        />
      }
      controls={<DancingMenControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
