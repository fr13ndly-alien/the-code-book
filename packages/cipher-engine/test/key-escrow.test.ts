import { describe, expect, it } from "vitest";
import {
  KEY_COUNT,
  WATCH_WORDS,
  ciphertext,
  cleanKey,
  decipher,
  encipher,
  join,
  otherHalfFor,
  possibilities,
  release,
  scan,
  setWarrant,
  split,
  whatPoliceCanRead,
  whatThiefCanRead,
  whoCanRead,
  type EscrowState,
} from "../src/key-escrow/index.ts";
import { ALPHABET } from "../src/text/index.ts";

const NONE = { one: false, two: false };
const BOTH = { one: true, two: true };

/** The page's opening setup: Alice's key LOCK is lodged, and nobody has asked for it. */
const START: EscrowState = {
  key: "LOCK",
  random: "QXJM",
  message: "THE PARTY IS ON FRIDAY",
  escrowed: true,
  ownKey: "MINE",
  warrant: false,
  released: NONE,
  stolen: NONE,
};

/** Every four-letter row whose letters step through the alphabet at different speeds: 26 varied rows. */
const ROWS = [...ALPHABET].map((_, n) => [n, 3 * n + 1, 7 * n + 5, 11 * n + 2].map((i) => ALPHABET[i % 26]).join(""));

describe("the toy cipher", () => {
  // Source: The Code Book, chapter 2. "The sun and the man in the moon" enciphered with the
  // Vigenère keyword KING: the first "the" becomes DPR, the second and third become BUK.
  it("matches the book's Vigenère example with the keyword KING", () => {
    const sent = encipher("the sun and the man in the moon", "KING");
    expect(sent).toBe("DPR YEV NTN BUK WIA OX BUK WWBT");
    expect(decipher(sent, "KING")).toBe("THE SUN AND THE MAN IN THE MOON");
  });

  it("pads a short key with A", () => {
    expect(cleanKey("lo")).toBe("LOAA");
    expect(KEY_COUNT).toBe(456976);
  });
});

describe("splitting a key", () => {
  it("keeps the random letters as half one", () => {
    expect(split("LOCK", "QXJM")).toEqual({ one: "QXJM", two: "VRTY" });
  });

  it("rebuilds the key from both halves, whatever the random half was", () => {
    for (const key of ["LOCK", "CHIP", "AAAA", "ZZZZ"]) {
      for (const random of ROWS) {
        const halves = split(key, random);
        expect(join(halves.one, halves.two)).toBe(key);
        expect(join(halves.two, halves.one)).toBe(key);
      }
    }
  });

  it("leaves every key possible when only one half is known", () => {
    // Whatever half somebody holds, each key has exactly one other half that fits it,
    // so the half rules nothing out. Checked for one letter place in full, then for whole keys.
    for (const halfLetter of ALPHABET) {
      const fits = [...ALPHABET].map((keyLetter) => otherHalfFor(keyLetter + "AAA", halfLetter + "AAA")[0]);
      expect(new Set(fits).size).toBe(26);
    }
    for (const key of ROWS) {
      const other = otherHalfFor(key, "QXJM");
      expect(join("QXJM", other)).toBe(key);
      expect(join(other, "QXJM")).toBe(key);
    }
  });

  it("lists the half that would fit each suspected key", () => {
    expect(possibilities("QXJM", ["SAFE", "DOOR"])).toEqual([
      { key: "SAFE", otherHalf: "CDWS" },
      { key: "DOOR", otherHalf: "NRFF" },
    ]);
  });
});

describe("what the police can read", () => {
  it("is only the ciphertext with no warrant", () => {
    const view = whatPoliceCanRead(START);
    expect(view).toEqual({ one: null, two: null, key: null, text: "EVG ZLFVI TG QX QFKNLM", canRead: false });
    expect(whoCanRead(START)).toEqual(["Alice", "Bob"]);
  });

  it("an agency releases nothing without a warrant", () => {
    expect(release(START, "one")).toBe(START);
  });

  it("is nonsense with one half", () => {
    const view = whatPoliceCanRead(release(setWarrant(START, true), "one"));
    expect(view.one).toBe("QXJM");
    expect(view.key).toBeNull();
    expect(view.canRead).toBe(false);
    expect(view.text).toBe("OYX NVIMW DJ HL AIBBVP");
  });

  it("is the message with both halves and a warrant", () => {
    const state = release(release(setWarrant(START, true), "one"), "two");
    expect(whatPoliceCanRead(state)).toEqual({
      one: "QXJM",
      two: "VRTY",
      key: "LOCK",
      text: "THE PARTY IS ON FRIDAY",
      canRead: true,
    });
    expect(whoCanRead(state)).toEqual(["Alice", "Bob", "the police"]);
  });

  it("ends when the warrant is taken back", () => {
    const state = setWarrant(release(release(setWarrant(START, true), "one"), "two"), false);
    expect(whatPoliceCanRead(state).canRead).toBe(false);
  });
});

describe("the critics' cases", () => {
  it("one leaked half is not enough for a thief", () => {
    const view = whatThiefCanRead({ ...START, stolen: { one: true, two: false } });
    expect(view.canRead).toBe(false);
  });

  it("two stolen halves need no warrant", () => {
    const state = { ...START, stolen: BOTH };
    expect(whatThiefCanRead(state).text).toBe("THE PARTY IS ON FRIDAY");
    expect(whoCanRead(state)).toEqual(["Alice", "Bob", "a thief"]);
  });

  it("a cipher that was never lodged stays shut, even with both halves and a warrant", () => {
    const state = { ...START, escrowed: false, warrant: true, released: BOTH };
    expect(ciphertext(state)).toBe("FPR TMZGC UA BR RZVHMG");
    const view = whatPoliceCanRead(state);
    expect(view.key).toBe("LOCK");
    expect(view.canRead).toBe(false);
    expect(view.text).not.toBe("THE PARTY IS ON FRIDAY");
    expect(whoCanRead(state)).toEqual(["Alice", "Bob"]);
  });
});

describe("the keyword scanner", () => {
  it("flags plain messages with a watch word and misses an enciphered one", () => {
    const plain = "THE ASSASSIN ARRIVES AT NOON";
    const found = scan(["Happy birthday, Grandma", "Our school trip visits the Pentagon", plain, encipher(plain, "LOCK")]);
    expect(found).toEqual([[], ["PENTAGON"], ["ASSASSIN"], []]);
    expect(WATCH_WORDS).toHaveLength(3);
  });
});

describe("the challenge in the story", () => {
  // The reader is given the two halves and the ciphertext, and must rebuild the key.
  const CHALLENGE: EscrowState = { ...START, key: "CHIP", random: "WTGB", message: "THE MONEY IS UNDER THE BRIDGE" };

  it("uses the halves and ciphertext printed in the story", () => {
    expect(split(CHALLENGE.key, CHALLENGE.random)).toEqual({ one: "WTGB", two: "GOCO" });
    expect(ciphertext(CHALLENGE)).toBe("VOM BQUMN KZ CCFLZ IJL JGKKOT");
  });

  it("is solved by joining the halves", () => {
    expect(join("WTGB", "GOCO")).toBe("CHIP");
    expect(decipher("VOM BQUMN KZ CCFLZ IJL JGKKOT", join("WTGB", "GOCO"))).toBe("THE MONEY IS UNDER THE BRIDGE");
  });

  it("is solved on the page with a warrant and both agencies", () => {
    const state = release(release(setWarrant(CHALLENGE, true), "one"), "two");
    expect(whatPoliceCanRead(state).text).toBe("THE MONEY IS UNDER THE BRIDGE");
  });
});
