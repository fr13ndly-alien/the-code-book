import type { ReactNode } from "react";
import { KEY_COUNT, possibilities, type Reading } from "@codebook/cipher-engine/key-escrow";
import { useLocale, useT, type Bilingual } from "~/i18n";
import { Desk, Line, Working } from "./Desk";
import { numbered } from "./numbered";
import { SUSPECT_KEYS } from "./presets";

/** The sum that rebuilds a key: half one plus half two, letter by letter. */
function Rebuilt({ one, two, keyFound }: { one: string; two: string; keyFound: string }) {
  const t = useT();
  return (
    <Working
      label={t({ en: "Adding the two halves", vi: "Cộng hai nửa" })}
      rows={[
        { label: t({ en: "Half one", vi: "Nửa thứ nhất" }), cells: numbered(one) },
        { label: t({ en: "Plus half two", vi: "Cộng nửa thứ hai" }), cells: numbered(two) },
        { label: t({ en: "Gives the key", vi: "Được khóa" }), cells: numbered(keyFound), secret: true },
      ]}
    />
  );
}

/** Why one half is useless: for any key you suspect, some other half would fit it. */
function StillPossible({ half }: { half: string }) {
  const t = useT();
  const locale = useLocale();
  const rows = possibilities(half, SUSPECT_KEYS);
  return (
    <>
      <Working
        label={t({ en: "Keys that fit this half", vi: "Các khóa khớp với nửa này" })}
        rows={[
          { label: t({ en: "If the key were", vi: "Nếu khóa là" }), cells: rows.map((row) => row.key) },
          { label: t({ en: "the missing half is", vi: "thì nửa còn thiếu là" }), cells: rows.map((row) => row.otherHalf), secret: true },
        ]}
      />
      <Line label={t({ en: "Keys this half rules out", vi: "Số khóa mà nửa này loại được" })}>
        {t({
          en: <>none of the {KEY_COUNT.toLocaleString("en")}</>,
          vi: <>không khóa nào trong {KEY_COUNT.toLocaleString(locale)} khóa</>,
        })}
      </Line>
    </>
  );
}

/** Somebody outside the conversation: the halves they hold and what those let them read. */
export function ReaderDesk(props: { title: string; note: string; reading: Reading; children?: ReactNode }) {
  const t = useT();
  const { one, two, key, text, canRead } = props.reading;
  const missing = t({ en: "not in their hands", vi: "không nằm trong tay họ" });
  const single = key === null ? (one ?? two) : null;
  return (
    <Desk title={props.title} note={props.note}>
      {props.children}
      <Line label={t({ en: "Half one", vi: "Nửa thứ nhất" })}>{one ?? missing}</Line>
      <Line label={t({ en: "Half two", vi: "Nửa thứ hai" })}>{two ?? missing}</Line>
      {key !== null && <Rebuilt one={one!} two={two!} keyFound={key} />}
      {single && <StillPossible half={single} />}
      <Line label={t(readingLabel(props.reading))} secret>
        {text}
      </Line>
      {key !== null && !canRead && (
        <Line label={t({ en: "Why", vi: "Vì sao" })}>
          {t({
            en: "the sender used a different key, one that was never lodged",
            vi: "người gửi đã dùng một khóa khác, một khóa chưa bao giờ được ký gửi",
          })}
        </Line>
      )}
    </Desk>
  );
}

/** Says what the last line of a reader's desk is showing. */
function readingLabel(reading: Reading): Bilingual {
  if (reading.canRead) return { en: "The message, read with the rebuilt key", vi: "Tin nhắn, đọc bằng khóa vừa dựng lại" };
  if (reading.key !== null) return { en: "The rebuilt key gives only nonsense", vi: "Khóa dựng lại chỉ cho ra chữ vô nghĩa" };
  if (reading.one ?? reading.two) {
    return { en: "Trying the one half as a key gives nonsense", vi: "Thử dùng một nửa làm khóa thì ra chữ vô nghĩa" };
  }
  return { en: "All they have is the ciphertext", vi: "Họ chỉ có bản mật mã" };
}
