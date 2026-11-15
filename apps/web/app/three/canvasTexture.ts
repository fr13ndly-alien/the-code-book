import { CanvasTexture, SRGBColorSpace } from "three";

/**
 * Makes a texture by drawing on a 2D canvas. We letter every model this way,
 * so no font files or image downloads are needed.
 *
 * Call the returned `redraw` after the picture should change.
 */
export function canvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
): { texture: CanvasTexture; redraw: () => void } {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;

  const redraw = () => {
    ctx.clearRect(0, 0, width, height);
    draw(ctx);
    texture.needsUpdate = true;
  };
  redraw();
  return { texture, redraw };
}

/** The font used for lettering on models. */
export const MODEL_FONT = "600 34px ui-monospace, Menlo, Consolas, monospace";
