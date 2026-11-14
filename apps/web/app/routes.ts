import { existsSync, readdirSync } from "node:fs";
import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Every folder in app/ciphers that has a route.tsx becomes the page /ciphers/<folder>.
const ciphers = new URL("./ciphers/", import.meta.url);
const slugs = readdirSync(ciphers).filter((name) => existsSync(new URL(`${name}/route.tsx`, ciphers)));

export default [
  index("routes/home.tsx"),
  ...slugs.map((slug) => route(`ciphers/${slug}`, `ciphers/${slug}/route.tsx`)),
] satisfies RouteConfig;
