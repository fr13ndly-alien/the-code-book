import { existsSync, readdirSync } from "node:fs";
import { type RouteConfig, route } from "@react-router/dev/routes";

// Every folder in app/ciphers that has a route.tsx becomes the page /ciphers/<folder>.
// The optional "vi?" segment serves the Vietnamese page from the same route at /vi/ciphers/<folder>,
// so switching language keeps the page mounted. See app/i18n.ts.
const ciphers = new URL("./ciphers/", import.meta.url);
const slugs = readdirSync(ciphers).filter((name) => existsSync(new URL(`${name}/route.tsx`, ciphers)));

export default [
  route("vi?", "routes/home.tsx", { id: "home" }),
  ...slugs.map((slug) => route(`vi?/ciphers/${slug}`, `ciphers/${slug}/route.tsx`)),
] satisfies RouteConfig;
