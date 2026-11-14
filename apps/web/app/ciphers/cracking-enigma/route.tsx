import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { CrackBoard } from "./CrackBoard";
import { CrackControls } from "./CrackControls";
import { meta as crackingEnigma } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useCrack } from "./useCrack";

export const meta = pageMeta(crackingEnigma);

export default function CrackingEnigmaRoute() {
  const [state, dispatch] = useCrack(PRESETS.chains!);

  return (
    <CipherPage
      meta={crackingEnigma}
      stage={<CrackBoard state={state} onPick={(column) => dispatch({ type: "pick", column })} />}
      controls={<CrackControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
