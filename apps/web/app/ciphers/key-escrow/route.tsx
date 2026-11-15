import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { EscrowBoard } from "./EscrowBoard";
import { EscrowControls } from "./EscrowControls";
import { meta as keyEscrow } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useEscrow } from "./useEscrow";

export const meta = pageMeta(keyEscrow);

export default function KeyEscrowRoute() {
  const [state, dispatch] = useEscrow(PRESETS.lodged!);

  return (
    <CipherPage
      meta={keyEscrow}
      stage={<EscrowBoard state={state} />}
      controls={<EscrowControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
