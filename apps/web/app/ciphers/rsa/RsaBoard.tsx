import type { ReactNode } from "react";
import type { Factoring, PowerSteps, RsaKeys } from "@codebook/cipher-engine/rsa";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import styles from "./RsaBoard.module.css";
import { attackOf, keysOf, secretsHidden, withLetter, work, type RsaState } from "./useRsa";

/** The largest product worth writing out in full before reducing it, as the book does with 894,432. */
const LONGEST_PRODUCT = 1e15;

const show = (value: number) => value.toLocaleString("en");

/** The RSA workbench: how the keys are made, the power being worked out, and the attacker's progress. */
export function RsaBoard({ state }: { state: RsaState }) {
  const keys = keysOf(state);
  const steps = work(state);
  const attack = attackOf(state);

  return (
    <Board>
      <div className={styles.panels}>
        <KeyPanel keys={keys} hidden={secretsHidden(state)} />
        <PowerPanel steps={steps} deciphering={state.mode === "decipher"} />
        {attack && <AttackPanel n={keys.n} factoring={attack.factoring} stolen={attack.keys} />}
      </div>
      <Caption>
        {attack
          ? "Dividing works here because N is tiny. The book says a bank's N is at least 10 to the power 308. A hundred million computers would need more than a thousand years to factor it."
          : "Anyone may know N and e. Only the owner knows p and q, and so only the owner can work out d."}
      </Caption>
    </Board>
  );
}

/** A titled box on the board. */
function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.panel}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** One line of working: a name, the sum, and whether it is public or private. */
function Line(props: { name: string; kind: "public" | "private"; hidden?: boolean; children: ReactNode }) {
  return (
    <tr data-kind={props.kind}>
      <th scope="row">{props.name}</th>
      <td>{props.hidden ? "?" : props.children}</td>
      <td className={styles.tag}>{props.kind}</td>
    </tr>
  );
}

/** How Alice makes her keys from two primes. */
function KeyPanel({ keys, hidden }: { keys: RsaKeys; hidden: boolean }) {
  return (
    <Panel title="Alice makes her keys">
      <table className={styles.lines}>
        <tbody>
          <Line name="p, q" kind="private" hidden={hidden}>
            <b>{show(keys.p)}</b> and <b>{show(keys.q)}</b>
          </Line>
          <Line name="N" kind="public">
            {hidden ? "" : `${show(keys.p)} × ${show(keys.q)} = `}
            <b>{show(keys.n)}</b>
          </Line>
          <Line name="(p − 1) × (q − 1)" kind="private" hidden={hidden}>
            {show(keys.p - 1)} × {show(keys.q - 1)} = <b>{show(keys.phi)}</b>
          </Line>
          <Line name="e" kind="public">
            <b>{keys.e}</b>
          </Line>
          <Line name="d" kind="private" hidden={hidden}>
            <b>{show(keys.d)}</b>, because {keys.e} × {show(keys.d)} = {show(keys.e * keys.d)} = 1 (mod {show(keys.phi)})
          </Line>
        </tbody>
      </table>
    </Panel>
  );
}

/** The squaring trick of Appendix E: the powers 1, 2, 4, 8... and the ones multiplied together. */
function PowerPanel({ steps, deciphering }: { steps: PowerSteps | undefined; deciphering: boolean }) {
  const title = deciphering ? "Alice deciphers with d" : "Bob enciphers with N and e";
  if (!steps) {
    return (
      <Panel title={title}>
        <p>{deciphering ? "Nothing to work out yet: you need a number smaller than N, and d." : "Type a letter or a number smaller than N."}</p>
      </Panel>
    );
  }
  const used = steps.squares.filter((square) => square.used);
  const product = used.reduce((total, square) => total * square.value, 1);

  return (
    <Panel title={title}>
      <p>
        {deciphering ? "M = C" : "C = M"}
        <sup>{deciphering ? "d" : "e"}</sup> (mod N) = {show(steps.base)}
        <sup>{show(steps.exponent)}</sup> (mod {show(steps.modulus)}), and {show(steps.exponent)} ={" "}
        {used.map((square) => square.power).reverse().join(" + ")}
      </p>
      <table className={styles.squares}>
        <tbody>
          {steps.squares.map((square) => (
            <tr key={square.power} data-on={square.used}>
              <th scope="row">
                {show(steps.base)}
                <sup>{square.power}</sup>
              </th>
              <td>= {show(square.value)}</td>
              <td className={styles.tag}>{square.used ? "used" : "skipped"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        {used.map((square) => show(square.value)).join(" × ")}
        {used.length > 1 && product < LONGEST_PRODUCT && ` = ${show(product)}`} ={" "}
        <b>{deciphering ? withLetter(steps.result) : show(steps.result)}</b> (mod {show(steps.modulus)})
      </p>
    </Panel>
  );
}

/** Eve's attack: divide N by one number after another until one goes in exactly. */
function AttackPanel({ n, factoring, stolen }: { n: number; factoring: Factoring; stolen: RsaKeys | undefined }) {
  const [p, q] = factoring.factors ?? [0, 0];
  return (
    <Panel title="Eve attacks N">
      <p>
        Eve divides {show(n)} by 2, then by 3, then by every odd number after that, until one goes in exactly.
      </p>
      <p>
        Try <b>{show(factoring.tries)}</b>: {show(n)} ÷ {show(p)} = {show(q)} exactly. So the primes are{" "}
        <b>{show(p)}</b> and <b>{show(q)}</b>.
      </p>
      {stolen && (
        <p>
          Now she does what Alice did: (p − 1) × (q − 1) = {show(stolen.phi)}, so d = <b>{show(stolen.d)}</b>. She can
          read every message.
        </p>
      )}
    </Panel>
  );
}
