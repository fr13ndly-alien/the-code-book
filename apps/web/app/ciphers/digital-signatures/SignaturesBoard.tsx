import { digestWorking, sign } from "@codebook/cipher-engine/digital-signatures";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { Desk, Line, Working } from "./Desk";
import { ALICE, check, verdict, type SignaturesState } from "./useSignatures";

/** Alice's side: the digest of her message, worked out symbol by symbol, and the signature it gives. */
function AliceDesk({ message }: { message: string }) {
  const working = digestWorking(message, ALICE.n);
  return (
    <Desk title="Alice" note="signs">
      <Line label="Private key, which only Alice knows" secret>
        d = {ALICE.d}
      </Line>
      <Working
        label="Turning the message into numbers"
        rows={[
          { label: "Message", cells: working.symbols },
          { label: "As numbers", cells: working.codes },
        ]}
      />
      <Line label={`Toy digest: add them up, keep the remainder after dividing by ${ALICE.n}`}>{working.digest}</Line>
      <Line label={`Signature: digest to the power ${ALICE.d}, mod ${ALICE.n}`} secret>
        {sign(message, ALICE)}
      </Line>
    </Desk>
  );
}

/** What travels: the message in plain sight, and the signature beside it. */
function PostDesk({ state }: { state: SignaturesState }) {
  return (
    <Desk title="On the way" note="anyone can read it, or change it">
      <Line label="Message">{state.arrived || "nothing sent yet"}</Line>
      <Line label="Signature" secret>
        {state.signature ?? "none"}
      </Line>
      {state.tries !== null && <Line label="A forger found this signature by trying">{state.tries} numbers</Line>}
    </Desk>
  );
}

/** Bob's side: he works out the digest himself, opens the signature, and compares. */
function BobDesk({ state }: { state: SignaturesState }) {
  const result = check(state);
  return (
    <Desk title="Bob" note="checks">
      <Line label="Alice's public key, which everyone has">
        N = {ALICE.n}, e = {ALICE.e}
      </Line>
      <Line label="Toy digest of the message that arrived">{digestWorking(state.arrived, ALICE.n).digest}</Line>
      <Line label={`Signature to the power ${ALICE.e}, mod ${ALICE.n}`}>{result ? result.opened : "no signature"}</Line>
      <Line label="Verdict" secret>
        {verdict(state)}
      </Line>
    </Desk>
  );
}

/** A signature's journey as three desks: Alice signs, the note travels, Bob checks. */
export function SignaturesBoard({ state }: { state: SignaturesState }) {
  return (
    <Board>
      <AliceDesk message={state.message} />
      <PostDesk state={state} />
      <BobDesk state={state} />
      <Caption>
        Everything here is a toy. A real digest comes from a hash function, and real keys are hundreds of digits long.
      </Caption>
    </Board>
  );
}
