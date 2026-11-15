import { useState } from "react";
import { plugSwap } from "@codebook/cipher-engine";

/**
 * Cabling the plugboard takes two picks: one socket, then another.
 * Picking a socket that already has a cable pulls that cable out.
 */
export function usePlugPicker(
  cables: readonly string[],
  onPlug: (a: string, b: string) => void,
  onUnplug: (letter: string) => void,
) {
  const [pending, setPending] = useState<string | null>(null);

  function pick(letter: string) {
    if (plugSwap(cables, letter) !== letter) {
      onUnplug(letter);
      setPending(null);
    } else if (pending === null) {
      setPending(letter);
    } else {
      if (pending !== letter) onPlug(pending, letter);
      setPending(null);
    }
  }

  return { pending, pick };
}
