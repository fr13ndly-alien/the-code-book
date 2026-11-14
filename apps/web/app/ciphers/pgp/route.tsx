import { pageMeta } from "~/ciphers";
import { CipherPage } from "~/components/CipherPage";
import { STORY_BLOCKS, Story } from "~/components/story/Story";
import { meta as pgp } from "./meta";
import { PgpBoard } from "./PgpBoard";
import { PgpControls } from "./PgpControls";
import { PRESETS } from "./presets";
import StoryText from "./story.mdx";
import { usePgp } from "./usePgp";

export const meta = pageMeta(pgp);

export default function PgpRoute() {
  const [state, dispatch] = usePgp(PRESETS.sent!);

  return (
    <CipherPage
      meta={pgp}
      stage={<PgpBoard state={state} />}
      controls={<PgpControls state={state} dispatch={dispatch} />}
      story={
        <Story onAction={(name) => dispatch({ type: "load", preset: PRESETS[name]! })}>
          <StoryText components={STORY_BLOCKS} />
        </Story>
      }
    />
  );
}
