import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { HieroglyphsBoard } from "./HieroglyphsBoard";
import { HieroglyphsControls } from "./HieroglyphsControls";
import { meta as hieroglyphs } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useHieroglyphs } from "./useHieroglyphs";

export const meta = pageMeta(hieroglyphs);

export default function HieroglyphsRoute() {
  const [state, dispatch] = useHieroglyphs(PRESETS.start!);

  return (
    <CipherPage
      meta={hieroglyphs}
      stage={
        <HieroglyphsBoard state={state} onTap={(cartouche, at) => dispatch({ type: "tap", cartouche, at })} />
      }
      controls={<HieroglyphsControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
