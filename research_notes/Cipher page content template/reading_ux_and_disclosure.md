# Reading UX and progressive disclosure for simulator-plus-article pages (phone and desktop)

Researcher notes, compiled 14 November 2026. Scope: evidence and guideline rules for pages that pair one WebGL simulator with an explanatory article in an expandable panel.

Evidence labels used below:
- **[read]** = I fetched and read the source page (directly, or through a reader mirror where the origin blocked automated fetches).
- **[snippet]** = the claim comes from a search-result summary of the source; the page itself was not read in full. Treat wording and numbers as needing a check before they are quoted in a standard.
- **[folk]** = widely repeated, weak or contested evidence.

Access notes: nngroup.com returned HTTP 403 to direct fetches, so NN/g articles were read through a reader mirror (hn.jakechampion.name) and are cited at their canonical nngroup.com URLs. m3.material.io renders client-side and returned no body text, so Material Design 3 numbers come from secondary sources only. The GOV.UK content design guidance has moved to guidance.publishing.service.gov.uk and its sub-pages were not retrieved.

---

## 1. How do people read on the web and on mobile, and what length holds attention?

### Takeaway
People scan rather than read, and the page's formatting decides which scanning pattern they fall into: meaningful, visually distinct subheadings produce the efficient "layer-cake" pattern, while unformatted text produces the lossy F-pattern. Phones do not damage comprehension of short, easy text, but hard text is read more slowly on a phone, so the lever is text difficulty and structure, not a hard word cap; the popular "7 minutes" length figure is a 2013 platform-specific observation, not a target.

### Cited Findings

