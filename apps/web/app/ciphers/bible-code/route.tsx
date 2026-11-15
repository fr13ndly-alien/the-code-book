import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { BibleCodeBoard } from "./BibleCodeBoard";
import { BibleCodeControls } from "./BibleCodeControls";
import { meta as bibleCode } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useBibleCode } from "./useBibleCode";

export const meta = pageMeta(bibleCode);

export default function BibleCodeRoute() {
  const [state, dispatch] = useBibleCode(PRESETS.rain!);

  return (
    <CipherPage
      meta={bibleCode}
      stage={<BibleCodeBoard state={state} onPick={(position) => dispatch({ type: "pick", position })} />}
      controls={<BibleCodeControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
