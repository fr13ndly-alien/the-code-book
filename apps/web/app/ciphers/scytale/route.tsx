import { lazy } from "react";
import { pageMeta } from "~/ciphers";
import { CipherPage, StageLoading } from "~/components/CipherPage";
import { ClientOnly } from "~/components/ClientOnly";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as scytale } from "./meta";
import { PRESETS } from "./presets";
import { ScytaleControls } from "./ScytaleControls";
import StoryText from "./story.mdx";
import { linesOnStaff, useScytale } from "./useScytale";

// three.js is large, so the 3D scene loads only once the page is on screen.
const ScytaleScene = lazy(() => import("./scene/ScytaleScene"));

export const meta = pageMeta(scytale);

export default function ScytaleRoute() {
  const [state, dispatch] = useScytale(PRESETS.book!);

  return (
    <CipherPage
      meta={scytale}
      stage={
        <ClientOnly fallback={<StageLoading />}>
          <ScytaleScene
            lines={linesOnStaff(state)}
            facing={state.facing}
            onRoll={() => dispatch({ type: "roll", by: 1 })}
          />
        </ClientOnly>
      }
      controls={<ScytaleControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
