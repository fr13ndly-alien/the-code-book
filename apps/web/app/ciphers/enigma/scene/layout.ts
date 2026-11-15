/**
 * Where things sit on the model. Units are arbitrary: the machine is about 12
 * wide. The top face is at y = 0, x runs left to right, z runs towards the user.
 */

/** The Enigma used the German QWERTZ layout for keys, lamps and sockets alike. */
const ROWS = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"];

export interface Cell {
  letter: string;
  /** Column offset from the centre of the row, in cells. */
  column: number;
  /** 0 is the back row. */
  row: number;
}

export const CELLS: Cell[] = ROWS.flatMap((letters, row) =>
  [...letters].map((letter, i) => ({ letter, row, column: i - (letters.length - 1) / 2 })),
);

export const CELL_OF: Record<string, Cell> = Object.fromEntries(CELLS.map((cell) => [cell.letter, cell]));

export const BODY = { width: 12, height: 2.4, depth: 10.5, centerZ: -1.25 };

/** The thumbwheels are centred below the cover plate, so only their tops show. */
export const ROTOR = { radius: 1.3, y: -0.45, z: -4.7, gap: 2.4, coverHeight: 0.5 };

export const LAMPS = { width: 10.4, depth: 2.9, z: -1.6 };

export const KEYS = { spacing: 1.12, rowDepth: 1.05, z: 0.75, radius: 0.4, travel: 0.14 };

export const PLUGS = { width: 10.4, height: 3, tilt: -0.75, y: -1.15, z: 5.05, spacing: 1.12, rowHeight: 0.95 };

export const COLORS = {
  wood: "#3b2a1c",
  metal: "#1d1b19",
  brass: "#c9a24a",
  keyCap: "#111111",
  keyRim: "#bdb8ae",
  lampOff: "#3a342a",
  lampOn: "#ffd76a",
  cables: ["#b23a2e", "#2e6fb2", "#3c8f4a", "#c98a1e", "#7d4bb0"],
};
