import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { NavajoBoard } from "./NavajoBoard";
import { NavajoControls } from "./NavajoControls";
import { meta as navajo } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useNavajo } from "./useNavajo";

export const meta = pageMeta(navajo);

export default function NavajoRoute() {
  const [state, dispatch] = useNavajo(PRESETS.start!);

  return (
    <CipherPage
      meta={navajo}
      stage={<NavajoBoard state={state} onTap={(word) => dispatch({ type: "tap", word })} />}
      controls={<NavajoControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
