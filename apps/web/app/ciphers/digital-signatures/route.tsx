import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { meta as signatures } from "./meta";
import { SignaturesBoard } from "./SignaturesBoard";
import { SignaturesControls } from "./SignaturesControls";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useSignatures } from "./useSignatures";

export const meta = pageMeta(signatures);

export default function SignaturesRoute() {
  const [state, dispatch] = useSignatures(PRESETS.signed!);

  return (
    <CipherPage
      meta={signatures}
      stage={<SignaturesBoard state={state} />}
      controls={<SignaturesControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
