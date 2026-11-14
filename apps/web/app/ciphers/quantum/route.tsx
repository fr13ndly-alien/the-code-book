import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as quantum } from "./meta";
import { QuantumBoard } from "./QuantumBoard";
import { QuantumControls } from "./QuantumControls";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useQuantum } from "./useQuantum";

export const meta = pageMeta(quantum);

export default function QuantumRoute() {
  const [state, dispatch] = useQuantum(PRESETS.measured!);

  return (
    <CipherPage
      meta={quantum}
      stage={<QuantumBoard state={state} onPick={(column) => dispatch({ type: "pick", column })} />}
      controls={<QuantumControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
