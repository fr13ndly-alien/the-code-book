import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { KeyExchangeBoard } from "./KeyExchangeBoard";
import { KeyExchangeControls } from "./KeyExchangeControls";
import { meta as keyExchange } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useKeyExchange } from "./useKeyExchange";

export const meta = pageMeta(keyExchange);

export default function KeyExchangeRoute() {
  const [state, dispatch] = useKeyExchange(PRESETS.book!);

  return (
    <CipherPage
      meta={keyExchange}
      stage={<KeyExchangeBoard state={state} />}
      controls={<KeyExchangeControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
