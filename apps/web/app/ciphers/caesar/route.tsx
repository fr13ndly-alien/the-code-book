import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { CaesarBoard } from "./CaesarBoard";
import { CaesarControls } from "./CaesarControls";
import { meta as caesar } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useCaesar } from "./useCaesar";

export const meta = pageMeta(caesar);

export default function CaesarRoute() {
  const [state, dispatch] = useCaesar(PRESETS.caesar!);

  return (
    <CipherPage
      meta={caesar}
      stage={<CaesarBoard state={state} onPick={(column) => dispatch({ type: "pick", column })} />}
      controls={<CaesarControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
