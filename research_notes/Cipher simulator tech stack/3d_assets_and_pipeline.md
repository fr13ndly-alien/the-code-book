# 3D assets and the Blender-to-web pipeline (state as of 14 November 2026)

Method notes for the report writer:
- Sketchfab licence / face-count / downloadable data below was read on 2026-11-14 from Sketchfab's public Data API (`api.sketchfab.com/v3/search?downloadable=true` and `/v3/models/{uid}`), not from memory. Where I only have the API's `none-<uid>` viewer URL the link still resolves by its trailing uid. No files were downloaded.
- Package versions were read on 2026-11-14 from the npm registry (`npm view`), repo licences from the GitHub API.
- Anything labelled **[unverified]** comes from my prior knowledge or a secondary/SEO source and was not confirmed against a current primary source in this session.
- Not legal advice; the CC section summarises the CC FAQ.

---

## 1. Per-object model availability, licence, polygon count, separability

### Takeaway
Only three of the thirteen objects have a credible ready-made free model: the Enigma (one CC BY modelled prop at 148k tris, one CC BY-NC-SA museum scan at 330k tris), the Rosetta Stone (British Museum scan, CC BY-NC-SA, 480k tris, plus CC BY alternatives) and the generic props (barrel, padlock, chest: many CC0 / CC BY options). For the scytale, cipher disc, Linear B tablet, Polish bomba, Turing bombe, Lorenz SZ40 and Colossus I found no downloadable openly licensed mesh at all; these must be built (procedurally or in Blender). No found Enigma model is documented as having separable, rigged rotors/keys/plugboard.

### Cited Findings

