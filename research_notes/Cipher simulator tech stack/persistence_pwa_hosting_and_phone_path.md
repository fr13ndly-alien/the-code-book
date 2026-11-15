# No-backend persistence, PWA/offline tooling, free static hosting, and the later path to phones (state as of 14 Nov 2026)

Reading conventions used below:
- "Read 2026-11-14" means I opened the page on that date. Where a page shows its own last-modified date, that is given too.
- "Search snippet only" means the fact came from a search-result summary and I did not open the page. Treat it as weaker.
- "UNVERIFIED" means I could not confirm it from a current source in this session. Those items are in the Gaps lists, not in Cited Findings.
- npm versions and dates were read directly from the npm registry JSON on 2026-11-14.

## Client-side persistence: localStorage vs IndexedDB, quotas and eviction (iOS Safari, Android Chrome, Capacitor WKWebView), persist(), export/import

### Takeaway
Progress and settings for this app are a few kilobytes, so quota is not the constraint on any platform; eviction is. In Safari tabs, all script-writable storage (localStorage, IndexedDB, service-worker caches) is deleted after seven days of Safari use without interaction with the site, whereas a Home Screen web app has its own counter and WebKit says it does not expect its first-party data to be deleted. So a user-facing export/import of progress is the only durable backup without a backend.

### Cited Findings

