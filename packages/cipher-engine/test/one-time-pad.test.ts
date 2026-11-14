import { describe, expect, it } from "vitest";
import { decipher, difference, encipher, padFor, padFromBytes, sums } from "../src/one-time-pad/index.ts";

describe("One-time pad", () => {
  // Source: Wikipedia, "One-time pad" (section Example): "hello" with the key XMCKL.
  it("enciphers the published example", () => {
    expect(encipher("hello", "XMCKL")).toBe("EQNVZ");
    expect(decipher("EQNVZ", "XMCKL")).toBe("HELLO");
  });

  // Source: the same example. A codebreaker who tries the key TQURI reads "later" instead.
  it("finds a pad for any other message of the same length", () => {
    expect(padFor("EQNVZ", "later")).toBe("TQURI");
    expect(decipher("EQNVZ", "TQURI")).toBe("LATER");
  });

  // Source: Simon Singh, The Code Book (full edition), chapter 3: "attack the valley at dawn".
  it("enciphers the book's example", () => {
    const pad = "PLMOEZQKJZLRTEAVCRCBY";
    expect(encipher("attack the valley at dawn", pad)).toBe("PEFOGJJRNULCEIYVVUCXL");
    expect(decipher("PEFOGJJRNULCEIYVVUCXL", padFor("PEFOGJJRNULCEIYVVUCXL", "defend the hill at sunset"))).toBe(
      "DEFENDTHEHILLATSUNSET",
    );
  });

  it("shows the sum behind each letter", () => {
    expect(sums("HELLO", "XMCKL")[0]).toEqual({ plain: "H", pad: "X", sum: 30, cipher: "E" });
  });

  it("stops enciphering where the pad runs out", () => {
    expect(encipher("HELLO", "XMC")).toBe("EQN");
  });

  it("lets the pad cancel out when it is used twice", () => {
    const pad = "PLMOEZQKJZLRTEAVCRCBY";
    const first = encipher("ATTACKTHEVALLEYATDAWN", pad);
    const second = encipher("RETREATTOTHERIVERNOW", pad);
    expect(difference(first, second)).toBe(difference("ATTACKTHEVALLEYATDAWN", "RETREATTOTHERIVERNOW"));
    // A right guess at the first message gives the pad, and the pad reads the second.
    expect(decipher(second, padFor(first, "ATTACKTHEVALLEYATDAWN"))).toBe("RETREATTOTHERIVERNOW");
  });

  it("makes pad letters from bytes without favouring any letter", () => {
    expect(padFromBytes([0, 25, 26, 233, 234, 255])).toBe("AZAZ");
  });

  // The challenge in story.mdx: the reader deciphers this with the sheet printed there.
  it("produces the challenge on the page", () => {
    const sheet = "QXJTMZKWPLHRVBDNGYCFASEUIO";
    expect(encipher("BURN THIS SHEET NOW", sheet)).toBe("RRAGFGSOHSLVOORJ");
  });
});
