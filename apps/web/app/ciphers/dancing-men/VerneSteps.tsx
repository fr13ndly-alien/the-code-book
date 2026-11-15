import { VERNE_ALPHABET, verneSteps } from "@codebook/cipher-engine/dancing-men";
import { ALPHABET } from "@codebook/cipher-engine/text";
import { AlphabetRows } from "~/components/sim/AlphabetRows";
import { Caption } from "~/components/sim/Caption";
import { useT, type Bilingual } from "~/i18n";
import styles from "./VerneSteps.module.css";

/** What happens at each step of the Verne tool. Step 2 is the parchment; steps 3 and 4 undo it. */
export const VERNE_LABELS: Bilingual[] = [
  { en: "The message", vi: "Tin nhắn" },
  { en: "Hide, step 1: swap each letter", vi: "Giấu, bước 1: đổi từng chữ" },
  { en: "Hide, step 2: write it backwards. This is the parchment", vi: "Giấu, bước 2: viết ngược lại. Đây là cuộn da" },
  { en: "Undo, step 1: read it backwards", vi: "Gỡ, bước 1: đọc ngược lại" },
  { en: "Undo, step 2: swap each letter back", vi: "Gỡ, bước 2: đổi từng chữ trở lại" },
];

/** Verne's two-step cipher laid out line by line, as far as the reader has stepped. */
export function VerneSteps({ text, step }: { text: string; step: number }) {
  const t = useT();
  const lines = verneSteps(text);
  return (
    <>
      <AlphabetRows
        rows={[
          { label: t({ en: "Plain", vi: "Thường" }), letters: ALPHABET },
          { label: t({ en: "Ours", vi: "Của chúng tôi" }), letters: VERNE_ALPHABET, kind: "cipher" },
        ]}
      />
      <ol className={styles.steps} aria-live="polite">
        {VERNE_LABELS.map((label, at) => (
          <li key={label.en} data-on={at === step} data-done={at <= step}>
            <span className={styles.label}>{t(label)}</span>
            <span className={styles.line} data-plain={at === 0 || at === 4}>
              {at <= step ? lines[at] || " " : "…"}
            </span>
          </li>
        ))}
      </ol>
      <Caption>
        {t({
          en: (
            <>
              The swapping alphabet is our own. In the novel the parchment is in runes, and each rune stands for a letter.
              Press ▲ next to "Step" to go on.
            </>
          ),
          vi: (
            <>
              Bảng chữ dùng để đổi là của chúng tôi. Trong tiểu thuyết, cuộn da viết bằng chữ rune, mỗi chữ rune thay cho
              một chữ cái. Nhấn ▲ cạnh “Bước” để đi tiếp.
            </>
          ),
        })}
      </Caption>
    </>
  );
}
