# Exemplar page structures: interactive explainers and cipher teaching sites

Research date: 14 November 2026. Method note: structural figures (word counts, demo counts, words-before-first-interactive) were obtained by fetching each page as text and estimating; they are approximations (roughly +/-15%), not exact counts. Interactive counts are inferred from textual cues ("in the demonstration below", sliders) because the fetch strips canvases. Several target sites could not be fetched (see Gaps in each section); nothing about them is asserted as fact.

## 1. How do acclaimed explorable explanations structure a page?

### Takeaway
The recurring pattern is: a 1-3 sentence plain-language hook, a manipulable "whole thing" within the first 35-110 words, then a long chain of small single-idea sections (each paragraph-demo-paragraph) that builds from the simplest component to the full system, closing with a short "Further reading" list and a brief reflective "Final words"/"Wrapping up" (often preceded by a sandbox). History is used as light framing at the top and tail, not as a section of its own.

### Cited Findings

Comparative table (all figures approximate, from direct fetch of each page):

| Page | Total words | Named sections | Words before first interactive | First interactive | No. of interactives | Ending |
|---|---|---|---|---|---|---|
| Ciechanowski, "Mechanical Watch" (2022) | ~8,000 | 13 + untitled intro | ~90 | Draggable 3D model of the whole movement with a slider to look inside | ~35-40 | "Further Watching and Reading" (2 items) then "Final Words" |
| Ciechanowski, "GPS" | ~7,000-7,500 | 15 | ~70 | Draggable 3D view of the live satellite constellation | ~40-45 | "Further Watching and Reading" (3 items) then "Final Words" |
| Red Blob Games, "Introduction to A*" | ~2,500-3,000 | 7 + title | ~35 | Drag start/end markers, path recomputes live | ~10-12 | "More" (practical guidance, limits), then links/comments |
| Nicky Case & Vi Hart, "Parable of the Polygons" | ~1,300-1,400 | No formal headings until "WRAPPING UP" | ~110 | Drag-and-drop puzzle with a goal | ~7 | Sandbox, then "Wrapping up" with 3 numbered takeaways, then credits/further reading |
| Bret Victor, "Explorable Explanations" (essay) | ~2,300 | 4 | n/a (inline reactive text) | Reactive document | few | "What to do?" |

