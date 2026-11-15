import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { LorenzBoard } from "./LorenzBoard";
import { LorenzControls } from "./LorenzControls";
import { meta as lorenz } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useLorenz } from "./useLorenz";

export const meta = pageMeta(lorenz);

export default function LorenzRoute() {
  const [state, dispatch] = useLorenz(PRESETS.start!);

  return (
    <CipherPage
      meta={lorenz}
      stage={<LorenzBoard state={state} onPick={(at) => dispatch({ type: "pick", at })} />}
      controls={<LorenzControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
