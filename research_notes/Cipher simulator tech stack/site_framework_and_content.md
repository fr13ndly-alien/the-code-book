# Site framework and content-authoring system (state as of 14 November 2026)

Research conventions used below:
- "npm registry" facts were read directly from `https://registry.npmjs.org/<pkg>` on 2026-11-14.
- "Capacitor source" facts were read directly from the `main` branch of `ionic-team/capacitor` on GitHub on 2026-11-14.
- **[UNVERIFIED]** = I could not confirm from a current primary source; treat as a hypothesis to test.
- **[STALE?]** = source is older than ~12 months (before Nov 2025) or undated.
- Several third-party sources (Capgo skill docs, comparison blogs) are vendor-adjacent or low-authority; they are labelled where used.

---

## 1. Current stable versions and release status

### Takeaway
All four candidates are on recent, actively released majors: Astro 7.4, Next.js 16.4, React Router 8.5, TanStack Start 1.169 (declared 1.0-stable only on 13 Oct 2026), all sitting on Vite 8.3 (except Next.js). Three of the four majors (Astro 7, React Router 8, TanStack Start 1.0) are less than five months old, so ecosystem write-ups from 2025 describing Astro 5, React Router 7 or TanStack Start RC are out of date.

### Cited Findings
| Package | `latest` on npm (2026-11-14) | Published | Licence | Other tags of note |
|---|---|---|---|---|
| astro | 7.4.12 | 2026-11-13 | MIT | beta 7.4.4-beta.0 |
| @astrojs/react | 7.1.9 | 2026-11-13 | MIT | |
| @astrojs/mdx | 8.1.6 | 2026-11-13 | MIT | |
| @astrojs/markdoc | 2.1.5 | 2026-11-13 | MIT | |
| next | 16.4.6 | 2026-11-09 | MIT | canary 16.5.0-canary.50; backport 15.5.29 |
| react-router | 8.5.1 | 2026-10-27 | MIT | version-7: 7.18.5; version-6: 6.30.6 |
| @tanstack/react-start | 1.169.5 | 2026-11-08 | MIT | |
| vite | 8.3.8 | 2026-11-11 | MIT | beta 8.3.0-beta.1; previous 6.4.6 |
| react | 19.3.1 | 2026-10-14 | MIT | |
| @react-three/fiber | 9.8.2 | 2026-10-14 | MIT | 10.0.0-alpha.6 / canary exist |
| three | 0.187.0 | 2026-10-30 | MIT | |
| @capacitor/core | 8.6.2 | 2026-11-12 | MIT | next: 9.0.0-rc.0 |
| vite-plugin-pwa | 2.0.0 | 2026-10-03 | MIT | |
| @vite-pwa/astro | 2.0.2 | 2026-11-09 | MIT | |
| @mdx-js/mdx | 3.1.1 | 2025-08-29 **[STALE? — no release in ~15 months]** | MIT | |
| @markdoc/markdoc | 0.5.13 | 2026-11-13 | MIT | still 0.x |
| fumadocs-mdx | 15.6.2 | 2026-11-14 | MIT | |

