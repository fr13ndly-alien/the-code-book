import type { Dispatch } from "react";
import { Button, Controls, Row } from "~/components/sim/Controls";
import { Output, Stepper } from "~/components/sim/Fields";
import { useLocale, useT } from "~/i18n";
import { keyText, LAST_STEP, type KeyExchangeAction, type KeyExchangeState } from "./useKeyExchange";

/** The HTML controls of the key exchange page: the public numbers, the secrets and the steps. */
export function KeyExchangeControls(props: { state: KeyExchangeState; dispatch: Dispatch<KeyExchangeAction> }) {
  const { state, dispatch } = props;
  const t = useT();
  const locale = useLocale();

  return (
    <Controls>
      <Row>
        <Stepper label={t({ en: "Public Y", vi: "Y công khai" })} value={state.base} onStep={(by) => dispatch({ type: "turnBase", by })} />
        <Stepper
          label={t({ en: "Public prime P", vi: "Số nguyên tố công khai P" })} value={state.modulus} onStep={(by) => dispatch({ type: "turnPrime", by })} />
        <Output
          label={
            state.youAreEve
              ? t({ en: "The key, if Eve can find it", vi: "Khóa, nếu Eve tìm ra được" })
              : t({ en: "Shared key", vi: "Khóa chung" })
          }
        >
          {keyText(state, locale)}
        </Output>
      </Row>
      <Row>
        {!state.youAreEve && (
          <>
            <Stepper
              label={t({ en: "Alice's secret", vi: "Số bí mật của Alice" })} value={state.aliceSecret} onStep={(by) => dispatch({ type: "turnAlice", by })} />
            <Stepper
              label={t({ en: "Bob's secret", vi: "Số bí mật của Bob" })} value={state.bobSecret} onStep={(by) => dispatch({ type: "turnBob", by })} />
          </>
        )}
        <Button primary onClick={() => dispatch({ type: "next" })} disabled={state.step >= LAST_STEP}>
          {t({ en: "Next step", vi: "Bước tiếp" })}
        </Button>
        <Button onClick={() => dispatch({ type: "restart" })} disabled={state.youAreEve}>
          {t({ en: "Start again", vi: "Làm lại từ đầu" })}
        </Button>
        <Button onClick={() => dispatch({ type: "unleashEve" })} disabled={state.step < 3}>
          {state.eveSearching
            ? t({ en: "Hide Eve's guesses", vi: "Ẩn các lần đoán của Eve" })
            : t({ en: "Let Eve try every secret", vi: "Để Eve thử mọi số bí mật" })}
        </Button>
      </Row>
    </Controls>
  );
}
