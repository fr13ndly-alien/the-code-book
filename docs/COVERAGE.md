# Coverage: the book against the site

This table lists everything the abridged edition of *The Code Book* presents (all 261 pages of the PDF), and where the site covers it. It was made by reading the book in full, in three parts, and opening the site's pages to find each item.

How to read it:

- **Book explains how it works?** "yes" or "partly" means the book gives enough to build from. "named only" means the book mentions it and moves on.
- **Interactive?** "yes" means the reader can operate it in a simulator. "text" means the story describes it.
- Everything the book explains has a place on the site. Things it only names have no simulator unless a page says otherwise.
- Some pages go beyond this edition, using the full edition or named sources: Lucifer, digital signatures, ADFGVX, the one-time pad, Playfair, the homophonic cipher, Morse code and Linear B (marked "Full edition" in the menu), and the mechanisms of Purple, Lorenz, quantum cryptography and the key exchange.

Update this file when a page is added or changed.

## Pages 1 to 95, with appendices A to D

| Book item | PDF page(s) | Book explains how it works? | Site page (slug) | Where on the page | Interactive? |
|---|---|---|---|---|---|
| Enciphered dedication ("XICYIQKMHR, VOIR RFH LKRQT") | 6 | named only (printed, never explained) | none | not built: named only | - |
| Demaratus' wax tablets (writing under the wax) | 17-18 | yes | hidden-writing | "Blank, or is it?" and "Under the wax" (presets `tablet`, `waxed`); "The woman who said 'scrape it'". Also hook of rail-fence, DigDeeper in pinprick | yes |
| Histaiaeus' shaved-head messenger | 18 | yes | hidden-writing | Hook "A message under the hair"; also rail-fence "Two ways to keep a secret", pinprick DigDeeper "Wax, silk and a shaved head" | text |
| Steganography defined, and its weakness (found = read) | 18-19 | yes | hidden-writing | "Hide the message, not the meaning"; "The guard who checks everything" (preset `searched`, guard set to Thorough) | yes |
| Chinese silk ball coated in wax and swallowed | 19 | yes | hidden-writing | DigDeeper "Silk, wax and a strong stomach" | text |
| Invisible ink (Pliny's tithymalus sap, heat chars it; urine) | 19 | yes | hidden-writing | "Ink that waits for heat" (preset `letter`: Let the ink dry / Warm the page); DigDeeper "Silk, wax and a strong stomach"; challenge `sheet` | yes |
| Cryptography vs steganography; encryption defined | 19-20 | yes | hidden-writing; rail-fence; pinprick | hidden-writing "Hide the meaning instead"; rail-fence "Moving, not changing" and final Check; pinprick "Hidden, not scrambled" | text |
| Transposition as an anagram; random jumbling (35 letters, 5x10^31 arrangements) needs an agreed system | 20 | yes | rail-fence | "Moving, not changing"; "Why a pattern is needed" (the three-letter "cow" illustration is not repeated) | text |
| Rail fence transposition (two rails, worked example "THY SECRET IS THY PRISONER...") | 20-21 | yes | rail-fence | "Write on two lines"; preset `book` "Load the book's example"; presets `zigzag`, `caught`; brute-force list `intercepted` | yes |
| Spartan scytale (device; Figure 2 "send more troops to southern flank and") | 21-22 | yes | scytale | "Unwind the strip" (preset `book`), "The thickness is the key" (preset `wrongStaff`), "Try another stick" (preset `belt`) | yes |
| Scytale strip worn as a belt (steganographic twist); Lysander's messenger, 404 BC | 21-22 | yes | scytale; hidden-writing | scytale hook "The messenger's belt" and "Sparta's cipher stick"; hidden-writing DigDeeper "A belt and a beer barrel" | text |
| Kama Sutra letter-pairing substitution ("meet at midnight" = CUUZ VZ CGXSGIBZ) | 22 | yes | kama-sutra | "Find the partner" (preset `book` with the book's pairs), "The same swap reads it back" (preset `reply`), "Shuffle the pairs" | yes |
| Substitution vs transposition; plaintext / ciphertext defined | 22-23 | yes | kama-sutra; scytale; caesar | kama-sutra "Swap each letter for its partner" and final Check; scytale "Change the letters instead"; caesar "Plain and cipher" | text |
| Caesar's Greek-for-Roman letter substitution (letter thrown on a spear to Cicero) | 23 | partly | caesar | Hook "A letter on a spear"; DigDeeper "Caesar's other cipher" | text |
| Caesar shift cipher (shift of 3, plain and cipher alphabets, "I came, I saw, I conquered") | 23-24 | yes | caesar | "Slide the alphabet" (preset `caesar`), "Plain and cipher", "Three places down" | yes |
| Algorithm and key; Kerckhoffs' principle | 24-25 | yes | caesar | "The method and the key"; also Further reading of keyword-substitution | text |
| Brute-force attack on the 25 Caesar keys | 24-26 | yes | caesar | "Twenty-five guesses" (preset `intercepted`, "Try every shift at once"); challenge. Also codebreakers-challenge shift list | yes |
| General monoalphabetic substitution (any rearrangement, 4x10^26 keys; Figure 5 "beware the ides of march") | 24-26 | yes | keyword-substitution | "A truly jumbled alphabet"; simulator plain/cipher rows; caesar "More keys". Figure 5 plaintext is the caesar challenge answer | yes |
| Keyword / keyphrase cipher alphabet (JULIUS CAESAR gives JULISCAER...) | 26-27 | yes | keyword-substitution | "One phrase, one alphabet" (preset `julius`), "Building it from a keyword" (preset `blank`), "Reading it back" (preset `reply`) | yes |
| Arab administrators' ciphers; cipher alphabets made of symbols (a = #, b = +); "monoalphabetic" defined | 29 | yes | keyword-substitution | "A thousand years on top"; DigDeeper "Two twists on the cipher alphabet" | text |
| Cryptanalysis defined; al-Kindi's frequency analysis (count, rank, match; Table 1 English frequencies) | 29-33 | yes | frequency-analysis | "Counting in Baghdad", "Count, rank, match" (bars against English outlines; preset `byRank`), "The philosopher of the Arabs" | yes |
| Limits of frequency analysis: short texts (the "zebras" sentence), under 100 letters | 33 | yes | frequency-analysis | "Close, but not right"; final Check (ten-letter message). The zebra sentence itself is not quoted | text |
| Perec's La Disparition / Adair's A Void, the novel with no e (Appendix A) | 33, 254 | yes | frequency-analysis | DigDeeper "The novel with no letter E" with preset `lipogram` (our own e-less passage) | yes |
| Worked cryptanalysis of a monoalphabetic ciphertext, step by step (Tales from the Thousand and One Nights) | 34-40 | yes | frequency-analysis | Whole simulator: presets `intercepted`, `byRank`, `started`. Our own passage, enciphered with the same cipher alphabet as the book's example (O = e, X = a, Y = i, B = h) | yes |
| Neighbour analysis: vowels touch most letters, consonants avoid many (O, X, P table) | 35-36 | yes | frequency-analysis | "Letters have personalities" and its Check; the board reports how many different letters a picked cipher letter touches | yes |
| Double letters (OO vs XX, ee more likely than aa); Appendix B tip 2 | 36, 256 | yes | frequency-analysis | "Letters have personalities" (the usual pairs SS, EE, TT, FF, LL, MM, OO); also kama-sutra preset `pattern` | yes |
| One-letter words a and i; Appendix B tip 3 (short words, "the" and "and") | 37, 256 | yes | frequency-analysis | "Letters have personalities" (preset `started`: find X and Y standing alone); "Close, but not right" (the word "the"); codebreakers-challenge first Check | yes |
| h comes before e but rarely after (asymmetry table) | 37 | yes | frequency-analysis | "Letters have personalities"; the Try in "Close, but not right" (cipher B = h) | yes |
| Removing word spaces to hinder the codebreaker | 37 | partly | codebreakers-challenge | Check on the message with no spaces ("no one-letter words to guess") | text |
| Guessing whole words from partly solved text (Lhe, aPV, "thoMsand and one niDhts") | 38-39 | yes | frequency-analysis | "Close, but not right"; "Too faithful to hide" (preset `started`, "Carry on from E, T and H") | yes |
| Recovering the keyphrase from the partial cipher alphabet (VOIDBY = A VOID BY GEORGES PEREC, started three places in) | 39-40 | yes | frequency-analysis; keyword-substitution | ADDED: DigDeeper "A half-found key can finish itself" in frequency-analysis/story.mdx. Already present: keyword-substitution DigDeeper "Two twists on the cipher alphabet" (the offset keyphrase) | text |
| Appendix B tips 1 and 4: identify the language from the frequencies (German e = 19%, Italian); tailor the table (military messages) | 255-256 | yes | frequency-analysis | DigDeeper "More clues codebreakers use" (German and military text; Italian figures not repeated) | text |
| Appendix B tip 5: cribs (al-Khalil, "In the name of God") | 256 | yes | frequency-analysis | DigDeeper "More clues codebreakers use" | text |
| Monks searching the Bible for hidden meanings; the Bible code, equidistant letter sequences, McKay's Moby Dick test (Appendix C) | 40, 257 | yes | bible-code | "Start, skip, read" (presets `rain`, `fifth`, `shot`, `notice`), "An old hunt, a new book", "The whale that predicted murders" | yes |
| Giovanni Soro and the rise of European cryptanalysis | 41 | named only | frequency-analysis | "Too faithful to hide" (one paragraph) | text |
| Nulls (meaningless symbols; numbers 1-99 example) | 42 | yes | mary-queen-of-scots; frequency-analysis | mary "Signs that mean nothing" (preset `nulls`, "Null pattern" control); frequency-analysis "Too faithful to hide" | yes |
| Codes and codewords (word-level substitution; "assassinate the king tonight" example); code vs cipher, encode / encipher terms | 42-43 | yes | mary-queen-of-scots | "Signs for whole words" (definitions; "Word signs" On/Off control; the book's nine-word sample code is not reproduced) | yes |
| Why codes are impractical: the codebook and its capture | 43-44 | yes | mary-queen-of-scots | DigDeeper "Why not use a code for everything?" | text |
| Nomenclator (cipher alphabet plus a short list of codewords) and how it is broken | 44-45 | yes | mary-queen-of-scots | "Signs for whole words"; "The man who counted the signs" | yes |
| Gifford's beer-barrel bung (steganography) | 51-52 | yes | mary-queen-of-scots; hidden-writing | mary "Letters in a beer barrel"; hidden-writing DigDeeper "A belt and a beer barrel" | text |
| Mary's nomenclator (Figure 7: 23 letter signs, 35 word signs, 4 nulls, the "dowbleth") | 52-53 | yes | mary-queen-of-scots | "Three tricks on one sheet" (presets `postscript`, `plain`, `nulls`); key on the board; stand-in signs, 12 of the 35 word signs | yes |
| Walsingham's interception: letters opened, copied and resealed | 54 | partly | mary-queen-of-scots | "Letters in a beer barrel" | text |
| Phelippes' decipherment (frequency count, backtracking, setting nulls aside, codewords from context) | 54-55 | yes | mary-queen-of-scots | "The man who counted the signs" (preset `intercepted`, frequency chart) | yes |
| The forged postscript (Figure 8), decipherable with the nomenclator | 55-56 | yes | mary-queen-of-scots | "The man who counted the signs"; presets `postscript` and `intercepted` hold the opening of the postscript | yes |
| Alberti's idea: two or more cipher alphabets used in turn ("hello" = AFPAD) | 60-62 | yes | vigenere; cipher-disc | vigenere hook "A walk in the Pope's garden" and "The square" (first paragraph); cipher-disc "turn it during the message" (the disc simulator switches alphabets). The hello/AFPAD example is not reproduced | yes (cipher-disc); text (vigenere) |
| Vigenere square and keyword (WHITE, "divert troops to east ridge") | 62-66 | yes | vigenere | "One letter, many disguises" (preset `white`), "The keyword picks the row" (preset `troops`), "Reading it back" (preset `receive`) | yes |
| One row only = a Caesar shift | 63 | yes | vigenere | "The square" (preset `oneLetter`) | yes |
| Why Vigenere resists frequency analysis (Z stands for d, r and s; oo = HS); huge number of keys; monoalphabetic vs polyalphabetic | 65-67 | yes | vigenere | Checks in "Try it" and "Reading it back"; "The square"; "The diplomat who retired to study" | yes |
| Le chiffre indechiffrable; the telegraph makes the cipher popular | 67 | partly | vigenere | "The diplomat who retired to study" | text |
| Pigpen cipher (Appendix D; Freemasons, four grids, broken by frequency analysis) | 67, 258 | yes | pigpen | "Sketch a letter" (preset `masons`), "Lines, corners and dots", "Count the boxes" (preset `riddle`, the appendix's own riddle) | yes |
| Babbage's Difference Engines and Analytical Engine | 68-70 | partly (not a cipher device) | babbage | "The man who wanted steam to do sums" (calculating machines, the 1821 tables; engines not named) | text |
| Thwaites' challenge to Babbage | 70-72 | yes | babbage | Hook "The dentist's dare" | text |
| Repeating keyword gives repeated ciphertext (KING; "the sun and the man in the moon", BUK twice, eight apart) | 72-73 | yes | vigenere | "The keyword comes round again" (preset `repeats`) | yes |
| Babbage's step 1: repeated sequences, spacings and factors give the key length (Figure 12, Table 6) | 73-76 | yes | babbage | "Look for an echo", "Why repeats appear", "The spacing gives the length" (repeats table with ticks; presets `intercept` and `book` = Figure 12) | yes |
| Babbage's step 2: split into Caesar-shifted columns, match each frequency chart to English (Figures 13-16; keyword EMILY; Tennyson's "The Vision of Sin") | 76-82 | yes | babbage | "Five easy ciphers" (preset `letters`), "One letter at a time"; DigDeeper "The book's own example" (preset `book`) | yes |
| Kasiski test; why Babbage kept silent (Crimean War) | 82-83 | yes | babbage | "A secret for nine years" | text |
| Agony-column ciphers; Wheatstone and Babbage deciphering them ("Dear Charlie") | 83-84 | partly (cipher not specified) | babbage; playfair; pinprick | babbage challenge "The agony column" (preset `agony`, our own Vigenere note); playfair "Wheatstone's cipher, Playfair's name"; pinprick "Two thousand years of pins" and "Hide the meaning instead". The "Dear Charlie" exchange is not retold | yes (babbage challenge); text elsewhere |
| Pinprick encryption (Aeneas the Tactician; Victorian newspapers sent post-free) | 84-85 | yes | pinprick | "Find the holes" (preset `meeting`, "Held up to the light"), "Pricking in order" (presets `blank`, `hand`), "Two thousand years of pins" | yes |
| Verne's runic cryptogram in Journey to the Center of the Earth (substitution, then read backwards); Mathias Sandorff | 85 | partly (Sandorff named only) | dancing-men | "Verne's two locks" (preset `verne`, Step control); "When ciphers became entertainment" | yes |
| Conan Doyle's dancing men (one stick-man pose per letter; Figure 17) | 85-86 | partly | dancing-men | "A stick man for every letter" (presets `slaney`, `blank`, `trap`), "Holmes counts the dancers" (preset `desk`) | yes |
| Poe's newspaper challenge (monoalphabetic ciphers solved by frequency analysis) | 85 | partly | dancing-men | "When ciphers became entertainment" | text |
| Poe's "The Gold Bug" (invisible ink by the fire; frequency analysis of Kidd's cipher) | 86 | partly | dancing-men | DigDeeper "Invisible ink by the fire"; "Holmes counts the dancers" (Legrand's 8 = e) | text |
| The Beale ciphers: the story and the three sheets of numbers (Figures 19-21) | 86-95 | yes | beale | Hook "The box in the hotel safe"; "Twenty years of failure"; DigDeepers "Where the gold came from", "Was it all a hoax?"; preset `beale` (opening of the second sheet) | yes |
| Book cipher (number the words of a keytext; each number = first letter of its word; several numbers per letter) | 95 | yes | beale | "Number every word", "Many numbers for one letter" (presets `beale`, `word`: BEALE enciphered on the Declaration keytext; the book's one-sentence keytext is mentioned, not loaded), "Try every book you own" (preset `hunt`) | yes |

## Pages 96 to 190

| Book item | PDF page(s) | Book explains how it works? (yes / partly / named only) | Site page (slug) | Where on the page (section heading, DigDeeper title, preset or simulator feature) | Interactive? (yes = the reader can operate it in the simulator; text = described in the story only) |
|---|---|---|---|---|---|
| Book cipher: number the words of a keytext, each number = first letter (worked example enciphering "beale") | 96 | yes | beale | "Number every word", "Many numbers for one letter"; preset `word` (enciphers BEALE, with the Declaration rather than the book's short sentence), "Pick different numbers" | yes |
| Second Beale cipher deciphered with the Declaration of Independence (115 = instituted = i, 73 = hold = h; full plaintext) | 96-98 | yes | beale | "What does 115 mean?", "Try every book you own"; presets `beale`, `hunt` (wrong keytext first, then Declaration) | yes |
| Errors in Beale's sheet: word 95 inalienable / unalienable | 97 | yes | beale | "Gaps and slips"; preset `slips` (card 95 picked) | yes |
| Unbroken first and third Beale ciphers; theory of a private, one-off keytext | 99-101 | partly | beale | "Try every book you own" (last paragraphs), "A key too big to use every day" | text |
| Treasure hunters and false decipherments (Hart brothers, dynamite; Friedman, Hammer, NSA rumours) | 99-101 | named only | beale | "Try every book you own" (dynamite sentence only; the names are not given) | text |
| Beale hoax theory: Kruh's comparison of writing styles; Viemeister's record search | 101-103 | partly | beale | DigDeeper "Was it all a hoax?"; Further reading (Viemeister) | text |
| Zimmermann telegram: a diplomatic code (words to number groups) | 106-108 | partly | zimmermann | "Words, not letters", "Only what is in the book", "The same word, the same number"; presets `offer`, `blank`, `repeat`; codebook on the desk | yes |
| Cutting Germany's cables (Telconia) to force interception | 108 | yes | zimmermann | "The cables on the sea bed" | text |
| Montgomery's postcard: address as a Bible reference (1 Kings 18:4) | 108-109 | yes | zimmermann | DigDeeper "The postcard with an impossible address" | text |
| Room 40's decipherment of the telegram (building on earlier analysed telegrams, partial recovery) | 109 | partly | zimmermann | "Filling the book, one word at a time"; preset `room40` (break mode, guess unknown groups); Challenge | yes |
| Hall hiding the source of the telegram before release | 110-111 | partly | zimmermann | "Filling the book, one word at a time" (Hall's safe, the Mexico copy) | text |
| Alberti cipher disc used as a Caesar shift (A to B = shift 1, A to F = shift 5) | 112 | yes | cipher-disc | "Turn the inner ring", "Outside plain, inside cipher"; preset `five`; brute force preset `caught` | yes |
| Cipher disc turned during the message: polyalphabetic, keyword LEON on "goodbye" (g to R, o to S) = Vigenere | 113-114 | yes | cipher-disc | "Turn it as you go", "A keyword says where to turn"; presets `turning`, `leon` | yes |
| Cipher disc as a "scrambler"; still a Vigenere, broken by Babbage and Kasiski | 113-114 | yes | cipher-disc | "Five centuries of service", "Still a Caesar, still a Vigenere" (links to babbage) | text |
| Enigma basic layout: keyboard, scrambler, lampboard; one fixed scrambler = monoalphabetic (six-letter example, cafe to DBCE) | 114-116 | yes | enigma | "A keyboard, some wheels and a row of lamps" (the 3D model is the full 26-letter machine; the book's six-letter toy and DBCE are not reproduced) | yes |
| Rotating scrambler: new alphabet each letter (b six times gives ACEBDC) | 116-117 | yes | enigma | "Press one key three times" (preset `fresh`, A three times), "The rotors turn" | yes |
| Second and third scramblers, odometer stepping, 26 x 26 x 26 = 17,576 | 117-120 | yes | enigma | "The rotors turn" (Try: set right rotor to V, middle rotor steps) | yes |
| Reflector: reciprocal encipherment, same machine deciphers | 120-122 | yes | enigma | "The reflector sends the current back" | yes |
| Codebook and daily key; operating procedure | 121-122, 132-133 | yes | enigma | DigDeeper "How the Germans used keys each day"; Challenge "Read a message with the day key"; preset `dayKey` (rotors 2-3-1, Q-C-W, cables A/L P/R T/D B/W K/F O/Y, the book's example) | yes |
| Brute force on scrambler positions alone (17,576, about two weeks for one person) | 122 | yes | cracking-enigma | "Testing every setting" (button "Test 17,576 rotor settings"); the two-week figure is not quoted | yes |
| Interchangeable scramblers (6 orders) | 123 | yes | enigma | "Counting the keys"; rotor order selectors in the controls | yes |
| Plugboard: six cables swap six pairs | 123-124 | yes | enigma | "The plugboard swaps letters" (tap sockets on the model) | yes |
| Number of Enigma keys: 17,576 x 6 x 100,391,791,500, about 10^16; why scramblers and plugboard are both needed | 124-126 | yes | enigma | "Counting the keys" and its Check | text |
| Ring setting | 125 | named only | (none) | not built: named only (engine settings carry `rings`, fixed at 0; no control and no mention in the story) | - |
| Hans-Thilo Schmidt's documents; replica machine; security rests on the key, not the machine | 130-132 | yes | enigma | "Sold for 10,000 marks"; also cracking-enigma "Fear, mathematics and a spy" | text |
| Day key and message key; message key typed twice (PGHPGH to KIVBJE) | 133-135 | yes | cracking-enigma | "The key that was sent twice"; enigma DigDeeper "How the Germans used keys each day"; the reader can type a doubled key on the enigma model with preset `dayKey` | yes |
| Rejewski: table of 1st/4th-letter relationships and chains (worked example with chains of 3, 9, 7, 7 links) | 136-138 | yes | cracking-enigma | "From pairs to chains"; presets `chains`, `follow`; "Compare letters" 1 and 4 / 2 and 5 / 3 and 6 (engine-made chains for the book's day key, not the book's table) | yes |
| Chain lengths independent of the plugboard (swap S/G for T/K example) | 139-140 | yes | cracking-enigma | "Pull out a cable", "A fingerprint of the rotors" (pull out a cable, lengths stay) | yes |
| Catalogue of chain lengths for 105,456 scrambler settings | 140-141 | yes | cracking-enigma | "A fingerprint of the rotors" (step a rotor and watch the lengths change; the catalogue itself is described) | text |
| Finding the plugboard: type with no cables, read near-German ("alliveinbelrin") | 141-142 | yes | cracking-enigma | Check "The catalogue gave the rotor settings. How did Rejewski then find the cables?" | text |
| Rejewski's bombes (six machines, one per scrambler order, about two hours) | 143-144 | partly | cracking-enigma | "Fear, mathematics and a spy" | text |
| Langer hiding Schmidt's 38 months of day keys | 144-146 | yes | cracking-enigma | DigDeeper "The keys in the desk drawer" | text |
| Enigma strengthened: 5 scramblers (60 orders, Table 7), 10 cables, 159 x 10^18 keys | 145-146 | yes | cracking-enigma | "Fear, mathematics and a spy" (text; the 159 x 10^18 figure is not quoted); enigma simulator offers rotors I-V and up to 10 cables | yes |
| Cillies: predictable message keys (QWE, BNM, repeated initials) | 151-152 | yes | cracking-enigma | "A hut full of knitting needles" | text |
| Turing's cribs (wetter in the 6 a.m. weather report) | 153-154 | yes | cracking-enigma | "A guessed word"; preset `weather`; also enigma "Turing and the weather" | yes |
| Turing's bombe: test scrambler settings against a crib | 154-155 | partly | cracking-enigma | "Testing every setting" (button "Test 17,576 rotor settings"), "A hut full of knitting needles"; DigDeeper "How the bombe beat the plugboard"; Challenge preset `night` | yes |
| Crib alignment: no letter enciphers to itself, slide the crib (wetternullsechs example) | 155-156 | yes | cracking-enigma | "A guessed word" ("Crib starts at letter" stepper, clashes lit); enigma Check on ORFEZ MSGNB (own ciphertext, not the book's) | yes |
| Ultra: using decrypts without revealing the break (spared U-boats, spotter planes, fake sightings) | 156-158 | yes (operational practice, not a cipher) | cracking-enigma | DigDeeper "Keeping the break a secret" | text |
| Purple, the Japanese cipher machine | 161, 165 | named only | purple | Whole page (built from the full edition and other sources); navajo "It never was" names it | yes |
| Midway decrypt (June 1942) | 161 | named only | purple | "The diplomats' machine" (notes that the Midway orders were in the naval code JN-25, not Purple) | text |
| American cipher machines "similar to Enigma", never cracked, too slow for the field | 162 | named only | navajo | "Nothing on paper" (a cipher machine needed every letter typed and written down); machine itself not built: named only | text |
| Navajo as a code: the language as a barrier (Na-Dene family, verb structure) | 163, 168-169 | yes | navajo | "A language as a wall" | text |
| Choctaw code talkers of the First World War and their flaw | 164 | yes | navajo | DigDeeper "An earlier try, and its flaw" | text |
| Navajo lexicon: 274 code words (birds for planes, fish for ships; owl, frog, iron fish) | 164-165 | yes | navajo | "Say submarine in Navajo", "Birds for planes, fish for ships"; presets `start`, `lexicon`; DigDeeper "Owl or hummingbird?" | yes |
| Navajo alphabet code (Table 8); Pacific spelled pig, ant, cat, ice, fox, ice, cat | 165-166 | yes | navajo | "Spelling out the rest"; presets `pacific`, `overheard`; Challenge preset `heard` | yes |
| Navajo code memorised, no codebook; tested by navy intelligence; never broken | 165, 171 | yes | navajo | "Nothing on paper", "It never was" | text |
| "White code" mechanical cylinder device raced by a code talker | 167 | named only | navajo | "An idea from childhood" (a code talker raced a cipher machine); device not built: named only | text |
| American air force code broken by the Japanese | 171 | named only | (none) | not built: named only | - |
| Egyptian scripts: hieroglyphs, hieratic, demotic, Coptic | 173-174 | partly | hieroglyphs | DigDeeper "Three scripts and a picture puzzle"; "Why nobody had tried" | text |
| Kircher's semagram (picture-writing) readings; semagrams v phonograms | 174, 178 | yes | hieroglyphs | "Why nobody had tried" | text |
| Rosetta stone as a crib (Greek, demotic, hieroglyphs); the three hurdles | 175-178 | yes | hieroglyphs | "A stone in a wall", "The ring around a king"; DigDeeper "A damaged crib" | text |
| Young: cartouche of Ptolemaios, sound values sign by sign (Table 9) | 179-180 | yes | hieroglyphs | "One sign, one sound", "The ring around a king"; preset `start`; assign sounds to the top ring | yes |
| Young: cartouche of Berenika from Karnak, feminine ending (Table 10) | 180-181 | partly | hieroglyphs | ADDED: DigDeeper "Young's second name: Berenika" (in "Why nobody had tried") | text |
| Young's retreat: sounds only for foreign names (Chinese comparison) | 181-182 | yes | hieroglyphs | "Why nobody had tried" (last paragraph; the Chinese comparison is not given) | text |
| Lenoir's supposed complete decipherment | 184 | named only | (none) | not built: named only | - |
| Champollion: Ptolemy and Cleopatra cartouches from the Bankes obelisk (Table 11), two signs for t | 183-184 | yes | hieroglyphs | "A second name tests the first"; preset `ptolemy` (sounds spill into Cleopatra's ring) | yes |
| Champollion: Alexander cartouche (a-l-?-s-e-?-t-r-?, Table 12), omitted vowels | 184-185 | yes | hieroglyphs | Challenge "Name the conqueror"; preset `alexander` | yes |
| Champollion: Rameses cartouche from Abu Simbel, Coptic "ra" for the sun | 185-186 | yes | hieroglyphs | "A sun that says ra"; preset `rameses` | yes |
| Rebus principle (bee + leaf = belief) | 186 | yes | hieroglyphs | "A sun that says ra"; DigDeeper "Three scripts and a picture puzzle" | text |
| Champollion's four principles (Coptic language, semagrams, rebus, phonetic alphabet) | 187 | yes | hieroglyphs | "A sun that says ra" (Coptic, rebus, sounds), "Why nobody had tried" (semagram, phonogram); not listed as four points | text |
| Hieroglyphs standing for two or three consonants | 187 | partly | hieroglyphs | ADDED: DigDeeper "Signs worth two or three letters" (in "A sun that says ra") | text |
| Lorenz cipher (SZ40), "similar to Enigma but far more complicated" | 189 | named only (mechanism not explained in this edition) | lorenz | "Five holes for every letter", "Add a key, hole by hole"; presets `start`, `letter`, `blankTape`, `intercepted` (mechanism taken from museum sources) | yes |
| Breaking Lorenz: Tiltman and Tutte's discovery; by-hand breaking; Newman's design | 189-190 | partly | lorenz | "The message sent twice", "A machine nobody had seen", "Speed, then a computer" | text |
| Colossus: 1,500 valves, programmable, built by Flowers, delivered December 1943, plans burned | 189-190 | partly | lorenz | "Speed, then a computer", "A secret computer" | text |

## Pages 191 to 261, with the challenge and appendix E

| Book item | PDF page(s) | Book explains how it works? | Site page (slug) | Where on the page | Interactive? |
|---|---|---|---|---|---|
| Colossus lost, ENIAC taken for the first computer | 191 | named only | lorenz | "The story" closing paragraphs (Colossus broken up; ENIAC, 1945, eighteen thousand valves) | text |
| Computers searching through all possible keys (brute force) | 191 | named only | lucifer (also caesar) | lucifer DigDeeper on the 56-bit key; "Try every key letter, A to Z" panel; caesar "brute-force attack" | yes (lucifer key search panel) |
| Three differences between computer and mechanical encryption | 191-192 | partly | binary | "From government rooms to offices" (first paragraph) | text |
| ASCII: 7-bit binary numbers for characters (Table 13; a, !, 128 patterns) | 192-193 | yes | binary | "What a computer sees"; "Letters become numbers"; preset `ascii` | yes |
| Binary addition cipher (same = 0, different = 1): HELLO with key DAVID, and its reversal | 193-194 | yes | binary | "Add the key", "Add it again"; presets `hello`, `back` (book's exact ciphertext); `known` shows the known-plaintext weakness | yes |
| Spread of computers (transistor 1947, Ferranti 1951, IBM 1953, integrated circuit 1959) | 194 | named only | binary | "From government rooms to offices" | text |
| Key distribution problem (bank dispatch riders, Enigma key books, catch-22) | 194-195, 200-201 | yes | binary; key-exchange | binary hook "Riders with locked briefcases" and "The key is the problem"; key-exchange hook "Riders with locked cases" | text (binary challenge has the reader use a delivered key) |
| Alice, Bob and Eve | 201 | yes | key-exchange | "Three steps to a secret": three-column simulator (Alice, public, Bob) with Eve | yes |
| Double-padlock box (Alice locks, Bob locks, Alice unlocks, Bob unlocks) | 201-203 | yes | key-exchange | "The box with two padlocks" | text (preset `agreed` shows order not mattering in the arithmetic) |
| "Last on, first off" rule (shoes and socks) | 203 | yes | key-exchange | "The box with two padlocks", last paragraph | text |
| Asymmetric cipher concept: public key and private key, replica-padlock analogy | 203-206, 211, 214 | yes | rsa (also key-exchange) | rsa "One key to lock, another to open"; key-exchange "No more back and forth" | yes (rsa simulator shows public N, e and private d) |
| One-way versus two-way functions (doubling, light switch, mixing paint, egg, padlock) | 206-207 | yes | key-exchange | "One-way functions" (paint example; two-way contrast is only implied) | text |
| Modular (clock) arithmetic, with the divide-and-keep-remainder recipe | 207-209 | yes | key-exchange | "One-way functions" (mod 7, remainder rule); simulator works in mod P | yes |
| One-way function 3^x (mod 7), Table 14; 453^x (mod 21,997) as a big example | 209-211 | yes | key-exchange | "One-way functions"; preset `clock` (Table 14 as Eve's row); preset `bigger` (P = 101) stands in for the big example | yes |
| Diffie-Hellman-Merkle key exchange itself | 199-200, 226 | named only (abridged edition gives no worked exchange) | key-exchange | "The exchange", "What Eve heard", "Trying every secret"; presets `book`, `eve`, `intercepted` (numbers from the full edition) | yes |
| Special one-way function reversible only with secret information (the mathematical padlock) | 211, 214-216 | yes | rsa | "Two primes make N", "Opening with d" | yes |
| RSA: N = p x q as the personalised public key (chapter example 17,159 x 10,247 = 175,828,273) | 215-216 | partly (details deferred to Appendix E) | rsa | "Two primes make N" (p and q steppers); chapter's numbers in DigDeeper "How big must N be?" (ADDED) | yes (mechanism); text (chapter's numbers) |
| Multiplying primes is one-way; factoring dare (9,419 x 1,933; factor 1,709,023) | 217 | yes | rsa | "Find the two primes"; presets `attack` (N = 187) and `dare` (1,709,023, Eve needs 601 tries) | yes |
| How large N must be (10^130: fifty years on one PC, fifteen seconds on a hundred million; banks use 10^308) | 217-218 | yes | rsa | DigDeeper "How big must N be?" (ADDED by this audit) | text |
| Martin Gardner's RSA-129 challenge and its 1994 factoring ("squeamish ossifrage") | 218-220 | partly | rsa | "Find the two primes", last paragraph; Further reading | text |
| James Ellis: non-secret encryption, inspired by the Bell Telephone noise idea | 220-223 | partly | rsa | DigDeeper "The British got there first, in secret" | text |
| Clifford Cocks finds RSA at GCHQ, 1973 | 224-225 | named only | rsa | DigDeeper "The British got there first, in secret" | text |
| Malcolm Williamson finds the key exchange at GCHQ, 1974; disclosure in 1997 | 226-229 | named only | key-exchange; rsa | key-exchange DigDeeper "The secret first discovery"; rsa DigDeeper "The British got there first, in secret" | text |
| Babbage/Kasiski and Turing as unrecognised codebreakers (recap) | 229, 247 | named only | babbage; enigma | babbage "The story" (Kasiski got the credit); enigma page | text |
| Paper mail versus e-mail interception (hook-and-line versus driftnet) | 232-234 | partly | pgp | "The programmer and the grand jury", first paragraph | text |
| PGP hybrid encryption: symmetric cipher for the message, RSA for the session key | 235-236 | yes | pgp | "The fast lock", "The slow lock", "Bob works backwards"; presets `start`, `lockedMessage`, `lockedKey`, `sent`, `eve` | yes |
| IDEA symmetric cipher | 236 | named only | pgp | "The fast lock" names IDEA; simulator uses a toy shift cipher instead (not built: named only) | text |
| PGP's release, the munitions investigation, case dropped 1996 | 236-238, 246 | named only (history, not a cipher) | pgp | Hook "Loose on the internet"; "The programmer and the grand jury"; "Nobody broke it, so they argued about it" | text |
| Encryption debate: law enforcers versus civil libertarians and business (Cali cartel, Aum Shinrikyo, Yousef, King wiretap) | 238-243 | partly | key-escrow; pgp | key-escrow hook and "Two camps and a chip"; pgp DigDeeper "Privacy or policing?" | text |
| Echelon keyword scanning | 240-241 | partly | key-escrow | DigDeeper "The spy network that reads for keywords"; "A toy keyword scanner" in the controls | yes |
| Public-key encryption of an Internet order form by the browser | 242 | partly | digital-signatures; key-escrow | digital-signatures "Safe, unless somebody learns to factor" (shopping built on RSA and signatures); key-escrow "Two camps and a chip"; mechanism itself is the rsa simulator | text |
| Encrypting stored company databases | 243 | named only | none | not built: named only | - |
| Key escrow: copy of the private key held by an escrow agent | 243 | yes | key-escrow | "A middleman holds a copy"; preset `lodged`; warrant switch | yes |
| Escrowed Encryption Standard: Clipper and Capstone, key split in two halves between two authorities | 243-244 | yes | key-escrow | "Cut the key in two", "Both halves, or nothing", "Two camps and a chip"; presets `oneHalf`, `bothHalves`, `challenge` | yes |
| Why escrow failed (crooked employee, foreign firms, optional use) and compulsory escrow | 244-245 | partly | key-escrow | "Why almost nobody wanted it" (leak, stolen databases, preset `outlaw`); "Whom do you fear more?" | yes |
| Strength of PGP (Crowell: twelve million times the age of the universe) | 247 | named only | pgp | "Nobody broke it, so they argued about it", last paragraph | text |
| Quantum cryptography: uncertainty principle, eavesdropper detected, Bob's confirming exchange | 248-251 | partly (idea only) | quantum | "Two ways to tilt a photon", "Keep the matches", "Eve cannot look without touching"; presets `measured`, `sifted`, `tapped`, `lucky`, challenge lines | yes |
| Bennett's 1988 twelve-inch demonstration; Geneva to Nyon, 1995 | 250 | named only | quantum | Hook "Twelve inches"; "From banknotes to keys" last paragraph | text |
| Codebreaker's Challenge, cryptogram 1: Caesar shift (easy) | 252 | yes (method in the book) | codebreakers-challenge | "Start with the easy one"; preset `first` (our own cryptogram of the same kind; the book's text can be typed into the caesar page) | yes |
| Codebreaker's Challenge, cryptogram 2: Caesar shift (harder, no word breaks) | 252 | yes | codebreakers-challenge | "Caesar: try every key"; preset `second`; "Try every shift at once" list | yes |
| Codebreaker's Challenge, cryptogram 3: monoalphabetic substitution | 253 | yes | codebreakers-challenge | "Substitution: count the letters"; preset `third` | yes |
| Codebreaker's Challenge, cryptogram 4: Vigenère | 253 | yes | codebreakers-challenge | "Vigenère: measure the keyword"; preset `fourth`; page challenge "The last three words" | yes |
| Appendix A: opening of A Void (Perec, a text with no letter e) | 254 | yes (example text) | frequency-analysis | DigDeeper "The novel with no letter E"; preset `lipogram` (our own e-less passage) | yes |
| Appendix B tip 1: expected frequencies; identify the language (Italian, German e at 19 percent) | 255 | yes | frequency-analysis | "Count, rank, match"; DigDeeper "More clues codebreakers use" (German; Italian not mentioned) | yes (count bars); text (language tip) |
| Appendix B tip 2: repeated letter pairs (ss, ee, tt, ff, ll, mm, oo) | 256 | yes | frequency-analysis | "Letters have personalities" | yes (reader applies it on the message) |
| Appendix B tip 3: one-, two- and three-letter words | 256 | yes | frequency-analysis | "Close, but not right" (the); "Letters have personalities" (a, I; preset `started`); the two-letter word list is not given | yes |
| Appendix B tip 4: tailor the frequency table (military messages) | 256 | yes | frequency-analysis | DigDeeper "More clues codebreakers use" | text |
| Appendix B tip 5: cribs (al-Khalil and "In the name of God") | 256 | yes | frequency-analysis | DigDeeper "More clues codebreakers use" | text |
| Appendix C: the Bible code, equidistant letter sequences (MESAHIRT example, McKay and Moby Dick) | 257 | yes | bible-code | "Equal jumps", "Let the machine look", "The whale that predicted murders"; presets `rain`, `fifth`, `shot`, `notice`, `warning` | yes |
| Appendix D: the pigpen cipher (four grids; broken by frequency analysis) | 258 | yes | pigpen | "A cell for every letter", "Add a dot, then an X", "Count the boxes"; presets `masons`, `riddle` (the appendix's own riddle), `lodge` | yes |
| Appendix E: RSA key set-up (p = 17, q = 11, N = 187, e = 7) | 259 | yes | rsa | "Two primes make N"; preset `book` | yes |
| Appendix E: encryption C = M^e (mod N), X = 88 becomes 11, with the 7 = 4 + 2 + 1 squaring trick | 259-260 | yes | rsa | "Send a kiss", "Locking with N and e"; preset `book` (working shown on the board) | yes |
| Appendix E: private key d from e x d = 1 (mod (p-1)(q-1)), d = 23; decryption 11^23 (mod 187) = 88 | 260-261 | yes | rsa | "Opening with d"; preset `open` | yes |
| Appendix E: Euclid's algorithm for finding d | 261 | named only | rsa | Named in DigDeeper "Why real RSA does not go letter by letter" (ADDED); simulator finds d itself | text |
| Appendix E closing note: letter-by-letter RSA is only a monoalphabetic substitution; real RSA uses large blocks | 261 | yes | rsa | DigDeeper "Why real RSA does not go letter by letter" (ADDED by this audit) | text |
