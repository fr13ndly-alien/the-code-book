import type { Arm, Leg, Pose } from "@codebook/cipher-engine/dancing-men";

/** The size of the drawing of one dancing man, in SVG units. Room is left above for a raised flag. */
export const FIGURE_WIDTH = 28;
export const FIGURE_HEIGHT = 42;

/** The body runs down the middle line from the shoulders to the hips. */
const MIDDLE = 12;
export const HEAD = { x: MIDDLE, y: 12, r: 3.5 };
const NECK_Y = 15.5;
const SHOULDER_Y = 18;
const HIP_Y = 28;

type Point = [x: number, y: number];

/** Where the joints of a limb go, as steps away from the shoulder or hip, for a limb on the right. */
const ARM_SHAPES: Record<Arm, Point[]> = {
  up: [[8, -8]],
  out: [[9, 0]],
  down: [[6, 8]],
  bent: [[7, 4], [1, 8]],
};
const LEG_SHAPES: Record<Leg, Point[]> = {
  down: [[2, 12]],
  out: [[9, 11]],
  bent: [[6, 5], [11, 0]],
};

/** A limb as SVG points. `side` is -1 for the left of the picture and 1 for the right. */
const limb = (shape: Point[], side: 1 | -1, fromY: number): Point[] => [
  [MIDDLE, fromY],
  ...shape.map(([x, y]): Point => [MIDDLE + side * x, fromY + y]),
];

/** Every line of a figure: the body, two arms and two legs, each a list of points. */
export const figureLines = (pose: Pose): Point[][] => [
  [[MIDDLE, NECK_Y], [MIDDLE, HIP_Y]],
  limb(ARM_SHAPES[pose.leftArm], -1, SHOULDER_Y),
  limb(ARM_SHAPES[pose.rightArm], 1, SHOULDER_Y),
  limb(LEG_SHAPES[pose.leftLeg], -1, HIP_Y),
  limb(LEG_SHAPES[pose.rightLeg], 1, HIP_Y),
];

const POLE = 9;
const FLAG_LENGTH = 6;
const FLAG_DROP = 2.5;

/** The flag: a pole rising from the right hand and a pennant at its top. */
export function flagShape(pose: Pose): { pole: Point[]; pennant: Point[] } {
  const [x, y] = limb(ARM_SHAPES[pose.rightArm], 1, SHOULDER_Y).at(-1)!;
  const top = y - POLE;
  return {
    pole: [[x, y], [x, top]],
    pennant: [[x, top], [x + FLAG_LENGTH, top + FLAG_DROP], [x, top + 2 * FLAG_DROP]],
  };
}

/** Points in the form an SVG polyline wants: "12,18 20,10". */
export const asPoints = (points: Point[]) => points.map((point) => point.join(",")).join(" ");
