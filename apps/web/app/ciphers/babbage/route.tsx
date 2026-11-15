import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { BabbageBoard } from "./BabbageBoard";
import { BabbageControls } from "./BabbageControls";
import { meta as babbage } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useBabbage } from "./useBabbage";

export const meta = pageMeta(babbage);

export default function BabbageRoute() {
  const [state, dispatch] = useBabbage(PRESETS.intercept!);

  return (
    <CipherPage
      meta={babbage}
      stage={<BabbageBoard state={state} onPick={(row) => dispatch({ type: "pick", row })} />}
      controls={<BabbageControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
