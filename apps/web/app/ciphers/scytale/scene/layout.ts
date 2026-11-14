/**
 * Where things sit on the model. Units are arbitrary: one letter is about 1
 * wide. The staff lies along the x axis, centred on the origin, and the
 * camera looks at it from the +z side.
 */

/** The space one letter takes: along the staff (one turn of the strip) and round it (one line). */
export const LETTER = { along: 1, around: 1.15 };

/** The wooden staff: how far it sticks out of the strip, and its end caps. */
export const STAFF = { overhang: 1.1, inset: 0.05, capLength: 0.3, capGrow: 0.12 };

/** The picture drawn on the strip: pixels per letter, and the width of the line between turns. */
export const TEXTURE = { cell: 64, seam: 3 };

/** The camera: field of view in degrees, how far above level it sits (radians), and the space left round the model. */
export const CAMERA = { fov: 35, tilt: 0.25, margin: 0.8 };

/** How far the reader may swing the camera. */
export const ORBIT = { minDistance: 3, maxDistance: 90, minPolar: 0.9, maxPolar: 1.9, maxAzimuth: 0.8 };

export const COLORS = {
  wood: "#6b4a2b",
  cap: "#3b2a1c",
  leather: "#c79a63",
  seam: "#7a5530",
  ink: "#1a1612",
};

/** The radius of a staff that holds `perTurn` lines of writing round it. */
export const radiusFor = (perTurn: number) => (perTurn * LETTER.around) / (2 * Math.PI);

/** The length of staff covered by a strip wound `turns` times. Never zero, so an empty staff still shows. */
export const lengthFor = (turns: number) => Math.max(turns, 1) * LETTER.along;
