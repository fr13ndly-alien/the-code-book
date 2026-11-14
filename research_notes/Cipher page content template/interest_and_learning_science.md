# Interest and learning science for a single-cipher educational web page

Scope note: evidence gathered 2026-11-14. Most primary papers are paywalled; where a number comes from an abstract, a repository record or a secondary summary rather than the full text, it is marked (abstract), (secondary) or (unverified). Almost all of this evidence comes from classrooms, labs and MOOCs. I found no controlled studies of self-directed readers on free hobby websites, so every transfer to that setting is an inference.

## 1. How to open a page and sustain attention (situational vs individual interest, curiosity/information gap, narrative)

### Takeaway
Open with a short, concrete, human story that exposes a specific gap in the reader's knowledge ("how could this possibly be broken / how does it work?"), then close that gap with the explanation and the simulator; triggered interest is fragile and fades unless the page immediately gives the reader something to do with it. Narrative is better understood and remembered than exposition (g about 0.5), but the story has to carry the mechanism rather than sit beside it.

### Cited Findings
- Hidi & Renninger (2006, Educational Psychologist) describe four phases: triggered situational interest, maintained situational interest, emerging individual interest, well-developed individual interest. — [Swarthmore repository record](https://works.swarthmore.edu/fac-education/12)
- Triggered situational interest is typically sparked by the environment (examples given: puzzles, group work, technology), is usually externally supported, and "may fizzle as quickly as it is triggered" unless sustained; maintained interest is when the learner re-engages with the content; later phases involve learners generating and pursuing their own questions. The model is not strictly linear. (secondary summary) — [InformalScience.org summary](https://www.informalscience.org/four-phase-model-interest-development)
- Loewenstein (1994, Psychological Bulletin 116, 75-98) reinterprets curiosity as "a form of cognitively induced deprivation that arises from the perception of a gap in knowledge or understanding"; the abstract also notes curiosity's intensity, transience and tendency to disappoint once satisfied. (abstract) — [Loewenstein 1994 abstract record](https://stafforini.com/works/loewenstein-1994-psychology-curiosity-review/)
- Kang et al. (2009, Psychological Science, Loewenstein co-author): higher curiosity about trivia questions was correlated with better recall of surprising answers 1-2 weeks later, and curiosity increased memory-area activity when subjects had guessed incorrectly. Correlational, trivia materials. — [Kang et al. 2009 PDF](https://www.cmu.edu/dietrich/sds/docs/loewenstein/WickCandleLearning.pdf)
- Rotgans & Schmidt (2014, Learning and Instruction 32, 37-50) construe situational interest as a motivational response to a perceived knowledge deficit; only students who lacked the relevant knowledge showed a rise in situational interest after a problem was presented. (URL taken from search results, not opened; a later commentary argues their problems confounded knowledge gaps with surprise and narrative framing.) — [Erasmus repository record](https://repub.eur.nl/pub/92144)
- Brod & Breitwieser (2019, npj Science of Learning): asking people to generate a prediction before seeing the answer produced more high-curiosity ratings, and high curiosity was associated with better memory for the correct answer. (abstract) — [Brod & Breitwieser 2019](https://link.springer.com/article/10.1038/s41539-019-0056-y)
- Narrative vs expository text meta-analysis (Mar, Li, Nguyen & Ta 2021, Psychonomic Bulletin & Review): overall g = .55, 95% CI [.31, .79]; comprehension g = .48 [.21, .75]; memory g = .72 [.43, 1.01]; 150 effect sizes, 37 articles, 78 samples, 33,078 participants. Adults g = .44; reading g = .54. No moderator was significant. — [Mar et al. 2021, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8219577/)
- Caveats in the same paper: heterogeneity I² = 98%; Egger's test indicates publication bias overall and for memory; only 28% of effects came from studies that controlled content across genres (content-controlled g = .57 but CI [-.13, 1.27]); only 4 studies used delayed tests; the authors caution the results "should not be interpreted as a suggestion to force all information into a narrative form." — [Mar et al. 2021, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8219577/)
- Dahlstrom (2014, PNAS 111 Suppl. 4): for nonexpert audiences, research suggests narratives are easier to comprehend and more engaging than logical-scientific communication; narratives are also intrinsically persuasive, which raises accuracy/ethics considerations. This is a narrative review, not a meta-analysis. — [Dahlstrom 2014, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4183170)

### Inferences
- Opening section should be a short story with a named person, a concrete moment and stakes, ending on an explicit unanswered question about the mechanism. That is the trigger (Hidi & Renninger phase 1) and the information gap (Loewenstein) in one unit.
- The gap must be about the cipher's mechanism, not about a side character. A gap about an irrelevant fact is, by definition, a seductive detail (see section 2).
- Because curiosity is transient and "disappoints once satisfied", do not resolve the opening question in the opening. Resolve it after the reader has tried the simulator, and replace it with a new, smaller gap at each section boundary (e.g. "so why didn't a letter ever encrypt to itself?").
- A prediction prompt is the cheapest way to manufacture an information gap in a reader who does not yet know enough to be curious. Rotgans & Schmidt's finding that only those lacking the knowledge got more interested suggests the opening question should be one a novice cannot answer but can understand.
- "Maintained" interest in the model depends on re-engagement, so the page should end with a reason to come back or continue (next cipher, harder challenge) rather than a summary alone.
- The narrative advantage is robust in direction but its size is uncertain for content-matched material; treat "story is better" as well supported for comprehension and recall, and weakly supported for "story of X teaches mechanism of X better than a clear explanation".

### Gaps
- I did not retrieve Schraw & Lehman (2001) or Sadoski (2001) full texts, so the commonly cited text-based sources of situational interest (concreteness, vividness, coherence, ease of comprehension) are not sourced here beyond a citing paper's mention that vividness triggers interest.
- No effect size found for "story-first vs explanation-first" ordering on a web page.
- Golman & Loewenstein's later information-gap work and Gruber et al. (2014) on curiosity and incidental memory were not retrieved.
- No evidence found specific to history-of-technology or cryptography pages.

## 2. Mayer's multimedia principles and seductive details: mixing stories, anecdotes and images with explanation

### Takeaway
Interesting-but-irrelevant material reliably lowers learning, especially for novices and in short lessons, while segmenting, signaling, contiguity and a conversational voice reliably help. Anecdotes help when they are the explanation (the story demonstrates the mechanism or motivates the exact question being answered) and hurt when they compete with it.

### Cited Findings
- Mayer (2017, Journal of Computer Assisted Learning) median effect sizes (Cohen's d): coherence 0.70, signalling 0.46, redundancy 0.87, spatial contiguity 0.79, temporal contiguity 1.30, segmenting 0.70, pre-training 0.46, modality 0.72, personalization 0.79, voice 0.74, embodiment 0.36. (as reported in search result of the abstract record; not full text) — [Mayer 2017 record](https://zendy.io/title/10.1111/jcal.12197)
- Later tabulations give different medians for the same principles (coherence 0.86, signaling 0.69, segmenting 0.67-0.77); Mayer focuses on principles with median d above 0.40. These medians come largely from Mayer's own short lab lessons with immediate tests and should not be mixed across editions. — [Chartered College summary](https://my.chartered.college/?p=6958)
- Seductive details meta-analysis (Sundararajan & Adesope 2020, Educational Psychology Review 32(3), 707-734): learners given seductive details scored lower on learning outcomes than those without; WSU's release cites 58 studies and more than 7,500 students. — [WSU News](https://news.wsu.edu/2020/03/19/seductive-details-inhibit-learning/)
- Reported moderators from the same meta-analysis (secondary, not checked against the paper): the effect is "considerable" in lessons under 5 minutes and not statistically significant in lessons over 10 minutes; it appears wherever the details are placed (beginning, middle or end); it is larger for novices than for learners with prior knowledge; the lead author describes the overall effect as "fairly small". This source says 68 experiments, conflicting with WSU's 58 studies. — [Learning and the Brain blog](https://www.learningandthebrain.com/blog/seductive-details-when-do-cool-stories-and-videos-interfere-with-learning/)
- Segmenting meta-analysis (Rey et al. 2019, Educational Psychology Review 31, 389-419): 56 investigations, 88 comparisons; significant small-to-medium effects on retention and transfer for learner-paced, meaningful segments versus continuous presentation; high-prior-knowledge learners benefited more on retention. (abstract) — [Rey et al. record](https://is.tuebingen.mpg.de/publications/rey2018segmenting)
- Signaling meta-analysis (Alpizar, Adesope & Wong 2020, ETR&D): signaling associated with better learning, d = .38, moderated by study and presentation features. (abstract) — [Alpizar et al. record](https://bohrium.dp.tech/paper/arxiv/812517839771533313)
- Conversational style meta-analysis (Ginns, Martin & Marsh 2013, Educational Psychology Review 25, 445-472; 3,312 students): retention d = 0.30, transfer d = 0.54, perceived friendliness d = 0.46; small, non-significant effects in studies longer than 35 minutes. (abstract) — [Ginns et al. record](https://researchers.westernsydney.edu.au/en/publications/designing-instructional-text-in-a-conversational-style-a-meta-ana/)
- Emotional design meta-analysis (Brom, Starkova & D'Mello 2018, Educational Research Review; 33 samples, N = 2,924): appealing colours/anthropomorphic graphics on relevant content gave retention d+ = 0.387, comprehension d+ = 0.317, but liking/enjoyment only d+ = 0.109. (abstract; transfer figure not confirmed) — [Brom et al. manuscript](https://artemis.ms.mff.cuni.cz/main/papers/emodesign_manuscript_1rev_180928_FINAL_norev.pdf)

### Inferences
- Rule for every anecdote, image and aside: keep it only if deleting it would make the mechanism harder to understand or the driving question less clear. "Fun fact" boxes about people, dates or trivia unrelated to how the cipher works are the textbook seductive detail.
- The page's explanatory core is short (a few minutes), and readers are novices: that is exactly the condition where seductive details are reported to hurt most. Put historical colour that does not explain the mechanism in a clearly separated section after the explanation and practice (or in a collapsed "more history" block), not interleaved with it.
- The opening story is permitted by this evidence only if it is on-topic for the learning goal. For Enigma, "operators had to agree a daily setting, and one reused message key gave the codebreakers a way in" is explanatory; a commander's biography is not.
- Segmenting plus signaling translates to: one idea per section, a descriptive heading that states the point, reader-controlled progression (scroll or "next"), and bold only for the handful of terms being taught.
- Pre-training translates to: name and show the parts (rotor, reflector, plugboard) with labels on the 3D model before explaining how a keypress flows through them.
- Spatial and temporal contiguity translate to: labels on the model/simulator itself rather than in a legend, and the sentence explaining a step shown next to (and at the same time as) the step in the simulator. On a phone, never require scrolling between a diagram and the text that explains it.
- Personalization: write in second person, conversationally ("press A; notice that..."). The benefit shrinks in long lessons, which fits a short page.
- A 3D model is at risk of being a seductive detail itself if it is merely decorative. It earns its place when it is labelled and tied to steps of the explanation.
- The Brom result suggests visual polish helps learning a little but barely changes enjoyment, so polish should not be bought at the cost of clarity.

### Gaps
- Exact pooled g for Sundararajan & Adesope (2020) and for Rey (2012) not retrieved; the 58 vs 68 count conflict is unresolved.
- Mayer's medians are single-lab-dominated; I did not retrieve independent replications or the critiques in full.
- No direct evidence found on interactive 3D models for general readers; "3D as seductive detail" is my inference.
- Coherence/seductive-details research measures learning, usually immediately. It says little about whether removing colourful details reduces voluntary return visits, which matter on a hobby site. This tension is real and unresolved in what I found.

## 3. Try first, explain after; prediction; retrieval practice; challenges; feedback

### Takeaway
Letting people attempt a problem before the explanation, asking for a prediction, and following explanation with low-stakes retrieval and informative feedback are among the best-supported moves, with medium effects (roughly g 0.4-0.7). The benefits depend on the attempt being followed promptly by a clear explanation that addresses what the learner just tried.

### Cited Findings
- Sinha & Kapur (2021, Review of Educational Research): 53 studies, 166 comparisons of problem-solving-then-instruction (PS-I) versus instruction-then-problem-solving; significant, moderate effect favouring PS-I, larger (Hedges' g between 0.37 and 0.58) when designs followed Productive Failure principles with high fidelity; publication-bias-corrected estimate reported up to g = 0.87. Effects were on conceptual understanding and transfer. Younger learners (grades 2-5) and domain-general skills favoured instruction first. (abstract; wording of the abstract's ranges is confusing, so check before quoting) — [Sinha & Kapur 2021 record](https://ouci.dntb.gov.ua/works/4KnMgZq7)
- Pretesting/prequestions review (Pan & Carpenter 2023, Educational Psychology Review 35:97): guessing answers before learning often enhances learning even though many guesses are wrong; the benefit depends on studying the correct answer afterwards, and its size varies with procedure and outcome measure. No pooled effect size given in what I accessed. — [Pan & Carpenter 2023 PDF](https://sc-pan.github.io/pdf/PR_2023.pdf)
- A 2022 study in Memory found pretesting benefits were confined to the specific items pretested and did not spread to other material, which the authors say is inconsistent with a generalised state of curiosity. — [Plymouth research portal](https://researchportal.plymouth.ac.uk/en/publications/pre-testing-effects-are-target-specific-and-are-not-driven-by-a-g-2/)
- Prediction: generating a prediction raises curiosity and surprise at unexpected answers, with better memory for the correct answer. (abstract) — [Brod & Breitwieser 2019](https://link.springer.com/article/10.1038/s41539-019-0056-y)
- Retrieval practice: Adesope, Trevisan & Sundararajan (2017, Review of Educational Research) report practice tests beat comparison conditions at g = 0.61 (fixed) / 0.70 (random effects), 272 effect sizes from 118 articles (figures via secondary summary of the paper). — [Adesope et al. 2017 PDF](https://education.wsu.edu/documents/2018/01/rethinking-use-tests.pdf/)
- Rowland (2014) testing-effect meta-analysis: g = 0.50, 95% CI [0.42, 0.58] versus restudy, as cited in a 2021 paper. A blog-only claim that the effect is larger with feedback (g = 0.73) than without (0.39) is unverified. — [Pan & Sana 2021 PDF](https://sc-pan.github.io/pdf/PS_2021.pdf)
- Feedback meta-analysis (Wisniewski, Zierer & Hattie 2020, Frontiers in Psychology): 435 studies, 994 effect sizes, more than 61,000 participants; overall d = 0.48 with large heterogeneity; impact depends substantially on the information content of the feedback; larger for cognitive and motor outcomes than for motivational ones. — [Wisniewski et al. 2020](https://www.frontiersin.org/articles/10.3389/fpsyg.2019.03087/full)
- Puzzles are listed among typical triggers of situational interest. (secondary) — [InformalScience.org summary](https://www.informalscience.org/four-phase-model-interest-development)

### Inferences
- Recommended order for the core of the page: (a) a short "try it" with the simulator and a prediction question before any mechanism explanation, (b) the explanation, explicitly referring back to what the reader just saw, (c) a decode/encode challenge with feedback, (d) a few retrieval questions at the end.
- The "try first" task must be tiny and solvable-ish by a novice (for example: "type AAAA; predict what comes out; why is each letter different?"). Productive failure effects are for conceptual understanding and assume a well-designed consolidation step; an open-ended struggle with no follow-up on a hobby site is more likely to cause a bounce than learning. The reversal for younger learners is a warning for a teen audience: keep the attempt short and make "show me" always available.
- Pretesting benefits appear item-specific, so prediction prompts should target the exact ideas the page wants remembered (the two or three key properties of the cipher), not peripheral facts.
- Feedback should say why, not just right/wrong: show the correct path through the machine when the reader's answer is wrong. The information-content moderator is the main lever.
- End-of-page questions should require recall or application (e.g. "what changes after each keypress?"), stay ungraded and low-stakes, and reveal an explanatory answer immediately.
- Feedback's weaker effect on motivation than on cognition suggests it should be framed informationally rather than as praise or scores.

### Gaps
- No effect size found for productive failure or pretesting in voluntary, informal, online settings; all evidence is from instructed settings where learners cannot leave.
- Exact high-information feedback effect size from Wisniewski et al. not retrieved.
- Evidence on immediate vs delayed feedback timing was not retrieved.
- I found no meta-analytic evidence specific to puzzles/challenges as such, separate from retrieval practice, problem-solving-first or gamification.

## 4. Chunk length, reading level, concrete examples, worked examples and fading

### Takeaway
There is solid evidence for short, learner-paced segments, for worked examples for novices (g about 0.48) and for concise, scannable plain-language text, but there is no research-established optimal word count per chunk; specific numbers (six minutes, grade 8) are practitioner benchmarks from observational or small studies.

### Cited Findings
- Learner-paced, meaningful segments beat continuous presentation, with small-to-medium effects on retention and transfer across 56 investigations. (abstract) — [Rey et al. 2019 record](https://is.tuebingen.mpg.de/publications/rey2018segmenting)
- Guo, Kim & Rubin (2014, ACM Learning at Scale): in 6.9 million video-watching sessions across four edX courses, median engagement time peaked at about 6 minutes regardless of video length; they recommend segments shorter than 6 minutes. Observational, video not text, MOOC learners. — [Guo, Kim & Rubin 2014 PDF](https://up.csail.mit.edu/other-pubs/las2014-pguo-engagement.pdf)
- Nielsen & Morkes (1997): rewriting a web page to be concise improved measured usability by 58%, scannable layout by 47%, objective (non-promotional) language by 27%, and all three combined by 124%. Single small usability study from 1997, industry research rather than peer-reviewed. — [Nielsen Norman Group](https://www.nngroup.com/articles/applying-writing-guidelines-web-pages/)
- Australian Government Style Manual advises writing for broad audiences at about Australian Year 7 reading level and states this also helps higher-literacy users. Guidance, not an experiment. — [Australian Government Style Manual](https://www.stylemanual.gov.au/node/62)
- Worked examples meta-analysis (Barbieri et al. 2023, Educational Psychology Review; 55 studies, 181 effect sizes, mathematics): g = 0.48. Correct examples alone gave larger effects than incorrect examples or mixes; adding self-explanation prompts was associated with a smaller (negative moderator) effect. — [Barbieri et al. 2023](https://link.springer.com/content/pdf/10.1007/s10648-023-09745-1.pdf)
- Conversational wording benefits fade in lessons longer than 35 minutes. (abstract) — [Ginns et al. record](https://researchers.westernsydney.edu.au/en/publications/designing-instructional-text-in-a-conversational-style-a-meta-ana/)
- Seductive-detail harm is reported as strongest in lessons under 5 minutes. (secondary) — [Learning and the Brain blog](https://www.learningandthebrain.com/blog/seductive-details-when-do-cool-stories-and-videos-interfere-with-learning/)

### Inferences
- Template lengths should be set as editorial rules justified by direction of evidence, not as findings: one idea per section; each section readable in roughly a minute or two; whole explanatory core within a single short sitting. I would propose something like 60-150 words per section and a total of roughly 600-900 words of prose excluding the optional history, but those numbers are my judgment and not from any study.
- Aim for plain language around lower-secondary reading level (short sentences, define each term once on first use, no undefined jargon), since the audience includes teens and phone readers.
- Include one fully worked example of encrypting a single letter step by step, synchronised with the simulator, before asking the reader to do one alone. Then fade: a partially completed example, then an unaided challenge.
- Do not add "explain why" prompts to every step of the worked example; the Barbieri moderator suggests they can dilute the benefit. One reflective question at the end is enough.
- Use a correct worked example first. A "spot the mistake" example belongs later, if at all.
- Concrete before abstract: show a specific letter going through a specific setting before stating the general rule.

### Gaps
- No peer-reviewed evidence found for an optimal text chunk length (words or minutes) in self-paced web reading.
- No experimental evidence retrieved on reading grade level and engagement for hobby/educational sites; NN/g's lower-literacy study could not be opened.
- Worked-example evidence here is from mathematics; transfer to stepping through a cipher is plausible but untested. Evidence on fading specifically (Renkl, Atkinson) and the expertise-reversal effect was not retrieved.
- Concreteness-fading and "concrete examples" literature (e.g. Fyfe et al. 2014) not retrieved; the concrete-first recommendation is unsourced inference.

## 5. Gamification in informal learning (progress, badges, challenges)

### Takeaway
Gamification shows small-to-moderate average benefits (g about 0.25-0.5), but studies are short, heterogeneous and mostly from formal courses, element-level results for badges and leaderboards are inconsistent, and at least one well-known study found badges plus leaderboards reduced intrinsic motivation. Challenges and informational progress are the safer elements; competitive and reward-like elements are the risky ones.

### Cited Findings
- Sailer & Homner (2020, Educational Psychology Review 32): small positive effects on cognitive (reported as g = .49), motivational (g = .36) and behavioural (g = .25) learning outcomes across 38 publications / 40 experiments; the cognitive effect was stable in a high-rigor subsplit, the motivational and behavioural effects less so; game fiction and social interaction moderated behavioural outcomes; short study durations flagged as a limitation. (repository abstract; exact g values via secondary source) — [Sailer & Homner record](https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056)
- A 2022 meta-analysis reported overall SMD = 0.39 versus no gamification; badges alone 0.33, leaderboards alone 0.27, both combined 0.48. — [Korea Science PDF](https://koreascience.kr/article/JAKO202230853598218.pdf)
- A 2023 multilevel meta-analysis in programming education found badges, points, avatars and leaderboards had no significant effect; levels were the exception. — [ISCTE repository PDF](https://repositorio.iscte-iul.pt/bitstream/10071/29213/1/article_95533.pdf)
- A 2023 meta-analysis of 35 interventions on gamification and intrinsic motivation found a significant but small overall effect and describes earlier evidence as inconsistent. It is also the context in which search results described Hanus & Fox (2015, Computers & Education 80, 152-161): a course with badges and a leaderboard showed lower intrinsic motivation and lower final-exam scores than the same course without them. (Hanus & Fox details are secondhand; original not opened.) — [ETR&D 2023 meta-analysis](https://link.springer.com/10.1007/s11423-023-10337-7)
- Deci, Koestner & Ryan (1999) meta-analysis: expected tangible rewards contingent on task performance reduce intrinsic motivation, while effects depend on reward type; commentators note points/levels may act as informational feedback rather than tangible rewards, so the finding does not map cleanly onto gamification. (secondary) — [Gamification Research Network commentary](https://gamification-research.org/2014/08/gamification-absolved-2/)

### Inferences
- Contested area. The average effect is positive but the element-level evidence does not support badges or leaderboards as dependable, and the hobby-site reader is already there by choice, which is the condition where reward-like elements have the most intrinsic motivation to undermine.
- Safe set for the template: a visible progress indicator through the page's sections; an optional graded challenge ladder (easy, medium, hard message to crack) with informative feedback; completion marks that describe what the reader can now do ("you decrypted a message with a 3-rotor machine").
- Avoid: leaderboards, points, streaks, timers by default, and anything requiring an account. Anything competitive should be opt-in.
- "Game fiction" moderating behavioural outcomes fits the narrative frame: casting the challenge as intercepting and decrypting a message from the opening story is supported in direction and reuses the story rather than adding decoration.
- Keep challenges mechanically identical to the learning goal (decrypt, find the setting), so the game element is the retrieval/practice activity rather than a layer on top of it.

### Gaps
- No studies found of gamification on free, anonymous, single-visit educational pages; novelty effects and short durations limit even the classroom evidence.
- Progress bars specifically: no learning-outcome evidence retrieved.
- Sailer & Homner's full moderator tables could not be read (PDF did not parse); exact CIs unverified.
- Hanus & Fox (2015) is a single quasi-experimental classroom study and was not read directly.
