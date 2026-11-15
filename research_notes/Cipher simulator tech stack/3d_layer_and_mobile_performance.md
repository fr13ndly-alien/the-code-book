# 3D rendering layer (R3F + drei vs Svelte + Threlte) and mobile-browser 3D performance — state as of 14 November 2026

Conventions used below: "registry" = queried directly from registry.npmjs.org / api.npmjs.org / api.github.com on 2026-11-14. "STALE?" = evidence older than roughly 2025 that may no longer hold. "UNVERIFIED" = could not be confirmed from a current primary source. Forum posts and vendor blogs are labelled as such.

## 1. Current stable versions, roadmap status, WebGPU support; is WebGLRenderer still the safe default on mobile?

### Takeaway
As of mid-November 2026 the stable line is three r187, @react-three/fiber 9.8.2 (v10 is still alpha and flips the default to WebGPU), drei 10.7.9 (v11 alpha), @threlte/core 8.7.0 / @threlte/extras 9.23.1. WebGPU is shipped in iOS Safari 26 and Android Chrome 121+, but for 11 low-poly mechanical models with no compute or heavy post-processing, the classic `WebGLRenderer` remains the lower-risk default: WebGPURenderer has documented CPU-overhead regressions on many-mesh scenes, its WebGL fallback is a separate, less mature backend, and both wrappers treat WebGPU as an opt-in/alpha path.

