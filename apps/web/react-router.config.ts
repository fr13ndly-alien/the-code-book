import { existsSync, readdirSync } from "node:fs";
import type { Config } from "@react-router/dev/config";

const ciphers = new URL("./app/ciphers/", import.meta.url);
const slugs = readdirSync(ciphers).filter((name) => existsSync(new URL(`${name}/route.tsx`, ciphers)));
const english = ["/", ...slugs.map((slug) => `/ciphers/${slug}`)];

export default {
  // No server: every page is rendered to static HTML at build time, in English and in Vietnamese.
  ssr: false,
  prerender: () => [...english, "/vi", ...english.slice(1).map((path) => `/vi${path}`)],
} satisfies Config;
