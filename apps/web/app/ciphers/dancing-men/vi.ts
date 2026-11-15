import { describe, type Arm, type Leg, type Pose } from "@codebook/cipher-engine/dancing-men";
import type { Locale } from "~/i18n";

/** The engine's pose words in Vietnamese. */
const ARM_WORDS: Record<Arm, string> = { up: "giơ lên", out: "dang ngang", down: "buông xuống", bent: "chống hông" };
const LEG_WORDS: Record<Leg, string> = { down: "đứng thẳng", out: "dạng sang bên", bent: "đá lên" };

/** A pose in words, for readers who cannot see the drawing, in the page's language. */
export function describePose(pose: Pose, locale: Locale): string {
  if (locale === "en") return describe(pose);
  const arms =
    pose.leftArm === pose.rightArm
      ? `hai tay ${ARM_WORDS[pose.leftArm]}`
      : `tay trái ${ARM_WORDS[pose.leftArm]}, tay phải ${ARM_WORDS[pose.rightArm]}`;
  const legs =
    pose.leftLeg === pose.rightLeg
      ? `hai chân ${LEG_WORDS[pose.leftLeg]}`
      : `chân trái ${LEG_WORDS[pose.leftLeg]}, chân phải ${LEG_WORDS[pose.rightLeg]}`;
  return `${arms}, ${legs}`;
}
