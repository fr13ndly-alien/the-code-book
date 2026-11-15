import type { ReactNode } from "react";
import type { Factoring, PowerSteps, RsaKeys } from "@codebook/cipher-engine/rsa";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, useT } from "~/i18n";
import styles from "./RsaBoard.module.css";
import { attackOf, keysOf, secretsHidden, withLetter, work, type RsaState } from "./useRsa";

/** The largest product worth writing out in full before reducing it, as the book does with 894,432. */
const LONGEST_PRODUCT = 1e15;

/** Writes a number with the current language's thousands separator: 1,709,023 or 1.709.023. */
function useShow() {
  const locale = useLocale();
  return (value: number) => value.toLocaleString(locale);
}

/** The RSA workbench: how the keys are made, the power being worked out, and the attacker's progress. */
export function RsaBoard({ state }: { state: RsaState }) {
  const keys = keysOf(state);
  const steps = work(state);
  const attack = attackOf(state);
  const t = useT();

  return (
    <Board>
      <div className={styles.panels}>
        <KeyPanel keys={keys} hidden={secretsHidden(state)} />
        <PowerPanel steps={steps} deciphering={state.mode === "decipher"} />
        {attack && <AttackPanel n={keys.n} factoring={attack.factoring} stolen={attack.keys} />}
      </div>
      <Caption>
        {attack
          ? t({
              en: "Dividing works here because N is tiny. The book says a bank's N is at least 10 to the power 308. A hundred million computers would need more than a thousand years to factor it.",
              vi: "Phép chia làm được ở đây vì N rất nhỏ. Sách nói N của một ngân hàng ít nhất là 10 mũ 308. Một trăm triệu máy tính sẽ cần hơn một nghìn năm để phân tích nó ra thừa số.",
            })
          : t({
              en: "Anyone may know N and e. Only the owner knows p and q, and so only the owner can work out d.",
              vi: "Ai cũng có thể biết N và e. Chỉ người chủ biết p và q, nên chỉ người chủ tính ra được d.",
            })}
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
  const t = useT();
  const tag = props.kind === "public" ? t({ en: "public", vi: "công khai" }) : t({ en: "private", vi: "riêng" });
  return (
    <tr data-kind={props.kind}>
      <th scope="row">{props.name}</th>
      <td>{props.hidden ? "?" : props.children}</td>
      <td className={styles.tag}>{tag}</td>
    </tr>
  );
}

/** How Alice makes her keys from two primes. */
function KeyPanel({ keys, hidden }: { keys: RsaKeys; hidden: boolean }) {
  const t = useT();
  const show = useShow();
  return (
    <Panel title={t({ en: "Alice makes her keys", vi: "Alice tạo chìa khóa của cô" })}>
      <table className={styles.lines}>
        <tbody>
          <Line name="p, q" kind="private" hidden={hidden}>
            <b>{show(keys.p)}</b> {t({ en: "and", vi: "và" })} <b>{show(keys.q)}</b>
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
            <b>{show(keys.d)}</b>
            {t({ en: ", because", vi: ", vì" })} {keys.e} × {show(keys.d)} = {show(keys.e * keys.d)} = 1 (mod{" "}
            {show(keys.phi)})
          </Line>
        </tbody>
      </table>
    </Panel>
  );
}

/** The squaring trick of Appendix E: the powers 1, 2, 4, 8... and the ones multiplied together. */
function PowerPanel({ steps, deciphering }: { steps: PowerSteps | undefined; deciphering: boolean }) {
  const t = useT();
  const show = useShow();
  const title = deciphering
    ? t({ en: "Alice deciphers with d", vi: "Alice giải mã bằng d" })
    : t({ en: "Bob enciphers with N and e", vi: "Bob mã hóa bằng N và e" });
  if (!steps) {
    return (
      <Panel title={title}>
        <p>
          {deciphering
            ? t({
                en: "Nothing to work out yet: you need a number smaller than N, and d.",
                vi: "Chưa có gì để tính: bạn cần một số nhỏ hơn N, và cần d.",
              })
            : t({ en: "Type a letter or a number smaller than N.", vi: "Gõ một chữ cái hoặc một số nhỏ hơn N." })}
        </p>
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
        <sup>{show(steps.exponent)}</sup> (mod {show(steps.modulus)}){t({ en: ", and", vi: ", và" })}{" "}
        {show(steps.exponent)} ={" "}
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
              <td className={styles.tag}>{square.used ? t({ en: "used", vi: "dùng" }) : t({ en: "skipped", vi: "bỏ qua" })}</td>
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
  const t = useT();
  const show = useShow();
  return (
    <Panel title={t({ en: "Eve attacks N", vi: "Eve tấn công N" })}>
      {t({
        en: (
          <>
            <p>
              Eve divides {show(n)} by 2, then by 3, then by every odd number after that, until one goes in exactly.
            </p>
            <p>
              Try <b>{show(factoring.tries)}</b>: {show(n)} ÷ {show(p)} = {show(q)} exactly. So the primes are{" "}
              <b>{show(p)}</b> and <b>{show(q)}</b>.
            </p>
            {stolen && (
              <p>
                Now she does what Alice did: (p − 1) × (q − 1) = {show(stolen.phi)}, so d = <b>{show(stolen.d)}</b>. She
                can read every message.
              </p>
            )}
          </>
        ),
        vi: (
          <>
            <p>
              Eve chia {show(n)} cho 2, rồi cho 3, rồi cho từng số lẻ sau đó, cho đến khi có một số chia hết.
            </p>
            <p>
              Lần thử <b>{show(factoring.tries)}</b>: {show(n)} ÷ {show(p)} = {show(q)}, chia hết. Vậy hai số nguyên tố
              là <b>{show(p)}</b> và <b>{show(q)}</b>.
            </p>
            {stolen && (
              <p>
                Giờ cô làm đúng như Alice đã làm: (p − 1) × (q − 1) = {show(stolen.phi)}, nên d ={" "}
                <b>{show(stolen.d)}</b>. Cô đọc được mọi bức thư.
              </p>
            )}
          </>
        ),
      })}
    </Panel>
  );
}