- "Mechanical Watch": ~8,000 words; sections in order are (intro), Power, Gears, Escapement, Balance, Mainplate, Click, Motion Works, Date, Keyless Works, Automatic Winding, The Size of it All, Further Watching and Reading, Final Words. Section names are one- or two-word component names, and the order follows the flow of energy through the device. — [ciechanow.ski/mechanical-watch](https://ciechanow.ski/mechanical-watch/)
- "Mechanical Watch" opens with a contrast hook (hard to believe that a few decades ago a mechanical watch was the most convenient way to tell the time) and puts the whole object, as a draggable 3D model with an "open it up" slider, after about 90 words. History appears only in the intro framing and in "Final Words" (1970s quartz displacement). "Final Words" ends with a value judgement (mastery of engineering) and a Patreon request. — [ciechanow.ski/mechanical-watch](https://ciechanow.ski/mechanical-watch/)
- "GPS": ~7,000-7,500 words, 15 sections: Simple Positioning, Time of Flight, Do you hear me?, Do I hear you?, Leveling Up, Higher Better Faster Stronger, Orbits, GPS Orbits, Keplerian Elements, Time, Signal Propagation, Navigation Message, GPS Signals, Further Watching and Reading, Final Words. First interactive after ~70 words. It starts from a toy 2D problem and re-derives the system rather than telling the development history; there is no chronological history section. — [ciechanow.ski/gps](https://ciechanow.ski/gps/)
- Red Blob Games A*: first interactive after ~35 words, and the prose sentence immediately before it is the instruction ("Move the blob (start point) and cross (end point) to see the shortest path found by the A* Algorithm"). The page shows the finished result first, then rebuilds it from the simplest algorithm (Representing the map, Breadth First Search, Early exit, Movement costs, Heuristic search, The A* algorithm, More). — [redblobgames.com](https://www.redblobgames.com/pathfinding/a-star/introduction.html)
- "Parable of the Polygons" opens with a one-line thesis ("This is a story of how harmless choices can make a harmful world."). Its first interactive is a goal-directed task with a one-line instruction ("drag & drop unhappy polygons until nobody is unhappy:"). Sequence: hand-played puzzle, automated simulation, slider, variations, puzzle, final sandbox, "Wrapping up" with three numbered takeaways and a call to action, then credits and further reading (Schelling 1971). — [ncase.me/polygons](https://ncase.me/polygons/)
- Bret Victor defines an "active reader" as one who asks questions, considers alternatives and questions assumptions, and names three techniques: reactive documents (reader plays with the author's assumptions and sees consequences), explorable examples (make the abstract concrete to build intuition), contextual information (related material available in place to check claims). He stresses that such a document "can be read like normal text"; interaction is for readers who want to "go deeper", and the author should guide rather than drop the reader into a sandbox. Goal: text as "an environment to think in". — [worrydream.com/ExplorableExplanations](https://worrydream.com/ExplorableExplanations/)
- Victor's 2024 postscript says "explorable explanation" has been used too loosely; he meant arguments backed by editable models. — [worrydream.com/ExplorableExplanations](https://worrydream.com/ExplorableExplanations/)
- Nicky Case's design patterns for explorables: "Do & Show & Tell" ("Use interactivity only when interactivity works best"; text for abstract concepts, animation for timing, interactives for processes); an interest curve ("Start with a hook", build, conclude); "Start small, build big" (teach each mechanic in isolation then combine); "See, Model, Apply" (let the explorer generate their own data points, then set problems from explicit tasks to optional challenges); cognitive gates (withhold content until the prerequisite is grasped); author-guided and player-driven balance; design for different player types (achievers get embedded problems, explorers get sandboxes); playtest with real people ("Earth, A Primer" added gating after people skimmed and got confused); ending with a sandbox ("Earth, A Primer ends with a sandbox"). — [blog.ncase.me/explorable-explanations](https://blog.ncase.me/explorable-explanations/)

### Inferences
- The "whole object first, then take it apart" opening (Ciechanowski's 3D watch, Red Blob's working pathfinder) maps directly onto a cipher page: show the complete device as a manipulable 3D model within the first ~100 words, before any explanation.
- Two opening interaction styles exist: free manipulation with an instant visible result (Ciechanowski, Red Blob) and a goal-directed micro-task (Case). Both put a one-sentence imperative instruction directly above the interactive. For a cipher, "type your name and watch it encrypt" is the equivalent minimal first interaction.
- Section granularity in the best long pieces is roughly 500-600 words and 3 interactives per section (8,000 words / 14 sections / ~38 demos for "Mechanical Watch"), i.e. about one interactive per 200 words. Red Blob runs at about one per 250 words. A cipher page far shorter than Ciechanowski (e.g. 1,200-2,000 words) would on that ratio carry roughly 5-10 interactive states, which can be one simulator shown in several preset configurations rather than many separate widgets.
- Headings in exemplars are short noun labels (component or concept names), not questions. History is never the first long block; it frames the hook and returns at the end.
- The consistent ending is two-part: resources (2-3 curated items, not a bibliography) and a short reflective paragraph on why the thing matters. Case adds a sandbox before the wrap-up and numbered takeaways.

### Gaps
- Distill.pub article structure (other than the Hohman et al. article, covered in section 3), The Pudding, Brilliant.org lessons and 3Blue1Brown narrative were not fetched or analysed in this pass; no structural figures for them are available here. Unverified recollection only: Brilliant lessons are sequences of short screens alternating one idea with one answer-required question, and 3Blue1Brown videos typically open with a concrete puzzle before the general theory. Treat these as hypotheses to check, not findings.
- Interactive counts are inferred from text cues, not counted in a browser.
- No reader analytics are published for any of these pages, so "acclaimed" is reputational, not measured.

## 2. How do existing cipher sites structure a cipher page?

### Takeaway
Existing cipher sites split into three types, none of which combines story, visible mechanism and a tool: converter tools (dCode, Cryptii, CrypTool-Online) put the tool first and treat explanation as an FAQ or a one-line blurb; reference archives (Crypto Museum) are object-centred and exhaustive but written for enthusiasts with no interactivity; courses (Khan Academy) sequence video then exploration then challenge across separate pages. The gap is a single page that does all three for a general reader.

### Cited Findings
- dCode Caesar page: tool first (decoder with brute force, then encoder), followed by a 14-question FAQ used as the explanatory structure, in order: What is the Caesar cipher?, How to encrypt?, How to decrypt?, How to recognize the ciphertext?, How to decipher without knowing the shift?, Is it secure?, variants, digits, Why is it called the Caesar cipher?, What is the Augustan cipher?, other names, worked example, pseudocode, When was it invented?. About 1,300-1,600 words of FAQ prose. History (Suetonius citation) sits at the very bottom; breaking methods (brute force of 25 shifts, frequency analysis, index of coincidence) are covered in text only. Ends with source code, citation block, similar pages, donation requests. — [dcode.fr/caesar-cipher](https://www.dcode.fr/caesar-cipher)
- Cryptii Enigma page: one heading and about 37 words of introduction (WWII role, Turing), plus ~29 words of footer about the app; no explanation of rotors, plugboard or wiring in the text, and the only related-cipher link is "Enigma Tirpitz". It is a configurable encoder, not an explanation. — [cryptii.com/pipes/enigma-machine](https://cryptii.com/pipes/enigma-machine)
- CrypTool-Online Caesar page: static text retrieved consists of a title, a ~7-word description ("Famous shifting cipher used by Julius Caesar") and a "Readme" tab label; the tool and any explanation are JavaScript-rendered and were not retrievable, so a no-JS or crawler view of the page is nearly empty. — [cryptool.org/en/cto/caesar](https://www.cryptool.org/en/cto/caesar/)
- Crypto Museum, Enigma I page: ~3,000-3,500 words in 25 sections ordered: introduction, Features, Principle, Animation, History, Rotors (Stepping), Extra rotors IV and V, Possible settings (placeholder "..." only), Interior, Lamp test, Steckerbrett, Cable test, Key setting, Storage cases, Zur Beachtung, Accessories, Wiring, Specifications, Options, Nomenclature, Known serial numbers, Literature, References, Further information, Other websites. Opens with a factual identification paragraph (developed 1927-29, introduced 1930, based on Enigma K chassis). Heavily photographic (dozens of thumbnails, galleries); the only motion is an externally hosted YouTube animation; includes rotor wiring tables and serial number tables. Dense with untranslated German terms (Steckerbrett, Umkehrwalze, Grundstellung, Ringstellung), some used before they are defined; typos present. — [cryptomuseum.com](https://www.cryptomuseum.com/crypto/enigma/i/index.htm)
- Khan Academy "Journey into cryptography": third-party listings describe a multi-segment course beginning with "Ancient cryptography" (videos such as "What is cryptography?", "The Caesar cipher", "Polyalphabetic cipher", "The one-time pad"), followed by a "Ciphers" segment of exercises and a "Cryptography challenge 101" with graded levels. — [opencourser.com listing](https://opencourser.com/course/eyhpy2/journey-into-cryptography); [archived Khan Academy page](https://webarchive.library.unt.edu/web/20160706105804mp_/https://www.khanacademy.org/computing/computer-science)

Comparison for a general reader:

| Site | Order on page | Explanation length | History | "How it was broken" | Interactive | Main weakness for a general reader |
|---|---|---|---|---|---|---|
| dCode | Tool, then FAQ | ~1,300-1,600 words | Yes, at bottom | Text only; tool auto-solves | Converter (black box) | SEO-FAQ order, no narrative, mechanism not visible |
| Cryptii | Short blurb, tool | ~37 words | One sentence | None | Configurable encoder | No explanation at all |
| CrypTool-Online | Title, tool, Readme tab | Not retrievable | Not retrievable | Not retrievable | Tool | Content hidden behind tabs/JS |
| Crypto Museum | Identification, features, principle, history, parts, tables, references | ~3,000-3,500 words | Yes, detailed | Not a section on this page | None (photos, linked video) | Specialist vocabulary, catalogue ordering, no hands-on |
| Khan Academy | Video, exploration, challenge (separate pages) | n/a | In videos | In later lessons | Explorations/challenges | Could not be verified directly; split across many pages |

### Inferences
- What the converters do well and is worth keeping: zero-friction input (type and see output immediately), sensible defaults, and (dCode) a "how to recognise" and "how to break without the key" question set that general readers genuinely ask. What they do badly: the mechanism is a black box, history is an afterthought, and there is no page narrative.
- What Crypto Museum does well: it is object-centred (the physical device, its parts, variants, photos, provenance) and authoritative with references. What it does badly for a general reader: catalogue ordering (features and specifications before story), undefined jargon, no interaction. The V&A guidance in section 4 (unexplained specialist words make readers stop) applies directly.
- dCode's FAQ list is effectively an empirically derived list of reader questions (search-driven). Reordered into a narrative it gives a candidate section set: what it is, how to encrypt, how to decrypt, how to break it, is it secure, variants, why the name/who used it.
- No surveyed cipher page puts a visible-mechanism simulator, the human story and the cryptanalysis on a single page. That combination is the differentiator.

### Gaps
- Practical Cryptography (practicalcryptography.com) refused connections (ECONNREFUSED) on the research date; structure not analysed and current availability is uncertain. Unverified recollection: its cipher pages ran Introduction, The Algorithm, JavaScript Example, Cryptanalysis, References.
- Khan Academy pages returned a load error to the fetch tool; the lesson order above rests on third-party aggregator listings, and specific exploration titles could not be confirmed.
- Bletchley Park and The National Museum of Computing online exhibits were not fetched; no findings.
- Online Enigma simulators with visible wiring were not successfully analysed (an Observable notebook returned HTTP 429). No sourced findings on where they place the wiring view relative to text.
- CrypTool-Online's Readme content could not be read, so its explanatory depth is unknown.

## 3. What published guidance exists on designing explorable explanations and interactive articles?

### Takeaway
The evidence consistently says most readers scroll but do not click, so the page must be complete when read statically, with interaction as a visible, optional, high-payoff layer rather than a gate. Prompts that ask readers to predict or self-test before a reveal have the best learning evidence.

### Cited Findings
- Archie Tse (NYT Deputy Graphics Director), Malofiej 2016, "Why We Are Doing Fewer Interactives". Slides state that steppers, tabs and sliders were "often just a way for the reader to see more stuff", "but readers weren't getting to all of the content", and "Readers just want to scroll." His "3 rules for visual storytelling (2016 edition)": "1. If you make the reader click or do anything other than scroll, something spectacular has to happen. 2. If you make a tooltip or rollover, assume no one will ever see it. If content is important for readers to see, don't hide it. 3. When deciding whether to make something interactive, remember that getting it to work on all platforms is expensive." Consequences listed: "Most visuals are static", "We are writing and editing a lot more text", "If animation or motion is needed, try to trigger it when user scrolls", "We still do interactives, but the bar is now VERY high." — [Tse slides (PDF, GitHub)](https://github.com/archietse/malofiej-2016/blob/master/tse-malofiej-2016-slides.pdf); secondary coverage [Garcia Media](https://garciamedia.com/?p=2509)
- Gregor Aisch (NYT) is the origin of the widely quoted figure that about 85% of readers did not click a prominent button, i.e. about 15% did; it was measured on a couple of NYT graphics published in 2015. Aisch clarified that the 85% "didn't ignore the graphic, they just didn't click the button", and that "15% of readers aren't nobody". His stated lesson: you "should not hide important content behind interactions"; interactivity should be an extra layer for interested readers on top of a static version that works alone; uses that earn their place include tooltips for verification and sliders that let readers test the author's model ("Interaction, transparency, trust"). — [vis4.net, "In Defense of Interactive Graphics"](http://www.vis4.net/blog/in-defense-of-interactive-graphics/); [FlowingData](https://flowingdata.com/2017/04/05/interactive-visualization-is-still-alive/)
- Hohman, Conlen, Heer and Chau, "Communicating with Interactive Articles" (Distill, 2020) names five affordances: connecting people and data; making systems playful (sandboxes/simulations); prompting self-reflection (predictions, quizzes); personalizing reading; reducing cognitive load (details on demand). — [Distill](https://distill.pub/2020/communicating-with-interactive-articles/)
- Same article: the NYT is "one of the few available data points", reporting that "only a fraction of readers interact with non-static content"; other research found readers, including on mobile, want interactivity "when it is a core part of the article's message"; "Not everything needs to be interactive." — [Distill](https://distill.pub/2020/communicating-with-interactive-articles/)
- Same article, evidence cited: McKenna et al. (2017) found readers largely preferred stepper or scroller layouts to static, with no significant engagement difference between the two; Zhi et al. (2019) found better comprehension with slideshow layouts than vertical scroll; Kim, Reinecke and Hullman (2017) found that having readers predict before revealing data improves recall; quizzes improve later recall (Roediger and Karpicke 2006) and feedback strengthens the effect (Bangert-Drowns et al. 1991); "Learners perform better when information is segmented". These layout studies were desktop-only. — [Distill](https://distill.pub/2020/communicating-with-interactive-articles/)
- Same article, costs: authoring is "closer to building a website than writing a blog post"; web technology changes break interactives, so archiving matters; articles must work across devices, screen sizes and bandwidths; accessibility is "an open challenge"; empirical evaluation is limited because publishers rarely share metrics. — [Distill](https://distill.pub/2020/communicating-with-interactive-articles/)
- Conlen, Kale and Heer (EuroVis 2019), "Capture & Analysis of Active Reading Behaviors for Interactive Articles on the Web", instrumented three Idyll articles and collected over 50,000 reader sessions, comparing desktop and mobile behaviour. — [UW Interactive Data Lab](https://idl.uw.edu/papers/idyll-analytics); [Eurographics DL](https://diglib.eg.org/handle/10.1111/cgf13720)
- Victor and Case (section 1) agree on the same constraint from the authoring side: the document "can be read like normal text" and "Use interactivity only when interactivity works best". — [worrydream.com](https://worrydream.com/ExplorableExplanations/); [blog.ncase.me](https://blog.ncase.me/explorable-explanations/)

### Inferences
- Design rule for the template: every interactive needs a meaningful default state that already shows the point (a pre-filled message, already encrypted, wiring already lit), so the ~85% who never touch it still get the content from the static frame plus caption.
- Nothing essential should be behind a tab, tooltip, accordion or "click to reveal". This argues against tabbed layouts (as on CrypTool-Online) for core sections; collapsed "dig deeper" blocks are acceptable only for optional depth.
- The one place a click is justified is where "something spectacular" happens: pressing a key on the machine and watching the current path and rotor step. That is the single flagship interactive per page; other visuals can be static or scroll-triggered.
- A "predict, then reveal" prompt before the cryptanalysis section (for example, "which letter do you think is E?") and a short end-of-page challenge with feedback are the interaction types with direct learning evidence.
- Segmenting into short titled sections is supported by the segmentation finding and matches exemplar practice in section 1.
- With ~30 pages to build and maintain, Tse's rule 3 (cross-platform cost) and Distill's bit-rot point argue for one reusable simulator shell and a fixed page template rather than bespoke widgets per page.

### Gaps
- The specific quantitative results of Conlen, Kale and Heer (share of readers interacting, mobile vs desktop differences, scroll completion) were not retrieved; only the abstract was accessible. The PDF is at https://idl.cs.washington.edu/files/2019-IdyllAnalytics-EuroVis.pdf and should be read before citing numbers.
- The 85%/15% figure comes from a small number of 2015 NYT graphics, reported via blog posts, not a published dataset; it should be cited as indicative only.
- No scrollytelling study on mobile was found; Distill notes mobile needs more research.
- No study was found that measures learning from explorables specifically about ciphers or mechanical devices.

## 4. What does museum exhibit label guidance recommend for object-centred interpretation?

### Takeaway
V&A guidance prescribes a strict layered hierarchy with hard word limits (intro 150-180 words, section 130-150, object label 50-60), inverted-pyramid ordering with the key message in a first sentence of at most 16 words, and each text block able to stand alone because readers skim and arrive in any order.

### Cited Findings
All from the V&A's "Writing Gallery Text at the V&A: A Ten Point Guide" (originally by Lucy Trench, 2007; updated 2013; revised and reissued 2018), text extracted from the PDF. — [V&A guide, 2018 edition (PDF)](https://thegardenstrust.org/wp-content/uploads/2020/09/VA_Gallery-Text-Writing-Guidelines_online_Web.pdf)
- The ten points: 01 Know your audience; 02 Write as you would speak; 03 Be active not passive; 04 Keep it short and snappy; 05 Organise your information; 06 Engage with the object; 07 Bring in the human element; 08 Sketch in the background; 09 Admit uncertainty; 10 Remember Orwell's Six Rules. They are grouped under Inviting (1-4), Illuminating (5-8), Intriguing (9-10).
- Standard V&A text hierarchy with recommended word counts: A. Intro panel 150-180 words; B. Section panel 130-150 words; C. Standard object label 50-60 words with caption; D. Group label 70-80 words. Exceptionally, longer captions of 80-100 words have been used (Leonardo exhibition, 2006-7), with the rest of the hierarchy adjusted.
- "The principle of short texts is non-negotiable. Visitors have come to look at objects, not to read books on the wall." Word limits "don't restrict the amount of information that most visitors absorb. Instead, they increase it." Deeper material belongs in other layers (catalogue, web) that visitors read sitting down.
- Sentence rules: the first sentence of a label or panel is "ideally ... no more than 16 words long"; "one idea per sentence and one subject per paragraph"; vary later sentence lengths for rhythm.
- Structure: for every text define Message ("When people have read this they will know..."), Topic and Theme. Use an inverted pyramid: topic and key message first, then themes and supporting stories, then detail and provenance; "visitors need the conclusion immediately and the background afterwards". Big ideas go in the intro panel, medium ones in section panels, small ones in object labels.
- Reader model: "paddlers, swimmers and divers". Paddlers read only top-line text; swimmers read some panels and labels; divers read everything. Every text "should also work as an independent point which would make sense if it is the only thing a visitor reads", because visitors read only parts and in an order the author cannot control. "People remember ideas not facts."
- The Getty "art novice" profile quoted in the guide: curious and motivated; spends less than 30 seconds looking at an object; unfamiliar with terminology; expects a quick pay-off; makes emotional and personal associations first; wants to connect with the people associated with the object.
- Jargon: specialist words are allowed when essential but must be explained; "if visitors encounter an unfamiliar word that is not explained they are likely to stop reading." Do not use a term that cannot be identified in the object itself.
- Engage with the object (prompt "What do you want visitors to look at?"); bring in the human element, including sensory language; sketch in historical background because knowledge is "hazy"; admit uncertainty and use only genuine questions, since false ones patronise.
- Family labels in the Europe 1600-1815 galleries: 45-word caption with a 12-word first sentence, storytelling tone, explains terms, ends with a call to action.
- Audience facts given: almost 50% of V&A visitors come from overseas, half of those from countries where English is not the primary language; over 10% were still in education in 2016-17.
- Worked example labels in the guide run 39-64 words; the example section panel is 148 words.

Serrell:
- Serrell's "Exhibit Labels: An Interpretive Approach" (AltaMira, 1996; 2nd ed. 2015) is described by a Texas Historical Commission resource list as covering themes, audiences, reading levels, and recommended word counts and font sizes. — [Texas Historical Commission resources](https://www.thc.texas.gov/public/upload/preserve/museums/files/Updated-Additional-Resources_0.pdf)
- As a competition juror, Serrell favoured labels that are easy to read and understood quickly without re-reading, and disliked chirpy labels that over-use "we" and "you", repeat instructions or end with exclamation marks. — [Museum-Ed, Best Practices in Museum Exhibition Writing 2004](https://www.museum-ed.org/best-practices-in-museum-exhibition-writing-2004/)
- Other practitioner hierarchies found in search results (secondary, not Serrell): introduction ~125 words, theme ~105, subtheme ~85, object ~75 — [MLC WA guide](https://library.mlc.wa.edu.au/wp-content/uploads/2016/09/How-to-write-and-produce-your-exhibition-labels.pdf); introductory panels 100-200 words, artwork labels 70-80 words — [Museums & Galleries NSW](https://mgnsw.org.au/wp-content/uploads/2026/05/Exhibition-labelling.pdf); introduction panel up to 160 words — [Norfolk Record Office](https://www.archives.norfolk.gov.uk/article/31009/Writing-interpretive-text)

### Inferences
- A web page is read sitting down, so limits can be looser than gallery limits, but the layering transfers directly. A workable mapping: page title plus standfirst (one sentence, at most ~16 words, carrying the page's single message); intro "panel" of ~150-180 words above the first interactive; each section as a "section panel" of ~130-150 words of core text; each interactive or image with a 50-60 word stand-alone caption; optional "dig deeper" blocks for divers.
- On that mapping a page of 6-8 sections has a core text of roughly 1,000-1,400 words, far shorter than Ciechanowski (7,000-8,000) but in the range of "Parable of the Polygons" (~1,300) and below Red Blob (~2,500-3,000). For ~30 pages aimed at teens and adults on phones, the shorter end is the defensible default, with depth in expandable layers.
- "Paddlers, swimmers, divers" lines up with the NYT click data: headings plus first sentences plus default interactive states must tell the whole story to paddlers; body text serves swimmers; "dig deeper", wiring tables and references serve divers.
- "Each text must stand alone" implies every section should make sense if reached by a deep link or by skimming, which also suits search landings.
- "Engage with the object" and "do not use a term that cannot be identified in the object" suggest introducing each technical term (rotor, reflector, plugboard) at the moment it is highlighted in the 3D model.
- "Admit uncertainty" suits cipher history, where attributions are often legendary (dCode notes the Caesar cipher's invention date is unknown).
- Nearly half of V&A visitors being non-native English readers is a reasonable proxy for a free global website; plain vocabulary and short sentences matter.

### Gaps
- Serrell's own word-count recommendations and her "big idea" formulation could not be retrieved from a primary source; her book is not online. Figures often attributed to her should not be quoted without checking the 2015 second edition. Search summaries mentioned her "big idea" and "deadly sins" (labels unrelated to a big idea, too long and wordy) and a Bitgood finding that more people read three 50-word labels than one 150-word label, but the specific source pages were not opened, so these remain unverified.
- The 2013 edition of the V&A guide was not readable; search summary text gave the same panel figures (150-180, 130-150, 50-60) but ~70 for group labels versus 70-80 in the 2018 edition.
- No guidance specific to digital or online exhibit text was found in this pass.

## 5. What section set recurs across the best examples?

### Takeaway
Across explorables and cipher sites the recurring sections are: hook, try-it-first interactive, how it works built up in small steps, how it is broken, significance/legacy, a short further-reading list and closing words; a challenge or sandbox appears in the teaching-oriented examples (Case, Khan Academy) and has evidence behind it. Dedicated history and legacy sections come from the cipher and museum sources, not the explorables.

### Cited Findings

| Section | Ciechanowski | Red Blob | Case | dCode | Crypto Museum | Khan (unverified detail) |
|---|---|---|---|---|---|---|
| Hook / one-line thesis | Yes (intro) | Yes (35 words) | Yes (one line) | No (tool) | Factual ID paragraph | Video |
| Interactive near top | Yes (~70-90 words) | Yes (~35) | Yes (~110) | Yes (tool first) | No | Separate page |
| How it works, stepwise | Yes (10+ sections) | Yes (6) | Yes | FAQ answers | Principle, Rotors, Wiring | Videos |
| History / story | Framing only | No | No | Bottom FAQ | Dedicated section | In videos |
| How it is broken | n/a | n/a | n/a | Yes (text) | Not on page | Later lessons |
| Challenge / sandbox | No | No | Yes (puzzle, sandbox) | No | No | Yes (challenge) |
| Legacy / why it matters | Final Words | "More" | Wrapping up (3 takeaways) | "Is it secure?" | No | Summary video |
| Further reading | Yes (2-3 items) | Yes | Yes | Links, citation | Literature, References | No |

Sources for the table rows: [Mechanical Watch](https://ciechanow.ski/mechanical-watch/); [GPS](https://ciechanow.ski/gps/); [Red Blob A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html); [Parable of the Polygons](https://ncase.me/polygons/); [dCode](https://www.dcode.fr/caesar-cipher); [Crypto Museum](https://www.cryptomuseum.com/crypto/enigma/i/index.htm); [Khan listing](https://opencourser.com/course/eyhpy2/journey-into-cryptography)

- Ciechanowski ends both analysed articles with the same two fixed sections, "Further Watching and Reading" and "Final Words", i.e. a fixed closing template across a series. — [Mechanical Watch](https://ciechanow.ski/mechanical-watch/); [GPS](https://ciechanow.ski/gps/)
- Case ends with a sandbox then numbered takeaways and a call to action. — [ncase.me/polygons](https://ncase.me/polygons/)
- Embedded problems ranging "from explicit tasks to optional challenges" are recommended by Case; quizzes with feedback and predict-then-reveal prompts improve recall per the Distill review. — [blog.ncase.me](https://blog.ncase.me/explorable-explanations/); [Distill](https://distill.pub/2020/communicating-with-interactive-articles/)

### Inferences
Derived candidate template for "one historical cipher per page" (word budgets are inferences from the V&A hierarchy and the exemplar ratios, not figures from any single source):

1. Title and standfirst: device name, date/place, one sentence of at most ~16 words stating the single message (V&A first-sentence rule; Case's one-line thesis).
2. Hook (~80-150 words): one human moment or stake, ending in the one-line instruction for the interactive. Target: interactive visible within ~100 words, on the first phone screen or just below it (exemplar range 35-110 words).
3. Meet the device: 3D model, draggable, with a default view that is informative untouched, plus a 50-60 word stand-alone caption (Ciechanowski's opening; V&A object label).
4. Try it: simulator pre-filled with a message already enciphered; typing changes it instantly (dCode/Cryptii zero-friction input; Aisch's "static version works on its own").
5. How it works: 2-4 short titled sub-sections of ~130-150 words each, each paired with one simulator state or diagram, building from the simplest component to the whole (Case's "start small, build big"; Ciechanowski's component-named sections). Introduce each term as it is highlighted on the model.
6. The story: who used it, when, what was at stake (~130-180 words). Explorables use history only as framing, but the museum and cipher sources give it a section; placing it after the first interaction keeps the hook short.
7. How it was broken: open with a predict-then-reveal prompt, then the method, ideally with the reader performing one step (Distill's self-reflection evidence; dCode's most distinctive FAQ content).
8. Challenge: one ciphertext to crack with feedback, optional and clearly not a gate (Case's optional challenges; testing effect).
9. Legacy / what came next (~80-120 words): why it mattered, what weakness led to the next cipher, link to the next page in the chronology (Ciechanowski's "Final Words"; series continuity).
10. Further reading: 2-4 curated items, with fuller references in a collapsed block for "divers".

- Total core text on this template is roughly 1,000-1,500 words with one flagship simulator reused in 4-6 preset states plus the 3D model, sitting between "Parable of the Polygons" and Red Blob in length.
- A fixed section order and fixed closing sections across all ~30 pages mirrors Ciechanowski's series consistency and reduces build cost (Tse rule 3).
- Section headings should be short noun labels and each section's first sentence should carry its message, so that skimming headings and first lines gives the whole story (V&A paddlers; Tse "don't hide it").
- Simple ciphers (Caesar, scytale) may not sustain 2-4 "how it works" sub-sections, while Enigma needs more; the template should allow that section to scale while the other sections stay fixed.

### Gaps
- No source directly tests section order (for example story-first vs interactive-first) for comprehension or engagement; the ordering above is inferred from exemplar practice.
- Whether a general audience completes end-of-page challenges on mobile is not evidenced by anything found here.
- The Pudding, Brilliant, 3Blue1Brown, Bletchley Park, TNMOC and wiring-view Enigma simulators are missing from the comparison table, so the "recurring section set" is based on 6 exemplars across two genres.