— all rows: [npm registry](https://registry.npmjs.org/) (e.g. [astro](https://registry.npmjs.org/astro), [next](https://registry.npmjs.org/next), [react-router](https://registry.npmjs.org/react-router), [@tanstack/react-start](https://registry.npmjs.org/@tanstack/react-start), [vite](https://registry.npmjs.org/vite), [@capacitor/core](https://registry.npmjs.org/@capacitor/core))

- **Astro 7.0** released 22 June 2026. Headlines: upgrade to Vite 8 (Rolldown replaces esbuild + Rollup), `.astro` compiler rewritten in Rust, Markdown/MDX now processed by a Rust pipeline ("Sätteri") by default instead of unified/remark/rehype, queued rendering default, builds "15-61% faster" in Astro's benchmarks, stable route caching and "Advanced Routing" (`src/fetch.ts`) which are server-side features irrelevant to a static site. — [Astro 7 blog](https://astro.build/blog/astro-7/)
- Astro 7 behaviour changes: the Rust compiler no longer auto-corrects invalid markup (unclosed tags are errors) and collapses whitespace like JSX; remark/rehype plugins still work but only by opting back into the unified pipeline via `@astrojs/markdown-remark`. — [Astro 7 blog](https://astro.build/blog/astro-7/)
- Astro 6 (early 2026) removed the old `<ViewTransitions />` component in favour of `<ClientRouter />`; Astro 6.1 (26 Mar 2026) made the client router skip its animation when the browser is already providing one (e.g. iOS swipe-back). — [Astro v6 upgrade guide (deploy preview — verify against final docs)](https://deploy-preview-12322--astro-docs-2.netlify.app/de/guides/upgrade-to/v6), [Astro 6.1 blog](https://astro.build/blog/astro-610)
- **React Router 8.0** released 17 June 2026. Requires Node 22.22.0+, React 19.2.7+, Vite 7+; ESM-only; `react-router-dom` package removed (use `react-router` / `react-router/dom`); route-module splitting on by default; middleware always on. Team is adopting a yearly major cadence. React Router v6 and Remix v2 declared EOL; v7 gets security updates. — [React Router v8 blog](https://remix.run/blog/react-router-v8)
- **TanStack Start 1.0** declared stable 13 October 2026 ("our formal commitment to the APIs we've built"), after an RC period that began September 2025 and ran longer than announced. Supports Vite and Rsbuild; hosting delegated to Vite + Nitro rather than own adapters. — [TanStack Start 1.0 blog](https://tanstack.com/blog/tanstack-start-1-0)
- Appwrite's write-up says the Start 1.0 release requires Vite 8 and removes some deprecated APIs. — [Appwrite blog](https://appwrite.io/blog/post/tanstack-start-stable-appwrite-sites) (secondary; the TanStack post itself does not state a Vite version)
- **Vite 8.0** stable 12 March 2026 (Rolldown + Oxc replace Rollup + esbuild); Vite 8.1 on 23 June 2026. — [Vite 8 announcement](https://vite.dev/blog/announcing-vite8), [Vite 8.1](https://vite.dev/blog/announcing-vite8-1)
- **Next.js**: static-export docs last updated 2026-08-09; `next export` CLI was removed in v14 in favour of `output: 'export'`. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- **Capacitor** docs are at v8, with v9 labelled "next". — [Capacitor config docs](https://capacitorjs.com/docs/config)

### Inferences
- React 19 + R3F 9 (the earlier research lean) is consistent with every candidate: React Router 8 requires React ≥19.2.7, and the benchmark apps for Next 16.4 / TanStack Start 1.169 / RR 8.5 all used react 19.3.1.
- Because the version numbers on npm are far beyond anything in pre-2026 tutorials (Astro 5, RR 7, Start RC), any guide dated 2025 should be treated as stale for API details (e.g. Astro `<ViewTransitions />`, `react-router-dom` imports, TanStack `vinxi`-era config).
- R3F 10 is in alpha/canary; a multi-year project should expect one R3F major migration.

### Gaps
- I did not fetch Next.js 16.x release notes individually; only the npm version and the docs page date were verified. No specific Next 16 release date is given here.
- Node.js minimum for Astro 7 was not stated on the release post.
- Whether TanStack Start 1.0 strictly requires Vite 8 is from a secondary source only.

---

## 2. Fully static output, per-cipher dynamic routes, trailing slashes, and Capacitor WKWebView behaviour

### Takeaway
All four can emit a server-less static build with one HTML file per cipher, but **Capacitor's default native router serves the root `index.html` for every URL whose path has no file extension** — on iOS always, on Android when html5mode is on. That design assumes a client-routed SPA: it is harmless for an SPA shell, awkward for prerender-then-hydrate frameworks (wrong HTML for the URL on a hard load), and outright breaks a true multi-page Astro site unless links carry explicit `.html`/`index.html` filenames or the native router is overridden.

### Cited Findings

**Capacitor (applies to all frameworks)**
- iOS default router: `CapacitorRouter.route(for:)` returns `basePath + "/index.html"` whenever the path has no extension — source comment: "If there's no path extension it also means the path is empty or a SPA route". Paths with an extension are served as files. — [Capacitor source: Router.swift](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/Router.swift)
- The router is replaceable on iOS: `CAPBridgeViewController` exposes `open func router() -> Router` returning `CapacitorRouter()` by default, so a subclass can supply custom path resolution. — [Capacitor source: CAPBridgeViewController.swift](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift)
- Android equivalent: `WebViewLocalServer` serves `basePath + "/index.html"` when `path.equals("/")` or the last path segment has no "." and `html5mode` is true; a `RouteProcessor` hook exists on the Bridge. — [Capacitor source: WebViewLocalServer.java](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/src/main/java/com/getcapacitor/WebViewLocalServer.java)
- Config defaults: `server.iosScheme` = `capacitor` (cannot be http/https), `server.hostname` = `localhost`, `server.androidScheme` = `https`; `webDir` "should contain the final `index.html` of your app"; `server.appStartPath` (since 7.3.0) can start the app at a path other than `/index.html`. The config docs do not document the extensionless-path fallback. — [Capacitor config docs (v8)](https://capacitorjs.com/docs/config)
- Third-party Capgo guide (vendor, not official) states the same thing in prose: "Capacitor maps every extensionless path to the root `out/index.html`"; hard navigation (`location.reload()`, `location.href=`, OS deep link to a sub-route) loads the home page HTML at that URL, causing "a home-page flash, hydration warnings, or the wrong page". Recommended pattern: start at `/`, then push the route from an `appUrlOpen` listener, with `App.getLaunchUrl()` for cold starts; do not set `basePath`/`assetPrefix` for the mobile build. — [Capgo framework-to-capacitor: Next.js reference](https://unpkg.com/@capgo/capgo-skills@1.2.1/skills/framework-to-capacitor/references/nextjs.md)
- A Quasar issue shows the class of bug: with hash routing the initial URL was `capacitor://localhost#` rather than `capacitor://localhost/#`, breaking routing. — [quasarframework/quasar#8529](https://github.com/quasarframework/quasar/issues/8529) **[STALE? — old issue]**

**Astro 7**
- `output` defaults to `'static'`: "Prerender all your pages by default, outputting a completely static site". — [Astro config reference](https://docs.astro.build/en/reference/configuration-reference/)
- `build.format`: `'directory'` (default) emits `/about/index.html`; `'file'` emits `/about.html`; `'preserve'` mirrors source layout. `trailingSlash` (`'always' | 'never' | 'ignore'`, default `'ignore'`) governs matching in the dev server and on-demand pages. — [Astro config reference](https://docs.astro.build/en/reference/configuration-reference/)
- `base`: "all of your static asset imports and URLs should add the base as a prefix"; the reference does not describe relative (`./`) asset paths. — [Astro config reference](https://docs.astro.build/en/reference/configuration-reference/)
- Dynamic per-entry pages in static mode use `getStaticPaths()` in a dynamic route fed by `getCollection()`. — [Astro content collections guide](https://docs.astro.build/en/guides/content-collections/)
- An Astro + Capacitor proof-of-concept repo exists whose checklist marks Android and PWA builds done and iOS build not done — i.e. not a working iOS reference. — [somenoe/astro-capacitor-poc (via ecosyste.ms)](https://awesome.ecosyste.ms/projects/github.com%2Fsomenoe%2Fastro-capacitor-poc) **[STALE? — undated]**
- Trailing-slash mismatches between Astro's output and the host are a recurring practitioner complaint on the web side (Cloudflare Pages adding slashes with 307 chains; Netlify adding slashes; redirects breaking the client router's fetch). — [dev.to: Astro + Cloudflare Pages deploy bugs](https://dev.to/mikecube/astro-cloudflare-pages-3-deploy-bugs-youll-probably-hit-3e5o), [The 301 trap / view transitions](https://ramvignesh-portfolio.pages.dev/blog/the-301-trap-view-transitions/)

**Next.js 16 static export**
- `output: 'export'` produces an `out/` folder with an HTML file per route; `trailingSlash: true` changes `/me.html` → `/me/index.html`. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- Unsupported in export mode: dynamic routes without `generateStaticParams()` or with `dynamicParams: true`, rewrites, redirects, headers, proxy (ex-middleware), ISR, default-loader image optimisation, server actions, intercepting routes, cookies. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- Server Components run at build time; output is "static HTML for the initial page load and a static payload for client navigation between routes" and behaves "like a traditional SPA" after load. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- Capacitor-specific pitfalls per the Capgo guide: `next/image` needs `images: { unoptimized: true }`; module-scope `window`/Capacitor access crashes the build; error wording varies across Next 14–16. — [Capgo Next.js reference](https://unpkg.com/@capgo/capgo-skills@1.2.1/skills/framework-to-capacitor/references/nextjs.md)

**React Router 8 (framework mode)**
- `ssr: false` = no runtime server, deploy to static hosting. With no `prerender` it is "SPA Mode" (only the root route rendered into one HTML). With a `prerender` list/function, each path gets `[url]/index.html` plus a `[url].data` file used for client navigation; `action`/`headers` exports are build errors. — [React Router pre-rendering docs (8.5.1)](https://reactrouter.com/how-to/pre-rendering)
- `prerender: true` only covers static paths; dynamic ones (`/cipher/:slug`) must be listed via array or async function (`getStaticPaths()` helper provided). — [React Router pre-rendering docs](https://reactrouter.com/how-to/pre-rendering)
- With `ssr:false` + partial prerender, an SPA fallback is also written: `index.html` if `/` isn't prerendered, otherwise `__spa-fallback.html`, intended to be served for otherwise-404 paths. — [React Router pre-rendering docs](https://reactrouter.com/how-to/pre-rendering)
- v8 made trailing-slash-aware data requests the default (`v8_trailingSlashAwareDataRequests` flag removed). 8.x patches fixed SPA-fallback/prerender edge cases (surfacing host 404 when a fallback route has no prerendered data; `.data` requests in `ssr:false` + `prerender`). — [React Router v8 blog](https://remix.run/blog/react-router-v8), [React Router changelog](https://reactrouter.com/changelog)

**TanStack Start 1.x**
- Prerendering is configured on the `tanstackStart` Vite/Rsbuild plugin: `prerender.enabled`, `autoSubfolderIndex` (true → `/page/index.html`; false → `/page.html`), `autoStaticPathsDiscovery`, `crawlLinks` (default true), `filter`, `failOnError`, per-page `pages[]` with `outputPath`. — [TanStack Start static prerendering guide](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- Routes with params are excluded from auto-discovery; they are prerendered only if listed in `pages` or reached by link crawling from another prerendered page. — [TanStack Start static prerendering guide](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- SPA mode: the build runs an extra prerender step that generates an app shell, by default prerendering only the root route. — [TanStack Start SPA mode guide](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode)

### Inferences
- **Astro MPA inside Capacitor is the riskiest combination.** With default `build.format: 'directory'`, a link to `/vigenere/` is an extensionless path, so the iOS router returns the root `index.html` — the user would see the home page again. Workable mitigations (all need a prototype): (a) `build.format: 'file'` and make every internal link end in `.html` for the app build; (b) override `router()` in a `CAPBridgeViewController` subclass to map `/x/` → `/x/index.html` (a few lines of Swift, plus the Android `RouteProcessor` equivalent later); (c) ship a different, SPA-style entry for the app. None of these is documented by Astro or Capacitor. **[UNVERIFIED in practice]**
- **For RR8 / TanStack Start / Next export, the Capacitor fallback is "by design" compatible** as long as (1) the app always cold-starts at `/` (or `appStartPath`) and (2) all subsequent navigation is client-side. But the root `index.html` must be able to boot at *any* URL. For React Router that means the root file should be the SPA-mode shell / `__spa-fallback.html` rather than the prerendered home page, otherwise a WebView reload on `/enigma` hydrates home-page HTML against the `/enigma` route (hydration mismatch). A pragmatic pattern is two build targets from one codebase: web = `ssr:false` + `prerender` of all cipher URLs (SEO, fast first paint); app = pure SPA mode with `webDir` pointing at that build. **[UNVERIFIED in practice]**
- iOS WKWebView can discard and reload its web content process under memory pressure — plausible with 3D scenes — which triggers exactly the "hard load at a sub-route" case; so the fallback must be correct, not just the happy path. **[UNVERIFIED — from general WKWebView knowledge, not a fetched source]**
- Because Capacitor serves from the origin root (`capacitor://localhost/`), root-absolute asset URLs (`/_astro/…`, `/assets/…`) work and no relative-path `base` is needed; conversely any sub-path `base` used for web hosting (e.g. GitHub Pages project sites) must be dropped for the app build. Hosting the web version at a domain root avoids needing two configs.
- Next.js export needs `generateStaticParams` for `/cipher/[slug]` — trivial for a fixed list of ~35 ciphers. Its real costs here are the long unsupported-feature list and that the framework's centre of gravity (RSC, server actions, caching) is unusable in this project.

### Gaps
- No practitioner report found of a production Astro 6/7 multi-page site shipped in Capacitor iOS; no official Astro or Capacitor guide for the pairing. A Capgo `references/astro.md` did not exist at the URL tried (404).
- No source found on how the `.data` (React Router) / RSC payload (Next) fetches behave under the `capacitor://` scheme specifically; they are extension-bearing paths so they should be served as files, but this is untested here.
- Capacitor 9 is at RC; whether it changes router behaviour was not checked.

---

## 3. Heavy client-only islands (React Three Fiber): lazy loading, splitting, hydration, shared state, WebGL context across navigations

### Takeaway
Astro gives the most declarative control over *when* a heavy canvas loads (`client:visible`, `client:only="react"`), but each island is a separate React root, so shared state needs an external store and each R3F island is its own WebGL context. In an SPA (RR8/TanStack/Next) you use `React.lazy`/route-level splitting manually, but you can keep one persistent `<Canvas>` and share context freely — which is the pattern R3F's maintainer recommends.

### Cited Findings
- Astro client directives: `client:load` (JS "will begin importing when the page loads"), `client:visible` (JS not sent "until the user scrolls down and the component is visible on the page"), `client:only="react"` (skips server render; "will render on the client when the page loads"), plus `client:idle` and `client:media`. When several components use the same framework, the framework runtime is sent once. — [Astro framework components guide](https://docs.astro.build/en/guides/framework-components/)
- Props passed to hydrated islands must be serialisable; functions cannot be passed; render props don't work; `.astro` components can't be imported into React components. — [Astro framework components guide](https://docs.astro.build/en/guides/framework-components/)
- Islands cannot share React context: "when partially hydrating components within Astro or Markdown, you can't use these context wrappers"; Astro recommends Nano Stores (<1 KB, framework-agnostic). — [Astro recipe: sharing state between islands](https://docs.astro.build/en/recipes/sharing-state-islands/)
- Common guidance for R3F in Astro is `<ThreeScene client:only="react" />` so Three.js never runs during the build's server render. — [threejsresources.com: Three.js with Astro (2026)](https://threejsresources.com/frameworks/three-js-astro) (low-authority, undated)
- `transition:persist` on an island keeps it across client-router navigations: "the island from the old page with its current state will continue to be displayed"; props re-render unless `transition:persist-props`. Caveat: "The restart of CSS animations and the reload of iframes cannot be avoided" even with persist. Nothing in the docs addresses canvases/WebGL. — [Astro view transitions guide](https://docs.astro.build/en/guides/view-transitions/)
- R3F maintainer (drcmda) on routing: context loss on unmount is expected ("when the canvas unmounts it must force a context loss to avoid memory leaks") and "It is not a good idea to mount and unmount them between route changes… Instead you should keep one instance and unmount canvas contents." — [three.js forum: Context Lost when I route to another page in R3F](https://discourse.threejs.org/t/context-lost-when-i-route-to-another-page-in-react-three-fiber/61736) **[STALE? — 2024 thread]**
- Browsers cap simultaneous WebGL contexts; Safari "Too many active WebGL contexts" is a known R3F complaint, and an Apple forum thread reports leaking WebGLRenderers on re-render on iOS. — [pmndrs/react-three-fiber discussion #2457](https://github.com/pmndrs/react-three-fiber/discussions/2457), [Apple developer forums thread 741327](https://developer.apple.com/forums/thread/741327) **[STALE? — 2022–2023]**
- React Router 8 has route-module splitting enabled by default (`splitRouteModules`). — [React Router v8 blog](https://remix.run/blog/react-router-v8)
- Next.js export: client components are still prerendered to HTML at build, so browser-only code must be guarded (`useEffect`, client-only dynamic import); module-scope `window` access crashes `next build`. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports), [Capgo Next.js reference](https://unpkg.com/@capgo/capgo-skills@1.2.1/skills/framework-to-capacitor/references/nextjs.md)

### Inferences
- For ~11 heavy R3F pages the per-page code-splitting story is good in all four: Astro splits per island automatically; RR8/TanStack/Next split per route, and the three.js/R3F chunk is shared and cached after first use. The differentiator is the *non-3D* pages: Astro ships no React runtime at all on a page with no islands, while the SPA frameworks always ship React + router.
- In Astro without `<ClientRouter />`, every navigation is a full document load: the WebGL context is destroyed and recreated per page (clean, no leaks, but shader recompilation and asset re-decode each visit, and three.js must be re-parsed from HTTP/SW cache). With `<ClientRouter />`, islands on the old page are swapped out; whether R3F's unmount/dispose runs cleanly on swap (vs. just DOM removal) is the thing to test for context leaks on iOS Safari. **[UNVERIFIED]**
- `transition:persist` on an R3F island *should* keep the canvas element and context alive across pages since the DOM node is moved rather than recreated, but no source confirms this for WebGL, and the "iframes reload" caveat suggests DOM-move side-effects exist. A single persisted "stage" island whose scene content is switched via a Nano Store would approximate the one-canvas SPA pattern inside Astro — at which point one is rebuilding an SPA inside an MPA. **[UNVERIFIED]**
- The project's content shape — narrative text with several interactive widgets interleaved per page, some of which must share state (e.g. a key chosen in one widget used by the next) — fits either model, but shared state across separately hydrated islands in Astro means all cross-widget state goes through Nano Stores (or one large island wrapping the whole article, which forfeits the islands benefit). In an SPA/MDX setup, ordinary React context/Zustand works across the whole page.
- Multiple R3F canvases on one narrative page (if a cipher page has 2–3 3D figures) each consume a WebGL context in any framework; mitigations (one shared canvas with drei `<View>` scissoring, or mount-on-visible/unmount-off-screen) are easier inside a single React tree than across Astro islands. **[UNVERIFIED — drei View not re-checked in a current source]**

### Gaps
- No GitHub issue or write-up found that specifically tests R3F + Astro `<ClientRouter />` / `transition:persist` and WebGL context retention or leakage. This is the single most important thing to prototype if Astro is chosen.
- Current (2026) iOS Safari / WKWebView limits on simultaneous WebGL contexts and per-tab memory were not verified.
- Exact semantics of `client:idle` / `client:media` were not re-read from the directives reference.

---

## 4. Is Astro's multi-page islands model a problem for app-like navigation and persistent state on a phone? What do View Transitions / ClientRouter offer now?

### Takeaway
On the open web, Astro's MPA model is not a problem for a chronological reading site — and Astro 6.1+ handles mobile swipe-back gracefully — but "app-like" persistence relies on `<ClientRouter />`, which Astro itself describes as something that "will increasingly become unnecessary" and which is not a full SPA router. Inside Capacitor the MPA model conflicts with the default native router (section 2), which is the stronger argument against it for this project.

### Cited Findings
- `<ClientRouter />` is "a built-in, lightweight component to enable client-side routing"; without it, navigation is full browser navigation. It intercepts navigations, fetches the next page's HTML, swaps the DOM, and fires lifecycle events (`astro:before-preparation`, `after-preparation`, `before-swap`, `after-swap`, `page-load`). — [Astro view transitions guide](https://docs.astro.build/en/guides/view-transitions/)
- Astro's docs state that as browser APIs evolve, using `<ClientRouter />` "will increasingly become unnecessary" (native cross-document view transitions cover the animation part). — [Astro view transitions guide](https://docs.astro.build/en/guides/view-transitions/)
- State persistence: `transition:persist` keeps an island (with its state) across navigations; bundled module scripts run once, inline scripts may re-run, `data-astro-rerun` forces re-execution. Fallback for browsers without the View Transitions API defaults to `animate` (simulated), with `swap` and `none` options. — [Astro view transitions guide](https://docs.astro.build/en/guides/view-transitions/)
- Prefetch defaults to enabled when `<ClientRouter />` is used; default strategy is `hover` (which has no real equivalent on touch). — [Astro config reference](https://docs.astro.build/en/reference/configuration-reference/)
- Astro 6.1 (Mar 2026): client router skips its own animation when the browser already provides a visual transition such as a swipe gesture — "smoother view transitions on mobile". — [Astro 6.1 blog](https://astro.build/blog/astro-610)
- A 2026 practitioner post documents replacing Astro's ClientRouter (title: "Replacing Astro ClientRouter"). — [joost.blog](https://joost.blog/replacing-astro-clientrouter/) (title/topic only; content not read — **[UNVERIFIED]** details)
- Server-side redirects (e.g. trailing-slash 301s) in the path of a client-router fetch can break transitions. — [The 301 trap / view transitions](https://ramvignesh-portfolio.pages.dev/blog/the-301-trap-view-transitions/)

### Inferences
- For a web reader moving cipher → next cipher, full-page MPA navigation with a service worker cache is fast and robust; what is lost versus an SPA is in-memory state (progress, settings, a half-configured Enigma). That state should live in `localStorage`/IndexedDB in *any* architecture (the app must survive WKWebView process kills), which narrows the practical gap.
- With `<ClientRouter />`, Astro's router fetches the next page's HTML document by its URL. Inside Capacitor iOS that fetch for `/vigenere/` hits the same extensionless-path rule and would receive root `index.html` — so ClientRouter does not rescue the MPA-in-Capacitor problem; links still need explicit filenames or a custom native router. **[UNVERIFIED — derived from Capacitor source, not tested]**
- ClientRouter's `hover` prefetch default is useless on phones; `viewport`/`tap` strategies would need to be set explicitly. **[UNVERIFIED — strategy names not re-read]**
- "App-like" affordances that are natural in an SPA (persistent bottom nav with animated state, a persistent 3D stage, modal routes, instant back with scroll and widget state restored) each require specific `transition:persist` / store work in Astro. For a mostly-linear reading experience this is modest; for something that should feel native in an App Store review it is extra risk (Apple's guideline against apps that are merely repackaged websites is a product consideration, not verified here).

### Gaps
- Did not verify current iOS Safari / WKWebView support level for cross-document view transitions (`@view-transition`) under the `capacitor://` scheme.
- No measurements found comparing perceived navigation latency of Astro MPA + service worker versus SPA route transitions on mid-range phones.

---

## 5. MDX support and ergonomics; typed content collections; alternatives

### Takeaway
Astro has the only first-party, batteries-included typed content layer (content collections with Zod schemas + MDX/Markdoc integrations), but Astro 7's switch to a Rust Markdown/MDX pipeline means remark/rehype plugins (maths, citations, custom directives) now require opting back into the legacy unified pipeline. In React Router and TanStack Start, MDX is a Vite-plugin concern (`@mdx-js/rollup`, `fumadocs-mdx`, `content-collections`) — more assembly, but MDX components live in one ordinary React tree.

### Cited Findings
- Astro build-time collections: defined in `src/content.config.ts` with `defineCollection()`; loaders `glob()` (Markdown, MDX, Markdoc, JSON, YAML, TOML) and `file()` from `astro/loaders`; schema via `z` from `astro/zod` (Zod 4 features supported); cross-collection `reference()`; query with `getCollection()`/`getEntry()`; `render(entry)` returns a `<Content />` component to which MDX components can be passed; ordering is non-deterministic so sort explicitly. — [Astro content collections guide](https://docs.astro.build/en/guides/content-collections/)
- Live collections (`src/live.config.ts`) need a server adapter and do not support MDX — irrelevant for a static site. — [Astro content collections guide](https://docs.astro.build/en/guides/content-collections/)
- Astro 7: "Markdown and MDX processing now runs through a new Rust-powered pipeline" (Sätteri) by default; made pluggable/opt-in in 6.4, default in 7. "If your site uses remark or rehype plugins, you'll need to take action before upgrading" — they continue to work via `@astrojs/markdown-remark`. — [Astro 7 blog](https://astro.build/blog/astro-7/)
- First-party integrations are current: `@astrojs/mdx` 8.1.6 and `@astrojs/markdoc` 2.1.5, both published 2026-11-13. — [npm: @astrojs/mdx](https://registry.npmjs.org/@astrojs/mdx), [npm: @astrojs/markdoc](https://registry.npmjs.org/@astrojs/markdoc)
- In Astro, an interactive React component used inside MDX must carry a `client:*` directive to hydrate, and its props must be serialisable (no functions). — [Astro framework components guide](https://docs.astro.build/en/guides/framework-components/)
- MDX core (`@mdx-js/mdx`) is at 3.1.1, last published 2025-08-29. — [npm: @mdx-js/mdx](https://registry.npmjs.org/@mdx-js/mdx) **[STALE? — stable but no release in ~15 months]**
- Markdoc core (`@markdoc/markdoc`) is 0.5.13, published 2026-11-13 — maintained but still pre-1.0. — [npm: @markdoc/markdoc](https://registry.npmjs.org/@markdoc/markdoc)
- Fumadocs MDX documents a Vite-plugin setup for TanStack Start (content lazy-loaded on the client via `createClientLoader()`), and a React Router section for "React Router 7 or above"; Fumadocs 15.2 added the React Router / TanStack Start layer. `fumadocs-mdx` 15.6.2 published 2026-11-14. — [Fumadocs MDX: TanStack Start](https://fumadocs.dev/docs/mdx/vite/tanstack), [Fumadocs v15.2 blog](https://fumadocs.dev/blog/v15-2), [npm: fumadocs-mdx](https://registry.npmjs.org/fumadocs-mdx)
- Community guides exist for TanStack Start + `@content-collections/vite` (typed collections in a `content-collections.ts`) and for direct `.mdx` imports in TanStack Start routes (Jan 2026). — [dev.to: blog with TanStack Start and content-collections](https://dev.to/chocolaterooibos/how-to-build-a-blog-with-tanstack-start-and-content-collections-10fd), [Setting up MDX with TanStack Start](https://enochklu.netlify.app/blog/2026/setup-mdx-tanstack-start)
- The unscoped npm package `content-collections` is 0.2.1, last published 2025-07-10. — [npm: content-collections](https://registry.npmjs.org/content-collections) **[STALE? — and likely not the canonical package; the scoped `@content-collections/*` packages were not checked]**
- The React Router v8 announcement does not mention MDX. — [React Router v8 blog](https://remix.run/blog/react-router-v8)

### Inferences
- **Ergonomics trade-off for this project.** Astro MDX: `<EnigmaRotors client:visible initialKey="AAA" />` inline in prose is very clean, frontmatter is schema-validated (era, year, difficulty, prev/next references), and non-interactive prose ships zero JS. Costs: every widget is a separate root (state via Nano Stores), props must be serialisable, and the `client:*` directive is authoring noise that only Astro understands (content is less portable to another renderer).
- **SPA MDX** (RR8/TanStack via `@mdx-js/rollup` or fumadocs-mdx): each cipher's `.mdx` compiles to a React component, lazy-loaded per route; widgets are normal imports sharing context; a wrapper like `<LazyScene>` (React.lazy + IntersectionObserver) replicates `client:visible`. Costs: prose is rendered by React (hydration cost for text), and typed frontmatter needs a third-party layer (content-collections / fumadocs-mdx / a hand-rolled Zod check over `import.meta.glob`).
- For ~35 entries a hand-rolled typed index (`import.meta.glob` + Zod) is small enough that lack of a first-party content layer in RR8/TanStack is not a serious handicap for a solo developer.
- A cipher site likely wants maths rendering (modular arithmetic, RSA) and maybe footnotes/citations — i.e. remark/rehype plugins (remark-math/rehype-katex). On Astro 7 that pushes the project onto the legacy unified pipeline from day one; check whether Sätteri has native maths support before committing. **[UNVERIFIED — Sätteri feature set not researched]**
- Markdoc's stricter, non-JS tag syntax suits non-developer authors and safe content; for a solo developer who wants to drop arbitrary React props/JSX into prose, MDX is the more ergonomic default. Next.js would use `@next/mdx` or fumadocs-mdx. **[UNVERIFIED — `@next/mdx` status not checked this pass]**

### Gaps
- No current source checked for MDX in React Router 8 framework mode specifically (only the Fumadocs "RR 7 or above" page). Likely works via `@mdx-js/rollup` as a plain Vite plugin, but unconfirmed for RR8 + Vite 8/Rolldown.
- Sätteri's plugin API/feature coverage (maths, custom directives, syntax highlighting parity) not researched.
- Status of other content layers (Velite, the scoped `@content-collections/core`) not verified.

---

## 6. Initial JS payload and Core Web Vitals on mobile

### Takeaway
The one current, like-for-like benchmark found (Oct 2026) shows Astro shipping 0 KiB of JS and roughly half the LCP of the React meta-frameworks on a throttled-mobile Lighthouse run of a content-style app; React Router 8 (115 KiB) and TanStack Start (118 KiB) are close to each other, and Next.js 16 is heaviest (142 KiB). All four still scored 99–100 on Lighthouse performance, so for this project the baseline framework cost is dwarfed by three.js on the 3D pages.

### Cited Findings
- Nolan Lawson benchmark, 28 Oct 2026 — a Pokémon browser app ("closer to a Wikipedia site than a Figma-style app"), AI-generated per framework, Lighthouse mobile simulation with 4x CPU throttle and Slow 4G, home page only, median of 5 runs × 5 apps:

| Framework (version) | JS (KiB) | TBT (ms) | LCP (ms) | Perf score |
|---|---|---|---|---|
| Astro 7.4.2 | 0 | 0 | 810 | 100 |
| React Router 8.5.0 (React 19.3.1) | 115 | 17 | 1729 | 100 |
| TanStack Start 1.169.4 (React 19.3.1) | 118 | 1 | 2028 | 99 |
| Next.js 16.4.3 (React 19.3.1) | 142 | 71 | 2090 | 99 |

— [Nolan Lawson: The AI cost of JavaScript frameworks](https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/)
- Caveats stated by that author: LCP varied widely between runs; Next.js's spread came from four of five apps not lazy-loading images; Lighthouse favours MPAs, "so these numbers are biased against SPAs"; static pre-generated HTML was disallowed in the test (so the React frameworks were server-rendering, not using their static/prerender modes). — [Nolan Lawson](https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/)
- Secondary/blog claims (methodology not inspected; treat as indicative only): Astro docs shipping ~12 KB JS vs ~187 KB for Next.js docs; Astro the only framework with >50% of real-world sites passing Core Web Vitals vs ~25% for Next.js; at 100k pages Next.js built in 124 s vs 37 s for TanStack Start, with Next output ~40× larger than Astro's. — [tech-insider.org: Astro vs Next.js 2026](https://tech-insider.org/astro-vs-nextjs-2026/), [alexbobes.com: Astro vs Next.js benchmarks](https://alexbobes.com/programming/astro-vs-nextjs/), [dev.to: Time to Yield](https://dev.to/lazarv/time-to-yield-20m8)
- Astro's build got faster in 7.0 (15–61% in its own benchmarks) — a DX point, not a runtime one. — [Astro 7 blog](https://astro.build/blog/astro-7/)

### Inferences
- The ~115–140 KiB framework baseline of the React options is real but small next to the 3D payload: three.js + R3F + drei are typically several hundred KiB compressed **[UNVERIFIED — not measured this pass]**. On the ~11 3D pages, framework choice barely moves total JS; the lever there is lazy-loading the scene after first paint (available in all four).
- Astro's advantage is concentrated on (a) the landing/timeline page and any prose-only pages, and (b) the first paint of every page, because narrative HTML is not blocked on or re-rendered by React hydration. On a ~20-page set of 2D-widget ciphers, Astro pages would ship React (~60 KiB class) + the widget only, versus React + router + MDX runtime + page component in an SPA.
- With prerendered HTML (RR8 `prerender`, TanStack `prerender`, Next export) LCP for text is governed by the HTML, not JS, so the LCP gap in Lawson's table would narrow for static builds; TBT/INP from hydrating long articles as React trees remains a (modest) cost that Astro avoids.
- For a returning PWA user or the Capacitor app, everything is served from cache/local bundle, so network payload matters little; parse/compile and hydration time on a mid-range phone is what remains — again favouring less hydrated JS, but only marginally relative to WebGL scene start-up.

### Gaps
- No benchmark found comparing the four in *static/prerendered* mode on a content site, and none including a heavy WebGL island.
- No field (CrUX) data found for React Router 8 or TanStack Start 1.x sites.
- INP comparisons specifically were not found.

---

## 7. Governance / maintenance news relevant to a multi-year solo project

### Takeaway
2026 saw significant consolidation under Cloudflare: the Astro company joined Cloudflare (Jan 2026) and VoidZero — the company behind Vite/Rolldown/Oxc, on which Astro, React Router and TanStack Start all build — joined Cloudflare (June 2026). Everything remains MIT with stated open governance; none of the four candidates has a licence change or deprecation notice against it, but each has a different single-sponsor risk profile.

### Cited Findings
- 16 Jan 2026: The Astro Technology Company joined Cloudflare; all full-time employees move and keep working on Astro. "Astro stays open-source and MIT-licensed"; "Astro's open governance and current roadmap remain in place"; "Astro continues to support a wide set of deployment targets, not just Cloudflare." — [Astro blog: joining Cloudflare](https://astro.build/blog/joining-cloudflare/)
- Commentary notes the deal ties Astro's governance to a single corporate owner while the code stays open (MIT leaves a fork option). — [ChannelLife coverage](https://channellife.com.au/story/cloudflare-buys-astro-framework-pledges-open-future), [codercops blog](https://blog.codercops.com/blog/cloudflare-acquires-astro-framework-2026)
- 4 June 2026: VoidZero is joining Cloudflare; Vite "remains open source under the MIT license", is still stewarded by the cross-organisation Vite team, "remains vendor-agnostic"; same applies to Vitest, Rolldown, Oxc and Vite+. Cloudflare announced a $1M open-source fund for the Vite ecosystem. — [vite.dev: Cloudflare supports Vite](https://vite.dev/blog/cloudflare-supports-vite)
- Rolldown reached 1.0 on 7 May 2026 (search-result summary). — [VoidZero posts](https://voidzero.dev/posts/whats-new-mar-2026) **[UNVERIFIED — date came from a search summary, not a fetched page]**
- React Router: "Open Governance model" with a GOVERNANCE.md; yearly major releases planned; v6 and Remix v2 EOL; the team positions React Router as its stable React meta-framework while Remix 3 "is taking a different direction". Site copyright is Shopify, Inc. — [React Router v8 blog](https://remix.run/blog/react-router-v8)
- React Router 8 removed the `react-router-dom` package and went ESM-only — an example of the churn a yearly-major cadence implies. — [React Router v8 blog](https://remix.run/blog/react-router-v8)
- TanStack Start: independent, sponsor-funded (Gold: Railway, Render, Vercel, CodeRabbit, Lovable, Netlify, Cloudflare); no formal governance structure described; 1.0 took longer than announced; maintainers report a flood of low-quality AI-generated PRs/issues; the creator says he was "disappointed with parts of the experience of using RSC" and stopped using RSC on tanstack.com. — [TanStack Start 1.0 blog](https://tanstack.com/blog/tanstack-start-1-0)
- Astro 7's change of default Markdown pipeline and stricter compiler shows Astro majors also carry migration work (two majors — 6 and 7 — shipped within 2026). — [Astro 7 blog](https://astro.build/blog/astro-7/)
- Next.js static export remains documented and supported ("The core of Next.js has been designed to support static exports"), docs updated Aug 2026. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- All packages checked are MIT on npm. — [npm registry](https://registry.npmjs.org/)

### Inferences
- Licence risk is low across the board (all MIT). The practical long-horizon risks differ: Astro — two majors per year recently and a single corporate steward (Cloudflare), though a purely static Astro site uses none of the hosting-coupled features; React Router — yearly breaking majors, Shopify-employed core team whose attention is split with Remix 3; TanStack Start — youngest 1.0 (one month old), small independent team, highest API-maturity risk; Next.js — most stable brand but its investment is in server features the project cannot use, so static export is a second-class path.
- Cloudflare now employs the core teams of both Astro and the Vite toolchain; a static site on any host is unaffected today, but the concentration is worth noting in a multi-year plan.
- For a solo developer, "boring" surface area matters: a static build uses a small, stable subset of each framework (file routes, prerender list, MDX). Keeping simulations as framework-agnostic React components (no framework imports inside `src/sims/`) makes any later framework swap cheap regardless of choice.

### Gaps
- No Vercel/Next.js governance or licensing news was researched in depth; no search surfaced "vendor lock-in" discussion specific to 2026.
- Deal status/terms for both Cloudflare transactions beyond the announcement posts were not verified.
- Capacitor/Ionic (owner: OutSystems) maintenance outlook was not researched in this pass; only that v8 is current and v9 is at RC.

---

## 8. Which is most commonly recommended for "content site + a few heavy interactive islands", and which for "SPA to be wrapped with Capacitor"?

### Takeaway
Sources consistently recommend Astro for content-first sites with isolated interactive islands, and Capacitor's own design (root-`index.html` fallback for extensionless paths) plus practitioner guidance assume a client-routed SPA for wrapped apps. This project sits on both sides; the evidence gathered points to a Vite-based React SPA with per-route prerendering (React Router 8 `ssr:false` + `prerender`, or TanStack Start prerender) as the lower-risk fit for the Capacitor requirement, with Astro the better fit only if web reading performance is weighted above app-wrapping simplicity.

### Cited Findings
- Comparison write-ups in 2026 uniformly place Astro first for content sites on JS payload and Core Web Vitals; Next.js is argued for apps with auth, mutations and real-time data. — [bitdoze: Astro vs Next.js vs TanStack Start 2026](https://www.bitdoze.com/astro-vs-nextjs-vs-tanstack-start-which-wins-2026/), [pkgpulse: Astro vs Next.js 2026](https://www.pkgpulse.com/guides/astro-vs-nextjs-2026), [devanddeliver: Next.js vs React Router v7 vs Astro](https://devanddeliver.com/blog/development/next-js-vs-react-router-v7-vs-astro-in-2026-a-practical-comparison) (blogs; snippets only, not read in full)
- Astro-plus-R3F guidance: static shell with the 3D scene as a `client:only="react"` island, claimed to give strong LCP with lazily loaded 3D. — [threejsresources.com](https://threejsresources.com/frameworks/three-js-astro)
- Capacitor's iOS router explicitly treats extensionless paths as "a SPA route" and serves root `index.html`. — [Capacitor source: Router.swift](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/Router.swift)
- Capacitor guidance for meta-frameworks: static export, client-side navigation only (`router.push`), start at `/` and route from `appUrlOpen`, no `basePath`/`assetPrefix`. — [Capgo Next.js reference](https://unpkg.com/@capgo/capgo-skills@1.2.1/skills/framework-to-capacitor/references/nextjs.md)
- React Router officially supports the exact hybrid needed: `ssr:false` with a `prerender` list (static HTML per cipher for the web) plus an SPA fallback HTML that can hydrate any path. — [React Router pre-rendering docs](https://reactrouter.com/how-to/pre-rendering)
- TanStack Start offers the same two modes (prerender with link crawling; SPA shell) but reached 1.0 only on 13 Oct 2026. — [TanStack Start static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering), [TanStack Start 1.0 blog](https://tanstack.com/blog/tanstack-start-1-0)
- Next.js static export loses rewrites, redirects, headers, proxy, ISR, image optimisation and server actions. — [Next.js static exports guide](https://nextjs.org/docs/app/guides/static-exports)
- R3F maintainer guidance favours one long-lived canvas rather than mounting/unmounting per route — an SPA-shaped pattern. — [three.js forum thread](https://discourse.threejs.org/t/context-lost-when-i-route-to-another-page-in-react-three-fiber/61736) **[STALE? — 2024]**

### Inferences
Scoring against this project's constraints (my synthesis, not a sourced ranking):

| Criterion | Astro 7 + React islands | Next.js 16 export | React Router 8 (ssr:false + prerender) | TanStack Start 1.x (prerender / SPA) |
|---|---|---|---|---|
| Static output, per-cipher deep links on web | Excellent (default mode) | Good (needs `generateStaticParams`) | Good (explicit path list) | Good (crawl or list) |
| Capacitor iOS fit | Weak by default: MPA links hit root-index fallback; needs `.html` links or custom native router; no reference implementation found | OK with SPA discipline; many Next features unusable | Good: SPA fallback is first-class | Good: SPA shell mode |
| Heavy R3F lazy loading | Best declarative control (`client:visible`/`client:only`) | Manual (`next/dynamic`) | Manual (`React.lazy`, route splitting default) | Manual (route `lazy`) |
| Shared state / persistent canvas | Separate roots; Nano Stores; persist is untested for WebGL | Normal React | Normal React | Normal React |
| MDX + typed content | Best first-party (collections + Zod); Astro-7 remark caveat | Third-party (`@next/mdx`, fumadocs) | Third-party Vite plugins | Third-party Vite plugins (fumadocs documents it) |
| Baseline JS (Lawson, non-static test) | 0 KiB | 142 KiB | 115 KiB | 118 KiB |
| Maturity / churn | Mature; 2 majors in 2026; Cloudflare-owned | Mature; export is a side path | Mature lineage; yearly majors; v8 is 5 months old | 1.0 is 1 month old |

- **Most commonly recommended for "content site + a few heavy islands": Astro** (consistent across sources).
- **Most natural for "SPA wrapped with Capacitor": a Vite React SPA** — of the candidates, React Router 8 in framework mode (`ssr:false`) is the most established option that *also* prerenders per-cipher HTML for the web; TanStack Start is functionally equivalent with stronger type-safe routing but much younger; Next.js export works but carries the most unusable surface.
- The project's requirements (PWA offline, persistent progress, 11 WebGL scenes where one-canvas reuse matters, eventual App Store wrapper) lean towards the SPA-with-prerender shape. Astro remains viable if the developer accepts (a) Nano Stores for cross-widget state, (b) a prototype proving R3F context behaviour under `<ClientRouter />`, and (c) a Capacitor routing workaround (custom `router()` in Swift or `build.format: 'file'` + `.html` links).
- A cheap de-risking step whichever way: build one 3D cipher page (e.g. Enigma) and one 2D page in the chosen framework, run `cap add ios`, and test cold start, in-app navigation, a forced WebView reload on a sub-route, a deep link, and offline — before authoring 30+ pages of content.
- Hedge: keep all simulations as plain React components and all narrative as MDX with frontmatter validated by a standalone Zod schema; then moving between Astro and a Vite SPA later is mostly a routing/layout rewrite, not a content or simulation rewrite. Avoid Astro-only syntax in MDX bodies where possible (wrap `client:*` usage in the page template or a thin adapter) if that portability matters.

### Gaps
- No source found that directly evaluates these four frameworks for the combined "prerendered content site + PWA + Capacitor wrapper" use case; the recommendation above is an inference from separate strands.
- PWA specifics per framework (service-worker precache of per-route chunks and `.data` files; `vite-plugin-pwa` 2.0 compatibility with RR8/TanStack Start/Astro 7 on Vite 8) were not researched beyond confirming `vite-plugin-pwa` 2.0.0 and `@vite-pwa/astro` 2.0.2 are current on npm.
- Apple App Store review risk for "website-in-a-wrapper" apps was not researched.
- Whether Vite + React Router in *library/data mode* (no framework mode, no prerender) would be simpler still for the app build was not evaluated in depth.
