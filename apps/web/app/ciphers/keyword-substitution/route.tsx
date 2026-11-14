import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { KeywordBoard } from "./KeywordBoard";
import { KeywordControls } from "./KeywordControls";
import { meta as keyword } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useKeyword } from "./useKeyword";

export const meta = pageMeta(keyword);

export default function KeywordRoute() {
  const [state, dispatch] = useKeyword(PRESETS.julius!);

  return (
    <CipherPage
      meta={keyword}
      stage={<KeywordBoard state={state} onPick={(column) => dispatch({ type: "pick", column })} />}
      controls={<KeywordControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