**Enigma machine**
- "Enigma machine, 1934" by Science Museum Group: CC Attribution-NonCommercial-ShareAlike (links to CC BY-NC-SA 4.0), downloadable, 329.7k triangles / 165.2k vertices, published 2017-01-16, ~3.5k downloads. Page does not say how it was made and mentions no separable parts; notes "Enhanced digitisation funded by Samsung". — [Sketchfab](https://sketchfab.com/3d-models/enigma-machine-1934-c8ee76c383654e3095ea4cc9e7990274)
- "Enigma Machine" by ASHISH (@Ashish0096): CC Attribution, downloadable, 147,636 faces, 10 textures, 5 materials, 0 animations, published 2022-12-12. Described as a portfolio prop modelled with the Science Museum Group three-rotor Enigma as reference (i.e. hand-modelled, not a scan). — [Sketchfab](https://sketchfab.com/3d-models/enigma-machine-30b85c037a164174a109ad6f002b9c47)
- "Enigma machine" by Julia M (@J_): 10,437 faces, 3-rotor, but NOT downloadable and no licence (API: `isDownloadable: false`, licence null). Not usable. — [Sketchfab](https://sketchfab.com/3d-models/enigma-machine-f8cf72314e334b0d9760a90f40b3edb3)
- A Sketchfab API search for downloadable models matching "enigma machine" returned only the two models above as relevant; "enigma rotor" returned zero downloadable results. — [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=enigma%20machine&downloadable=true)
- KL-7 "Adonis" rotor machine (70k faces) exists on Sketchfab but is not downloadable. — [Sketchfab](https://sketchfab.com/3d-models/kl-7t-sec-adonis-98251fcde6154b439abcf1681d21c0a3)
- 3D-printable Enigma replicas exist (e.g. "Réplique Enigma" STLs on Thingiverse thing:1813308; a Hochschule Stuttgart "R.D.E. Enigma"; FreeCAD/STEP Enigma I replicas on GrabCAD), which are by nature made of separate parts (rotors, keys). Licences were NOT stated in the sources I saw. — [Hackaday 2016](https://hackaday.com/2016/10/21/3d-print-an-enigma-machine-thats-close-to-the-real-thing), [Hackaday.io simplified replica](https://hackaday.io/project/184288-simplified-enigma-replica/details)
- "Replica Enigma Machine Rotor" by Craig Heath is on Printables (licence not checked). — [Printables](https://www.printables.com/model/491111-replica-enigma-machine-rotor)
- A Cults3D printable Enigma by EscapeTechno is listed as "CC BY-NC-SA No AI". — [Cults3D](https://cults3d.com/en/3d-model/game/machine-enigma-escapetechno)
- Paid alternatives (not open): CGTrader, RenderHub, Superhive (Blender Market) listings. — [Superhive](https://superhivemarket.com/products/enigma-machine)

**Alberti / Confederate cipher disc**
- Sketchfab downloadable search for "cipher disk" returned exactly one model: "Emerald Cipher Disk" by AngryTiki, CC Attribution, 1,037,498 faces, published 2026-03-24, generated with Meshy (AI). Fantasy object, not Alberti/Confederate, and far too heavy. — [Sketchfab](https://sketchfab.com/3d-models/emerald-cipher-disk-dcf53e436aed418aad92437e6ba4756c)
- "cipher wheel" returned nothing relevant. Adjacent objects: "Da Vinci Code Cryptex" by TAIGA-ZOE (CC BY, 4,714 faces) and "The Tavern - Cryptex" by francoisespagnet (CC BY, 1,628 faces). — [Sketchfab cryptex 1](https://sketchfab.com/3d-models/none-24d959226be84c31a1c54485bd49fcb5), [Sketchfab cryptex 2](https://sketchfab.com/3d-models/none-09508a1583fc47d586dc306af5008afc)

**Spartan scytale**
- Sketchfab downloadable search for "scytale" returned no scytale model (only an unrelated tree stump by a user named scyta1e). — [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=scytale&downloadable=true)

**Wax writing tablet**
- "Tablet et Stylus" by Albert Gregl: CC Attribution, downloadable, 2,434 faces, 6 textures, 2 materials; a low-poly modelled Roman wax tablet with stylus. Best ready-made fit. — [Sketchfab](https://sketchfab.com/3d-models/tablet-et-stylus-ddb67faa648d4b01a97406fdd939a54c)
- Turku Museum Centre scans of a writing-tablet fragment and tablet case are CC BY-NC-ND (335k / 418k faces): NoDerivs makes decimation/retexturing problematic; avoid. — [Sketchfab](https://sketchfab.com/3d-models/none-632560b3af9c4896a415b06a25794af7)

**Rosetta Stone**
- "The Rosetta Stone" by The British Museum: CC Attribution-NonCommercial-ShareAlike, downloadable, 480,264 faces, published 2017-07-11; photogrammetry (single scan mesh). — [Sketchfab](https://sketchfab.com/3d-models/the-rosetta-stone-1e03509704a3490e99a173e53b93e282)
- The British Museum model was built by photogrammetry (Agisoft PhotoScan) and offered as a downloadable OBJ at launch. — [Hyperallergic](https://hyperallergic.com/391501/rosetta-stone-3d-model-british-museum/)
- "Rosetta Stone | Ultra-Low Poly" by whfmax: CC Attribution, downloadable, 1,496 faces, 3 textures. — [Sketchfab](https://sketchfab.com/3d-models/rosetta-stone-ultra-low-poly-a9efe7bf59c14f39807115fa2379c363)
- "Rosetta Stone" by light_heists: CC Attribution, downloadable, 179,999 faces, 1 texture; a visitor capture made in the British Museum gallery on 30 Mar 2015 (scan through the display, quality unknown). — [Sketchfab](https://sketchfab.com/3d-models/rosetta-stone-444e074e68b640449fedec85d8509d47)
- Others: JeremyWynn (CC BY-NC-SA, 1,228 faces), semiller88 "Rosetta Stone AF" (CC BY, 3,167 faces), v777 (CC BY-NC-ND, 236k). — [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=rosetta%20stone&downloadable=true)

**Linear B clay tablet**
- "Linear B tablet PY An 724" by Ancient Mediterranean Digital Project (Pylos, Athens NAM): 217,248 faces photogrammetry, but NOT downloadable and no licence. Reference only. — [Sketchfab](https://sketchfab.com/3d-models/linear-b-tablet-py-an-724-28308c4d206348e79bdd958e7335588d)
- Downloadable search for "linear b tablet" returned zero results. — [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=linear%20b%20tablet&downloadable=true)
- Stand-ins of the wrong script (cuneiform): MKG Hamburg cuneiform tablets are CC0 Public Domain (2-4 million faces each, would need heavy decimation); British Museum cuneiform tablets are CC BY-NC-SA (250k-1.38M faces); "Cuneiform (Old Babylonian) Tablet" by Bryn Mawr College is CC BY (239k faces). — [MKG CC0 example](https://sketchfab.com/3d-models/none-ab87c640d1dc4ebcb5c3d68539058905), [Bryn Mawr](https://sketchfab.com/3d-models/none-93ff198b12ae42628e710861870ecb99)

**Wooden beer barrel**
- Poly Haven's model list (522 models on 2026-11-14) includes "Wine Barrel 01" (10,820 polys) and "Wooden Barrels 01" (33,142 polys). — [Poly Haven API](https://api.polyhaven.com/assets?t=models), [wine_barrel_01](https://polyhaven.com/a/wine_barrel_01), [wooden_barrels_01](https://polyhaven.com/a/wooden_barrels_01)
- Poly Haven assets are CC0 (confirmed on the Barrel 03 page; site-wide policy). — [Poly Haven Barrel 03](https://polyhaven.com/a/barrel_03), [Poly Haven licence](https://polyhaven.com/license)
- Many CC BY low-poly barrels on Sketchfab, e.g. "Medieval wooden barrel" by rakutin (CC BY, 2,002 faces, 5 textures), "Wooden Barrel Keg (game ready asset)" by apariciosilva3D (CC BY, 11,042 faces), "Barrel" by Folgore (CC BY, 762 faces). — [rakutin](https://sketchfab.com/3d-models/medieval-wooden-barrel-ce221372644141c08877c31a0c8248c8), [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=wooden%20barrel&downloadable=true)
- OpenGameArt "Unfinished Barrel" (Blender model, LoD meshes, CC0-sourced textures) and ShareTextures "Barrel 1" (CC0). — [OpenGameArt](https://opengameart.org/content/unfinished-barrel), [ShareTextures](https://www.sharetextures.com/models/decorative/barrel_1)

**Iron strongbox with padlocks**
- "StrongBox" by KonstantinAg: CC Attribution, 992 faces, 3 textures, 1 animation (pre-animated, implies a separate lid). — [Sketchfab](https://sketchfab.com/3d-models/strongbox-57137c37c48b4502963cf0e1da512de2)
- Poly Haven "Treasure Chest": CC0, 103,330 polys (heavy; wooden pirate chest rather than iron strongbox). — [Poly Haven](https://polyhaven.com/a/treasure_chest)
- Padlocks: "Gate padlock" by Małopolska's Virtual Museums is CC0 Public Domain, 63,138 faces (museum scan, single mesh); "Padlock & Key" by tediuminteractive is CC BY, 1,714 faces, 1 animation; "Game-ready PBR padlock" by NollieInward is CC BY, 964 faces; "Padlock Old" by CookieJar CC BY, 3,178 faces. — [Gate padlock](https://sketchfab.com/3d-models/gate-padlock-ad7f2fabc69847e59d803cdbed8eb308), [Padlock & Key](https://sketchfab.com/3d-models/none-745c1c723d26498e9681cc0d7d065b3c), [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=padlock&downloadable=true)
- "Chest with padlock (Animated)" by alazur: CC BY-NC, 614 faces, 1 animation. — [Sketchfab](https://sketchfab.com/3d-models/none-0afaffa86e874c1ab7d8577cc4279fb3)

**Polish bomba, Turing bombe, Lorenz SZ40/42, Colossus**
- Sketchfab downloadable searches for "turing bombe" and "bombe bletchley" returned zero results; "lorenz cipher" returned only an unrelated "BLETCHLEY PARK" scene (Free Standard licence, 684k faces); "colossus computer" returned only an Apollo Guidance Computer. — [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=turing%20bombe&downloadable=true)
- Deutsches Museum's 3D-Cipher project published a CT scan of a Lorenz SZ 42 (Inv. 81019) on Zenodo under CC BY-SA 4.0; it is a ~231 MB DICOM volume, not a web-ready mesh. — [Zenodo](https://zenodo.org/records/8113705)
- Virtual Colossus offers browser 3D simulations of the Turing-Welchman Bombe, Colossus and Lorenz SZ42; the Virtual Bombe page states CC BY 4.0, and a printable "Paper Lorenz" is CC BY 4.0. The sources do not say the 3D meshes are downloadable. — [Virtual Bombe](https://bombe.virtualcolossus.co.uk/), [Virtual Colossus](https://virtualcolossus.co.uk/), [Paper Lorenz](https://lorenz.virtualcolossus.co.uk/paperlorenz.html)

**Optics bench with polarising filters**
- "Optical Bench- three uprights" by veerubyinc: CC Attribution, downloadable, 13,468 faces, 0 textures, 2 materials (school-lab style bench with uprights). — [Sketchfab](https://sketchfab.com/3d-models/optical-bench-three-uprights-c4bcfe2f81ca48198c2459e13e45de43)
- "polarizer" search returned only photogrammetry scans that mention cross-polarised capture; no polarising-filter prop. — [Sketchfab search API](https://api.sketchfab.com/v3/search?type=models&q=polarizer&downloadable=true)

**Platform mechanics**
- On Sketchfab a model is only downloadable if its owner enables it; free downloads are under either Sketchfab's "Standard" licence or a Creative Commons licence, and CC models (except CC0) require credit. — [Sketchfab help](https://help.sketchfab.com/en/articles/16152217), [Sketchfab licences](https://sketchfab.com/licenses)
- Sketchfab documents glTF, GLB and USDZ as download formats (auto-converted). — [Sketchfab help: glTF, GLB and USDZ](https://help.sketchfab.com/en/articles/16152669-gltf-glb-and-usdz)

### Inferences
- Recommended sourcing matrix (my synthesis of the findings above):

| Object | Recommended route | Ready-made fallback |
|---|---|---|
| Enigma (hero, interactive) | Build own in Blender from primitives so rotors / keys / lamps / plugs are separate named nodes | ASHISH CC BY (148k tris, must inspect hierarchy, decimate); SMG scan CC BY-NC-SA as static "museum view" only |
| Cipher disc | Procedural (two discs + lettering texture) | none |
| Scytale | Procedural (cylinder/prism + helical strip) | none |
| Wax tablet | Procedural boxes, or Albert Gregl CC BY (2.4k faces) | as left |
| Rosetta Stone | British Museum scan decimated to ~20-50k tris with baked normal map (CC BY-NC-SA), or whfmax CC BY ultra-low-poly | light_heists CC BY |
| Linear B tablet | Procedural slab + normal/bump map generated from Linear B glyphs | none in correct script |
| Beer barrel | Poly Haven Wine Barrel 01 (CC0, 10.8k) or LatheGeometry | many CC BY |
| Strongbox + padlocks | Own simple box + CC BY low-poly padlock (separate node per padlock) | KonstantinAg StrongBox CC BY |
| Bomba / Bombe / Lorenz / Colossus | Stylised low-poly own build (boxes, instanced drums/wheels/valves), or 2D illustration/photo; link to Virtual Colossus | none |
| Optics bench | Procedural (rail, posts, transparent discs) | veerubyinc CC BY (13k) |

- The SMG Enigma and the BM Rosetta Stone are almost certainly single fused scan meshes with baked photo textures (330k / 480k triangles, no animations, museum digitisation): they cannot provide separable rotors/keys and need decimation to be phone-friendly. Fine as "look at the real thing" exhibits, not as interactive machines.
- The ASHISH CC BY Enigma has 5 materials and 10 textures, suggesting a conventional modelled prop that may have separate objects, but whether rotors/keys are separate meshes with sensible pivots can only be established by opening it in Blender; expect to re-pivot and rename.
- 3D-printing CAD/STL sets are the only found source of true part-separated Enigma geometry, but STL has no materials/UVs and tessellated CAD is triangle-heavy; with licences unconfirmed they are better treated as dimensional reference than as assets.
- Sketchfab was still live and receiving uploads in October 2026 (API returned models published 2026-10-17), so the Sketchfab-to-Fab migration has not removed these listings as of this date.

### Gaps
- Smithsonian 3D / Open Access, Wikimedia Commons (STL category), Bletchley Park, The National Museum of Computing, NASA 3D resources, Science Museum Group's own collection site, Thingiverse/Printables/GrabCAD licence fields: not individually checked in this session. I found no evidence of an Enigma/Bombe/Colossus mesh in them, but absence is **unverified**.
- Licence of the Thingiverse (thing:1813308), GrabCAD and Hochschule Stuttgart Enigma files: not confirmed.
- Whether any Sketchfab Enigma has separable parts: not verifiable without downloading (out of scope).
- No model of any kind found for the Polish bomba kryptologiczna; even reference imagery is scarce (no original survives) **[unverified]**.
- CC licence version on Sketchfab CC BY models (the API label says "CC Attribution"; Sketchfab's licence page should be checked for the 4.0 version string per model).

---

## 2. What CC BY-NC and CC BY-NC-SA permit; attribution; share-alike reach

### Takeaway
A free, ad-free educational website is squarely within "NonCommercial"; attribution needs creator, licence link, notice of changes and (recommended) title and source link. ShareAlike only bites on adaptations of the asset itself (e.g. a decimated/retextured scan must stay BY-NC-SA); it does not force the app's code or other assets under SA when the model is merely included alongside them. The real risk is the App Store: CC licences forbid applying "effective technological measures" that restrict recipients' licensed rights, and the CC FAQ gives uploading to a DRM-applying platform as an example of a violation, so bundling any CC BY* asset inside an iOS app binary is legally greyer than using it on the web.

### Cited Findings
- NC licences prohibit uses "primarily intended for or directed toward commercial advantage or monetary compensation"; the test does not depend on the type of user (a non-profit can violate it; a for-profit does not automatically violate it) but on the specific use and intent. — [CC FAQ](https://creativecommons.org/faq/)
- CC's own interpretation page stresses that the test is the primary purpose of the use, not the category of reuser; courts have the final say. — [CC wiki: NonCommercial interpretation](https://wiki.creativecommons.org/NonCommercial_interpretation)
- Attribution: credit the creator, retain copyright notice, licence notice and a link to the licence (or deed), the warranty-disclaimer notice, and a URI to the material where reasonably practicable. Under 4.0 the title is not required but recommended if supplied. You must indicate if you modified the work and retain indications of previous modifications. Credit may be given in a manner reasonable to the medium, including via a link to a page holding the attribution information. — [CC FAQ](https://creativecommons.org/faq/)
- Format shifting is not an adaptation: all CC licences let you exercise the rights "in any format or medium", even NoDerivatives ones. — [CC FAQ](https://creativecommons.org/faq/)
- An adaptation is, broadly, a modification "based on the prior work" with enough new creativity to be copyrightable; this depends on applicable copyright law. — [CC FAQ](https://creativecommons.org/faq/)
- Collections: all CC licences allow inclusion in collections; you may choose your own licence for the collection but "this does not change the license applicable to the original material"; NC material cannot be used commercially within a collection. ShareAlike applies only when the work is modified and shared; CC licences do not require the collection itself to be released under SA. — [CC FAQ](https://creativecommons.org/faq/), [CC Certificate 4.4 Remixing](https://certificates.creativecommons.org/cccerteducomments/chapter/4-4-remixing-cc-licensed-work/)
- If you adapt BY-NC-SA material, the adapter's licence must be the same licence (or a later version / permitted port); a remix containing NC material cannot be used commercially. — [CC FAQ](https://creativecommons.org/faq/)
- Technological measures: licensees may not impose additional terms or apply effective technological measures that restrict others from exercising the licensed rights. The FAQ's examples: uploading a remix to a music site that applies DRM violates the licence without the licensor's permission; converting to a hard-to-access or platform-specific format does not. — [CC FAQ](https://creativecommons.org/faq/)
- CC recommends against using CC licences for software, but says they may be used for separate artistic elements such as game art. — [CC FAQ](https://creativecommons.org/faq/)

### Inferences
- Free website, no ads, no paywall, no donations tied to the content: use of CC BY-NC and CC BY-NC-SA models is permitted. Adding ads, sponsorship, paid tiers or in-app purchases later would put NC assets at risk; plan for them to be swappable.
- Converting OBJ to GLB, Draco/Meshopt compression and texture re-encoding look like format shifting (not adaptation). Decimating, cleaning, re-texturing, cutting a scan into parts or adding animation is safer treated as an adaptation: under BY-NC-SA the resulting modified model file must itself be offered under BY-NC-SA 4.0 and marked as modified. That obligation attaches to the model, not to the TypeScript code, shaders, text or other models, provided the model is a discrete asset in a collection. Whether a tightly integrated interactive 3D scene is a "collection" or an "adaptation" is not addressed by the FAQ and is a grey area; keeping each third-party model as its own file with its own licence notice is the conservative structure.
- Avoid NoDerivs (BY-NC-ND) scans entirely: nearly every useful optimisation step is arguably a derivative.
- Practical attribution pattern: an in-app "Credits & licences" screen plus a `CREDITS.md`, one line per asset in TASL form, e.g. "The Rosetta Stone" by The Trustees of the British Museum, sketchfab.com/…, CC BY-NC-SA 4.0, decimated and re-baked by <author>; modified version available under the same licence at <URL>". Also write licence/author into glTF `asset.copyright` / `extras`.
- App Store risk: App Store distribution adds Apple's usage rules and (commonly) FairPlay encryption to app bundles **[unverified in this session]**. By analogy with the FAQ's DRM example this could conflict with any CC BY/BY-NC/BY-NC-SA asset shipped inside the binary. Mitigations, in order of safety: (1) use only CC0 or self-made assets in the iOS build; (2) ask the rights-holder (e.g. British Museum, Science Museum Group) for written permission; (3) have the app fetch CC-licensed GLBs at runtime from the project's public website, where they are also freely downloadable. Many apps ship CC BY assets in practice, but the report should flag this as an unresolved legal point, not a settled permission.
- Meshy/Tripo free-tier AI outputs are themselves CC BY 4.0 (see section 7), so they carry the same attribution duty and the same App Store caveat.

### Gaps
- No CC FAQ statement specifically about app stores was found; the App Store conclusion is inference.
- Whether Apple applies FairPlay to free apps' resource files, and current Apple licence terms: not checked.
- Whether "parallel distribution" (offering an unencumbered copy alongside a DRM copy) cures the technological-measures problem: I believe CC rejected this for 4.0, **[unverified]**.
- Sketchfab "Standard"/"Free Standard" licence terms (seen on a few results) were not read; avoid those unless read.

---

## 3. Enigma reference data and open-source test oracles

### Takeaway
Rotor wirings, notch/turnover letters and reflector wirings are consistently published by Crypto Museum and Wikipedia (the two tables agree letter-for-letter), and several permissively licensed simulators (MIT / Apache-2.0 / Unlicense) exist to act as test oracles, including one validated against historical Army and U-boat M4 messages.

### Cited Findings
- Wirings (contact A-Z maps to), identical in both sources. Entry wheel ETW for Enigma I/M3/M4: ABCDEFGHIJKLMNOPQRSTUVWXYZ. — [Crypto Museum wiring](https://www.cryptomuseum.com/crypto/enigma/wiring.htm), [Wikipedia: Enigma rotor details](https://en.wikipedia.org/wiki/Enigma_rotor_details)

| Wheel | Wiring | Turnover (window letter) | Notch (physical, per Crypto Museum) |
|---|---|---|---|
| I | EKMFLGDQVZNTOWYHXUSPAIBRCJ | Q | Y |
| II | AJDKSIRUXBLHWTMCQGZNPYFVOE | E | M |
| III | BDFHJLCPRTXVZNYEIWGAKMUSQO | V | D |
| IV | ESOVPZJAYQUIRHXLNFTGKDCMWB | J | R |
| V | VZBRGITYUPSDNHLXAWMJQOFECK | Z | H |
| VI (naval) | JPGVOUMFYQBENHZRDKASXLICTW | Z and M | H, U |
| VII (naval) | NZJHGRCXMYSWBOUFAIVLPEKQDT | Z and M | H, U |
| VIII (naval) | FKQHTLXOCBJSPDZRAMEWNIUYGV | Z and M | H, U |
| Beta (M4, 4th position) | LEYJVCNIXWPBQMDRTAKZGFUHOS | none | none |
| Gamma (M4, 4th position) | FSOKANUERHMBTIYCWLQPZXVGJD | none | none |

| Reflector | Wiring |
|---|---|
| UKW-A | EJMZALYXVBWFCRQUONTSPIKHGD |
| UKW-B | YRUHQSLDPXNGOKMIEBFZCWVJAT |
| UKW-C | FVPJIAOYEDRZXWGCTKUQSBNMHL |
| UKW-B thin (M4) | ENKQAUYWJICOPBLMDXZVFTHRGS |
| UKW-C thin (M4) | RDOBJNTKVEHMLFCWZAXGYIPSUQ |

- Crypto Museum distinguishes "Notch" (physical position on the rotor circumference) from "Turnover" (letter visible in the window when the step is triggered); the notch is sensed 8 positions further round from the window. A simulator should key off the Turnover column. — [Crypto Museum wiring](https://www.cryptomuseum.com/crypto/enigma/wiring.htm)
- Crypto Museum's wiring page was last changed 27 July 2026 and refers to per-machine pages for copyright information. — [Crypto Museum wiring](https://www.cryptomuseum.com/crypto/enigma/wiring.htm)
- Double stepping: when the right rotor reaches its turnover the middle rotor advances; if the middle rotor is itself at its turnover position it steps again on the next keypress together with the left rotor (worked example with rotors I-II-III in the article). — [Wikipedia: Enigma rotor details](https://en.wikipedia.org/wiki/Enigma_rotor_details)
- Ring setting (Ringstellung): the ring carries the alphabet and the notch and rotates them relative to the internal wiring. Test vectors on the page: rotor I with ring setting B encodes A to K (instead of E); with all rings at B (02), AAAAA from start AAA enciphers to EWTYX (rotors I-II-III, reflector B). — [Wikipedia: Enigma rotor details](https://en.wikipedia.org/wiki/Enigma_rotor_details)
- Reflector: 13 wires pairing the 26 letters (so no letter maps to itself); UKW-D is field-rewirable and has no fixed wiring. — [Crypto Museum: working principle](https://cryptomuseum.com/crypto/enigma/working.htm)
- Open-source simulators usable as oracles (licence, activity from GitHub API on 2026-11-14):
  - denismaggior8/enigma-python: MIT, pushed 2026-11-10; unit tests against a 1930 German Army message (Frode Weierud's CryptoCellar) and a May 1945 U-534 M4 message (Greek rotor + thin reflector). — [GitHub](https://github.com/denismaggior8/enigma-python)
  - gremmie/enigma (py-enigma): MIT, "historically accurate" Python 3 simulator, pushed 2025-12-30. — [GitHub](https://github.com/gremmie/enigma), [docs](https://py-enigma.readthedocs.io/en/latest/overview.html)
  - mikepound/enigma: Unlicense (public domain), Java implementation plus attack. — [GitHub](https://github.com/mikepound/enigma)
  - cryptii/cryptii: MIT, in-browser JavaScript, includes Enigma. — [GitHub](https://github.com/cryptii/cryptii)
  - gchq/CyberChef: Apache-2.0, JavaScript, very active (pushed 2026-11-14); has Enigma, Bombe, Lorenz and Typex operations **[operations list from prior knowledge, unverified this session]**. — [GitHub](https://github.com/gchq/CyberChef)
  - henryhale/enigma: MIT, TypeScript, basic, 1 star, no evidence of historical verification. — [GitHub](https://github.com/henryhale/enigma)
  - NationalSecurityAgency/enigma-simulator: licence not machine-detected (NOASSERTION); read before reuse. — [GitHub](https://github.com/NationalSecurityAgency/enigma-simulator)
  - aurbano/enigma_py (PyPI enigma-emulator): M3 and M4 rotors built in. — [PyPI](https://pypi.org/project/enigma-emulator)

### Inferences
- Reference algorithm for a TypeScript core (standard, consistent with the cited behaviour): on each key press, BEFORE the electrical path: `if (middle at turnover) { step left; step middle } else if (right at turnover) { step middle }; step right`. The M4 fourth (Greek) wheel and all reflectors never step. Signal path: plugboard, ETW, right-to-left through rotors (apply offset = position - ring), reflector, left-to-right through inverse wirings, plugboard. Rotors VI-VIII have two turnovers (Z and M).
- Test strategy: (1) unit-test the well-known vector rotors I-II-III / UKW-B / rings 01 / start AAA: AAAAA to BDZGO **[from prior knowledge; the same Wikipedia page is the usual source, not re-read verbatim]** and the cited ring-setting vector AAAAA to EWTYX; (2) a double-step test starting at ADU (expect ADV, AEW, BFX) **[prior knowledge]**; (3) port the historical-message tests from enigma-python (MIT, so tests can be copied with notice); (4) property tests: reciprocity (encrypt twice = identity) and no letter maps to itself; (5) differential fuzzing: generate random settings, run py-enigma or enigma-python in CI, compare with the TS output.
- Wiring tables are factual data; using them needs no licence, but credit Crypto Museum/Wikipedia as sources. Copying Crypto Museum's photos or drawings as texture reference would need their permission.

### Gaps
- Railway/Swiss-K/Tirpitz/Abwehr (G) wirings and their different stepping (cog-driven, stepping reflector) not collected; only Enigma I, M3, M4.
- Exact historical test messages (ciphertext/keys) not copied here; take them from enigma-python's tests or CryptoCellar.
- Physical dimensions for modelling (rotor diameter, key spacing, case size) not collected; Crypto Museum's Enigma I page is the likely source.

---

## 4. Procedural versus Blender-modelled objects; crisp lettering in three.js

### Takeaway
Roughly half the list (scytale, cipher disc, wax tablet, optics bench, strongbox body, a simple barrel, clay-tablet slab) is cheaper, lighter and sharper built from three.js primitives with generated lettering than downloaded or modelled; Blender is worth it mainly for the Enigma and for cleaning/decimating museum scans. For lettering, SDF text via troika-three-text (drei `<Text>`) or pre-rendered canvas/atlas textures are the two workable techniques; both libraries are current.

### Cited Findings
- troika-three-text is at 0.53.1 (published 2026-11-02); the troika monorepo is MIT and was pushed 2026-11-02, i.e. actively maintained. — [npm](https://www.npmjs.com/package/troika-three-text), [GitHub](https://github.com/protectwise/troika)
- @react-three/drei is at 10.7.9 (2026-09-25); it is the helper library that provides `<Text>` (troika-based SDF text), `<Text3D>`, `<Decal>`, `useGLTF`, `useTexture`, `<Instances>` **[component list from prior knowledge]**. — [npm](https://www.npmjs.com/package/@react-three/drei), [drei docs](https://drei.docs.pmnd.rs/)
- three is at 0.187.0 (r187, 2026-10-30); @react-three/fiber is at 9.8.2 (2026-10-21) with peer deps `react >=19 <19.4`, `three >=0.156`. — [npm three](https://www.npmjs.com/package/three), [npm R3F](https://www.npmjs.com/package/@react-three/fiber)
- A 26-letter ring is exactly what Enigma rotors, cipher discs and Enigma keys need; the Science Museum scan demonstrates the alternative cost: 330k triangles for one static object. — [Sketchfab SMG Enigma](https://sketchfab.com/3d-models/enigma-machine-1934-c8ee76c383654e3095ea4cc9e7990274)

### Inferences
- Build in code (three.js geometry, no GLB):
  - Scytale: `CylinderGeometry` (or 6-8 sided prism, historically plausible) + a helical strip (custom `BufferGeometry` or a `TubeGeometry`/ribbon along a helix); letters as a canvas texture whose UVs follow the strip, so "unwrapping" the strip is just an animation of the same texture on a flat plane.
  - Alberti / Confederate disc: two coaxial thin cylinders; inner one rotates about one axis. Letters radially placed either as a single canvas texture per disc (cheap, one draw call) or troika text instances. Brass look = `MeshStandardMaterial` metalness 1, roughness ~0.35 + environment map.
  - Wax tablet: three boxes (frame, wax inset) + canvas/normal map for incised text; or use the 2.4k-face CC BY model.
  - Optics bench: rail = box, posts = cylinders, filters = thin transparent discs with a grating-line texture; polarisation shown by shader/opacity = cos^2(theta). No model needed.
  - Strongbox: box + bevel (drei `RoundedBox`), strap planes, rivets instanced; padlocks from a CC BY low-poly GLB or torus + box.
  - Barrel: `LatheGeometry` from a stave profile + torus hoops, or the CC0 Poly Haven barrel when realism matters.
  - Linear B tablet: rounded slab with a normal map rendered from Linear B glyphs (Unicode block U+10000-1007F; a font such as Noto Sans Linear B, OFL **[unverified]**) drawn to a canvas and converted to height/normal.
- Model in Blender (GLB): Enigma (case, keyboard with one key mesh instanced 26x, lampboard, 3-4 rotor meshes instanced, plugboard sockets instanced, cables as curves converted to mesh); stylised bombe/Lorenz/Colossus if 3D is wanted at all; scan clean-up (Rosetta Stone).
- Lettering technique choice:
  - Canvas texture atlas (one 1024x64 or 2048x128 strip "A…Z" per rotor ring / disc): fewest draw calls, works with any material, trivially rotates with the mesh; render at devicePixelRatio-aware size and enable mipmaps + anisotropy. Best for rotor rings, discs, keys (26 keys can share one atlas with per-instance UV offset).
  - troika SDF text (drei `<Text>`): resolution-independent, crisp at any zoom, loads fonts at runtime (font file is an extra download; bundle a subsetted WOFF), supports curved layout (`curveRadius`) **[API detail from prior knowledge]**; each Text is its own mesh/draw call, so use for labels, plugboard legends, UI callouts, not for hundreds of glyphs. Preload fonts to avoid pop-in.
  - `<Decal>` / decal geometry: for stamping a serial plate or logo on a curved imported mesh; overkill for regular lettering.
  - Baked into the GLB texture in Blender: fine for static legends (QWERTZUIO key caps) but fixed resolution; use a 2k atlas shared across all keys.
  - Avoid extruded `TextGeometry`/`Text3D` for small letters: heavy triangle count, aliasing.
- For the lampboard, do not swap textures: use one emissive material per lamp (or per-instance colour on an `InstancedMesh`) and animate `emissiveIntensity`.

### Gaps
- No benchmark found comparing troika vs canvas-atlas performance on current iPhones.
- troika's compatibility with three r187 / WebGPURenderer not checked (R3F 9 defaults to WebGLRenderer **[unverified]**).
- Font licensing for an authentic Enigma key typeface not researched.

---

## 5. Blender to glTF/GLB best practices in the current Blender

### Takeaway
The current stable line is Blender 5.2 LTS (mid-2026); its bundled glTF 2.0 exporter handles Principled BSDF PBR, the common KHR material extensions, WebP textures and both Draco and Meshopt compression. For an interactive Enigma the important discipline is scene hygiene (one named object per moving part, origin on the rotation axis, applied scale/rotation), not exporter tricks; do heavy compression after export with glTF-Transform rather than in Blender.

### Cited Findings
- The Blender manual for 5.2 is titled "Blender 5.2 LTS Manual"; a 5.3 manual URL also exists. Blender 5.0 was released 18 November 2025 and 5.1 on 17 March 2026 per a secondary source; a "Blender 5.2 LTS Released" headline dates to July 2026. — [Blender 5.2 manual: glTF 2.0](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html), [StraySpark blog (secondary)](https://www.strayspark.studio/blog/blender-5-1-features-game-developers-spring-2026), [gamedev.net timeline](https://gamedev.net/news/4462/)
- Export extensions supported: KHR_lights_punctual, KHR_texture_transform, KHR_materials_variants, EXT_mesh_gpu_instancing, EXT_meshopt_compression, KHR_meshopt_compression, KHR_draco_mesh_compression; material extensions clearcoat, transmission, unlit, emissive_strength, volume, sheen, specular, anisotropy, dispersion, ior. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Materials must be built on Principled BSDF (or shadeless/unlit). Base Colour from the socket or an Image Texture; metallic/roughness from one Non-Color image through Separate RGB/Color with Green to Roughness and Blue to Metallic; normal map via Image Texture (Non-Color) to Normal Map node (Tangent Space); ambient occlusion via a custom node group named "glTF Material Output" with an Occlusion input, Red channel, so ORM can be one packed image; emissive factors above 1.0 emit KHR_materials_emissive_strength. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Alpha mode is derived from the Alpha socket: Opaque by default, Mask needs a Math (round) node, otherwise Blend (with a warning about sorting artefacts in viewers). Backface Culling maps inversely to glTF doubleSided. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Image options: PNG, JPEG, WebP ("no fallback") or None; quality slider for JPEG/WebP; optional WebP + PNG fallback. Non PNG/JPEG sources are converted on export. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Compression in the exporter: Draco (level + per-attribute quantisation bits) and Meshopt (choice of EXT_ or KHR_meshopt_compression). — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Animation export modes: Actions (default; active or NLA-stashed actions, one glTF animation each, named after the track), Active Actions merged, NLA Tracks, Scene. Only object transforms, pose bones and shape keys are exported; material/light/physics animation is ignored. Sampling is configurable. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Other options: Apply Modifiers, +Y Up, Custom Properties exported as glTF `extras`, GPU Instances (EXT_mesh_gpu_instancing; instances must be childless meshes sharing mesh data under one parent), Flatten Object Hierarchy. Quads/n-gons are triangulated on export; UV seams and sharp edges split vertices and raise vertex count; curves must be converted to meshes. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- A secondary blog claims 5.1 "rewrote" the exporter architecture and changed the Python extension API; not confirmed in the official manual. — [StraySpark blog](https://www.strayspark.studio/blog/blender-5-1-features-game-developers-spring-2026)

### Inferences
(Standard practice consistent with the manual; checklist for a non-artist.)
- Units and scale: model in metres at real size (Enigma I roughly 28 x 34 x 15 cm **[unverified dimensions]**); Ctrl-A apply Rotation & Scale on every object before export so node scales are 1 and rotations 0. Do NOT apply Location on moving parts.
- Pivots: set each moving part's origin where it must rotate/translate in code: rotor origin on the shared spindle axis; key origin at the top of travel; lid origin on the hinge line; plug origin at the socket mouth. In three.js you then animate only `rotation.x` / `position.y` of the named node. Align the rotation axis to a local axis.
- Hierarchy and naming: one object per independently moving part, parented under empties (`Enigma` > `Rotors` > `Rotor_L`, `Rotor_M`, `Rotor_R`; `Keys` > `Key_Q` …; `Lamps` > `Lamp_Q` …; `Plugboard` > `Socket_Q_top` …). Use ASCII names without dots or spaces: three.js sanitises node names and gltfjsx turns them into JS identifiers, and Blender's `.001` suffixes become ugly or collide. Object name (not mesh-data name) is what becomes the glTF node name.
- Share mesh data (Alt-D linked duplicates) for the 26 keys, 26 lamps, 26 sockets and rotors, so the GLB stores each mesh once; lettering then comes from per-instance UV offset or code-generated text rather than 26 unique meshes.
- Materials: few materials (3-6 for the whole Enigma: bakelite/black paint, steel, brass, wood, glass, felt). Prefer flat PBR factors without textures where possible; one shared 1k-2k ORM + base colour + normal set if textures are needed. Procedural Blender nodes (Noise, ColorRamp, Bump) do NOT export: bake them to images (Cycles Bake: Diffuse colour only, Roughness, Normal; or an add-on) before export.
- For scans (Rosetta Stone): Decimate or QuadriFlow remesh to 20-50k triangles, then bake the high-poly detail to a tangent-space normal map and re-project the colour texture (Selected-to-Active bake); this preserves the inscriptions far better than raw decimation.
- Export settings: GLB, +Y Up on, Apply Modifiers on, Selected Objects/collection only, Custom Properties on (carry metadata such as `letter: "Q"`), Animation off unless authored clips are wanted (driving from code is simpler for an interactive machine), Images = PNG/JPEG at source quality, Compression OFF. Then run glTF-Transform (section 6) so the compression recipe is reproducible in a script and source GLBs stay lossless.
- Keep the `.blend` in git LFS or outside the repo; commit the export script.

### Gaps
- Official Blender 5.1/5.2 release notes for the glTF exporter not read; exporter-rewrite claim is secondary-source only.
- Whether 5.2's exporter can write KTX2/Basis textures directly: not seen in the manual summary; assume no.
- The manual does not discuss naming/pivot conventions; the checklist above is practice, not citation.

---

## 6. Optimisation tooling, versions, compression choices, iOS support, gltfjsx, size targets

### Takeaway
The toolchain is healthy and current except gltfjsx, which has had no release since November 2024 while R3F moved to v9 / React 19. For this project's small hard-surface models, glTF-Transform (dedup, prune, weld, simplify, resize, WebP, meshopt) is sufficient; Meshopt is preferable to Draco for fast decode and a tiny decoder; KTX2 is only worth its transcoder cost for texture-heavy scans, and its behaviour on iOS should be device-tested.

### Cited Findings
- Versions on npm at 2026-11-14: three 0.187.0 (2026-10-30); @react-three/fiber 9.8.2 (2026-10-21); @react-three/drei 10.7.9 (2026-09-25); @gltf-transform/cli and /core 4.5.1 (2026-09-28); meshoptimizer 1.3.0 and gltfpack 1.3.0 (2026-09-25); draco3d 1.5.9; ktx-parse 2.0.0 (2026-09-05); troika-three-text 0.53.1 (2026-11-02); three-stdlib 2.36.1 (2025-11-10). — [npm three](https://www.npmjs.com/package/three), [npm @gltf-transform/cli](https://www.npmjs.com/package/@gltf-transform/cli), [npm gltfpack](https://www.npmjs.com/package/gltfpack), [npm meshoptimizer](https://www.npmjs.com/package/meshoptimizer), [npm draco3d](https://www.npmjs.com/package/draco3d)
- gltfjsx: latest 6.5.3 published 2024-11-04; the pmndrs/gltfjsx repo (MIT, 5.9k stars) was last pushed 2024-11-04, i.e. no release or commit for two years. — [npm gltfjsx](https://www.npmjs.com/package/gltfjsx), [GitHub](https://github.com/pmndrs/gltfjsx)
- glTF-Transform (donmccurdy, MIT) pushed 2026-10-20; meshoptimizer (zeux, MIT) pushed 2026-10-14: both actively maintained. — [glTF-Transform](https://github.com/donmccurdy/glTF-Transform), [meshoptimizer](https://github.com/zeux/meshoptimizer)
- Blender 5.2's exporter lists both EXT_meshopt_compression and KHR_meshopt_compression, indicating a Khronos-ratified KHR variant of meshopt now exists alongside the EXT one. — [Blender 5.2 manual](https://docs.blender.org/manual/en/5.2/addons/scene_gltf2.html)
- Community guidance (not benchmarks): Draco typically gives larger geometry reduction (claimed 50-80% vs 30-60%) while Meshopt decodes several times faster and has a much smaller decoder; recommendation is Meshopt by default, Draco only when the last few hundred KB matter. glTF-Transform is the scriptable/controllable tool, gltfpack the fast one-shot tool. — [Cinevva guide](https://app.cinevva.com/guides/optimize-glb-for-web), [three.js forum](https://discourse.threejs.org/t/gltf-and-or-glb-online-optimization-and-compression/62753)
- Texture guidance from the same class of sources: ETC1S for colour maps, UASTC for normal maps; KTX2 chiefly saves GPU memory; suggested workflow is inspect, resize to 1024-2048, WebP first, and move to KTX2 only if phones stutter or crash. — [Cinevva guide](https://app.cinevva.com/guides/optimize-glb-for-web)
- Non-authoritative mobile-web budget quoted in community docs: about 2 MB per file, 50k triangles, 1024 px textures (desktop 5 MB / 200k). — [skills.sh asset-pipeline doc](https://skills.sh/anthemflynn/ccmp/asset-pipeline-3d)
- three.js `KTX2Loader` detects ASTC/ETC1/ETC2 etc. from the renderer and picks a transcode target; documented historic problems on Apple devices include alpha textures falling back to ETC1 (alpha dropped) on Safari configurations where ETC2/ASTC were not reported, and black textures on iOS. These threads are old (2020-2022). — [three.js docs KTX2Loader](https://threejs.org/docs/pages/KTX2Loader.html), [three.js forum thread](https://discourse.threejs.org/t/basis-textures-with-alpha-appearing-fully-black-and-white-on-some-ipads-and-older-mobile-devices/22575), [Babylon forum: UASTC alpha Safari 15](https://forum.babylonjs.com/t/ktx2-uastc-alpha-not-working-on-safari-15/29932)

### Inferences
- Recommended recipe (per model, scripted in `package.json`): `gltf-transform optimize in.glb out.glb --compress meshopt --texture-compress webp --texture-size 1024` (flags per glTF-Transform 4.x CLI **[flag names from prior knowledge; check `gltf-transform optimize --help` on 4.5.1]**), preceded by `gltf-transform inspect` to see triangle/texture budgets. `optimize` bundles dedup, instance, prune, weld, simplify, resample, texture resize/convert. For the interactive Enigma, disable `join`/`flatten`/`palette` style steps that merge meshes or rename nodes, or the named moving parts are lost.
- Loader wiring in R3F: drei `useGLTF` sets up Draco by default from a CDN and can use the Meshopt decoder **[prior knowledge]**; self-host decoders (no third-party CDN) for an offline-capable/iOS-wrapped app. Meshopt decoding is WASM/JS and has no GPU-format dependence, so there is no iOS-specific risk; Draco needs a ~hundreds-of-KB WASM decoder download **[size unverified]**.
- KTX2 on iOS Safari: modern iPhones expose ASTC and ETC2 compressed-texture extensions in WebGL **[unverified this session]**, so KTX2Loader should transcode to ASTC there; the cited failures are from 2020-2022. Because I found no current primary statement, the report should say: KTX2 is expected to work on iOS 17-26 Safari but must be tested on a real device, especially textures with alpha; WebP (supported in Safari since 14 **[unverified]**) is the zero-risk default. For this app's assets (mostly untextured or lightly textured hard-surface models) KTX2's benefit (GPU memory) is marginal except for the Rosetta Stone scan.
- gltfjsx status: usable but unmaintained. Its output is plain JSX over `useGLTF`, so the JS output should still run on R3F 9; the `--types` output historically referenced the global `JSX.IntrinsicElements`, which React 19 removed, so expect to hand-fix types (`ThreeElements['group']`) **[unverified]**. Its `--transform` flag wraps an older glTF-Transform; prefer running glTF-Transform 4.5.1 directly. For a dozen models, a hand-written component using `useGLTF` + `nodes.Rotor_L` is a fine alternative; treat gltfjsx as a one-off scaffold generator (`npx gltfjsx model.glb --types`), not a build dependency.
- Realistic targets for phones (my estimates, to be validated): simple props (barrel, tablet, padlock, disc) 2-10k triangles and 50-300 KB each, often zero textures; Enigma hero 40-80k triangles, 4-6 materials, at most three 1k-2k textures, 0.8-2 MB compressed; Rosetta Stone 20-50k triangles + 2k colour and normal maps, 1-2.5 MB; whole first-load 3D payload ideally under ~5 MB with per-chapter lazy loading (`React.lazy`/`Suspense`, `useGLTF.preload` on chapter approach). Draw calls matter as much as triangles on mobile: instancing for keys/lamps/sockets.
- Do not mix compressors in one file; pick Meshopt project-wide.

### Gaps
- No authoritative 2026 benchmark for Draco vs Meshopt size/decode on phones was found; numbers quoted are community claims.
- Current iOS Safari compressed-texture extension support and WebGPU status on iOS: not verified from a primary source (WebKit release notes / caniuse were not read).
- Whether gltfjsx has a maintained fork or successor in 2026: not found; `@react-three/gltf` does not exist on npm (checked).
- glTF-Transform 4.5.1 CLI flag names and whether it writes KHR_meshopt_compression vs EXT_: not read from its docs.
- Whether three r187 GLTFLoader supports KHR_meshopt_compression: not checked; using EXT_meshopt_compression is the safe choice.

---

## 7. AI-assisted / low-skill modelling options in 2026

### Takeaway
Text/image-to-3D services (Meshy, Tripo, Rodin/Hyper3D) and open models (TRELLIS, Hunyuan3D) can now produce plausible static props, but nothing I found supports using them for a mechanically accurate, part-separated hero model; the one AI-generated cipher object found in the wild is a 1-million-triangle fused mesh. They are viable for background props and blocking-out, with licence strings attached on free tiers.

### Cited Findings
- Meshy's help centre: free-plan models are licensed to the user under CC BY 4.0 (commercial use allowed with credit to Meshy); paid-plan users own their assets outright. Third-party guides contradict this (claiming personal/academic only, or no downloads on free plan). — [Meshy help](https://help.meshy.ai/en/articles/9992001-can-i-use-my-generated-assets-for-commercial-projects); contradicted by [StackSheriff](https://stacksheriff.com/ai-tools/meshy-ai-pricing/)
- Tripo: free-plan outputs are public and CC BY 4.0 (attribution to Tripo required); private models and unrestricted commercial use are paid features (vendor's own blog). — [Tripo blog](https://www.tripo3d.ai/blog/commercial-use-ai-3d-models)
- Rodin (Hyper3D): generate/preview free, pay per download (roughly $1.50 per credit per secondary sources); no primary licence text found. — [Sorceress roundup](https://sorceress.games/blog/best-free-ai-3d-model-generator-honest-2026-picks)
- Open-weight options: microsoft/TRELLIS is MIT (14k stars, pushed 2026-10-27; some dependencies have separate terms); Tencent Hunyuan3D-2.1 uses a custom Tencent community licence (GitHub detects no standard licence) with reported territorial exclusions. — [TRELLIS](https://github.com/microsoft/TRELLIS), [Hunyuan3D-2.1](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1), [3D AI Studio roundup](https://www.3daistudio.com/blog/best-free-ai-3d-model-generators-2026)
- Positioning in 2026 roundups: Meshy = all-round default with best retopology/rigging tooling; Tripo = fastest and good image-shape fidelity; Hunyuan3D = open weights with PBR; Rodin praised mainly for organic forms. None of the roundups evaluated mechanical/hard-surface accuracy. — [RunDiffusion comparison](https://www.rundiffusion.com/ai-3d-model-generators), [SelfCAD Meshy vs Tripo](https://www.selfcad.com/blog/meshy-vs-tripo)
- Evidence of output characteristics: the Meshy-generated "Emerald Cipher Disk" on Sketchfab has 1,037,498 faces and no animations. — [Sketchfab](https://sketchfab.com/3d-models/emerald-cipher-disk-dcf53e436aed418aad92437e6ba4756c)

### Inferences
- Not viable for the Enigma hero model: generators output a single fused surface (keys, rotors, case welded together), approximate or hallucinated mechanical detail, illegible/garbled lettering baked into textures, dense unstructured topology needing retopology, and no pivots/hierarchy. An interactive Enigma needs exactly the things they lack (26 discrete keys, rotors on an axis, correct QWERTZ layout, legible letters). Historical accuracy is also an educational requirement.
- Reasonable uses: quick background props (barrel, chest, generic "old machine" silhouettes for bombe/Colossus dioramas), concept blocking to trace over in Blender, or generating a base mesh from a museum photo that is then cleaned. Always run through decimation + glTF-Transform; expect 100k-1M triangles raw.
- Licence fit: free-tier CC BY 4.0 outputs are compatible with a free non-commercial site and app given credit to Meshy/Tripo (same App Store DRM caveat as any CC asset, section 2); free-tier models are public. Copyrightability of AI output is uncertain in several jurisdictions, which matters little for this project.
- More productive "low-skill" route for the Enigma: primitive modelling in Blender (boxes, cylinders, arrays, bevel modifier, linked duplicates) from Crypto Museum photos and dimensions; the object is mostly boxes, cylinders and discs, and stylised-but-correct reads better at phone size than photoreal. An LLM-assisted Blender Python script (bpy) or Blender MCP workflow can generate the repetitive parts (26 keys in QWERTZ layout, lamp panel, plugboard grid) deterministically **[workflow suggestion, not sourced]**.

### Gaps
- No source found that tests 2026 generators on mechanical/hard-surface objects or on part-segmented output; claims of "part-aware" generation (e.g. part segmentation features in Meshy/Tripo/Hunyuan) were not verified.
- Current primary terms-of-service text for Meshy, Tripo and Rodin not read; the Meshy free-tier terms are contested between vendor help page and third-party guides.
- Sketchfab/Cults "No AI" licence riders seen on some listings (e.g. CGTrader, Cults3D) restrict AI training, not use; not analysed.

---

## 8. glTF to USDZ for a later native iOS / RealityKit version

### Takeaway
Keep GLB as the source of truth and convert late: several conversion routes exist (Apple's Reality Converter / USD tools, Blender's USD exporter, the open-source `guc`, three.js's USDZExporter, Sketchfab's auto-converted USDZ downloads), all lossy around materials and animation. If the iOS app is a web wrapper, no conversion is needed at all.

### Cited Findings
- Apple's Reality Converter imports glTF, OBJ and FBX and writes USDZ, with occasional fidelity issues; Apple's `usdzconvert` command-line tool converts glTF to USDZ and `usdARKitChecker` validates the output (2019-2020 write-ups; current status not confirmed). — [Monstarlab 2020](https://engineering.monstar-lab.com/en/post/2020/04/26/how-to-convert-3d-models-to-usdz-files-using-apples-reality-converter/), [Monstarlab 2019](https://engineering.monstar-lab.com/en/post/2019/10/07/Using-USDZ-for-a-better-AR-experience/)
- `guc` (pablode/guc): Apache-2.0 glTF-to-USD converter with MaterialX support, last pushed 2026-05-25 (maintained). — [GitHub](https://github.com/pablode/guc)
- Google's `usd_from_gltf` is archived (last push 2023-04). — [GitHub](https://github.com/google/usd_from_gltf)
- Sketchfab offers USDZ alongside glTF/GLB as download formats, and notes that anything unsupported by glTF will not be supported in the USDZ. — [Sketchfab help](https://help.sketchfab.com/en/articles/16152669-gltf-glb-and-usdz)
- Converters commonly drop animation clips and can shift scale because of differing unit conventions. — [AOUSD forum: USDZ-glTF pipeline](https://forum.aousd.org/t/usdz-gltf-usdz-pipeline/1352)

### Inferences
- Options ranked for this project:
  1. Ship the iOS app as a WKWebView/Capacitor wrapper around the same three.js/R3F app: zero conversion, identical behaviour, lowest effort for a solo developer. (R3F's peer deps also list react-native/expo-gl, so a React Native route with the same GLBs exists.) — [npm R3F](https://www.npmjs.com/package/@react-three/fiber)
  2. Native RealityKit: export USDZ from the same `.blend` via Blender's built-in USD exporter (File > Export > USD, `.usdz`) **[unverified in 5.2 manual this session]**, keeping the same object names/pivots; drive parts by entity name in Swift, mirroring the web code. Authoring from Blender avoids a glTF-to-USD hop.
  3. Convert GLBs with Reality Converter (GUI) or `guc`/`usdzconvert` in a script; validate in Quick Look.
  4. three.js `USDZExporter` (examples/jsm/exporters) can export a loaded scene to USDZ at build or run time, mainly for AR Quick Look; limited material support **[prior knowledge, unverified]**.
  5. Load glTF directly in a native app with a third-party loader (e.g. GLTFKit2) instead of converting **[prior knowledge, unverified]**.
- Expect to lose or redo: Meshopt/Draco compression (decompress first), KTX2/WebP textures (USDZ wants PNG/JPEG), KHR material extensions beyond basic metal-rough, custom `extras`, and procedural/canvas-texture lettering generated in three.js (would need re-implementing or baking). This argues for keeping the simulator logic (TypeScript Enigma core) rendering-agnostic and treating procedural objects as code to be ported, not assets.
- Licence carry-over: a USDZ made from a BY-NC-SA GLB is a format shift of the same work; same attribution and SA terms apply.

### Gaps
- Current (2026) status/version of Apple Reality Converter, `usdzconvert`, Reality Composer Pro import formats, and whether RealityKit now imports glTF natively: not verified from Apple documentation.
- Blender 5.2 USD/USDZ export capabilities and three.js r187 USDZExporter feature set: not read from primary docs.
- No testing data on how well multi-node animated/interactive hierarchies survive each converter.
