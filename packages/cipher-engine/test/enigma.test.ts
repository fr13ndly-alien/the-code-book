import { describe, expect, it } from "vitest";
import {
  ALPHABET,
  DEFAULT_SETTINGS,
  addCable,
  encipher,
  pressKey,
  removeCable,
  stepRotors,
  type EnigmaSettings,
  type Positions,
} from "../src/index.ts";

const at = (letters: string) => [...letters].map((l) => ALPHABET.indexOf(l)) as unknown as Positions;
const show = (positions: Positions) => positions.map((p) => ALPHABET[p]).join("");

describe("Enigma I", () => {
  it("matches the standard test vector (I-II-III, rings AAA, start AAA)", () => {
    expect(encipher(DEFAULT_SETTINGS, at("AAA"), "AAAAA").output).toBe("BDZGO");
  });

  it("applies ring settings", () => {
    const settings: EnigmaSettings = { ...DEFAULT_SETTINGS, rings: [1, 1, 1] };
    expect(encipher(settings, at("AAA"), "AAAAA").output).toBe("EWTYX");
  });

  it("undoes a ring setting when each rotor is turned by the same amount", () => {
    // Rings BBB with the rotors at BBB put the wiring where rings AAA at AAA put it.
    const settings: EnigmaSettings = { ...DEFAULT_SETTINGS, rings: [1, 1, 1] };
    expect(encipher(settings, at("BBB"), "AAAAA").output).toBe("BDZGO");
  });

  it("keeps the turnover at the same window letter whatever the ring setting", () => {
    const settings: EnigmaSettings = { ...DEFAULT_SETTINGS, rings: [3, 7, 11] };
    expect(show(stepRotors(settings, at("AAV")))).toBe("ABW");
  });

  it("double-steps the middle rotor", () => {
    let positions = at("ADU");
    const seen: string[] = [];
    for (let i = 0; i < 3; i++) {
      positions = stepRotors(DEFAULT_SETTINGS, positions);
      seen.push(show(positions));
    }
    expect(seen).toEqual(["ADV", "AEW", "BFX"]);
  });

  it("deciphers a real message from Operation Barbarossa, 1941", () => {
    const settings: EnigmaSettings = {
      rotors: ["II", "IV", "V"],
      rings: [1, 20, 11], // B U L
      reflector: "B",
      cables: ["AV", "BS", "CG", "DL", "FU", "HZ", "IN", "KM", "OW", "RX"],
    };
    const { output } = encipher(settings, at("BLA"), "EDPUD NRGYS ZRCXN UYTPO MRMBO FKTBZ REZKM LXLVE");
    expect(output).toBe("AUFKLXABTEILUNGXVONXKURTINOWAXKURTINOWAX");
  });

  it("is its own inverse: typing the ciphertext gives back the plaintext", () => {
    const settings: EnigmaSettings = { ...DEFAULT_SETTINGS, cables: ["AB", "QZ"] };
    const secret = encipher(settings, at("QCW"), "ATTACKATDAWN").output;
    expect(encipher(settings, at("QCW"), secret).output).toBe("ATTACKATDAWN");
  });

  it("never enciphers a letter as itself", () => {
    for (const key of ALPHABET) {
      expect(pressKey(DEFAULT_SETTINGS, at("MCK"), key).output).not.toBe(key);
    }
  });

  it("traces the current through all ten stages", () => {
    const { trace, output } = pressKey(DEFAULT_SETTINGS, at("AAA"), "A");
    expect(trace).toHaveLength(10);
    expect(trace[0]).toBe("A");
    expect(trace.at(-1)).toBe(output);
  });
});

describe("plugboard", () => {
  it("adds a cable and frees sockets that were in use", () => {
    expect(addCable(["AB"], "B", "C")).toEqual(["BC"]);
  });

  it("removes the cable touching a letter", () => {
    expect(removeCable(["AB", "CD"], "D")).toEqual(["AB"]);
  });
});
