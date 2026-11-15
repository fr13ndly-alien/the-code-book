import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { Story } from "~/components/story/Story";
import { FrequencyAnalysisBoard } from "./FrequencyAnalysisBoard";
import { FrequencyAnalysisControls } from "./FrequencyAnalysisControls";
import { meta as frequencyAnalysis } from "./meta";
import { PRESETS } from "./presets";
import StoryEn from "./story.mdx";
import StoryVi from "./story.vi.mdx";
import { useFrequencyAnalysis } from "./useFrequencyAnalysis";

export const meta = pageMeta(frequencyAnalysis);

export default function FrequencyAnalysisRoute() {
  const [state, dispatch] = useFrequencyAnalysis(PRESETS.intercepted!);

  return (
    <CipherPage
      meta={frequencyAnalysis}
      stage={
        <FrequencyAnalysisBoard
          state={state}
          onPick={(cipher) => dispatch({ type: "pick", cipher })}
          onAssign={(plain) => dispatch({ type: "assign", plain })}
        />
      }
      controls={<FrequencyAnalysisControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })} text={{ en: StoryEn, vi: StoryVi }} />
      }
    />
  );
}
