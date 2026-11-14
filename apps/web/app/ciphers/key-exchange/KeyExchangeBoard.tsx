import type { ReactNode } from "react";
import type { Search } from "@codebook/cipher-engine/key-exchange";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
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
  const sum = (of: number, to: number, result: number) =>
    hidden ? <Hidden /> : <Sum base={of} exponent={to} modulus={modulus} result={result} />;

  return (
    <Board>
      <table className={styles.table}>
        <thead>
          <tr>
            <td />
            <th scope="col">Alice</th>
            <th scope="col">In public: Eve sees this</th>
            <th scope="col">Bob</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1. Agree</th>
            <td />
            <td data-kind="public">
              Y = <b>{base}</b>, P = <b>{modulus}</b>
              <br />
              The function is {base}
              <sup>x</sup> (mod {modulus})
            </td>
            <td />
          </tr>
          {step >= 2 && (
            <tr>
              <th scope="row">2. Choose a secret</th>
              <td data-kind="secret">{hidden ? <Hidden /> : <>A = <b>{alice.secret}</b></>}</td>
              <td data-kind="public">Nothing is sent</td>
              <td data-kind="secret">{hidden ? <Hidden /> : <>B = <b>{bob.secret}</b></>}</td>
            </tr>
          )}
          {step >= 3 && (
            <tr>
              <th scope="row">3. Swap numbers</th>
              <td>{sum(base, alice.secret, alice.sends)}</td>
              <td data-kind="public">
                Alice sends <b>{alice.sends}</b>
                <br />
                Bob sends <b>{bob.sends}</b>
              </td>
              <td>{sum(base, bob.secret, bob.sends)}</td>
            </tr>
          )}
          {step >= 4 && (
            <tr>
              <th scope="row">4. Work out the key</th>
              <td data-kind="secret">{sum(bob.sends, alice.secret, alice.key)}</td>
              <td data-kind="public">Nothing is sent</td>
              <td data-kind="secret">{sum(alice.sends, bob.secret, bob.key)}</td>
            </tr>
          )}
          {search && (
            <tr>
              <th scope="row">Eve tries</th>
              <td />
              <td data-kind="public">
                <EveGuesses search={search} base={base} modulus={modulus} target={alice.sends} bobSent={bob.sends} />
              </td>
              <td />
            </tr>
          )}
        </tbody>
      </table>
      <Caption>{captionFor(state, search)}</Caption>
    </Board>
  );
}

/** A power worked out in clock arithmetic, e.g. 7^3 = 343 = 2 (mod 11). */
function Sum(props: { base: number; exponent: number; modulus: number; result: number }) {
  const full = props.base ** props.exponent;
  return (
    <>
      {props.base}
      <sup>{props.exponent}</sup>
      {full <= LONGEST_POWER && full !== props.result && <> = {full.toLocaleString("en")}</>} ={" "}
      <b>{props.result}</b> (mod {props.modulus})
    </>
  );
}

/** A number the reader is not allowed to see while playing Eve. */
const Hidden = () => <span aria-label="hidden">?</span>;

/** Eve's list of guesses, ending with the one that matches what Alice sent. */
function EveGuesses(props: { search: Search; base: number; modulus: number; target: number; bobSent: number }) {
  const { search, base, modulus } = props;
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
          Guess {search.found} gives {props.target}, so the key is{" "}
          <Sum base={props.bobSent} exponent={search.found} modulus={modulus} result={search.key!} />
        </p>
      )}
    </>
  );
}

/** One line under the table saying what just happened. */
function captionFor(state: KeyExchangeState, search: Search | undefined): ReactNode {
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
