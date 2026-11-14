import type { Config } from "@react-router/dev/config";

export default {
  // No server: every page is rendered to static HTML at build time.
  ssr: false,
  prerender: true,
} satisfies Config;
