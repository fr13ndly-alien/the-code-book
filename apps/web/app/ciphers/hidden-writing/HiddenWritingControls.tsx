import type { Dispatch } from "react";
import { MAX_HEAT, nextCovered, reads } from "@codebook/cipher-engine/hidden-writing";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Choice, Output, TextField } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { report, type HiddenWritingAction, type HiddenWritingState } from "./useHiddenWriting";

/** The HTML controls of the hidden writing page: the hiding place, the message and the guard. */
export function HiddenWritingControls(props: { state: HiddenWritingState; dispatch: Dispatch<HiddenWritingAction> }) {
  const { state, dispatch } = props;
  const { page } = state;
  const wax = page.method === "wax";
  const showing = reads(page);
  const t = useT();
  const locale = useLocale();

  return (
    <Controls>
      <Row>
        <Output label={t({ en: "What anyone can read now", vi: "Điều ai cũng đọc được lúc này" })}>
          {showing || t({ en: "Nothing. It looks blank.", vi: "Không có gì. Trông như để trống." })}
        </Output>
        <Choice
          label={t({ en: "Hide it with", vi: "Giấu bằng" })}
          value={page.method}
          onChange={(method) => dispatch({ type: "switch", method })}
          options={[
            { value: "wax", label: t({ en: "Wax", vi: "Sáp" }) },
            { value: "ink", label: t({ en: "Invisible ink", vi: "Mực vô hình" }) },
          ]}
        />
      </Row>
      <Row>
        <TextField
          label={t({ en: "Your message (typing starts a fresh page)", vi: "Tin nhắn của bạn (gõ chữ là bắt đầu trang mới)" })}
          value={state.message}
          onChange={(message) => dispatch({ type: "type", message })}
        />
        <Button primary disabled={showing === ""} onClick={() => dispatch({ type: "hide" })}>
          {wax ? t({ en: "Cover with wax", vi: "Phủ sáp" }) : t({ en: "Let the ink dry", vi: "Để mực khô" })}
        </Button>
        {wax ? (
          <Button disabled={nextCovered(page) < 0} onClick={() => dispatch({ type: "scrapeNext" })}>
            {t({ en: "Scrape the next strip", vi: "Cạo dải tiếp theo" })}
          </Button>
        ) : (
          <Button disabled={page.heat >= MAX_HEAT} onClick={() => dispatch({ type: "warm" })}>
            {t({ en: "Warm the page", vi: "Hơ nóng tờ giấy" })}
          </Button>
        )}
      </Row>
      <Row>
        <Choice
          label={t({ en: "The guard is", vi: "Lính gác" })}
          value={state.guard}
          onChange={(guard) => dispatch({ type: "post", guard })}
          options={[
            { value: "casual", label: t({ en: "In a hurry", vi: "Vội vàng" }) },
            { value: "thorough", label: t({ en: "Thorough", vi: "Kỹ tính" }) },
          ]}
        />
        <Button onClick={() => dispatch({ type: "send" })}>{t({ en: "Send it past the guard", vi: "Gửi qua trạm gác" })}</Button>
        <Output label={t({ en: "The guard says", vi: "Lính gác nói" })}>
          {report(state, locale) ?? t({ en: "He has not looked yet.", vi: "Lính gác chưa kiểm tra." })}
        </Output>
      </Row>
    </Controls>
  );
}
