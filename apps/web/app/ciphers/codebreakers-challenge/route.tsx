import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { CodebreakersChallengeBoard } from "./CodebreakersChallengeBoard";
import { CodebreakersChallengeControls } from "./CodebreakersChallengeControls";
import { meta as codebreakersChallenge } from "./meta";
import { PRESETS, START } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useCodebreakersChallenge } from "./useCodebreakersChallenge";

export const meta = pageMeta(codebreakersChallenge);

export default function CodebreakersChallengeRoute() {
  const [state, dispatch] = useCodebreakersChallenge(START);

  return (
    <CipherPage
      meta={codebreakersChallenge}
      stage={<CodebreakersChallengeBoard state={state} dispatch={dispatch} />}
      controls={<CodebreakersChallengeControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
