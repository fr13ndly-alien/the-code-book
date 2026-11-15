import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { meta as pigpen } from "./meta";
import { PigpenBoard } from "./PigpenBoard";
import { PigpenControls } from "./PigpenControls";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
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
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
