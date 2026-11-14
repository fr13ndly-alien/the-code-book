import { useEffect, useMemo } from "react";
import { MODEL_FONT, canvasTexture } from "~/three/canvasTexture";
import { COLORS, TEXTURE } from "./layout";

/**
 * The picture wrapped round the strip: leather, a line between each turn, and
 * the letters. `lines` are the lines of writing; `turns` is how long they are.
 *
 * A cylinder maps the picture's width round its side and the picture's height
 * along its axis. The staff lies on its side, so the picture is drawn turned
 * a quarter: the bottom edge is the left end of the staff, and each letter is
 * rotated to stand upright for the reader.
 */
export function useStripTexture(lines: string[], turns: number) {
  const key = lines.join("|");
  const texture = useMemo(() => {
    const { cell, seam } = TEXTURE;
    const width = Math.max(lines.length, 1) * cell;
    const height = Math.max(turns, 1) * cell;
    return canvasTexture(width, height, (ctx) => {
      ctx.fillStyle = COLORS.leather;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = COLORS.seam;
      for (let turn = 0; turn <= turns; turn++) ctx.fillRect(0, turn * cell - seam / 2, width, seam);
      ctx.fillStyle = COLORS.ink;
      ctx.font = MODEL_FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      lines.forEach((line, row) =>
        [...line].forEach((letter, turn) => {
          ctx.save();
          ctx.translate((row + 0.5) * cell, height - (turn + 0.5) * cell);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(letter, 0, 2);
          ctx.restore();
        }),
      );
    }).texture;
    // `key` stands for the contents of `lines`.
  }, [key, turns]);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
