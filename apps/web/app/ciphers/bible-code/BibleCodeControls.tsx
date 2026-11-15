import type { Dispatch } from "react";
import { sequencesSearched } from "@codebook/cipher-engine/bible-code";
import { TEXTS, type TextId } from "@codebook/cipher-engine/bible-code";
import { Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, Stepper, TextField } from "~/components/sim/Fields";
import { useLocale, useT, type Locale } from "~/i18n";
import { hits, letters, output, type BibleCodeAction, type BibleCodeState } from "./useBibleCode";
import { textTitle, withSeparators } from "./vi";

const textOptions = (locale: Locale) =>
  (Object.keys(TEXTS) as TextId[]).map((value) => ({ value, label: textTitle(value, locale) }));

/** One sentence saying how often the word was found and how many sequences were tried. */
function report(word: string, found: number, textLength: number, locale: Locale): string {
  if (word.length < 2) return locale === "vi" ? "Hãy gõ một từ có từ hai chữ trở lên." : "Type a word of two letters or more.";
  const tried = withSeparators(sequencesSearched(textLength, word.length, Infinity), locale);
  if (locale === "vi") {
    const times = found === 1 ? "một lần" : `${withSeparators(found, locale)} lần`;
    return found === 0 ? `Không có ${word} trong ${tried} dãy chữ.` : `${word} ẩn ${times} trong ${tried} dãy chữ.`;
  }
  const times = found === 1 ? "once" : `${withSeparators(found, locale)} times`;
  return found === 0 ? `No ${word} in ${tried} sequences.` : `${word} hides ${times} in ${tried} sequences.`;
}

/** The HTML controls of the Bible code page: start, skip, the letters read and the word search. */
export function BibleCodeControls({ state, dispatch }: { state: BibleCodeState; dispatch: Dispatch<BibleCodeAction> }) {
  const t = useT();
  const locale = useLocale();
  const text = letters(state);
  const found = hits(state);
  const of = t({ en: "of", vi: "trên" });

  return (
    <Controls>
      <Row>
        <Stepper
          label={t({ en: "Start at letter", vi: "Bắt đầu từ chữ" })}
          value={`${state.start + 1} ${text[state.start]}`}
          onStep={(by) => dispatch({ type: "step", what: "start", by })}
        />
        <Stepper
          label={t({ en: "Skip", vi: "Bước nhảy" })}
          value={state.skip}
          onStep={(by) => dispatch({ type: "step", what: "skip", by })}
        />
        <Output
          label={
            state.direction === 1
              ? t({ en: "The letters read", vi: "Các chữ đọc được" })
              : t({ en: "The letters read, going backwards", vi: "Các chữ đọc được, đi ngược lại" })
          }
        >
          {output(state)}
        </Output>
      </Row>
      <Row>
        <Choice
          label={t({ en: "Search in", vi: "Tìm trong" })}
          value={state.text}
          onChange={(id) => dispatch({ type: "read", text: id })}
          options={textOptions(locale)}
        />
        <TextField
          label={t({ en: "Word to find", vi: "Từ cần tìm" })}
          width="short"
          value={state.word}
          onChange={(word) => dispatch({ type: "type", word })}
        />
      </Row>
      <Row>
        {found.length > 0 && (
          <Stepper
            label={t({ en: "Hit", vi: "Chỗ tìm thấy" })}
            value={state.hit === undefined ? `– ${of} ${found.length}` : `${state.hit + 1} ${of} ${found.length}`}
            onStep={(by) => dispatch({ type: "show", by })}
          />
        )}
        <Output label={t({ en: "The search found", vi: "Kết quả tìm" })}>
          {report(state.word, found.length, text.length, locale)}
        </Output>
      </Row>
    </Controls>
  );
}
