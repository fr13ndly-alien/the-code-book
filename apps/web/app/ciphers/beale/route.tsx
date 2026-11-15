import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { BealeBoard } from "./BealeBoard";
import { BealeControls } from "./BealeControls";
import { meta as beale } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useBeale } from "./useBeale";

export const meta = pageMeta(beale);

export default function BealeRoute() {
  const [state, dispatch] = useBeale(PRESETS.beale!);

  return (
    <CipherPage
      meta={beale}
      stage={<BealeBoard state={state} onPick={(number) => dispatch({ type: "pick", number })} />}
      controls={<BealeControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
