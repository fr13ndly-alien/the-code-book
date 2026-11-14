import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { HieroglyphsBoard } from "./HieroglyphsBoard";
import { HieroglyphsControls } from "./HieroglyphsControls";
import { meta as hieroglyphs } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
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
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
