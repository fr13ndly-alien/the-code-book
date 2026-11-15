import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { VigenereBoard } from "./VigenereBoard";
import { VigenereControls } from "./VigenereControls";
import { meta as vigenere } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useVigenere } from "./useVigenere";

export const meta = pageMeta(vigenere);

export default function VigenereRoute() {
  const [state, dispatch] = useVigenere(PRESETS.white!);

  return (
    <CipherPage
      meta={vigenere}
      stage={<VigenereBoard state={state} onPick={(position) => dispatch({ type: "pick", position })} />}
      controls={<VigenereControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
