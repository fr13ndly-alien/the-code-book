import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MODEL_FONT, canvasTexture } from "~/three/canvasTexture";
import { CELLS, COLORS, LAMPS } from "./layout";

const PIXELS_PER_UNIT = 64;
const WIDTH = LAMPS.width * PIXELS_PER_UNIT;
const HEIGHT = LAMPS.depth * PIXELS_PER_UNIT;

function drawLamps(ctx: CanvasRenderingContext2D, lit: string | null) {
  ctx.fillStyle = COLORS.metal;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.font = MODEL_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const cell of CELLS) {
    const x = WIDTH / 2 + cell.column * 1.12 * PIXELS_PER_UNIT;
    const y = HEIGHT / 2 + (cell.row - 1) * 0.92 * PIXELS_PER_UNIT;
    const on = cell.letter === lit;

    if (on) {
      const glow = ctx.createRadialGradient(x, y, 8, x, y, 54);
      glow.addColorStop(0, COLORS.lampOn);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(x - 54, y - 54, 108, 108);
    }
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fillStyle = on ? COLORS.lampOn : COLORS.lampOff;
    ctx.fill();
    ctx.fillStyle = on ? "#3a2a00" : "#8d8473";
    ctx.fillText(cell.letter, x, y + 2);
  }
}

/** The lamp panel. One lamp glows: the enciphered letter. */
export function Lampboard({ lit }: { lit: string | null }) {
  const invalidate = useThree((three) => three.invalidate);
  const litRef = useRef(lit);
  litRef.current = lit;

  const { texture, redraw } = useMemo(() => canvasTexture(WIDTH, HEIGHT, (ctx) => drawLamps(ctx, litRef.current)), []);

  useEffect(() => {
    redraw();
    invalidate();
  }, [lit, redraw, invalidate]);

  return (
    <mesh position={[0, 0.01, LAMPS.z]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[LAMPS.width, LAMPS.depth]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