### Cited Findings
Versions (registry, 2026-11-14)
- `three` latest = 0.187.0, published 2026-10-30. — [npm registry: three](https://registry.npmjs.org/three)
- `@react-three/fiber` latest = 9.8.2 (2026-10-14); `alpha` tag = 10.0.0-alpha.6 (2026-10-17); `canary` = 10.0.0-canary.58acabc (2026-10-21). No v10 beta or stable exists. — [npm registry: @react-three/fiber](https://registry.npmjs.org/@react-three/fiber)
- `@react-three/drei` latest = 10.7.9 (2026-09-25); `alpha` = 11.0.0-alpha.7 (2026-09-05). — [npm registry: @react-three/drei](https://registry.npmjs.org/@react-three/drei)
- `@threlte/core` latest = 8.7.0 (2026-11-02); `@threlte/extras` latest = 9.23.1 (2026-11-02); `@threlte/rapier` 3.5.1 (2026-09-24). — [npm registry: @threlte/core](https://registry.npmjs.org/@threlte/core), [@threlte/extras](https://registry.npmjs.org/@threlte/extras), [@threlte/rapier](https://registry.npmjs.org/@threlte/rapier)
- `react` latest = 19.3.1 (2026-10-14); `svelte` latest = 5.57.3 (2026-10-26). — [npm registry: react](https://registry.npmjs.org/react), [svelte](https://registry.npmjs.org/svelte)
- `@react-three/postprocessing` 3.2.2 (2026-10-21); `@react-three/rapier` 2.2.0 (published 2025-11-03, no release in the last 12 months). — [npm registry: @react-three/postprocessing](https://registry.npmjs.org/@react-three/postprocessing), [@react-three/rapier](https://registry.npmjs.org/@react-three/rapier)

three.js release cadence and recent breaking changes
- Release dates per a third-party tracker updated 2026-11-06: r182 2025-12-10; r183 2026-02-18; r184 2026-04-16; r185 2026-06-25; r186 2026-09-08; r187 2026-10-30. "In 2026, releases came every 7 to 11 weeks." (The r187 date matches the npm registry.) — [Utsubo: What's New in Three.js (2026)](https://www.utsubo.com/blog/threejs-2026-what-changed)
- Recent breaking changes reported there: r183 renamed `PostProcessing` to `RenderPipeline` and deprecated `Clock` in favour of `Timer`; r186 removed `PCFSoftShadowMap`; r187 rebuilt PMREM environment maps, removed `CubeUVReflectionMapping`, and changed `setViewport()`/`setScissor()` behaviour when a render target is bound. — [Utsubo](https://www.utsubo.com/blog/threejs-2026-what-changed)
- The three.js manual says WebGPURenderer is imported from a separate build (`three/webgpu`) and that the project's focus for new features is now WebGPURenderer. — [three.js manual: WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)

WebGPU browser availability
- WebKit: WebGPU ships in Safari 26 for macOS, iOS, iPadOS and visionOS; WebKit says Three.js "work[s] great" and that WebGPU "supersedes WebGL" and is "preferred for new sites and web apps". The post does not say WebGL is deprecated, and does not mention WKWebView. — [WebKit blog: News from WWDC25 / Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)
- Third-party summary (updated 2026-11-06): Chrome Android has WebGPU since v121 on Android 12+; Safari since v26 (September 2025) on iOS/iPadOS; Firefox Android still behind a flag. Browsers without WebGPU fall back to WebGL 2 automatically under WebGPURenderer. — [Utsubo](https://www.utsubo.com/blog/threejs-2026-what-changed)

WebGPURenderer maturity caveats
- Forum benchmark (29–30 May 2026, r183.2, Chrome 148, Windows 11, RTX 4090 laptop; single machine, self-reported): 4,000 separate meshes / ~8M triangles — WebGLRenderer 4.5 ms CPU and 32 ms cold first frame; WebGPURenderer 9.7 ms and 167 ms; WebGPURenderer with `forceWebGL` 10.3 ms and 344 ms. Poster attributes it to per-object UBO/bind-group churn tracked in three.js issue #30560, described as still being worked on. No maintainer reply in thread. — [three.js forum thread 91904](https://discourse.threejs.org/t/webgpurenderer-2x-slower-cpu-and-5-10x-slower-first-frame-than-webglrenderer-on-many-mesh-scenes-r183-same-on-both-backends/91904)
- The Utsubo article (2026-11-06) itself warns that WebGPU "is not faster everywhere", cites forum reports of scenes where WebGPURenderer was slower, and advises profiling before migrating for speed alone; it recommends testing on target devices "including in-app browsers". — [Utsubo](https://www.utsubo.com/blog/threejs-2026-what-changed)

R3F v10 status
- v10.0.0-alpha.6 (17 Oct 2026 per npm) is titled "Going WebGPU First": WebGPURenderer is the default; WebGL/GLSL users must import from `@react-three/fiber/legacy`; `gl={...}` on the default import now throws; the `/webgpu` entry is deprecated and "will be removed in the first beta"; TSL hooks moved to a new `@react-three/tsl` package; `state.gl` became `state.renderer` (since alpha.1); a `primary` prop lets multiple WebGPU canvases share one renderer. No date is given for beta or stable. — [pmndrs/react-three-fiber releases](https://github.com/pmndrs/react-three-fiber/releases)
- v9.8.x is actively maintained alongside: 9.8.0 (React 19.3 support), 9.8.1 (works with React Activity, renderers disposed correctly on unmount), 9.8.2 (portal memory-leak fix, DPR follows display changes, removed objects disappear immediately under `frameloop="demand"`). — [pmndrs/react-three-fiber releases](https://github.com/pmndrs/react-three-fiber/releases)

Threlte WebGPU status
- Threlte 8 exposes WebGPU as an opt-in sub-path: import `Canvas`, `T`, `useThrelte`, `useTask` from `@threlte/core/webgpu`, which swaps in `WebGPURenderer` and awaits `renderer.init()`. Requires Vite `target: 'esnext'` (top-level await). Docs warn "WebGPU is still young and has limited availability across major browsers". `@threlte/extras/webgpu` exists, but only some components were rewritten in TSL; the rest "throw until they are migrated". Default (root import) remains WebGLRenderer. — [Threlte docs: WebGPU](https://threlte.xyz/docs/reference/core/webgpu)
- Threlte 8 (Svelte 5 rewrite, granular prop updates) was announced as released in Svelte's February 2025 roundup. — [Svelte blog: What's new in Svelte, February 2025](https://svelte.dev/blog/whats-new-in-svelte-february-2025)

### Inferences
- Safe choice today: R3F 9.8.x + drei 10.7.x on three r187 (or Threlte 8.7 on r187) with `WebGLRenderer`. Both stacks' stable lines target WebGL by default; both make WebGPU opt-in.
- R3F v10 will be a migration event (default renderer flip, `state.gl` rename, import-path changes, drei 11). A project started now on v9 should expect to move to `@react-three/fiber/legacy` (or WebGPU) at some later date; pinning v9 for an app with a fixed set of 11 models is low-risk because v9 is still receiving releases as of October 2026.
- three.js minor releases contain breaking changes every 7–11 weeks (e.g. `PCFSoftShadowMap` removal in r186). Pin the `three` version and upgrade deliberately; check drei/Threlte peer ranges before bumping.
- For this workload (a handful of meshes per scene, no compute), WebGPU offers no clear benefit; the documented WebGPURenderer overhead is per-object CPU cost, which matters little at ~50 draw calls but also means there is nothing to gain.

### Gaps
- No primary-source statement found on when R3F v10 or drei v11 go stable.
- Whether WebGPU is enabled by default inside WKWebView (as opposed to Safari) on iOS 26: the WebKit post does not address it. UNVERIFIED.
- No mobile-specific (iPhone / mid-range Android) benchmark comparing WebGPURenderer to WebGLRenderer was found; all numbers above are desktop.
- drei 10.7.9's exact peer range for `three` (whether r187 is inside it) was not checked.

## 2. R3F vs Threlte: overhead, bundle size, mobile frame rate, ecosystem, maintenance health

### Takeaway
No credible head-to-head benchmark (bundle or frame rate) exists; with on-demand rendering and a few dozen meshes the wrapper is not the bottleneck in either stack. The real differences are ecosystem size (R3F has ~80x the weekly downloads, more helpers and examples) versus current maintenance concentration (Threlte's recent commits are dominated by one maintainer; drei's commit rate has slowed sharply, and R3F-adjacent libraries such as use-gesture and react-three-a11y are effectively frozen).

### Cited Findings
Adoption (registry, week of 2026-11-07 to 2026-11-13)
- Weekly npm downloads: `three` 36,148,534; `@react-three/fiber` 9,179,288; `@react-three/drei` 6,165,566; `@threlte/core` 115,752; `@threlte/extras` 62,182. — [npm downloads API: @react-three/fiber](https://api.npmjs.org/downloads/point/last-week/@react-three/fiber), [@threlte/core](https://api.npmjs.org/downloads/point/last-week/@threlte/core), [three](https://api.npmjs.org/downloads/point/last-week/three)
- GitHub stars / open issues / last push: react-three-fiber 33,719 / 37 / 2026-10-21; drei 10,154 / 151 / 2026-10-21; threlte 3,364 / 65 / 2026-11-02; three.js 118,366 / 401 / 2026-11-14. — [GitHub API: pmndrs/react-three-fiber](https://api.github.com/repos/pmndrs/react-three-fiber), [pmndrs/drei](https://api.github.com/repos/pmndrs/drei), [threlte/threlte](https://api.github.com/repos/threlte/threlte)

Maintenance concentration (GitHub commits API, commits since 2026-05-01, capped at 100)
- react-three-fiber: 57 commits; top authors krispya 17, DennisSmolek 15, abernier 8. All-time top contributors: drcmda 1,632, CodyJasonBennett 506 — neither appears in the top of the recent window. — [GitHub API: R3F commits](https://api.github.com/repos/pmndrs/react-three-fiber/commits?per_page=100&since=2026-05-01T00:00:00Z)
- drei: only 11 commits since 1 May 2026 (krispya 6, abernier 5), with 151 open issues. — [GitHub API: drei commits](https://api.github.com/repos/pmndrs/drei/commits?per_page=100&since=2026-05-01T00:00:00Z)
- threlte: at least 100 commits in the same window (cap hit); michealparks authored 81 of the latest 100; original author grischaerbe authored 1. — [GitHub API: threlte commits](https://api.github.com/repos/threlte/threlte/commits?per_page=100&since=2026-05-01T00:00:00Z)

Ecosystem — R3F side
- drei provides `View`/`View.Port`, `PerformanceMonitor`, `Detailed` (LOD), controls that auto-call `invalidate()` under on-demand rendering. — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [drei docs: View](https://drei.docs.pmnd.rs/portals/view)
- `@use-gesture/react`: latest 10.3.1 published 2024-03-21; repo last pushed 2024-07-15; still 10,142,219 weekly downloads. No release in ~2.5 years. — [npm registry: @use-gesture/react](https://registry.npmjs.org/@use-gesture/react), [GitHub API: pmndrs/use-gesture](https://api.github.com/repos/pmndrs/use-gesture)
- `@react-three/a11y`: latest 3.0.0 published 2022-05-15 (no release in 4.5 years; repo pushed 2026-08-20 but no new version). STALE? for React 19 / R3F 9 compatibility — UNVERIFIED. — [npm registry: @react-three/a11y](https://registry.npmjs.org/@react-three/a11y)
- R3F's event system: `onClick`, `onPointerDown/Up/Move/Over/Out/Enter/Leave`, `onWheel`, etc.; pointer capture via `e.target.setPointerCapture(e.pointerId)`; docs state there is no support for multiple active pointers in capture; `eventSource`, `eventPrefix`, custom `compute`. — [R3F docs: Events](https://r3f.docs.pmnd.rs/api/events)

Ecosystem — Threlte side
- `@threlte/extras` (current docs) includes: `<OrbitControls>`, `<CameraControls>`, `<TrackballControls>`, `<TransformControls>`, `<Gizmo>`, `interactivity` plugin, `bvh`, `useCursor`, `useKeyboard`, `useInputMap`, `useGamepad`; `<GLTF>`, `useGltf`, `useGltfAnimations`, `useTexture`, `<HTML>`, `<Text>`; `<Suspense>`, `useProgress`; `<Detailed>`, `<Instance>`/`<InstancedMesh>`, `<PerfMonitor>`, `meshBounds`, `<BakeShadows>`; `<View>`, `<HUD>`, `<Portal>`, `<Environment>`, `<ContactShadows>`, `<Float>`, `<Bounds>`, `<Align>`, `transitions`; `<Edges>`, `<Outlines>`, `<MeshLineGeometry>`. There is no adaptive-quality `PerformanceMonitor` equivalent listed — `<PerfMonitor>` is a stats overlay. — [Threlte docs: extras](https://threlte.xyz/docs/reference/extras/getting-started)
- Threlte's `interactivity` plugin: click, dblclick, contextmenu, wheel, pointerup/down/over/out/enter/leave/move, pointermissed; nearest-first propagation with `stopPropagation()`; configurable `target`, `compute`, `filter`, per-event passive options. Docs include explicit touch guidance (see section 6). — [Threlte docs: interactivity](https://threlte.xyz/docs/reference/extras/interactivity)
- Other first-party Threlte packages visible in the docs navigation: gltf, rapier, theatre, xr, flex, studio. — [Threlte docs: extras](https://threlte.xyz/docs/reference/extras/getting-started)

Runtime overhead / bundle size (weak evidence)
- R3F docs claim React scheduling can help under load: creating 510 `TextGeometry` instances at once caused ~1.5 s jank on an M1; with `startTransition` React stays near 60 fps. This is the R3F project's own benchmark, not a comparison with Threlte. — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- A package-comparison site lists R3F at roughly 50 KB on top of three (~700 KB unminified-ish figure); a single developer measured 462 KB (vanilla three) vs 1,036 KB (R3F app). These conflict and are unverified single measurements. — [pkgpulse guide](https://www.pkgpulse.com/guides/threejs-vs-react-three-fiber-vs-babylonjs-3d-webgl-2026), [vivecuervo7 dev blog](https://vivecuervo7.github.io/dev-blog/p/react-three-fiber)

### Inferences
- Bundle: both stacks ship three.js itself, which dominates. R3F adds react + react-dom + the reconciler + whatever drei modules are imported; Threlte adds the Svelte 5 runtime (small) + @threlte/core. Expect the Svelte stack to be meaningfully smaller in framework JS, but no measured Threlte figure was found — treat any specific number as UNVERIFIED and measure with a bundle analyser.
- Frame rate: with `frameloop="demand"` (R3F) or Threlte's equivalent and imperative mutation inside `useFrame`/`useTask`, per-frame cost is three.js + GPU, not the wrapper. No evidence either wrapper limits fps on phones for scenes of this size.
- Bus factor: both are community projects without corporate backing found in sources. R3F core has several active committers but its original author is no longer in the recent commit list; drei is in low-activity mode (11 commits in 6.5 months) while v11 alpha work happens; Threlte is very active but ~80% of recent commits come from one person. Neither is obviously safer; R3F has far more users who would notice breakage.
- For gesture handling in R3F, do not assume `@use-gesture` is a maintained dependency; for the interactions required here (drag-to-rotate a rotor/disc, press a key), R3F/Threlte native pointer events with pointer capture are sufficient and avoid an unmaintained package.
- Threlte now has `<View>`, `<Suspense>`, `<Detailed>`, `bvh`, `useKeyboard` — feature parity for this project's needs is closer than older (2023–2024) comparisons suggest. The notable missing pieces versus drei are an adaptive `PerformanceMonitor` and the larger body of third-party examples/tutorials.

### Gaps
- No reliable, same-scene benchmark of R3F vs Threlte (bundle size gzipped, memory, mobile fps) was found. Anything on this is opinion.
- Did not verify whether Threlte has an on-demand render mode named identically to R3F's (Threlte historically uses `renderMode="on-demand"` by default) — UNVERIFIED from a current source in this pass.
- `@react-three/a11y` compatibility with R3F 9 / React 19 not confirmed.
- Funding/sponsorship status of pmndrs and Threlte not researched.

## 3. iOS Safari / WKWebView limits and Android Chrome limits (memory, canvas, textures, context count, GPU process termination, backgrounding)

### Takeaway
Apple publishes no fixed numbers; memory limits are dynamic and policy-driven, and exceeding them kills the WebContent or GPU process with no JavaScript-visible warning. Practical guidance from 2025–2026 sources is to stay well under roughly 256 MB of GPU memory and ~300–400 MB total on older iPhones, use one WebGL context, and treat tab/app backgrounding as a likely context-loss point on both iOS and Android.

### Cited Findings
iOS memory ceilings and process kills
- Apple forum answer on WKWebView memory termination: "The memory limit" is not a set number; it depends on total device RAM, current system load, etc. — [Apple Developer Forums 771787](https://developer.apple.com/forums/thread/771787)
- WebKit bug 300782 (filed 2025-10-15, status NEW, last modified 2026-03-11; reported on Safari 18 / iOS 18): pages with heavy WebGL and many textures are terminated under memory pressure and immediately reloaded, looping until Safari shows "A problem repeatedly occurred". No out-of-memory error reaches JS and no `webglcontextlost` is seen before termination. A commenter (2026-03-10) states the limit is iOS policy rather than physical memory, that uncollected garbage counts toward it, and that Android loads "4 or 16 times more memory" without crashing (anecdotal). A WebKit engineer (Kimmo Kinnunen, 2026-03-11) asked for a repro and said it "sounds like a bug". — [WebKit bug 300782](https://bugs.webkit.org/show_bug.cgi?id=300782)
- Practitioner guide (updated June 2026): tabs above roughly 300–400 MB on older iPhones (iPhone 8, SE 2nd gen) are often killed; Safari has been seen to crash or corrupt rendering above about 256 MB total GPU memory on older devices; 6 GB-RAM iPhones have a higher but still present threshold. Explicitly described as practical guidelines, not published limits. — [abratabia: iOS Safari Gotchas for Web Games](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)
- Capacitor practitioner write-up (2026-09-01, three.js game shipped to App Store): "iOS kills WKWebView's GPU process whenever it decides memory is tight"; the app stays up, the 3D world goes black while HTML HUD remains. — [raxxo: Shipping a Three.js game to the iOS App Store](https://raxxo.shop/blogs/lab/shipping-a-three-js-game-to-the-ios-app-store)
- Apple forum (April 2026): WKWebView WebContent process terminates and GPU process exits with `reason=Crash` on iPhone 15 / iOS 26.4 while the same flow is stable on iPad; another user reports the same in Safari/Capacitor. Apple engineer asked for a Feedback report; no workaround. Whether WebGL is involved is not stated. — [Apple Developer Forums 822200](https://developer.apple.com/forums/thread/822200)
- WebKit bug 261685 (2023, STALE?): WKWebView crash when loading/unloading images into VRAM while switching WebGL scenes; one commenter hit it with three.js models of ~1 MiB each. — [WebKit bug 261685](https://bugs.webkit.org/show_bug.cgi?id=261685)

Canvas and texture limits
- Historic iOS Safari limits: "Total canvas memory use exceeds the maximum limit (256 MB)" in Safari 12 (STALE?); WebKit later discussed removing the canvas-specific limit so pages hit the overall process limit instead. — [WebKit bug 195325](https://bugs.webkit.org/show_bug.cgi?id=195325), [Apple Developer Forums 687866](https://developer.apple.com/forums/thread/687866)
- Canvas area cap reported as 16,777,216 pixels (4096x4096) on iOS Safari (third-party write-up, date uncertain, STALE?). — [pqina: Canvas Area Exceeds The Maximum Limit](https://pqina.nl/blog/canvas-area-exceeds-the-maximum-limit/)
- Texture memory arithmetic: 2048x2048 RGBA is about 16 MB uncompressed (more with mipmaps); guide recommends atlases of 1024x1024 or smaller on mobile. — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)
- Resizing a WebGL canvas on iOS has leaked memory (iOS 14 bug, reported fixed in 14.3 — STALE?); the June 2026 guide still advises debouncing resizes and sizing the canvas once. — [WebKit bug 219780](https://bugs.webkit.org/show_bug.cgi?id=219780), [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)

Simultaneous WebGL contexts
- 2020 Stack Overflow measurements (STALE?): desktop Chrome 80 = 16 contexts; Chrome 81 on Android (Pixel 2 XL) = 8; Safari 13.1 macOS and Safari on iPhone 11 = 16. Limit is per-domain in Chrome, per-page in Firefox/Safari. When exceeded: "There are too many active WebGL contexts on this page, the oldest context will be lost." — [Stack Overflow mirror: how to determine number of active WebGL contexts](https://kaweah.freedombox.rocks/kiwix/stackoverflow.com_en_all_2023-11/questions/61277222/how-to-determine-number-of-active-webgl-contexts)
- WebKit retains layout tests for "max active contexts, oldest context lost", confirming the eviction behaviour exists in WebKit. — [WebKit LayoutTests: max-active-contexts-oldest-context-lost](https://webkit.googlesource.com/WebKit/+/09efe880c6ef62d4b7e7987a43e540252e1b6d06/LayoutTests/webgl/max-active-contexts-oldest-context-lost-expected.txt)
- R3F community anti-pattern guide: multiple `<Canvas>` instances lead to "context lost" errors on mobile / older Intel chips; browsers cap contexts per page (typically 8–16). — [R3F anti-patterns (vibesmith docs)](https://tombee.github.io/vibesmith-docs/anti-patterns/)
- Apple forum report (2023, STALE?): on iOS, an R3F canvas forced to re-render created a new context while the previous one was not released ("Leaking WebGLRenderer when rerendering on iOS"). — [Apple Developer Forums 741327](https://developer.apple.com/forums/thread/741327)

Backgrounding
- iOS: context loss can occur on memory pressure, on switching apps and returning, and after extended time in the background (no duration given). — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)
- iOS 17 beta had a bug where backgrounding Safari on iPad caused "WebGL: context lost"; reported fixed in Safari 17.1 (STALE?, historical). — [Apple Developer Forums 737042](https://developer.apple.com/forums/thread/737042)
- Android Chrome: a Chromium code review states the design avoids restoring WebGL contexts for hidden tabs on Android so they do not "fight with the GPU OOM killer" (old, STALE? but primary). Vendor/blog sources in 2026 say Chrome on Android reclaims GPU memory when tabs go to the background and Memory Saver can discard the renderer entirely. — [Chromium code review 1756633002](https://codereview.chromium.org/1756633002), [bugnet: WebGL context lost after tab switch, mobile Chrome](https://bugnet.io/blog/fix-webgl-game-context-lost-after-tab-switch-mobile-chrome)
- Storage note relevant to a static, backend-less app: Safari ITP may delete localStorage/IndexedDB/service-worker caches after seven days without a visit; home-screen PWAs are exempt. (Capacitor apps use their own WKWebView data store — not covered by this source.) — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)

### Inferences
- For 11 low-poly models, the risk is not steady-state memory but (a) accidentally holding several models' GPU resources at once, (b) multiple canvases/contexts, (c) oversized textures (a few 4K PBR texture sets would alone approach the ~256 MB GPU guideline: one 4096x4096 RGBA texture is ~64 MB, ~85 MB with mips), and (d) leaked renderers on route change.
- In Capacitor the WebContent and GPU processes are separate from the app process, so a kill shows as a blank/black web view rather than an app crash; Capacitor/WKWebView exposes `webViewWebContentProcessDidTerminate` natively, and the app should reload the web view on it (general WKWebView knowledge; not verified against Capacitor 7/8 docs in this pass — UNVERIFIED).
- The 16-context figure should not be relied on; design for exactly one live WebGL context at a time.

### Gaps
- No Apple-published per-tab or per-WKWebView memory ceiling, max canvas size, or max context count for iOS 26 was found; all figures are practitioner reports.
- `MAX_TEXTURE_SIZE` on current iPhones/Android mid-range (commonly 4096–16384) was not verified from a current source.
- No current primary Chrome documentation on Android context-count limits or background GPU reclaim thresholds for mid-range devices.
- Whether WKWebView has a lower memory budget than Safari on the same device: not established by any source found.

## 4. WebGL context loss: frequency on iOS in 2025–2026, detection and recovery, cases where the event does not fire

### Takeaway
Context loss and silent GPU/WebContent process kills remain a live issue on iOS 18 and iOS 26 (open WebKit bugs and forum reports through spring 2026), and there is credible 2025–2026 evidence that `webglcontextlost` is not reliably delivered, especially in WKWebView. Recovery should therefore not depend on the event alone: poll `gl.isContextLost()`, keep source assets reloadable, and make "remount the canvas / reload the scene" a cheap operation.

### Cited Findings
- WebKit bug 300782 (open as of 2026-03-11): no `webglcontextlost` event and no OOM error is seen before iOS terminates the page; reporter requests reliable context-loss delivery before a kill. A commenter notes that after Safari clears the tab, devtools data is also gone, making diagnosis hard. — [WebKit bug 300782](https://bugs.webkit.org/show_bug.cgi?id=300782)
- Capacitor/three.js write-up (2026-09-01): a `webglcontextlost` listener was installed but "WebKit does not reliably fire it"; no event was dispatched on device when the GPU process was killed. Author's mitigation uses three detectors: (1) `isContextLost()` polled about every 2 s; (2) a draw-call floor heuristic (120 consecutive frames under ~10 draws); (3) the event itself. Recovery = persist state, write a marker, reload the page; cap at three recoveries in ten minutes to avoid a loop, because reload re-runs parsing and shader warm-up, which can itself re-trigger the kill. — [raxxo](https://raxxo.shop/blogs/lab/shipping-a-three-js-game-to-the-ios-app-store)
- WebKit bug 289601 (filed 2025-03-12, iOS/iPadOS 18.3.x; resolved as duplicate of fixed bug 286297): WebGL2 context (three.js) lost during buffer upload; after reload a new context could not be created until the browser was force-quit; other WebGL tabs also broke. Trigger identified as a `flat` varying in a vertex shader; workaround was the `WEBGL_provoking_vertex` extension with `FIRST_VERTEX_CONVENTION_WEBGL`. — [WebKit bug 289601](https://bugs.webkit.org/show_bug.cgi?id=289601)
- WebKit bug 307882 (February 2026): layout test `webgl/lose-context-after-context-lost.html` is a constant failure on iOS (iOS 26 simulator), marked as expected failure pending investigation. — [WebKit bug 307882](https://bugs.webkit.org/show_bug.cgi?id=307882)
- three.js forum (2025): "Safari/any web browser crash on iPhone when use WEBGL"; and "iOS 18.2 Causing WebGL Error" — recurring user reports through the iOS 18 cycle. — [three.js forum 81629](https://discourse.threejs.org/t/safari-any-web-browser-crash-on-iphone-when-use-webgl/81629), [three.js forum 75143](https://discourse.threejs.org/t/ios-18-2-causing-webgl-error/75143)
- three.js forum (iPadOS 17.5.1 + R3F, STALE?): a texture caused context loss; one poster reported `gl={{ powerPreference: 'default', antialias: false }}` on the Canvas helped (single anecdote). — [three.js forum 68643](https://discourse.threejs.org/t/texture-is-causing-loss-of-context-in-ipados-ios-17-5-1-when-using-react-three-fiber/68643)
- Standard handling: call `preventDefault()` in `webglcontextlost` so the browser may restore; rebuild GPU resources in `webglcontextrestored`. Do not call a forced restore inside the lost handler; three.js "can't restore all application specific logic". — [three.js forum 66395](https://discourse.threejs.org/t/how-to-fix-three-webglrenderer-context-lost/66395), [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)
- A "Context Lost" console message when an R3F `<Canvas>` unmounts on route change is expected — it is three.js/R3F discarding the context to free memory, not an error. — [three.js forum 61736](https://discourse.threejs.org/t/context-lost-when-i-route-to-another-page-in-react-three-fiber/61736)
- R3F 9.8.1 release note: renderers are disposed correctly on unmount. — [pmndrs/react-three-fiber releases](https://github.com/pmndrs/react-three-fiber/releases)
- Frequent loss on iOS "usually means the game exceeds its GPU memory budget". — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)
- After a WKWebView crash and reload, KTX2 textures rendered incorrectly on iOS 15–17 (three.js forum, unresolved; STALE?). — [three.js forum 61007](https://discourse.threejs.org/t/render-error-after-wkwebview-crash/61007)

### Inferences
- "How often" cannot be quantified from public sources; the evidence is a steady stream of bug reports rather than rates. For a light scene (tens of MB of GPU memory) the realistic triggers are backgrounding/app-switching and other apps' memory pressure, not the app's own allocations.
- A robust recovery design for this app: (1) attach `webglcontextlost` (with `preventDefault`) and `webglcontextrestored` to the canvas in `onCreated` (R3F) or via `useThrelte().renderer.domElement`; (2) on `visibilitychange` → visible and on a slow interval, check `renderer.getContext().isContextLost()`; (3) recover by changing a React `key` on `<Canvas>` (or re-mounting the Threlte `<Canvas>`) so the whole scene is rebuilt from cached GLBs — simpler and more reliable than in-place restore; (4) keep simulator state (rotor positions, plugboard wiring, message text) in plain JS/store state outside the scene graph so a remount loses nothing; (5) show a static poster image plus a "tap to reload 3D" control if recovery fails twice.
- Because iOS may reload the whole page with no event, persist simulator state to `sessionStorage`/`localStorage` on change so a forced reload restores the user's place.
- Avoid `flat` varyings and exotic shader features in custom shaders on iOS; stock three.js materials are the safest path.

### Gaps
- No documented R3F or Threlte built-in automatic context-restore behaviour was found; R3F's docs do not cover it. Treat recovery as application code.
- Whether bug 300782's missing-event behaviour is fixed in iOS 26.x: no fix recorded as of the last bug update (2026-03-11); current status after that date UNVERIFIED.
- No source quantifying context-loss rates on iOS 26 vs iOS 18.

## 5. Patterns for many 3D scenes on one site (shared canvas vs canvas per page, on-demand rendering, disposal, DPR capping, adaptive quality)

### Takeaway
Keep exactly one WebGL context alive: either one persistent canvas whose content swaps per device (and drei/Threlte `View` when several scenes must be visible at once), or one canvas per page that is strictly unmounted on navigation. Render on demand, cap DPR, and dispose or cache deliberately; these matter more than the framework choice.

### Cited Findings
- drei `View`: uses `gl.scissor` to split one canvas into segments; each `View` is a plain DOM element positioned in the page; a `<View.Port />` inside a full-screen, absolutely positioned `<Canvas>` renders them; views track their elements on scroll/resize. Connect the event system to a shared parent via `eventSource` so both HTML and canvas are interactive and controls can be mounted per view. Set `frames={1}` for static views to avoid repeated `getBoundingClientRect` calls. — [drei docs: View](https://drei.docs.pmnd.rs/portals/view)
- Threlte also ships a `<View>` component in extras (Staging group). — [Threlte docs: extras](https://threlte.xyz/docs/reference/extras/getting-started)
- Known `View` drawbacks from forum reports: a user measured a drop from 144 fps to at most 95 fps on desktop after moving a single scene from plain `<Canvas>` to `<View>` (commenters: only worthwhile when several scenes are actually shown at once); view content can trail behind its DOM position during scroll; `EffectComposer` post-processing did not work correctly with `View`. — [three.js forum 67831](https://discourse.threejs.org/t/using-view-from-drei-decreases-performance/67831), [three.js forum 77856](https://discourse.threejs.org/t/drei-view-content-trailing-behind-view-position-on-scroll/77856), [three.js forum 72359](https://discourse.threejs.org/t/effectcomposer-doesnt-work-with-view-in-react-three-fiber/72359)
- Forum guidance: prefer keeping one Canvas mounted across routes rather than one per route; multiple canvases cost resources, cannot share data, and browsers will kill contexts beyond a limit. — [three.js forum 61736](https://discourse.threejs.org/t/context-lost-when-i-route-to-another-page-in-react-three-fiber/61736), [three.js forum 55858](https://discourse.threejs.org/t/canvases-vs-views/55858)
- R3F v10 alpha adds a `primary` canvas prop so multiple WebGPU canvases share one renderer (alpha only; WebGPU only). — [pmndrs/react-three-fiber releases](https://github.com/pmndrs/react-three-fiber/releases)
- On-demand rendering: `frameloop="demand"` renders only when props change; the scene is "completely idle when nothing is going on". Mutations outside React need a manual `invalidate()`; drei controls call it automatically; multiple `invalidate()` calls in a frame coalesce into one render. — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- R3F 9.8.2 fixed removed objects not disappearing immediately under `frameloop="demand"` — use 9.8.2 or later if relying on demand mode. — [pmndrs/react-three-fiber releases](https://github.com/pmndrs/react-three-fiber/releases)
- Resource reuse: share geometries and materials; `useLoader` caches by URL so re-entering a scene reuses the parsed asset. — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Adaptive quality: drei `PerformanceMonitor` tracks average fps and fires `onIncline`/`onDecline`; docs example starts at `dpr` 1.5, drops to 1 on decline, raises to 2 on incline; `flipflops` + `onFallback` settle on a baseline after oscillation. R3F's `performance.regress()` supports temporary quality reduction during movement. — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- R3F 9.8.2: pixel ratio now follows display changes; note the `dpr` prop overrides `setDpr` on Canvas re-render. — [pmndrs/react-three-fiber releases](https://github.com/pmndrs/react-three-fiber/releases)
- Monitoring: use `renderer.info` as source of truth; sample ~once per second and watch whether geometry/texture counts climb while idle (leak indicator). — [hontran.dev: three.js performance optimization](https://www.hontran.dev/blog/three-js-performance-optimization)
- Safari-specific cleanup history (Safari 12, STALE?): repeatedly creating renderers across view switches accumulated "too many active WebGL contexts" warnings until crash; advice was to destroy scene objects but keep the renderer and canvas. — [html5gamedevs topic 42879](https://www.html5gamedevs.com/topic/42879-safari-cleanup-issue/)

### Inferences
- Recommended architecture for this app (one device model per page/lesson, occasionally two side by side): a single persistent full-viewport or fixed-region canvas in the app shell, with the active device scene swapped by route. This yields one context for the whole session, avoids iOS renderer-leak and context-count issues, and avoids repeated shader compilation. Use `View` only on pages that genuinely show multiple 3D viewports within scrolling text.
- Canvas-per-page is acceptable only if navigation fully unmounts the previous canvas (R3F disposes on unmount as of 9.8.1) and there are never two mounted at once, including during route transitions/animations.
- Because R3F's `useLoader`/`useGLTF` cache holds parsed GLBs (and their GPU resources once rendered), an app with 11 models should explicitly evict off-screen models (`useGLTF.clear(url)` / `useLoader.clear`, and rely on R3F's auto-dispose on unmount) if total texture memory is non-trivial; if all 11 together are small (say under 50 MB GPU), keeping them cached is simpler and gives instant navigation. (API names from general knowledge of drei — verify against current docs.)
- DPR: cap at 2 on phones (many are 3x) — at 3x a full-screen canvas shades 2.25x as many pixels as at 2x; drop to 1.5 on decline. With `frameloop="demand"` a static device costs no GPU time, which also addresses battery and thermal throttling.
- Skip post-processing entirely (consistent with the brief); it also sidesteps the `View` + `EffectComposer` incompatibility. MSAA via `antialias: true` at DPR 2 is usually sufficient for hard-edged mechanical models.

### Gaps
- No mobile-specific measurements of `View` overhead versus a single plain canvas.
- R3F docs give no explicit disposal guide; disposal behaviour described here beyond the 9.8.1 release note is from general knowledge.
- Threlte's on-demand/`invalidate` API and its `View` limitations were not read in detail in this pass.

## 6. Touch interaction: orbit vs scroll, pointer events and raycasting, gesture libraries, drag-to-rotate, haptics, accessibility fallbacks

### Takeaway
OrbitControls sets `touch-action: none` on its element, which blocks page scroll over the canvas; on scrollable pages this must be resolved by design (constrained controls plus `touch-action: pan-y`, or an explicit "tap to interact" mode). Native pointer events with pointer capture in R3F/Threlte are enough for rotor/disc dragging; web haptics on iOS Safari are unofficial and fragile, so haptics should come from the Capacitor native plugin in the iOS build and be treated as optional on the web.

### Cited Findings
Orbit controls vs scroll
- three.js `OrbitControls` source (dev branch): `connect()` sets `this.domElement.style.touchAction = 'none'; // Disable touch scroll` and `disconnect()` restores it. Defaults: `touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }`. It uses Pointer Events and `setPointerCapture`. — [three.js OrbitControls.js](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/controls/OrbitControls.js)
- Threlte docs: the browser can take over a touch for scrolling/pinch-zoom, firing `pointercancel` and stopping `pointermove`, so drag handlers stop. If the canvas is the main interaction surface, set `touch-action: none` on a wrapper; do not use `none` on scrollable pages — consider `touch-action: pan-y` or handle the trade-off in app logic. — [Threlte docs: interactivity](https://threlte.xyz/docs/reference/extras/interactivity)
- Forum threads show the recurring complaint (page will not scroll once the finger lands on the 3D model) and the usual workarounds: `touch-action: pan-y`/`pan-x`, disabling controls on touch, or overriding the inline style after controls are constructed. — [three.js forum 60809](https://discourse.threejs.org/t/doesnt-scroll-over-3d-model-on-mobile/60809), [three.js forum 58430](https://discourse.threejs.org/t/orbitalcontrols-on-mobile-devices/58430)
- iOS specifics: system edge swipes cannot be disabled from JS; keep interactive elements at least ~20 px from screen edges; treat `touchcancel`/`pointercancel` as finger-up to avoid stuck drags; `touch-action: manipulation` removes double-tap zoom and tap delay. — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)

Pointer events and raycasting
- R3F: pointer capture through `e.target.setPointerCapture(e.pointerId)`; the capturing object is added to hit results rather than replacing them; no multi-pointer capture support; nearest-first delivery with `stopPropagation()` needed to block objects behind; `eventPrefix` selects coordinate source (`offset` default, `client` optional); `compute` for custom pointer-to-ray mapping. Docs contain no touch-specific guidance. — [R3F docs: Events](https://r3f.docs.pmnd.rs/api/events)
- Threlte: equivalent event set and propagation; objects are "transparent to pointer events by default"; `compute`, `filter`, `target` options; `delta` (pixels moved since pointerdown) is provided on click events, useful for distinguishing tap from drag. — [Threlte docs: interactivity](https://threlte.xyz/docs/reference/extras/interactivity)
- Threlte extras also provides `bvh` (accelerated raycasting) and `meshBounds` (cheap bounding-volume raycast). — [Threlte docs: extras](https://threlte.xyz/docs/reference/extras/getting-started)

Gesture libraries
- `@use-gesture/react` 10.3.1 is the last release (2024-03-21); repo last pushed 2024-07-15; ~10.1M weekly downloads. — [npm registry: @use-gesture/react](https://registry.npmjs.org/@use-gesture/react), [GitHub API: pmndrs/use-gesture](https://api.github.com/repos/pmndrs/use-gesture)
- pmndrs has newer "handle" components in the `@react-three/xr`/handle docs (screen handles) for object manipulation. Not evaluated in depth. — [pmndrs/xr docs: Screen handles](https://pmndrs.github.io/xr/docs/handles/screen-handle-components)

Haptics
- Apple has not implemented the Vibration API in Safari; reports say `navigator.vibrate` either is absent or returns false on iOS. — [Software Mansion: Haptic feedback on the web](https://swmansion.com/blog/haptic-feedback-on-the-web-why-the-web-deliberately-refuses-to-be-as-tactile-as-native-apps), [bugnet: Vibrate API not available in iOS Safari](https://bugnet.io/blog/fix-web-game-vibrate-api-not-available-ios-safari)
- Workaround since Safari 17.4: toggling a hidden `<input type="checkbox" switch>` triggers the system haptic; used by libraries such as `web-haptics` / `ios-haptics`, with `navigator.vibrate()` on Android. — [azukiazusa.dev: WebHaptics on iOS Safari](https://azukiazusa.dev/blog/ios-safari-web-haptics.md), [web-haptics browser support](https://www.mintlify.com/lochie/web-haptics/advanced/browser-support)
- Fragility: a Flarum forum thread reports web haptics stopped working on iOS 26.5, attributed to Apple closing the path the web-haptics library relied on; a March 2026 MDN browser-compat-data issue contains a conflicting claim that `navigator.vibrate` now works on iOS Safari. Status is contested and UNVERIFIED. — [Flarum discussion 39406](https://discuss.flarum.org/d/39406/17), [mdn/browser-compat-data issue 29166](https://github.com/mdn/browser-compat-data/issues/29166)

Accessibility
- `OrbitControls` keyboard support is opt-in: `listenToKeyEvents(domElement)`; arrow keys pan (`keyPanSpeed` default 7), and Ctrl/Meta/Shift + arrow rotates. — [three.js OrbitControls.js](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/controls/OrbitControls.js)
- Threlte extras includes `useKeyboard` and `useInputMap` hooks. — [Threlte docs: extras](https://threlte.xyz/docs/reference/extras/getting-started)
- `@react-three/a11y` (focus, keyboard and screen-reader support for R3F meshes) has had no release since 3.0.0 on 2022-05-15. — [npm registry: @react-three/a11y](https://registry.npmjs.org/@react-three/a11y)

### Inferences
- Orbit vs scroll on phones: for an educational page where the model sits within scrolling text, the least surprising pattern is: horizontal drag rotates the model (azimuth only or tightly clamped polar angle), vertical drag scrolls the page (`touch-action: pan-y` applied after controls construct, since OrbitControls overwrites the inline style), zoom disabled or two-finger only. For a dedicated full-screen simulator view, use `touch-action: none` and free orbit. An explicit "interact" toggle is the fallback when both axes are needed.
- Drag-to-rotate a rotor or Alberti disc: on `onPointerDown` capture the pointer, disable orbit controls, compute the angle of the pointer around the part's axis (project the ray onto the plane perpendicular to the axis, or simply map horizontal pixel delta to angle), snap to the 26 detents on release, and re-enable controls. Handle `pointercancel` as release. Both wrappers expose what is needed; no gesture library is required.
- Touch raycasting accuracy: fingers are imprecise, and Enigma keys/plugboard sockets are small. Use enlarged invisible hit meshes (or Threlte `meshBounds`) rather than the visible geometry, test hit targets at around 44 CSS px on screen at the default camera, and consider zooming the camera to the keyboard/plugboard sub-assembly when the user engages it. Because R3F delivers events to every intersected object nearest-first, add `stopPropagation()` on keys so objects behind do not also fire.
- Hover-dependent affordances (`onPointerOver` highlights) do not exist on touch; use press states and visible labels.
- Haptics: treat as progressive enhancement. On Android web, `navigator.vibrate` on rotor detents/key presses; on iOS web, none (or the switch hack behind feature detection, expecting it to break); in the Capacitor iOS build, call the native `@capacitor/haptics` plugin (impact/selection feedback) — this is the reliable path (plugin name from general knowledge; not verified in this pass).
- Accessibility baseline that does not depend on an unmaintained library: mirror every 3D control with real DOM controls (buttons to step each rotor, a text input/keyboard for Enigma keys, a list UI for plugboard pairs, a slider for the Alberti disc and polariser angle); keep an `aria-live` text readout of state (rotor positions, lit lamp, output); honour `prefers-reduced-motion` by replacing animated transitions with immediate state changes (trivial with `frameloop="demand"`); and provide a non-WebGL fallback (static image/SVG of each device plus the same DOM controls) when context creation fails or is lost repeatedly. Since the cipher logic must live outside the scene graph anyway, the 3D view becomes one of two renderers over the same state.

### Gaps
- No authoritative 2026 source on best-practice orbit-vs-scroll UX; guidance is forum-derived plus the Threlte docs.
- Current iOS 26.x status of the checkbox-switch haptic hack and of `navigator.vibrate` is contradictory across sources; needs a real-device test.
- drei's current gesture/drag helpers (`DragControls`, `PivotControls`, `PresentationControls`) were not checked for touch behaviour in this pass.
- No source found evaluating screen-reader behaviour of canvas-based 3D in iOS VoiceOver within WKWebView.

## 7. Realistic performance budgets for 60 fps on a 3–4 year old phone

### Takeaway
There is no authoritative benchmark for 2026 mid-range phones; published budgets are rules of thumb that disagree by up to an order of magnitude. A low-poly mechanical scene should sit far inside all of them: aim for roughly 100 or fewer draw calls, under ~200–500K triangles, and well under 100 MB of texture memory per scene, then verify on real devices.

### Cited Findings
- R3F docs: each mesh is a draw call; "no more than 1000 as the very maximum, and optimally a few hundred or less" (not mobile-specific). — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Practitioner blog: "polygon count rarely kills performance; draw calls always do"; budget under 500 draw calls per frame, ideally under 100; rough target of ~100–150 draw calls and triangles "under a couple million" on mid-range hardware. — [hontran.dev: three.js performance optimization](https://www.hontran.dev/blog/three-js-performance-optimization)
- Other community budgets found: under 200 draw calls and under 500K triangles for mobile; a three.js forum rule of thumb borrowing 50–100 draw calls per frame from Oculus (VR) guidance. — [three.js forum 23972](https://discourse.threejs.org/t/three-scene-optimization-texture-size-calculation-in-gpu-compression-merge-meshes-what-the-limits/23972), [digitalstrategyforce: optimizing three.js for mobile](https://digitalstrategyforce.com/journal/how-do-you-optimize-threejs-performance-for-mobile-devices/) (low-authority source)
- Texture memory arithmetic: 4096x4096 RGBA = 64 MB on the GPU; 1024x1024 = 4 MB; 2048x2048 ≈ 16 MB. — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php), [metadesignsolutions: three.js performance best practices](https://metadesignsolutions.com/blog/threejs-performance-optimization-best-practices)
- A mobile optimisation case study set a texture-memory target of under 100 MB after measuring 425 MB in the original build. — [JavaScript in Plain English: optimizing a three.js app for mobile](https://javascript.plainenglish.io/how-we-optimized-our-three-js-application-to-run-on-mobile-devices-4a3bc9e572f4)
- iOS-specific ceiling guidance: keep total GPU memory under ~256 MB and tab memory under ~300–400 MB on older iPhones; atlases at 1024x1024 or smaller. — [abratabia](https://abratabia.com/mobile-web-games/ios-safari-gotchas.php)
- Commonly recommended mobile levers: cap device pixel ratio, consider disabling antialiasing, render on demand, half-resolution post-processing. — [hontran.dev](https://www.hontran.dev/blog/three-js-performance-optimization)
- Instancing collapses repeated objects into one draw call (R3F docs example uses 100,000 instances). — [R3F docs: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

### Inferences
Suggested per-scene budget for this project (derived from the ranges above with safety margin; not a measured result):
- Draw calls: target 50 or fewer, hard ceiling ~100–150. The Enigma is the stress case: 26 keys + 26 lamps + 26 plugboard sockets + 3–4 rotors + cables + case could be 100+ meshes if modelled naively. Use `InstancedMesh` for keys, lamps and sockets (one draw call each, per-instance transform and colour), merge static casing into one mesh, and keep only moving parts (rotors, pressed key) as separate objects.
- Triangles: 100–200K for the most complex device, 20–50K for simple ones (scytale, tablet, padlock box). All published mobile budgets (500K to ~2M) leave ample headroom.
- Materials/textures: prefer vertex colours or a single shared palette/atlas texture at 1024x1024 (2048x2048 maximum) per device; use flat or `MeshStandardMaterial` with one small environment map shared across all scenes; avoid per-device 4K PBR sets. Target under ~30–50 MB of texture memory per scene, which is around a fifth of the ~256 MB older-iPhone guideline.
- GLB size: with low-poly geometry, Draco or meshopt compression and few textures, 0.3–1.5 MB per model is realistic; lazy-load each device's GLB on its route, so total site weight matters less than per-page weight. (No source gives a GLB size budget; this is an engineering estimate.) Note that KTX2/Basis textures cut GPU memory but add a transcoder download and had an iOS post-crash rendering bug report on iOS 15–17; for small palette textures, plain PNG/WebP is simpler.
- Lights/shadows: one directional + ambient/environment; baked or `ContactShadows`-style fake shadows instead of real-time shadow maps (also avoids churn from three.js shadow API changes such as the r186 `PCFSoftShadowMap` removal). Polariser/optical-bench transparency: keep overlapping transparent layers few; overdraw is the main fill-rate cost on phones.
- Pixel cost: DPR cap 2 (1.5 fallback), canvas not larger than needed, `frameloop="demand"` so idle cost is zero and animation bursts (rotor step, key press) are short.
- Verification: test on a real ~2022–2023 mid-range Android (e.g. a Snapdragon 6/7-series or Helio G-series device) and an iPhone 12/13-class device in both Safari and the Capacitor WKWebView build; log `renderer.info` (calls, triangles, textures, geometries) per scene and watch for counts that grow after navigation.

### Gaps
- No authoritative, device-specific 2026 benchmark (fps vs triangles/draw calls on named mid-range phones) was found; all budgets are rules of thumb from blogs and forums of varying quality, several undated.
- No source provides a GLB file-size budget; the figure above is an estimate.
- Thermal throttling behaviour over long sessions on phones was not researched.
- WebGL performance parity between Safari and WKWebView on the same iPhone was not confirmed by any source (commonly assumed equal since both use the same WebKit GPU process; UNVERIFIED).
