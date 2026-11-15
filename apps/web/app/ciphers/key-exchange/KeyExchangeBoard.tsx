import type { ReactNode } from "react";
import type { Search } from "@codebook/cipher-engine/key-exchange";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, useT, type Locale } from "~/i18n";
import styles from "./KeyExchangeBoard.module.css";
import { runEve, runExchange, type KeyExchangeState } from "./useKeyExchange";

/** The largest power worth writing out in full before reducing it, e.g. 7^3 = 343. */
const LONGEST_POWER = 999_999;

/** Three columns, Alice, the public line and Bob, with one row for each step of the exchange. */
export function KeyExchangeBoard({ state }: { state: KeyExchangeState }) {
  const { base, modulus, step } = state;
  const { alice, bob } = runExchange(state);
  const search = runEve(state);
  const hidden = state.youAreEve === true;
  const t = useT();
  const locale = useLocale();
  const sum = (of: number, to: number, result: number) =>
    hidden ? <Hidden /> : <Sum base={of} exponent={to} modulus={modulus} result={result} />;

  return (
    <Board>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td />
              <th scope="col">Alice</th>
              <th scope="col">{t({ en: "In public: Eve sees this", vi: "Công khai: Eve thấy hết" })}</th>
              <th scope="col">Bob</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{t({ en: "1. Agree", vi: "1. Thống nhất" })}</th>
              <td />
              <td data-kind="public">
                Y = <b>{base}</b>, P = <b>{modulus}</b>
                <br />
                {t({
                  en: (
                    <>
                      The function is {base}
                      <sup>x</sup> (mod {modulus})
                    </>
                  ),
                  vi: (
                    <>
                      Hàm số là {base}
                      <sup>x</sup> (mod {modulus})
                    </>
                  ),
                })}
              </td>
              <td />
            </tr>
            {step >= 2 && (
              <tr>
                <th scope="row">{t({ en: "2. Choose a secret", vi: "2. Chọn số bí mật" })}</th>
                <td data-kind="secret">
                  {hidden ? (
                    <Hidden />
                  ) : (
                    <>
                      A = <b>{alice.secret}</b>
                    </>
                  )}
                </td>
                <td data-kind="public">{t({ en: "Nothing is sent", vi: "Không gửi gì cả" })}</td>
                <td data-kind="secret">
                  {hidden ? (
                    <Hidden />
                  ) : (
                    <>
                      B = <b>{bob.secret}</b>
                    </>
                  )}
                </td>
              </tr>
            )}
            {step >= 3 && (
              <tr>
                <th scope="row">{t({ en: "3. Swap numbers", vi: "3. Trao đổi số" })}</th>
                <td>{sum(base, alice.secret, alice.sends)}</td>
                <td data-kind="public">
                  {t({ en: "Alice sends", vi: "Alice gửi" })} <b>{alice.sends}</b>
                  <br />
                  {t({ en: "Bob sends", vi: "Bob gửi" })} <b>{bob.sends}</b>
                </td>
                <td>{sum(base, bob.secret, bob.sends)}</td>
              </tr>
            )}
            {step >= 4 && (
              <tr>
                <th scope="row">{t({ en: "4. Work out the key", vi: "4. Tính ra chìa khóa" })}</th>
                <td data-kind="secret">{sum(bob.sends, alice.secret, alice.key)}</td>
                <td data-kind="public">{t({ en: "Nothing is sent", vi: "Không gửi gì cả" })}</td>
                <td data-kind="secret">{sum(alice.sends, bob.secret, bob.key)}</td>
              </tr>
            )}
            {search && (
              <tr>
                <th scope="row">{t({ en: "Eve tries", vi: "Eve thử" })}</th>
                <td />
                <td data-kind="public">
                  <EveGuesses search={search} base={base} modulus={modulus} target={alice.sends} bobSent={bob.sends} />
                </td>
                <td />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Caption>{captionFor(state, search, locale)}</Caption>
    </Board>
  );
}

/** A power worked out in clock arithmetic, e.g. 7^3 = 343 = 2 (mod 11). */
function Sum(props: { base: number; exponent: number; modulus: number; result: number }) {
  const locale = useLocale();
  const full = props.base ** props.exponent;
  return (
    <>
      {props.base}
      <sup>{props.exponent}</sup>
      {full <= LONGEST_POWER && full !== props.result && <> = {full.toLocaleString(locale)}</>} = <b>{props.result}</b>{" "}
      (mod {props.modulus})
    </>
  );
}

/** A number the reader is not allowed to see while playing Eve. */
function Hidden() {
  const t = useT();
  return <span aria-label={t({ en: "hidden", vi: "bị giấu" })}>?</span>;
}

/** Eve's list of guesses, ending with the one that matches what Alice sent. */
function EveGuesses(props: { search: Search; base: number; modulus: number; target: number; bobSent: number }) {
  const { search, base, modulus } = props;
  const t = useT();
  return (
    <>
      <ol className={styles.guesses}>
        {search.guesses.map((guess) => (
          <li key={guess.secret} data-on={guess.result === props.target}>
            {base}
            <sup>{guess.secret}</sup> = {guess.result}
          </li>
        ))}
      </ol>
      {search.found !== undefined && (
        <p>
          {t({
            en: (
              <>
                Guess {search.found} gives {props.target}, so the key is{" "}
              </>
            ),
            vi: (
              <>
                Lần đoán {search.found} cho ra {props.target}, nên chìa khóa là{" "}
              </>
            ),
          })}
          <Sum base={props.bobSent} exponent={search.found} modulus={modulus} result={search.key!} />
        </p>
      )}
    </>
  );
}

/** One line under the table saying what just happened. */
function captionFor(state: KeyExchangeState, search: Search | undefined, locale: Locale): ReactNode {
  if (locale === "vi") return captionForVi(state, search);
  if (search) {
    return `Eve needed ${search.guesses.length} of ${state.modulus - 1} possible guesses. Real exchanges use a P hundreds of digits long. Trying every secret would then take longer than the age of the universe.`;
  }
  switch (state.step) {
    case 1:
      return "Alice and Bob agree on two numbers. They do not mind who hears them.";
    case 2:
      return "Each of them picks a secret number and tells nobody, not even the other.";
    case 3:
      return "Each puts their secret into the one-way function and sends the result. Eve sees both results.";
    default:
      return "Each raises the number they received to the power of their own secret. They reach the same key, and it was never sent.";
  }
}

/** The same line in Vietnamese. */
function captionForVi(state: KeyExchangeState, search: Search | undefined): string {
  if (search) {
    return `Eve cần ${search.guesses.length} trong số ${state.modulus - 1} lần đoán có thể. Các cuộc trao đổi thật dùng một số P dài hàng trăm chữ số. Khi đó, thử hết mọi số bí mật sẽ mất lâu hơn cả tuổi của vũ trụ.`;
  }
  switch (state.step) {
    case 1:
      return "Alice và Bob thống nhất hai con số. Họ không ngại ai nghe thấy.";
    case 2:
      return "Mỗi người chọn một số bí mật và không nói cho ai, kể cả người kia.";
    case 3:
      return "Mỗi người đưa số bí mật của mình vào hàm số một chiều rồi gửi kết quả đi. Eve thấy cả hai kết quả.";
    default:
      return "Mỗi người lấy số mình nhận được, nâng lên lũy thừa bằng số bí mật của chính mình. Hai người ra cùng một chìa khóa, mà chìa khóa ấy chưa bao giờ được gửi đi.";
  }
}