Safari / WebKit eviction and the 7-day cap
- WebKit's ITP post says ITP deletes "all of a website's script-writable storage after seven days of Safari use without user interaction on the site". Only days on which Safari is used count. — [WebKit blog, "Full Third-Party Cookie Blocking and More" (2020, read 2026-11-14)](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)
- Storage types covered by that cap: IndexedDB, LocalStorage, Media keys, SessionStorage, and Service Worker registrations and cache. — [WebKit blog](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)
- Home Screen exemption, in WebKit's words: "Web applications added to the home screen are not part of Safari and thus have their own counter of days of use." The counter matches actual use of the web app, which resets the timer, and WebKit does "not expect the first-party in such a web application to have its website data deleted." — [WebKit blog](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)
- MDN still describes the rule as current: "If an origin has no user interaction, such as click or tap, in the last seven days of browser use, its data created from script will be deleted. Cookies set by server are exempt from this eviction." It applies when cross-site tracking prevention is on (the Safari default). — [MDN, Storage quotas and eviction criteria (last modified 5 Jan 2026, read 2026-11-14)](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- MDN does not say whether installed Home Screen web apps are exempt from the proactive 7-day eviction; the exemption statement comes only from the 2020 WebKit post. — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

Safari / WebKit quotas (Safari 17 / iOS 17 and later)
- "For a browser app, the origin quota is up to 60% of the total disk space." Other apps that display web content get up to 15%. — [WebKit blog, "Updates to Storage Policy" (read 2026-11-14)](https://webkit.org/blog/14403/updates-to-storage-policy/)
- Overall quota across all origins: up to 80% of disk for browser apps, up to 20% for other apps. Exceeding the overall quota can trigger eviction; exceeding the origin quota makes the write fail with QuotaExceededError. — [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/)
- A Home Screen web app "has the same origin quota and overall quota as when it is opened in a browser app." — [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/)
- The policy covers localStorage, Cache API, IndexedDB, Service Worker and File System. Cookies and HTTP cache are outside it. — [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/)
- Eviction is per origin in least-recently-used order, triggered by exceeding overall quota, system storage pressure, or no user interaction "for some time". An origin is skipped if it has an active page or is in persistent mode. Origins default to best-effort mode. — [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/)
- Quota is an upper limit, not a guarantee, and may vary with existing usage and visit frequency (to reduce fingerprinting). — [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/)

navigator.storage.persist()
- WebKit "grants a request based on heuristics like whether the website is opened as a Home Screen Web App." No other heuristics are listed. — [WebKit blog, Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
- "Safari and most Chromium-based browsers, such as Chrome or Edge, automatically approve or deny the request based on the user's history of interaction with the site and do not show any prompts to the user." Firefox shows a permission popup. — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- LRU eviction under storage pressure "only applies to origins that are not persistent and skips over origins that have been granted data persistence by using navigator.storage.persist()". — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

Chrome / Chromium (Android Chrome included)
- "an origin can store up to 60% of the total disk size in both persistent and best-effort modes"; Chrome uses at most 80% of disk in total. Eviction is LRU under storage pressure; MDN lists no time-based eviction for Chromium. — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

localStorage size
- MDN gives two figures on the same page: Web Storage "is limited to 10 MiB of data maximum on all browsers", and "Browsers can store up to 5 MiB of local storage, and 5 MiB of session storage per origin." Past the limit, a QuotaExceededError is thrown. (The two sentences are consistent if 10 MiB is the sum of the two 5 MiB stores, but the page does not say so.) — [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

Capacitor WKWebView / Android WebView
- Capacitor's storage guide: "the OS will reclaim local storage from Web Views if a device is running low on space", and "The same can be said for IndexedDB at least on iOS". Local Storage "must be considered transient". On Android a persisted storage API can mark IndexedDB as persisted. — [Capacitor docs, Storage guide (read 2026-11-14)](https://capacitorjs.com/docs/guides/storage)
- The Preferences plugin "avoids the eviction issues above"; it is a key/value store "meant for small amounts of data" with "no advanced query support". SQLite is recommended for large or high-performance data. — [Capacitor docs, Storage guide](https://capacitorjs.com/docs/guides/storage)
- A Capacitor app is a non-browser app, so under WebKit's policy it falls in the "other apps" class: up to 15% of disk per origin, 20% overall. (The WebKit post does not name WKWebView; MDN words it as "non-browser apps that display web content".) — [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/); [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

Library versions (npm registry, read 2026-11-14)
- idb-keyval 6.3.0, published 2026-07-08. — [npm registry](https://registry.npmjs.org/idb-keyval)
- idb 8.0.4, published 2026-10-06. — [npm registry](https://registry.npmjs.org/idb)
- Dexie 4.4.7, published 2026-10-19. — [npm registry](https://registry.npmjs.org/dexie)
- Zustand 5.1.0, published 2026-11-06. — [npm registry](https://registry.npmjs.org/zustand)
- All four had a release within the last five months, so none looks abandoned. — same registry pages

Conflicting third-party claims
- Several blogs still state a ~50 MB iOS limit for Cache Storage plus IndexedDB (some say only for non-installed tabs), and one says persist() is always denied on iOS. These conflict with WebKit's own Safari 17 policy post. Search snippets only; I did not open them and rate them unreliable. — [MagicBell guide](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide); [love2dev](https://love2dev.com/blog/what-is-the-service-worker-cache-storage-limit); contradicted by [WebKit blog](https://webkit.org/blog/14403/updates-to-storage-policy/)

### Inferences
- Storage choice for progress, settings and puzzle state: the data is tiny and both localStorage and IndexedDB are covered by the same WebKit eviction rules, so neither is "safer" on iOS. localStorage (synchronous, e.g. through Zustand's persist middleware) is enough for a small JSON blob; IndexedDB via idb-keyval is the fallback if saved puzzle state grows or needs to be read from the service worker. Dexie is more than this app needs.
- The realistic data-loss case is a casual Safari-tab user on iPhone who returns after more than seven days of Safari use: progress and the offline cache are both gone. Mitigations, in order of value: (1) an "Export progress" / "Import progress" feature, (2) an install prompt explaining that the Home Screen version keeps progress, (3) calling navigator.storage.persist() after a user gesture, which WebKit is most likely to grant in the Home Screen app.
- Export/import without a backend: serialise the state object to JSON with a schema version and download it as a file (Blob + anchor download), import through a file input. A short copy-paste code (base64 of compressed JSON) or a URL fragment are alternatives for a state this small. These are standard web techniques; I did not fetch a source for them this session.
- Keep the store behind one small interface (get/set/export/import). That makes the later swap to Capacitor Preferences a one-file change.
- Version the stored schema from day one; a chronological tour with ~30–35 stops will gain fields.

### Gaps
- UNVERIFIED for 2026: whether the 7-day cap and its Home Screen exemption behave exactly as the 2020 WebKit post says on iOS 26/27. No WebKit source newer than the 2023 storage-policy post was found, and MDN (Jan 2026) repeats the rule without the exemption detail. A device test is the only way to confirm.
- UNVERIFIED: whether the 7-day ITP cap applies inside a Capacitor WKWebView at all. Capacitor's guide warns only about low-disk reclamation. I found no primary source either way.
- UNVERIFIED: Chrome's exact heuristics for granting persist() on Android (installed PWA, site engagement, notification permission) — MDN only says "history of interaction". No Chrome developer page was opened.
- UNVERIFIED: that a Home Screen web app on iOS has storage separate from the Safari tab for the same origin (so progress made in Safari does not carry into the installed app). This is long-standing behaviour from my background knowledge, not confirmed from a current source. If true, it strengthens the case for export/import.
- Zustand persist middleware details (storage adapters, async IndexedDB adapter, migrate/version options) were not checked against current docs.

## PWA tooling in 2026 and the state of install/capabilities on iOS and Android

### Takeaway
vite-plugin-pwa (2.0.0, Oct 2026, on Workbox 7.4.1) and Serwist (9.5.13, Oct 2026) are both actively released; for Vite or Astro the vite-pwa family is the default, and for Next.js Serwist is the maintained route. Precache the app shell and JS/CSS only, and cache GLB files at runtime per scene, because the precache default excludes files over 2 MiB and precaching 20–60 MB forces every first-time visitor to download everything.

### Cited Findings

Versions and maintenance (npm registry, read 2026-11-14)
- vite-plugin-pwa 2.0.0, published 2026-10-03. — [npm registry](https://registry.npmjs.org/vite-plugin-pwa)
- Its package.json declares peer support for Vite "^3.1.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0", depends on workbox-build and workbox-window "^7.4.1", and requires Node ">=20.19.0". — [vite-plugin-pwa package.json on main](https://raw.githubusercontent.com/vite-pwa/vite-plugin-pwa/main/package.json)
- Release history: v1.0.0 (29 Mar), v1.0.1 added Vite 7 support (30 Jun), v1.2.0 (27 Nov), v1.3.0 added Vite 8 peer support and an onNeedReload client callback (5 May), v2.0.0 (3 Oct) allows @vite-pwa/assets-generator ^2.0.0 as a peer. The releases page shows day and month only; years inferred from the npm dates. — [vite-plugin-pwa releases](https://github.com/vite-pwa/vite-plugin-pwa/releases)
- @vite-pwa/astro 2.0.2, published 2026-11-09. — [npm registry](https://registry.npmjs.org/@vite-pwa/astro)
- workbox-build 7.4.1, published 2026-05-04. — [npm registry](https://registry.npmjs.org/workbox-build)
- serwist, @serwist/next and @serwist/vite are all 9.5.13, published 2026-10-04. — [npm registry: serwist](https://registry.npmjs.org/serwist); [@serwist/next](https://registry.npmjs.org/@serwist/next); [@serwist/vite](https://registry.npmjs.org/@serwist/vite)
- Framework versions for context: Vite 8.3.8 (2026-11-11), Astro 7.4.12 (2026-11-13), Next 16.4.6 (2026-11-09). — [npm registry: vite](https://registry.npmjs.org/vite); [astro](https://registry.npmjs.org/astro); [next](https://registry.npmjs.org/next)

Precaching and large files
- vite-plugin-pwa excludes files over maximumFileSizeToCacheInBytes from the precache manifest; "the default value is 2 MiB". Since v0.20.2 the build throws an error when that size warning is present. The limit is raised under `workbox` (generateSW) or `injectManifest`. — [Vite PWA docs, FAQ (read 2026-11-14)](https://vite-pwa-org.netlify.app/guide/faq)
- web.dev notes the service-worker cache spec defines no capacity rule; each browser decides limits and eviction. Search snippet only. — [web.dev, Storage for the web](https://web.dev/articles/storage-for-the-web)
- On iOS the Cache API shares the WebKit origin quota (up to 60% of disk in Safari and Home Screen web apps) and is deleted by the same 7-day rule in Safari tabs ("Service Worker registrations and cache"). — [WebKit, Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/); [WebKit, ITP post](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)

iOS install
- iOS 26 / iPadOS 26: Safari opens every site added to the Home Screen as a web app by default, unless the user turns off the "Open as Web App" switch when adding it; this applies even to sites without a manifest. Search snippet only. — [iDownloadBlog](https://www.idownloadblog.com/?p=1042117); [MacRumors how-to](https://www.macrumors.com/how-to/save-safari-bookmark-web-app-iphone-home-screen/)
- EU: Apple announced in Feb 2024 that iOS 17.4 would remove Home Screen web apps in the EU, then reversed in March 2024 and kept the existing capability. Search snippet only. — [MacRumors, 1 Mar 2024](https://www.macrumors.com/2024/03/01/apple-walks-back-decision-to-disable-eu-web-apps/)
- Apple's current DMA support page says nothing about Home Screen web apps. It covers alternative browser engines for dedicated browser apps and in-app browsing in the EU. — [Apple, DMA and apps in the EU (read 2026-11-14)](https://developer.apple.com/support/dma-and-apps-in-the-eu/)

### Inferences
- Tool choice follows the framework: Vite SPA → vite-plugin-pwa; Astro → @vite-pwa/astro; Next static export → @serwist/next. All three sit on Workbox-style precache manifests, so the caching design below is the same whichever is picked.
- Caching design for ~11 GLB scenes totalling 20–60 MB:
  - Precache: HTML, JS, CSS, fonts, icons, small images. Keep the 2 MiB default as a guard rather than raising it.
  - Runtime cache: GLB and textures with a CacheFirst route into a named cache, using content-hashed filenames so a changed model gets a new URL.
  - Offer an explicit "Download all scenes for offline use" button that fetches the GLBs into that cache and shows progress and total size, instead of silently pulling 60 MB on install. Check navigator.storage.estimate() first and handle QuotaExceededError.
- 60 MB is far below the documented WebKit and Chromium quotas, so the old "50 MB iOS cap" should not block this design; but it is cheap to verify on a real iPhone before relying on it.
- Update flow: with a prompt-style registration ("new version available — reload"), a user mid-puzzle is not interrupted; the onNeedReload callback added in 1.3.0 is the hook for that. Auto-update is simpler but can swap assets under an open simulation.
- An offline-capable PWA only stays offline-capable on iPhone if it is installed to the Home Screen, since Safari tabs lose the service-worker cache after seven days of non-use. The install hint on iOS has to be a custom in-page instruction (Share → Add to Home Screen).

### Gaps
- vite-plugin-pwa 2.0.0 breaking changes: the release note mentions only the assets-generator peer bump and a README note; I could not extract the breaking-change text. Check the README before upgrading from 1.x.
- UNVERIFIED: Android Chrome install behaviour in 2026 (beforeinstallprompt, WebAPK minting, installability criteria) — no Chrome developer page was opened this session.
- UNVERIFIED: iOS 26 "Open as Web App" default — from secondary news snippets, not from Apple or WebKit release notes.
- UNVERIFIED: any 2025–2026 EU/DMA change to Home Screen web apps (e.g. support for non-WebKit engines). Apple's DMA page is silent; I found no current primary source.
- UNVERIFIED: iOS still lacks a programmatic install prompt (no beforeinstallprompt) and Web Push requires Home Screen installation — background knowledge, not re-checked.
- No current primary source gives a measured Cache API ceiling on iOS; the 60% figure is WebKit's stated upper bound, not a guarantee.
- Workbox's maintenance status beyond "7.4.1 published May 2026" was not investigated (ownership, roadmap).

## Free static hosting: Cloudflare, GitHub Pages, Netlify, Vercel Hobby

### Takeaway
Cloudflare (Pages, or Workers static assets, which share the same 20,000-file and 25 MiB-per-file free limits) is the best fit: static asset requests are free and unlimited with no bandwidth cap listed, so 20–60 MB of GLB cannot run up a quota. GitHub Pages (1 GB site, 100 GB/month soft) is a workable second choice; Netlify's free plan is now a 300-credit budget that equals roughly 15 GB of bandwidth, and that is too thin for 3D assets.

### Cited Findings

Cloudflare Pages (Free plan; read 2026-11-14)
- 500 builds per month; 1 concurrent build per account; builds time out after 20 minutes. — [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- 20,000 files per site; maximum 25 MiB per asset file. — [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- 100 custom domains per project; 100 projects per account; unlimited active preview deployments. — [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- `_headers`: 100 rules, 2,000 characters per header. `_redirects`: 2,000 static + 100 dynamic. — [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- The limits page lists no bandwidth limit. — [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

Cloudflare Workers static assets (Free plan; read 2026-11-14)
- "Requests to static assets are free and unlimited." — [Workers static assets: billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
- Free plan: 20,000 static asset files per Worker version, 25 MiB per file. Paid was raised to 100,000 files in Sept 2025; file size unchanged. Search snippet only. — [Workers limits](https://developers.cloudflare.com/workers/platform/limits); [Cloudflare changelog, 2 Sep 2025](https://developers.cloudflare.com/changelog/2025-09-02-increased-static-asset-limits/)
- Default response header on static assets: `Cache-Control: public, max-age=0, must-revalidate`, plus an ETag that is a hash of the file. — [Workers static assets: headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- A `_headers` file is supported (up to 100 rules, 2,000 characters per line). Cloudflare's own example for fingerprinted files: `/static/*` with `Cache-Control: public, max-age=31556952, immutable`. — [Workers static assets: headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- If `run_worker_first` is used, free-tier users over their Worker request limit get a 429 instead of falling back to static serving. — [Workers static assets: billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)

Cloudflare compression
- "Free Plan: Content is compressed by default using Zstandard." Gzip and Brotli are also supported. — [Cloudflare content compression docs (read 2026-11-14)](https://developers.cloudflare.com/speed/optimization/content/compression/)
- Neither `model/gltf-binary` nor `application/octet-stream` is in Cloudflare's list of content types it compresses; the list covers text formats, JavaScript, JSON, XML, fonts, SVG and `application/wasm`. — [Cloudflare content compression docs](https://developers.cloudflare.com/speed/optimization/content/compression/)

GitHub Pages (read 2026-11-14)
- "Published GitHub Pages sites may be no larger than 1 GB." Source repositories have a recommended limit of 1 GB. — [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- "GitHub Pages sites have a soft bandwidth limit of 100 GB per month." — [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- Soft limit of 10 builds per hour, which does not apply when publishing through a custom GitHub Actions workflow; deployments time out after 10 minutes. — [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- Requests may be rate-limited with HTTP 429. — [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- "GitHub Pages is not intended for or allowed to be used as a free web-hosting service to run your online business"; sites primarily for commercial transactions or commercial SaaS are excluded. — [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

Netlify (Free plan; pricing page read 2026-11-14)
- Free plan has a "300 credit limit". Bandwidth costs 20 credits per GB; each production deploy costs 15 credits; web requests cost 2 credits per 10k. — [Netlify pricing](https://www.netlify.com/pricing/)
- Custom domains with SSL and unlimited deploy previews are included. — [Netlify pricing](https://www.netlify.com/pricing/)
- The page does not state what happens at the limit, whether credits reset monthly, or any commercial-use rule. — [Netlify pricing](https://www.netlify.com/pricing/)

Vercel Hobby (docs last updated 2026-11-12 and 2026-09-16; read 2026-11-14)
- Included per month: first 100 GB Fast Data Transfer, first 1,000,000 CDN requests, 50,000 Web Analytics events. — [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- 200 projects, 50 domains per project, 100 deployments per day. — [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- If a Hobby usage limit is exceeded, "you will have to wait until 30 days have passed before you can use the feature again." — [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- Build step maximum 45 minutes; CLI source upload limit 100 MB on Hobby; 15,000 source files per CLI deployment. — [Vercel limits](https://vercel.com/docs/limits)

### Inferences
- Bandwidth arithmetic, assuming a visitor who downloads every scene (60 MB worst case):
  - Cloudflare: no cap listed.
  - GitHub Pages and Vercel Hobby: 100 GB ≈ 1,600 full downloads per month (≈ 5,000 at 20 MB).
  - Netlify Free: 300 credits ≈ 15 GB ≈ 250 full downloads, before subtracting 15 credits per production deploy. Twenty deploys in a month would use the whole budget with no traffic at all.
- Per-file limit matters more than site size: on Cloudflare every GLB must be under 25 MiB. With ~11 scenes in 20–60 MB the average is 2–6 MB, so this should hold, but a single heavy model (e.g. an Enigma machine) needs watching. Total file count (20,000) is not a concern.
- GLB will not be compressed in transit by Cloudflare (its MIME type is not on the list), so shrink the files at build time instead — geometry and texture compression inside the GLB. Tooling for that (Draco, Meshopt, KTX2 via glTF-Transform) was outside what I verified this session.
- Caching headers: Cloudflare's default is revalidate-on-every-use. Add a `_headers` rule giving content-hashed assets (including GLBs, if the build hashes their filenames) `public, max-age=31536000, immutable`. GitHub Pages does not let you set custom headers (background knowledge, not re-verified), which is one more reason to prefer Cloudflare for large immutable assets.
- Pages versus Workers static assets: free limits are the same for this use. Cloudflare's Pages limits page already points users at Workers static assets for some cases, so starting a new project on Workers static assets avoids a later migration; Pages remains fine if its Git-integrated previews are wanted.
- Non-commercial status: GitHub Pages' restriction targets online businesses, which a free educational tour is not. Cloudflare's and Netlify's pages state no commercial restriction.
- Preview deployments: Cloudflare Pages (unlimited) and Netlify (unlimited deploy previews) list them explicitly.

### Gaps
- Vercel Hobby's non-commercial clause: the fair-use page's "Examples of fair use / Never fair use" sections came back empty in my fetch, so I could not quote the current wording (whether donations or ads count as commercial). UNVERIFIED; background knowledge says Hobby is restricted to personal, non-commercial use.
- Cloudflare: I did not open the full Workers limits page (file limits are from a search snippet) and did not find an explicit Cloudflare statement in this session that Pages is deprecated or in maintenance mode. UNVERIFIED either way.
- Cloudflare's terms on serving large non-HTML files from the free plan (historic "section 2.8" style restriction) were not checked. 3D assets served through Pages/Workers static assets are the product's intended use, but I did not read the current terms.
- Netlify: behaviour at 0 credits (site paused?), monthly reset, and per-file size limits are not on the pricing page. UNVERIFIED.
- GitHub Pages: per-file limit (100 MB Git push limit from background knowledge), custom-header support, and compression behaviour were not verified.
- Vercel: no per-file static asset limit found for Git-based deployments; Brotli behaviour not checked.
- Other free hosts (e.g. Firebase Hosting, Render static sites, GitLab Pages, Codeberg Pages) were not researched.

## Privacy-friendly free analytics with no backend of your own (optional)

### Takeaway
Cloudflare Web Analytics is free, needs only a JavaScript snippet, and works on any host. It is the only option I verified from a primary page.

### Cited Findings
- Cloudflare Web Analytics "provides free, privacy-first analytics for your website" and needs only "a Cloudflare account and a JavaScript snippet". — [Cloudflare Web Analytics docs (read 2026-11-14)](https://developers.cloudflare.com/web-analytics/about/)
- It works "without changing your DNS or using Cloudflare's proxy". — [Cloudflare Web Analytics docs](https://developers.cloudflare.com/web-analytics/about/)
- "Cloudflare Web Analytics does not collect or use your visitors' personal data." The snippet collects metrics using the Performance API. No numeric caps are listed on that page. — [Cloudflare Web Analytics docs](https://developers.cloudflare.com/web-analytics/about/)
- Vercel Hobby includes 50,000 Web Analytics events per month with one month of data; collection pauses when exceeded and can resume after 7 days. Only relevant if hosting on Vercel. — [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)

### Inferences
- If the site is on Cloudflare, Web Analytics adds no new vendor. It reports page views and web vitals, not custom events such as "finished the Vigenère stop", so per-cipher completion rates would need a different tool or would simply go unmeasured.
- A service worker should not cache the analytics beacon, and analytics should fail silently offline and inside a future Capacitor build.

### Gaps
- The Cloudflare page does not say whether cookies or fingerprinting are used. UNVERIFIED (background knowledge says no cookies).
- GoatCounter (free hosted tier for non-commercial use), Umami Cloud free tier, Plausible (paid, no free tier) and others were not researched this session; all UNVERIFIED.
- Whether a cookie-less analytics script needs a consent banner in the EU/UK was not researched.

## Path to phones later: Capacitor, App Store guideline 4.2, PWA as interim, Apple fees, storage inside Capacitor

### Takeaway
An installed PWA is a realistic interim "phone app" for this project, since it already gives offline use and durable storage on the Home Screen. For the App Store later, Capacitor 8 (8.6.2; Capacitor 9 is at release-candidate stage) is the wrapper, costs 99 USD per year with no waiver for individuals, and carries real guideline-4.2 risk. The mitigations to build towards are bundled assets and full offline behaviour, with the plugin count mattering much less.

### Cited Findings

Capacitor versions and requirements
- @capacitor/core latest is 8.6.2, published 2026-11-12; the `next` tag is 9.0.0-rc.0. — [npm registry](https://registry.npmjs.org/@capacitor/core)
- Capacitor 8 requires Xcode 26.0+, supports iOS 15+, requires Node 22+, and uses Swift Package Manager by default for new iOS platforms. Search snippet only. — [Capacitor docs, Updating to 8.0](https://capacitorjs.com/docs/updating/8-0); [Capacitor iOS docs](https://capacitorjs.com/docs/ios)
- Capacitor 9 (pre-release): requires iOS 16.0+ and Xcode 27+, and boots iOS apps from a SwiftUI App struct. Search snippet only. — [Capacitor docs (next), Updating to 9.0](https://capacitorjs.com/docs/next/updating/9-0); [Ionic blog, "Capacitor 9 starts here" (8 May 2026)](https://ionic.io/blog/capacitor-9-starts-here)
- A third-party blog forecasts Capacitor 9 GA for the end of November 2026. Search snippet only; a forecast, not a confirmed date. — [Capgo, Preparing for Capacitor 9](https://capgo.app/blog/preparing-for-capacitor-9/)
- @capacitor/preferences 8.0.1 (2026-02-12); @capacitor/filesystem 8.1.5 (2026-10-15); @capacitor-community/sqlite 8.1.1 (2026-08-06). — [npm registry: preferences](https://registry.npmjs.org/@capacitor/preferences); [filesystem](https://registry.npmjs.org/@capacitor/filesystem); [sqlite](https://registry.npmjs.org/@capacitor-community/sqlite)

Storage inside a Capacitor app
- localStorage "must be considered transient" because the OS reclaims Web View storage when the device is low on space; the same applies to IndexedDB "at least on iOS". — [Capacitor docs, Storage guide](https://capacitorjs.com/docs/guides/storage)
- Recommended instead: Preferences for small key/value data (it "avoids the eviction issues above"), SQLite for large or query-heavy data. — [Capacitor docs, Storage guide](https://capacitorjs.com/docs/guides/storage)

App Store guideline 4.2
- Guideline text: "Your app should include features, content, and UI that elevate it beyond a repackaged website. If your app is not particularly useful, unique, or 'app-like,' it doesn't belong on the App Store." — [Apple App Review Guidelines (read 2026-11-14)](https://developer.apple.com/app-store/review/guidelines/)
- 4.2.2: "Other than catalogs, apps shouldn't primarily be marketing materials, advertisements, web clippings, content aggregators, or a collection of links." — [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- The guidelines' introduction points to the web as the alternative: "If the App Store model and guidelines or alternative distribution and Notarization for iOS and iPadOS apps are not best for your app or business idea that's okay, we provide Safari for a great web experience too." — [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- One documented 2026 case: a Capacitor app (limo booking, with the core booking flow on a third-party web platform) was rejected under 4.2 a second time after adding Core Location, reverse geocoding in a custom Swift plugin, clipboard, share sheet and Apple Maps deep links. The reviewer said the experience was not sufficiently differentiated from web browsing. No Apple staff replied and no outcome is recorded. — [Apple Developer Forums thread 812889 (Jan 2026)](https://developer.apple.com/forums/thread/812889)
- A non-Apple reply in that thread: 4.2 is about what the reviewer experiences, not the plugin list; build the main flow in the app's own UI and describe features in plain language in the App Review notes. Peer opinion. — [Apple Developer Forums thread 812889](https://developer.apple.com/forums/thread/812889)
- Vendor blogs say reviewers notice wrapped apps that show a browser error page in airplane mode, and recommend offline support, device integration and native navigation. These come from companies selling related services; treat as advice, not evidence. Search snippets only. — [Capgo, How to pass App Store review 2026](https://capgo.app/blog/how-to-pass-app-store-review-2026/); [MobiLoud](https://www.mobiloud.com/blog/app-store-review-guidelines-webview-wrapper)

Apple Developer Program cost
- 99 USD per membership year (or local currency). — [Apple Developer Program: what's included (read 2026-11-14)](https://developer.apple.com/programs/whats-included/)
- Fee waivers are only for nonprofits, accredited educational institutions and government entities; the applicant must "Not be an individual, sole proprietor, or single-person business". — [Apple, Fee waivers](https://developer.apple.com/help/account/membership/fee-waivers/)
- Without membership (free "Personal Team"), Xcode can install on your own device with limits: up to 10 App IDs and up to 3 devices, which expire after 7 days, and up to 3 apps per device. Distribution requires membership. — [Apple, Compare memberships (read 2026-11-14)](https://developer.apple.com/support/compare-memberships/)

PWA as interim phone app
- A Home Screen web app gets the same storage quota as Safari, has its own ITP day counter, and is favoured by WebKit's heuristics for persistent storage. — [WebKit, Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/); [WebKit, ITP post](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)

### Inferences
- This app is a better 4.2 candidate than the rejected example. The rejected app's core value lived on a remote third-party website. A cipher tour with all simulations and GLB assets bundled in the binary, running fully offline, with nothing loaded from a URL, is self-contained interactive content rather than a "repackaged website". That is an argument from the guideline text and one forum case, not a demonstrated approval rate.
- Mitigations worth building towards, in rough order of how directly they address the guideline wording: (1) ship all content in the app bundle and work in airplane mode from first launch; (2) no browser chrome, no external links that open in-app, no "open the website" screens; (3) phone-appropriate touch UI for each simulation and safe-area handling; (4) progress stored natively (Preferences); (5) a small number of things that are natural on a phone — haptics on rotor clicks or key presses, share sheet for an enciphered message; (6) plain-language App Review notes stating that content is bundled and offline. I found no source showing reviewers respond to plugin count as such, and one case where adding plugins did not help.
- Design implication now: keep persistence behind an interface and avoid assuming a service worker exists. In Capacitor the assets ship in the bundle, so the PWA layer is unnecessary there and should be switchable off at build time.
- Data migration: a Capacitor app serves from its own local origin, so progress saved on the website will not appear in the app. The export/import feature built for the web doubles as the migration path. (Origin separation is background knowledge, not verified this session.)
- Bundle size: 20–60 MB of GLB inside the app binary is unremarkable for an App Store app.
- Cost for a free app with no waiver: 99 USD per year indefinitely, since the app is removed from sale if membership lapses (the removal consequence is background knowledge, not verified). Android via Capacitor uses the same codebase; Google Play's fee and its testing requirements for new personal accounts were not researched.
- Timing: if the phone build is months away, start on Capacitor 9 once it is GA rather than 8, to avoid an immediate major upgrade (iOS 16+, Xcode 27+, SwiftUI app entry).

### Gaps
- No reliable data on 4.2 approval or rejection rates for Capacitor apps in 2025–2026. Percentages quoted in blogs trace back to other blogs. Evidence here is one forum thread plus vendor advice.
- No example was found of an educational, offline, content-bundled Capacitor app's 4.2 outcome specifically.
- Capacitor 8 and 9 requirement details come from search snippets of official docs; the pages themselves were not opened. Capacitor 9 requirements may change before GA.
- UNVERIFIED: Google Play developer fee (one-time 25 USD from background knowledge) and the closed-testing requirement for new personal accounts.
- UNVERIFIED: whether TestFlight needs paid membership (the compare page's table did not extract cleanly; surrounding text implies distribution of any kind needs membership).
- UNVERIFIED: whether WebGL/three.js performance in WKWebView matches Safari on current iOS. Not researched; worth a device test with the heaviest scene before committing.
- The final 14,000 characters of the App Review Guidelines page (including its last-updated date) were not read.
