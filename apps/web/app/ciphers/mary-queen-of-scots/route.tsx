import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { MaryBoard } from "./MaryBoard";
import { MaryControls } from "./MaryControls";
import { meta as mary } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useMary } from "./useMary";

export const meta = pageMeta(mary);

export default function MaryRoute() {
  const [state, dispatch] = useMary(PRESETS.postscript!);

  return (
    <CipherPage
      meta={mary}
      stage={<MaryBoard state={state} onPick={(symbol) => dispatch({ type: "pick", symbol })} />}
      controls={<MaryControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
