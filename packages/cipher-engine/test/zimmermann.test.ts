import { describe, expect, it } from "vitest";
import {
  CODEBOOK,
  countRight,
  decode,
  encode,
  INTERCEPT,
  knownReadings,
  read,
  unknownGroups,
} from "../src/zimmermann/index.ts";

const germanFor = (group: number) => CODEBOOK.find((entry) => entry.group === group)?.german;

describe("Zimmermann telegram code", () => {
  // Source: U.S. National Archives, Zimmermann telegram decode worksheet (Record Group 59, NAID 302024).
  // The worksheet shows the telegram's groups with the German written beside them:
  // 17214 "ganz geheim"; 67893 "Mexico"; then "4458 gemeinsam, 5905 Krieg, 17166 führen",
  // which the telegram's English translation gives as "make war together"; and 97556 "Zimmermann".
  it("reads real groups of the telegram", () => {
    expect([4458, 5905, 17166].map(germanFor)).toEqual(["gemeinsam", "Krieg", "führen"]);
    expect(decode([4458, 5905, 17166])).toEqual(["TOGETHER", "WAR", "MAKE"]);
    expect(decode([17214, 67893, 97556])).toEqual(["MOST SECRET", "MEXICO", "ZIMMERMANN"]);
  });

  // The same worksheet, page by page: every group below is written there beside this German word.
  it("matches the worksheet for all 21 real groups", () => {
    const worksheet: [number, string][] = [
      [17214, "ganz geheim"],
      [18222, "(full stop)"],
      [21560, "wir"],
      [13605, "Februar"],
      [98092, "U-Boot"],
      [5905, "Krieg"],
      [10392, "beginnen"],
      [17504, "neutral"],
      [67893, "Mexico"],
      [12137, "Bündnis"],
      [4458, "gemeinsam"],
      [17166, "führen"],
      [6929, "und"],
      [14218, "in"],
      [36477, "Texas"],
      [22464, "Präsident"],
      [20420, "mit"],
      [52262, "Japan"],
      [76036, "England"],
      [17142, "Frieden"],
      [97556, "Zimmermann"],
    ];
    const real = CODEBOOK.filter((entry) => !entry.madeUp);
    expect(real).toHaveLength(21);
    expect(CODEBOOK.filter((entry) => entry.madeUp)).toHaveLength(4);
    for (const [group, german] of worksheet) expect(germanFor(group)).toBe(german);
  });

  it("gives every word one group and every group one word", () => {
    expect(new Set(CODEBOOK.map((entry) => entry.group)).size).toBe(CODEBOOK.length);
    expect(new Set(CODEBOOK.map((entry) => entry.word)).size).toBe(CODEBOOK.length);
    expect(CODEBOOK.filter((entry) => entry.madeUp).every((entry) => entry.german === undefined)).toBe(true);
  });

  it("decodes what it encodes, and leaves out words the codebook lacks", () => {
    const words = ["MOST SECRET", "WE", "MAKE", "PEACE", "STOP"];
    expect(decode(encode(words))).toEqual(words);
    expect(encode(["WE", "SURRENDER"])).toEqual([21560]);
  });

  it("starts the codebreaker with gaps where groups are unknown", () => {
    const start = knownReadings(INTERCEPT);
    expect(read(INTERCEPT.telegrams[1]!, start).join(" ")).toBe("WE MAKE WAR ? AND ? ? STOP");
    expect(unknownGroups(INTERCEPT)).toEqual([98092, 13605, 4458, 17142, 67893, 12137]);
  });

  it("counts the guesses that fit the real codebook", () => {
    expect(countRight({ 4458: "TOGETHER", 17142: "ENGLAND" })).toBe(1);
  });

  // The challenge on the page: the last intercepted telegram, read once the codebook is rebuilt.
  it("produces the challenge telegram and solves it", () => {
    const telegram = INTERCEPT.telegrams[3]!;
    expect(telegram).toEqual([21560, 17166, 12137, 20420, 67893, 6929, 52262]);
    expect(decode(telegram).join(" ")).toBe("WE MAKE ALLIANCE WITH MEXICO AND JAPAN");
    // Every unknown group can be filled from the list of suspected words.
    const answers = decode(unknownGroups(INTERCEPT));
    expect(answers.every((word) => INTERCEPT.suspects.includes(word))).toBe(true);
  });
});
