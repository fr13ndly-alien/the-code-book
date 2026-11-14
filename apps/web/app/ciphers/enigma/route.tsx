import { lazy } from "react";
import { CipherPage, StageLoading } from "~/components/CipherPage";
import { ClientOnly } from "~/components/ClientOnly";
import { Check, Challenge, DigDeeper, Label, Standfirst, Story, Try } from "~/components/story/Story";
import { EnigmaControls } from "./EnigmaControls";
import { meta as enigma } from "./meta";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { useEnigma } from "./useEnigma";
import { usePlugPicker } from "./usePlugPicker";

// three.js is large, so the 3D scene loads only once the page is on screen.
const EnigmaScene = lazy(() => import("./scene/EnigmaScene"));

export function meta() {
  return [{ title: `${enigma.title} | The Code Book, interactive` }, { name: "description", content: enigma.hook }];
}

export default function EnigmaRoute() {
  const [state, dispatch] = useEnigma();
  const plugs = usePlugPicker(
    state.settings.cables,
    (a, b) => dispatch({ type: "plug", a, b }),
    (letter) => dispatch({ type: "unplug", letter }),
  );

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
        <EnigmaControls state={state} dispatch={dispatch} pendingSocket={plugs.pending} onPickSocket={plugs.pick} />
      }
      story={
        <Story onAction={(name) => dispatch({ type: "load", ...PRESETS[name]! })}>
          <StoryText components={{ Standfirst, Label, Try, Check, Challenge, DigDeeper }} />
        </Story>
      }
    />
  );
}
