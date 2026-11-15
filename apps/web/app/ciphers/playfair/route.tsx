import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { PlayfairBoard } from "./PlayfairBoard";
import { PlayfairControls } from "./PlayfairControls";
import { meta as playfair } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { usePlayfair } from "./usePlayfair";

export const meta = pageMeta(playfair);

export default function PlayfairRoute() {
  const [state, dispatch] = usePlayfair(PRESETS.charles!);

  return (
    <CipherPage
      meta={playfair}
      stage={<PlayfairBoard state={state} onPick={(position) => dispatch({ type: "pick", position })} />}
      controls={<PlayfairControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
