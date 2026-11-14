import { describe, expect, it } from "vitest";
import {
  cover,
  isHidden,
  legibility,
  MAX_HEAT,
  nextCovered,
  reads,
  scrape,
  search,
  warm,
  wrap,
  write,
} from "../src/hidden-writing/index.ts";

const WARNING = "Xerxes is coming. Arm Sparta and build ships.";

describe("Hidden writing", () => {
  it("wraps a message into rows without splitting short words", () => {
    expect(wrap(WARNING)).toEqual(["XERXES IS", "COMING. ARM", "SPARTA AND", "BUILD SHIPS."]);
    expect(wrap("abcdefghijklmnop", 12)).toEqual(["ABCDEFGHIJKL", "MNOP"]);
    expect(wrap("   ")).toEqual([]);
  });

  // Source: The Code Book, chapter 1, quoting Herodotus. Demaratus wrote on the wood of a
  // tablet and covered it with wax; it looked blank to the guards on the road, and the
  // message was read in Sparta once the wax was scraped off.
  it("passes a casual guard under wax and is read when scraped", () => {
    const written = write(WARNING, "wax");
    expect(reads(written)).toBe("XERXES IS COMING. ARM SPARTA AND BUILD SHIPS.");

    const tablet = cover(written);
    expect(reads(tablet)).toBe("");
    expect(search(tablet, "casual").found).toBe("");

    const oneStrip = scrape(tablet, nextCovered(tablet));
    expect(reads(oneStrip)).toBe("XERXES IS");
    expect(isHidden(oneStrip)).toBe(true);

    const scraped = tablet.rows.reduce((page, _, row) => scrape(page, row), tablet);
    expect(reads(scraped)).toBe(reads(written));
    expect(nextCovered(scraped)).toBe(-1);
  });

  it("scrapes any strip in any order, once", () => {
    const tablet = cover(write(WARNING, "wax"));
    const page = scrape(scrape(scrape(tablet, 3), 1), 3);
    expect(page.cleared).toEqual([1, 3]);
    expect(reads(page)).toBe("COMING. ARM BUILD SHIPS.");
    expect(scrape(tablet, 9)).toBe(tablet);
  });

  // Source: The Code Book, chapter 1, after Pliny the Elder. The ink is clear when dry,
  // and gentle heating turns it brown.
  it("darkens invisible ink step by step", () => {
    let sheet = cover(write("Meet me at noon", "ink"));
    expect(legibility(sheet.heat)).toBe(0);
    expect(reads(sheet)).toBe("");

    sheet = warm(sheet);
    expect(legibility(sheet.heat)).toBe(0.25);
    expect(reads(sheet)).toBe("");

    sheet = warm(sheet);
    expect(reads(sheet)).toBe("MEET ME AT NOON");

    for (let press = 0; press < 10; press++) sheet = warm(sheet);
    expect(sheet.heat).toBe(MAX_HEAT);
    expect(legibility(sheet.heat)).toBe(1);
  });

  // Source: The Code Book, chapter 1. The weakness of steganography: a thorough guard
  // who scrapes every tablet and heats every blank sheet reads the message at once.
  it("gives everything away to a thorough guard", () => {
    const tablet = cover(write(WARNING, "wax"));
    expect(search(tablet, "thorough").found).toBe("XERXES IS COMING. ARM SPARTA AND BUILD SHIPS.");
    expect(isHidden(search(tablet, "thorough").page)).toBe(false);

    const sheet = cover(write("Meet me at noon", "ink"));
    expect(search(sheet, "casual").found).toBe("");
    expect(search(sheet, "thorough").found).toBe("MEET ME AT NOON");
  });

  // The challenge in story.mdx: a blank sheet that must be warmed until it can be read.
  it("produces the answer to the challenge", () => {
    const sheet = cover(write("The guard is asleep", "ink"));
    expect(reads(sheet)).toBe("");
    expect(reads(warm(warm(sheet)))).toBe("THE GUARD IS ASLEEP");
  });
});
