import { Suspense, useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only in the browser, and shows `fallback` until they are
 * ready. Wrap every lazily loaded 3D scene in this: WebGL cannot run while the
 * pages are being built.
 */
export function ClientOnly({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Suspense fallback={fallback}>{children}</Suspense> : fallback;
}
