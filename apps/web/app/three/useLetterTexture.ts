import { useEffect, useMemo } from "react";
import { MODEL_FONT, canvasTexture } from "./canvasTexture";

/** A square texture showing one letter, for key caps, windows and labels. */
export function useLetterTexture(letter: string, ink: string, background: string) {
  const texture = useMemo(
    () =>
      canvasTexture(64, 64, (ctx) => {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = ink;
        ctx.font = MODEL_FONT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, 32, 35);
      }).texture,
    [letter, ink, background],
  );

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
