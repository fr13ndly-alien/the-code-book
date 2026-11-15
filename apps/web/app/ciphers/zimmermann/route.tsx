import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { meta as zimmermann } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useZimmermann } from "./useZimmermann";
import { ZimmermannBoard } from "./ZimmermannBoard";
import { ZimmermannControls } from "./ZimmermannControls";

export const meta = pageMeta(zimmermann);

export default function ZimmermannRoute() {
  const [state, dispatch] = useZimmermann(PRESETS.offer!);

  return (
    <CipherPage
      meta={zimmermann}
      stage={
        <ZimmermannBoard
          state={state}
          onTap={(word) => dispatch({ type: "tap", word })}
          onPick={(group) => dispatch({ type: "pick", group })}
          onGuess={(word) => dispatch({ type: "guess", word })}
        />
      }
      controls={<ZimmermannControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
