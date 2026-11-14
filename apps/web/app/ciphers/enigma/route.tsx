import { lazy } from "react";
import { CipherPage, StageLoading } from "~/components/CipherPage";
import { ClientOnly } from "~/components/ClientOnly";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { pageMeta } from "~/ciphers";
import { EnigmaControls } from "./EnigmaControls";
import { meta as enigma } from "./meta";
import { PRESETS, TOY_PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useEnigma } from "./useEnigma";
import { usePlugPicker } from "./usePlugPicker";
import { useToyScrambler } from "./useToyScrambler";

// three.js is large, so the 3D scene loads only once the page is on screen.
const EnigmaScene = lazy(() => import("./scene/EnigmaScene"));

export const meta = pageMeta(enigma);

export default function EnigmaRoute() {
  const [state, dispatch] = useEnigma();
  const [toy, toyDispatch] = useToyScrambler();
  const plugs = usePlugPicker(
    state.settings.cables,
    (a, b) => dispatch({ type: "plug", a, b }),
    (letter) => dispatch({ type: "unplug", letter }),
  );

  /** Story buttons name a preset of either the full machine or the six-letter model. */
  function loadPreset(name: string) {
    const toyPreset = TOY_PRESETS[name];
    if (toyPreset) toyDispatch({ type: "load", ...toyPreset });
    else dispatch({ type: "load", ...PRESETS[name]! });
  }

  return (
    <CipherPage
      meta={enigma}
      stage={
        <ClientOnly fallback={<StageLoading />}>
          <EnigmaScene
            state={state}
            pendingSocket={plugs.pending}
            onPress={(key) => dispatch({ type: "press", key })}
            onTurn={(slot) => dispatch({ type: "turn", slot, by: 1 })}
            onPickSocket={plugs.pick}
          />
        </ClientOnly>
      }
      controls={
        <EnigmaControls
          state={state}
          dispatch={dispatch}
          pendingSocket={plugs.pending}
          onPickSocket={plugs.pick}
          toy={toy}
          toyDispatch={toyDispatch}
        />
      }
      story={
        <Story onAction={loadPreset}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