**Scanning patterns (NN/g eyetracking)**
- NN/g describes four text-scanning patterns, ordered from least to most effective: F-pattern, spotted, layer-cake, commitment. **[read]** — [NN/g, Text Scanning Patterns: Eyetracking Evidence](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- F-pattern: when a page has no subheadings or bullets, users fixate on words at the start of lines and near the top of the page. It is the fallback for unformatted text, and the fix is to add subheadings and bullets. **[read]** — [NN/g, Text Scanning Patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- The F-pattern was first reported by NN/g in 2006; later NN/g work says it still holds on both desktop and mobile, and that it causes readers to miss content purely because of how text flows in a column. **[snippet]** — [NN/g, F-Shaped Pattern of Reading on the Web](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- Spotted pattern: users jump to words that look different (links, bold, bullets, digits, capitals) or that match their task. Recommendations: name links well, style important words, use bulleted lists. **[read]** — [NN/g, Text Scanning Patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- Layer-cake pattern: fixations land mostly on headings and subheadings, with body text read only under the heading the user wants. NN/g calls it "by far the most effective way in which users can scan pages." It requires subheadings that are meaningful and visually distinct from body text. **[read]** — [NN/g, Text Scanning Patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- Commitment pattern (reading nearly every word) occurs when users are highly motivated: studying, following instructions, or confident they are in the right place. It gives the best comprehension at the highest effort. Even for these readers NN/g says to chunk content and avoid walls of text, because "most users will read very little from a wall of text." **[read]** — [NN/g, Text Scanning Patterns](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)

**Comprehension on mobile vs desktop**
- NN/g's 2016 study: 276 participants across four phases (10-person pilot, 30 online, 40 in person, 206 online), 1,629 article readings, multiple-choice comprehension questions after each article. **[read]** — [NN/g, Reading Content on Mobile Devices](https://www.nngroup.com/articles/mobile-content/)
- Result: comprehension on mobile was about 3 percentage points higher than desktop (95% CI 1% to 5%, p = 0.0006), statistically but not practically significant, i.e. no meaningful device penalty. **[read]** — [NN/g, Reading Content on Mobile Devices](https://www.nngroup.com/articles/mobile-content/)
- Test articles: "easy" was about 404 words at about 8th-grade level; "hard" was about 988 words at about 12th-grade level. Hard articles lowered comprehension on both devices (p = 0.0001). **[read]** — [NN/g, Reading Content on Mobile Devices](https://www.nngroup.com/articles/mobile-content/)
- Reading speed: easy articles were read at similar speed on both devices; hard articles took about 30 ms per word longer on mobile (p = 0.01). NN/g reads this as a speed-accuracy trade-off: people slow down on phones to keep comprehension up. **[read]** — [NN/g, Reading Content on Mobile Devices](https://www.nngroup.com/articles/mobile-content/)
- NN/g's recommendations from that study: still keep mobile content brief and prioritised; brevity can be relaxed for general-audience content with informational or entertainment value; sites with highly complex content (scientific, technical) should run their own tests. The study covered linear reading only, not navigation or comparison tasks. **[read]** — [NN/g, Reading Content on Mobile Devices](https://www.nngroup.com/articles/mobile-content/)
- Conflict in the record: an earlier (2011) NN/g article reported a cloze-test replication with 39.18% comprehension on desktop vs 18.93% on a mobile-sized screen ("twice as difficult"). The 2016 study used a different metric and did not reproduce the gap. **[snippet]** — [NN/g, Mobile Content Is Twice as Difficult (2011)](https://www.nngroup.com/articles/mobile-content-is-twice-as-difficult-2011/); superseded for ordinary text by [NN/g 2016](https://www.nngroup.com/articles/mobile-content/)

**Length and attention**
- Medium's 2013 Data Lab post (Mike Sall, "The Optimal Post is 7 Minutes") found average total reading time per post rose with length and peaked at about 7 minutes, then declined. The author cautioned that variance is high and good posts succeed at any length. **[snippet]** — [Medium Data Lab](https://medium.com/data-lab/74b9f41509b)
- The x-axis in that analysis is Medium's *estimated* read time, not measured time, and several marketing sites wrongly converted it to "1,600 to 1,700 words". **[snippet]** — [Critique on Medium](https://medium.com/art-marketing/forget-everything-that-you-read-about-ideal-content-length-3f2235e64d71)
- Chartbeat (vendor data) reports that the most-viewed area of a page is just above the fold, a line where roughly half of readers drop off, and that readers scroll deeper on desktop than on mobile for the same article (Neue Zürcher Zeitung case). **[snippet]** — [Chartbeat blog, Scrolling in the Deep](https://blog.chartbeat.com/?p=3927); [Chartbeat blog, NZZ case](https://blog.chartbeat.com/?p=5910)

**Line length**
- Baymard states the optimal line length for body text is 50 to 75 characters per line, and notes its own 560 px article column yields about 72 characters. **[snippet]** — [Baymard, Line Length Readability](https://baymard.com/blog/line-length-readability)
- WCAG SC 1.4.8 Visual Presentation (Level AAA, so not required for AA) caps line width at 80 characters. **[snippet]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- **[folk]** flag: a research review quoted on Hacker News notes that controlled studies disagree widely on the best line length (from about 40 to 100+ characters) and that line length is not independent of font size and leading. The 50-75 figure is a typographic convention with mixed empirical support, not a measured optimum. **[snippet]** — [Hacker News discussion](https://news.ycombinator.com/item?id=5193835)

### Inferences
- For the cipher articles, the structure matters more than the word count: write so the headings alone tell the story (layer-cake), keep one idea per short paragraph, and style the few key terms and numbers so "spotted" scanners catch them.
- The NN/g "easy" article (about 400 words, grade 8) is the tested condition under which phones show no penalty. A cipher article written at about grade 8 and chunked into sections of a few hundred words stays inside that tested envelope; a 1,000-word grade-12 block is the tested condition that slows phone readers.
- Because about half of visitors may never scroll past the first screen (Chartbeat, vendor data), each article should open with the one-paragraph answer to "what is this cipher and why does it matter" (inverted pyramid), with history and maths further down.
- A sensible standard is "aim for a 3 to 7 minute read, hard ceiling by structure rather than word count", stated as a house convention rather than as an evidence-backed optimum.
- On phones a 16 px-class body font in a full-width column gives roughly 35 to 45 characters per line, which is below Baymard's range but unavoidable; the 50-75 rule is a desktop constraint (cap the article column with `max-width` around 65ch), not a phone target.

### Gaps
- No primary source was retrieved for a minimum body font size. The commonly cited 16 px web minimum and Apple's 17 pt default body size were not verified in this pass; treat them as convention until checked against Apple's Typography HIG page and Material's type scale.
- No evidence was found for an optimal paragraph length in sentences or words. "2 to 4 sentences per paragraph" is folk wisdom consistent with NN/g's chunking advice but not measured.
- The inverted-pyramid recommendation is standard NN/g guidance but the specific NN/g article was not retrieved; cite it only after checking.
- The Medium and Chartbeat primary posts were not read in full. Chartbeat figures are vendor-published and news-site specific; no credible completion-rate data was found for educational explainer content.
- No study was found that measures reading behaviour for text shown next to an interactive simulator specifically.

---

## 2. Progressive disclosure: accordions, side panels and bottom sheets. When to hide content and what it costs

### Takeaway
Hiding content always adds interaction cost and lowers discoverability, so it is justified on small screens and for content most users need only one part of, but not for content users should read in full. Both NN/g and Apple warn against using a bottom sheet for long or prolonged content; a sheet is appropriate when the user needs the background (here, the simulator) while consulting it, which argues for a resizable, nonmodal sheet with a short "peek" summary and a full-height reading state that behaves like a page.

### Cited Findings

**Accordions and hidden content**
- NN/g breaks down the cost of an accordion: scrolling, scanning headings, deciding which to open, targeting the click, and waiting for content, each adding interaction cost. Content hidden under an accordion "may be missed altogether." **[snippet]** — [NN/g, Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/)
- NN/g's desktop position: use accordions only on content-heavy pages where users will not need content under several sections; if users need several sections, show everything even if the page is longer. **[snippet]** — [NN/g, Accordions for Complex Content on Desktops](https://www.nngroup.com/articles/accordions-complex-content/)
- Accordions are better justified on mobile, where space is very restricted. **[snippet]** — [NN/g, Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/)

**Bottom sheets (NN/g)**
- Definition: an overlay anchored to the bottom edge of a mobile screen that shows additional details or actions; a form of progressive disclosure that keeps much of the background visible, so it suits cases where users must refer to the main content while using the sheet. **[read]** — [NN/g, Bottom Sheets: Definition and UX Guidelines](https://www.nngroup.com/articles/bottom-sheet/)
- Modal sheets block the background (usually with a scrim); nonmodal sheets let users keep interacting with the background (example: panning a map while place details stay visible). Expandable sheets often start nonmodal and minimised, then become modal when expanded to full or near-full height. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Use when users need the background while working in the sheet, for extra information or a few contextual controls, and for quick transient interactions. Do not use for information users always need or for lengthy, complex content. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- NN/g says the common claim that bottom sheets improve thumb reachability is largely incorrect, since the middle of the screen is usually easiest to tap. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Guideline: support Back (button or gesture) to dismiss, because sheets, especially full-height ones, look like pages. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Guideline: always include a visible Close (X) button. The grab handle is easy to overlook, swipe-down is ambiguous (it can trigger system panels), and a button supports screen-reader and keyboard users. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Guideline: do not stack bottom sheets, and do not use them to replace ordinary page-to-page navigation. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)
- Guideline: use sheets only for short interactions. Long content in a sheet invites accidental swipe-dismissal. **[read]** — [NN/g, Bottom Sheets](https://www.nngroup.com/articles/bottom-sheet/)

**Sheets (Apple Human Interface Guidelines; page change log last dated March 24, 2026)**
- A sheet "helps people perform a scoped task that's closely related to their current context." On iOS and iPadOS a sheet can be modal or nonmodal; with a nonmodal sheet, people use it to affect the parent view without dismissing it (Notes formatting sheet example). **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- "For complex or prolonged user flows, consider alternatives to sheets," such as a full-screen modal view. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- "Display only one sheet at a time from the main interface." **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- Use a nonmodal view for supplementary items that affect the main task; on iOS and iPadOS a nonmodal sheet is the recommended form. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- Detents: the system defines *large* (fully expanded) and *medium* (about half the fully expanded height); custom detents are allowed. A resizable sheet expands when people scroll its contents or drag the grabber. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- "In an iPhone app, consider supporting the medium detent to allow progressive disclosure of the sheet's content," putting the most relevant items in the medium detent; skip medium if content is more useful at full height. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- "Include a grabber in a resizable sheet." People can drag it or tap it to cycle through detents, and it works with VoiceOver. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- "Support swiping to dismiss a sheet." People expect a vertical swipe to dismiss. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- Button rules: Cancel/Close dismisses; Back is for stepping within a sheet and "isn't intended to dismiss a sheet"; never rely on Done alone. On iOS the Cancel button sits on the leading edge of the top toolbar and Done on the trailing edge. **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- On macOS, Apple says to use a panel rather than a sheet "if people need to repeatedly provide input and observe results." **[read]** — [Apple HIG, Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)

**Material Design 3 (secondary sources only)**
- Material 3 implementations cap bottom-sheet width at 640dp by default (Jetpack Compose `BottomSheetDefaults`, Flutter). **[snippet]** — [Compose BottomSheetDefaults reference](https://composables.com/jetpack-compose/androidx.compose.material3/material3/objects/BottomSheetDefaults/api)
- In Flutter's M3 implementation the drag handle sits at the top of the sheet and stays draggable even when the content below is set not to drag. **[snippet]** — [Flutter bottom_sheet.dart source](https://codebrowser.dev/flutter/flutter/packages/flutter/lib/src/material/bottom_sheet.dart.html)

### Inferences
- Platform conflict worth recording: NN/g says Back should dismiss a sheet; Apple says the in-sheet Back button is not for dismissal and that swipe-down plus Cancel/Close is the dismissal model. For a web page later wrapped for iOS, the compatible reading is: (1) a visible Close button always, (2) swipe-down on the grabber/header collapses the sheet, (3) the browser/hardware Back action collapses an expanded sheet (push a history state on expand), and (4) no in-sheet "Back" label used for dismissal.
- The article is exactly the "lengthy content" both NN/g and Apple say a sheet should not carry. Two ways to reconcile this with the product: (a) treat the fully expanded state as a full-height reading view that behaves like a page (own scroll, Close button, Back support, no accidental swipe-dismiss from mid-article), and treat only the collapsed/medium states as a true sheet; or (b) on phones, put the article in normal page flow below the simulator and use the sheet only for short step-by-step captions. Either satisfies the guidance; a long article in a half-height swipe-dismissable sheet does not.
- The three-state model (peek / medium / large) maps directly onto Apple's detents and onto NN/g's "starts nonmodal, becomes modal when expanded" description: peek and medium nonmodal with the simulator still operable; large effectively a reading page.
- On desktop there is enough width for the article to sit beside the simulator permanently (side panel, open by default). NN/g's accordion logic says do not hide what users are expected to read when space allows, so the desktop default should be panel open, collapsible by choice.
- Inside the article, accordions suit optional depth that only some readers want (maths detail, historical asides, worked examples). The core explanation should not sit behind an expand. Apple's macOS note about panels for "repeatedly provide input and observe results" describes the simulator-plus-explanation loop well and supports a persistent, nonmodal panel.
- A single sheet only: glossary popups or "learn more" content must not open a second sheet on top of the article sheet.

### Gaps
- Material Design 3's own bottom-sheet and side-sheet guideline pages could not be read (client-rendered). Unverified items that need a direct check at m3.material.io: the standard vs modal sheet definitions, drag-handle accessibility requirements, side-sheet widths, and the claim seen in a blog that drag handles need a 48dp touch target.
- No quantitative study was found that measures comprehension or completion for long text inside a bottom sheet versus inline; the guidance against it is expert-review based.
- NN/g's accordion articles were seen through search summaries only; NN/g's separate guidance on "read more" truncation links and on tabs vs accordions was not retrieved.
- No evidence was found on the best default (open vs closed) for a reading panel on first visit.

---

## 3. Layout for simulator plus text: contiguity, sticky visuals, scrollytelling and gesture conflicts

### Takeaway
Learning research strongly supports keeping explanatory words physically close to the visual they explain (spatial contiguity, with medium-to-large effect sizes across several meta-analyses), which favours a visible simulator with adjacent text over text that pushes the simulator off screen. Scroll-driven tricks are the risky way to achieve that: NN/g found scrolljacking disorienting, worst when users must read text during it and worse again on mobile, and embedded pan/drag canvases on phones are a documented scroll trap.

### Cited Findings

**Spatial contiguity (multimedia learning)**
- Mayer's review of multimedia design principles lists spatial contiguity ("place printed words near corresponding part of graphic") as supported in 9 of 9 tests with a median effect size of 0.82. **[snippet]** — [Mayer, Research-Based Principles for Designing Multimedia Instruction (UNH copy)](https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf)
- An independent meta-analysis (Schroeder and Cenkci, 2018) of 58 comparisons (n = 2,426) found an overall effect of g = 0.63 for spatial contiguity / avoiding split attention. **[snippet]** — [catalogue record for the meta-analysis](https://katalog.lib.cas.cz/KNAV/EdsRecord/edsair,edsair.doi...........04cb527aa23bcab8284e6ebdd56359d5)
- Ginns (2006) reported a weighted mean effect of d = 0.85 (95% CI 0.68 to 1.02) for split-attention effects, as cited in Beege et al. 2019. **[snippet]** — [Beege et al., Frontiers in Education 2019](https://doi.org/10.3389/feduc.2019.00086)
- These figures differ because they use different inclusion criteria and metrics (median d vs pooled g); all point the same direction. **[snippet]** — sources above

**Scrollytelling and navigation style**
- McKenna et al. (EuroVis 2017), a 240-participant crowdsourced study of data stories, found that visuals and navigation feedback (for example animated transitions) affected reader engagement, but the level of control (discrete "stepper" vs continuous "scroller") may not. It measured engagement, not comprehension. **[snippet]** — [Visual Narrative Flow, Microsoft Research](https://www.microsoft.com/en-us/research/publication/visual-narrative-flow-exploring-factors-shaping-data-visualization-story-reading-experiences/)
- A 2026 preprint (N = 454, privacy-policy content) found scrollytelling improved engagement, perceived clarity and cognitive load over plain text while matching other formats on comprehension accuracy. Preprint, different content domain. **[snippet]** — [arXiv 2603.04367](https://arxiv.org/abs/2603.04367)

**Scrolljacking (NN/g usability testing)**
- Definition: a pattern that "changes the speed and, sometimes, the direction of scrolling on a web page." **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- Most participants were at least mildly disoriented; some thought the page or their mouse was broken, refreshed, or left. Long scrolljacks were worse than short ones. **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- The worst case was altered scroll rate or direction combined with text the user must read; text that appears and disappears strains working memory. NN/g advises not putting important content inside scrolljacks. **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- Task-oriented users were much less tolerant than exploratory users. **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- Problems were worse on mobile; sites that dropped scrolljacking on mobile gave a better experience. NN/g advises avoiding it on mobile. **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- A persistent (sticky) navigation acted as an escape hatch and reduced disorientation. **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- The article does not report participant numbers. **[read]** — [NN/g, Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)

**Canvas vs page-scroll gesture conflict (closest documented analogue: embedded maps)**
- Google's user studies found many users found small embedded maps on mobile hard to interact with and preferred a larger map; Google introduced "cooperative" gesture handling in which one finger scrolls the page and two fingers pan the map. **[snippet]** — [Google Maps Platform blog, Smart scrolling comes to mobile web maps (2016)](https://mapsplatform.google.com/resources/blog/smart-scrolling-comes-to-mobile-web-maps/)
- Cooperative mode is not a complete fix: Google pairs it with a fullscreen control because in fullscreen one finger always pans the map (no page to scroll). **[snippet]** — [Google Maps Platform blog](https://mapsplatform.google.com/resources/blog/smart-scrolling-comes-to-mobile-web-maps/)
- If content suppresses native scrolling or implements its own, WCAG 2.5.7 Dragging Movements applies to it; native browser scrolling is excluded. **[read]** — [W3C, Understanding SC 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)

### Inferences
- Contiguity argues for one consistent rule: when the reader is reading about a step, the simulator state for that step should be visible at the same time. On desktop this is a side-by-side split (simulator fixed, article scrolling beside it). On a phone it is a pinned simulator at the top with the text region below it (the medium detent), not a long article that scrolls the canvas away.
- Because stepper vs scroller control did not change engagement (McKenna et al.) and scrolljacking is harmful with text (NN/g), explicit "step" controls or tappable links in the article that set the simulator state are a safer way to link text to simulation than scroll-triggered animation. Never alter native scroll speed or direction.
- Contiguity also applies inside the canvas: labels on the 3D model itself (for example rotor names, the current letter path) are better than a legend the reader must match from the article.
- The gesture conflict is structural on phones: a one-finger drag cannot both rotate a 3D model and scroll the page. Options consistent with the map evidence: (1) make the simulator a fixed, non-scrolling region so the page behind it never needs to scroll and one-finger drag belongs to the canvas, while the article scrolls inside its own panel; or (2) if the canvas sits in a scrolling page, give it cooperative handling plus a fullscreen/"interact" mode. Option 1 fits the sheet layout and avoids the cooperative-mode friction.
- The canvas must never be the only thing under the user's thumb with no way to scroll past it; keep a non-canvas grip (header, sheet handle, margins) reachable at all times.
- The NN/g mobile-reading result and the sticky-nav finding both suggest keeping a persistent, minimal top bar (title, back to index) visible in every state as the escape hatch.

### Gaps
- No peer-reviewed study was found that tests a sticky interactive 3D canvas with scrolling or sheet-based text on phones. The recommendations here are extrapolated from multimedia-learning research, map-embed practice and scrolljacking tests.
- The spatial-contiguity sources were seen as search summaries; the effect sizes should be confirmed against the original papers before being quoted. Most underlying studies used static diagrams and printed text, not interactive simulations.
- The Mittenentzwei et al. 2023 slideshow-vs-scrollytelling study (n = 85) reportedly measured comprehension, but its results were not retrieved.
- No source was retrieved for CSS `touch-action` / pointer-event behaviour on canvases (the implementation mechanism for assigning gestures); this is an engineering detail to confirm in MDN.
- How small a 3D canvas can be on a phone before interaction suffers was not found; Google's "users preferred a larger map" is the only data point.

---

## 4. WCAG 2.2 AA and ARIA requirements that shape the template

### Takeaway
The template-shaping AA criteria are: 24 by 24 CSS px minimum targets (44 to 48 as the platform recommendation), a non-drag single-pointer alternative for every custom drag (canvas rotation, sliders, the sheet handle), full keyboard operation with visible and unobscured focus, 4.5:1 text and 3:1 UI contrast, reflow at 320 CSS px, and no orientation lock. The panel should use the disclosure pattern when nonmodal and the modal dialog pattern only when it truly blocks the page.

### Cited Findings

**Pointer and touch**
- SC 2.5.8 Target Size (Minimum), Level AA: targets for pointer input are at least 24 by 24 CSS pixels, with exceptions for spacing (a 24 px circle centred on each undersized target does not intersect another target), an equivalent control elsewhere on the page, inline targets in text, user-agent-controlled targets, and essential presentation. **[read]** — [W3C, Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- The same document points to SC 2.5.5 Target Size (Enhanced, AAA) at 44 by 44 CSS pixels for important controls. **[read]** — [W3C, Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Platform recommendations: Apple's layout guidance calls for a minimum tappable area of 44 by 44 points; Material Design accessibility guidance calls for at least 48 by 48 dp, with 8 dp or more between targets. **[snippet]** — [TetraLogical, Foundations: target sizes](https://tetralogical.com/blog/2022/12/20/foundations-target-size/); [Google Android Accessibility Help, Touch target size](https://support.google.com/accessibility/android/answer/7101858)
- SC 2.5.7 Dragging Movements, Level AA: any functionality that uses dragging "can be achieved by a single pointer without dragging, unless dragging is essential" (or the behaviour is the user agent's and unmodified). **[read]** — [W3C, Understanding SC 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- For 2.5.7, keyboard support alone does not satisfy the criterion, and a swipe or flick cannot be the only alternative; acceptable alternatives are tap/click controls (W3C examples: tap on a slider track, pan buttons on a map, prev/next buttons on a carousel, numeric fields for a colour wheel). **[read]** — [W3C, Understanding SC 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- SC 2.5.1 Pointer Gestures, Level A: functions that use multipoint or path-based gestures must also be operable "with a single pointer without a path-based gesture" unless essential. 2.5.7 covers grab-and-move; 2.5.1 covers gestures where the path or number of fingers matters. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/); [Understanding SC 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)

**Keyboard and focus**
- SC 2.1.1 Keyboard (A): all functionality operable through a keyboard interface. SC 2.1.2 No Keyboard Trap (A): if focus can move into a component by keyboard it can move out by keyboard. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- SC 2.4.3 Focus Order (A): focus order preserves meaning and operability. SC 2.4.7 Focus Visible (AA): a visible keyboard focus indicator. SC 2.4.11 Focus Not Obscured (Minimum) (AA, new in 2.2): a focused component "is not entirely hidden due to author-created content." **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Visual presentation**
- SC 1.4.3 Contrast (Minimum) (AA): text at least 4.5:1; large text at least 3:1. SC 1.4.11 Non-text Contrast (AA): UI components, their states, and required parts of graphics at least 3:1 against adjacent colours. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- SC 1.4.4 Resize Text (AA): text resizable to 200% without loss of content or function. SC 1.4.12 Text Spacing (AA): no loss when users set line height 1.5x, paragraph spacing 2x, letter spacing 0.12x, word spacing 0.16x font size. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- SC 1.4.10 Reflow (AA): content works at 320 CSS px width without two-dimensional scrolling, except content that requires two-dimensional layout. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- SC 1.3.4 Orientation (AA): content is not restricted to portrait or landscape unless essential. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- SC 1.1.1 Non-text Content (A): non-text content has a text alternative serving the equivalent purpose. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Motion**
- SC 2.2.2 Pause, Stop, Hide (A): moving content that starts automatically, lasts more than five seconds and is shown alongside other content needs a pause, stop or hide mechanism. **[read]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- SC 2.3.3 Animation from Interactions is Level AAA (not required at AA): interaction-triggered motion can be disabled unless essential. W3C technique C39 uses the CSS `prefers-reduced-motion` media query to meet it. **[read for the SC; snippet for C39]** — [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/); [W3C Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html)

**ARIA patterns (WAI-ARIA Authoring Practices Guide)**
- Disclosure (show/hide): the control has role `button`; `aria-expanded` is `true` when content is visible and `false` when hidden; `aria-controls` optionally references the content; Enter and Space toggle it. **[read]** — [W3C APG, Disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- Modal dialog: container has `role="dialog"` and `aria-modal="true"`, labelled by `aria-labelledby` (visible title) or `aria-label`; Tab and Shift+Tab cycle within the dialog; Escape closes it; on close, focus returns to the invoking element. **[read]** — [W3C APG, Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- For dialogs with long or structured content, APG advises focusing a static element at the top (title or first paragraph with `tabindex="-1"`) so the start of the content is not scrolled out of view, and omitting `aria-describedby`. **[read]** — [W3C APG, Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- APG: mark a dialog modal only when code actually blocks interaction outside it and styling obscures the outside content; otherwise assistive-technology users may be cut off from content that is in fact reachable. **[read]** — [W3C APG, Dialog (Modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

### Inferences
- Target size standard for the template: 44 by 44 CSS px for every primary control (meets Apple's 44 pt for the iOS wrapper, and the WCAG AAA figure), with 24 by 24 as the absolute floor for dense secondary controls, spaced at least 8 px apart. Inline links in article text are exempt from 2.5.8.
- 2.5.7 applies to three things on these pages, by inference from the criterion's scope (the W3C page does not name them): drag-to-rotate on the 3D canvas, any drag-operated simulator parts (rotors, sliders, discs), and a custom draggable sheet handle. Each needs a tap alternative: view/rotate buttons or preset camera angles; step/plus-minus buttons or tap-to-set for rotors and sliders; and a sheet handle that toggles detents on tap (which is also what Apple's grabber does). Pinch-zoom on the canvas needs plus/minus buttons under 2.5.1.
- Semantics by state: the peek and medium sheet states and the desktop side panel are nonmodal, so use a disclosure button (`aria-expanded`) controlling a labelled region, with no focus trap and no `aria-modal`. Only a full-height state that truly covers and blocks the simulator should become a modal dialog with focus containment, Escape to close, and focus returned to the toggle. Mislabelling a nonmodal sheet as modal is the specific error APG warns about.
- 2.4.11 is a live risk with a bottom sheet and a pinned canvas: a focused control in the page can sit entirely behind the sheet. The layout must reserve space (scroll padding) so focused items are never fully covered.
- The WebGL canvas is opaque to assistive technology, so 1.1.1 and 2.1.1 imply: a text alternative describing what the simulator shows, simulator state changes exposed as text (for example the current input and output letters in a live region), and every simulator function reachable through real HTML controls outside the canvas.
- Reflow and resize: the article panel must reflow at 320 px and survive 200% text zoom; the canvas itself can claim the two-dimensional-content exception, but its controls cannot. Do not lock the wrapped iOS app to portrait unless that can be argued as essential.
- Reduced motion is AAA under WCAG, so it is not strictly required for AA, but honouring `prefers-reduced-motion` (no auto-rotating model, instant rather than animated sheet and step transitions) is low cost and should be in the standard. Any idle auto-rotation longer than five seconds needs a pause control under 2.2.2 (Level A).

### Gaps
- The APG Tabs pattern and the non-modal dialog guidance were not retrieved; if the article uses tabs, the roles (`tablist`/`tab`/`tabpanel`) and arrow-key behaviour need to be taken from the APG Tabs page directly.
- SC 2.4.13 Focus Appearance (AAA) and SC 1.4.13 details were not examined beyond the summary; exact focus-indicator sizing is unverified.
- SC 4.1.2 Name, Role, Value normative text was not read (the fetched copy of the spec was truncated before it).
- Apple's and Material's target-size figures were confirmed through secondary accessibility sources, not the vendors' own pages.
- No authoritative guidance was found on making WebGL/3D simulators accessible beyond general WCAG criteria.
- iOS App Store or Apple accessibility-review requirements for the wrapped app were out of scope and not researched.

---

## 5. Typography and tone for a general audience

### Takeaway
Government plain-language standards converge on a lower-secondary reading level for general audiences (about US grade 8; GOV.UK works to a reading age of about 9), short sentences (GOV.UK's long-standing 25-word limit), common words and descriptive headings. These are well-established content-design conventions rather than experimentally tuned numbers, and the primary GOV.UK pages could not be read in this pass.

### Cited Findings
- UK public-sector guidance attributes a target reading age of 9 to the Government Digital Service standard used for GOV.UK content, and stresses that this is not the same as writing for a 9-year-old. **[snippet, secondary]** — [Surrey County Council, Reading levels for web pages](https://www.surreycc.gov.uk/website/writing-guide/reading-levels-for-web-pages)
- GOV.UK-derived guidance explains the "common words" basis: by age 9 readers have built a primary vocabulary of about 5,000 common words and a secondary set of about 10,000, and they recognise these words by shape rather than reading letter by letter, which makes reading faster. **[snippet, secondary]** — [Oxfordshire County Council, How people read](https://schools.oxfordshire.gov.uk/design-and-content-guidelines/how-people-read)
- GOV.UK's 2014 post sets a 25-word sentence limit: if a sentence is longer than 25 words, break it up or condense it. The post now carries a notice that it may be out of date. **[snippet]** — [Inside GOV.UK, Sentence length: why 25 words is our limit](https://insidegovuk.blog.gov.uk/2014/08/04/sentence-length-why-25-words-is-our-limit/)
- The GOV.UK writing guidance has moved to a new site and is organised into eight topics: meeting user needs, clear structure, clear language, right tone, effective links, clear titles, clear summaries, and change notes. **[read, landing page only]** — [GOV.UK publishing guidance, Writing guidelines](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/)
- US practice: California's state design hub and New York City's content guidance both set a target of 8th-grade reading level or lower for public content; other bodies range from 5th grade (Chicago) to 10th grade (Oregon). The federal Plain Writing Act of 2010 does not specify a grade level. Massachusetts cautions that grade levels are blunt instruments. **[snippet]** — [California ODI, Write in plain language](https://hub.innovation.ca.gov/content-design/principles/write-in-plain-language); [NYC Blueprint, Plain language and readability](https://blueprint.cityofnewyork.us/content/plain-language-and-readability/); [Mass.gov starter kit](https://www.mass.gov/info-details/starter-kit-creating-plain-language-content)
- Supporting data point from section 1: NN/g's tested "easy" text was about 8th-grade level and showed no comprehension penalty on phones, while 12th-grade text slowed mobile readers. **[read]** — [NN/g, Reading Content on Mobile Devices](https://www.nngroup.com/articles/mobile-content/)

### Inferences
- A workable house standard: target about US grade 8 (Flesch-Kincaid) for body text, sentences averaging 15 to 20 words with a 25-word ceiling, technical terms (for example "polyalphabetic", "key space") defined in plain words on first use, and one idea per paragraph. The grade-8 target has two independent supports: government practice and the NN/g mobile result.
- Readability formulas penalise unavoidable cryptography vocabulary. Apply the grade target to the surrounding prose and manage jargon through first-use definitions rather than by avoiding the terms.
- Headings should be descriptive statements or questions that work when read alone (supports layer-cake scanning from section 1), in sentence case.
- Tone: direct, second person, active voice, no assumed prior knowledge. This follows the direction of plain-language guidance generally; the specific GOV.UK tone rules were not read.

### Gaps
- The current GOV.UK primary pages on clear language, structure, titles and tone were not retrieved, so the reading-age, vocabulary and sentence-length figures rest on secondary council pages and a 2014 blog post flagged as possibly out of date. Check the live "Use clear language" page before citing GOV.UK as the authority.
- plainlanguage.gov / digital.gov federal guidelines were not retrieved.
- WCAG SC 3.1.5 Reading Level (AAA, lower secondary education level) is the formal accessibility hook for a reading-level target, but its text was not read in this pass.
- No evidence was found on font choice (serif vs sans), line height, or minimum body size for educational text on phones; any numeric typography rule beyond line length is convention pending a primary source.
- No research was found on tone specifically for popular-science or cryptography explainers.
