import { describe, expect, it } from "vitest";
import { decipher, encipher, tryAllStaffs, turnsNeeded, unwind, writeOnStaff } from "../src/scytale/index.ts";

describe("Scytale", () => {
  // Source: The Code Book, chapter 1, figure 2. The staff carries four lines
  // of eight letters, and the unwound strip begins S, T, S, F.
  const BOOK_PLAIN = "SEND MORE TROOPS TO SOUTHERN FLANK AND";

  it("writes the book's message along the staff", () => {
    expect(writeOnStaff(BOOK_PLAIN, 4)).toEqual(["SENDMORE", "TROOPSTO", "SOUTHERN", "FLANKAND"]);
  });

  it("unwinds the book's strip: S, T, S, F, ...", () => {
    expect(encipher(BOOK_PLAIN, 4)).toBe("STSFEROLNOUADOTNMPHKOSEARTRNEOND");
  });

  it("lists the letters on each turn of the strip", () => {
    expect(unwind(BOOK_PLAIN, 4).slice(0, 3)).toEqual(["STSF", "EROL", "NOUA"]);
    expect(unwind("HELLO", 4)).toEqual(["HLO", "EL"]);
  });

  it("reads the strip on a staff of the right thickness", () => {
    expect(decipher("STSFEROLNOUADOTNMPHKOSEARTRNEOND", 4)).toBe("SENDMORETROOPSTOSOUTHERNFLANKAND");
  });

  it("reads nonsense on a staff of the wrong thickness", () => {
    expect(decipher("STSFEROLNOUADOTNMPHKOSEARTRNEOND", 3)).not.toContain("SEND");
  });

  it("counts the turns of the strip", () => {
    expect(turnsNeeded(32, 4)).toBe(8);
    expect(turnsNeeded(10, 4)).toBe(3);
  });

  it("deciphers what it enciphers when the last line is short", () => {
    for (let perTurn = 2; perTurn <= 8; perTurn++) {
      for (const message of ["ATTACKATDAWN", "HELLO", "WEAREDISCOVEREDFLEEATONCE", "A", ""]) {
        expect(decipher(encipher(message, perTurn), perTurn)).toBe(message);
      }
    }
  });

  // The strips quoted in the story.
  it("produces the story's short example", () => {
    expect(encipher("HELP IS COMING", 3)).toBe("HIMESILCNPOG");
  });

  // The strip used in the story's challenge.
  it("produces the story's challenge, and trying every staff finds it", () => {
    const strip = encipher("PHARNABAZUS PLANS TO ATTACK YOU", 3);
    expect(strip).toBe("PUAHSTAPTRLANACANKBSYATOZOU");
    expect(tryAllStaffs(strip, 8)[3 - 2]).toBe("PHARNABAZUSPLANSTOATTACKYOU");
  });
});
