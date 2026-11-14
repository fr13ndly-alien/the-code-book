import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { CodebreakersChallengeBoard } from "./CodebreakersChallengeBoard";
import { CodebreakersChallengeControls } from "./CodebreakersChallengeControls";
import { meta as codebreakersChallenge } from "./meta";
import { PRESETS, START } from "./presets";
import StoryText from "./story.mdx";
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
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
