# Vietnamese glossary and style guide

For translating the site into Vietnamese. Follow it line by line. The reader is the same as in English: a curious 13-year-old on a phone (see [STANDARDS.md §3](../STANDARDS.md#3-content-standard-the-page-template) and [DESIGN.md](../DESIGN.md)).

Sources, cited by tag in the tables:

| Tag | Source |
|---|---|
| **WP** | vi.wikipedia.org. The article title that exists is given, e.g. WP "Thám mã". Checked November 2026. |
| **GT** | Usage in Vietnamese university courses on mật mã học / an toàn thông tin (e.g. Học viện Kỹ thuật Mật mã): *bản rõ, bản mã, thám mã, thay thế đơn bảng / đa bảng, hệ mật khóa công khai*. |
| **SGK** | Vietnamese school textbooks (Toán, Vật lý). |
| **Ours** | Our choice. No settled Vietnamese term, or the settled one is too heavy for a 13-year-old. |

## 0. Decisions that override the tables below

The Vietnamese edition of the book (*Mật mã: Từ cổ điển đến lượng tử*, NXB Trẻ, translated by Phạm Văn Thiều and Phạm Thu Hằng) has since been identified; see [vi-edition.md](vi-edition.md). Where its term is as plain as ours, we use its term, so readers of the Vietnamese book recognise it. Where it is long or ambiguous, ours stays. **This table wins over any row below.**

| English | Use | Not | Why |
|---|---|---|---|
| ciphertext | **bản mật mã** (UI label: "Bản mật mã") | bản mã | The edition's word; clear to a child |
| plaintext | **bản rõ**. First time on a page: "bản rõ (văn bản thường)" | văn bản thường as the main term | Short enough for UI labels; the gloss links to the edition |
| key | **khóa**; **chìa khóa** only where the lock-and-key picture matters | chìa khóa mã | The edition uses both; "khóa" fits labels |
| codebreaker | **nhà giải mã** (noun) | người phá mã | The edition's noun, also in its chapter title "Các nhà giải mã vô danh" |
| break / crack (verb) | **phá mã**, **phá** | giải mã for breaking | Keeps "giải mã" for the rightful reader with the key |
| transposition | **mã chuyển vị** (đổi chỗ các chữ) | hoán vị | The edition's word, and plainer |
| steganography | **giấu thư** (kỹ thuật giấu thư) | giấu tin | The edition's word, and plainer |
| Caesar shift | **mật mã dịch chuyển Caesar**; short **mã Caesar** | | The edition |
| one-time pad | **sổ tay dùng một lần** | tập khóa dùng một lần | The edition |
| pigpen | **mật mã chuồng heo** | chuồng lợn | A name, kept as the edition has it |
| plain / cipher alphabet | **bảng chữ rõ / bảng chữ mã** | | Short, for board labels |
| rotor | **rôto** (đĩa mã hóa) | | The edition |
| reflector | **đĩa phản xạ** | bộ phản xạ | The edition |
| plugboard | **bảng cắm dây** | bảng ổ nối | Plainer for a child |
| crib | **từ mồi (crib)** | | |
| bombe | **máy bombe** | Bom | Not a bomb |
| digital signature | **chữ ký số** | chữ ký số hóa | Today's standard term |
| public / private key | **khóa công khai / khóa riêng** | | |

Chapter titles: use the "Vietnamese title readers know" column of [vi-edition.md §2](vi-edition.md). Chapter 2, which has no match in the edition, is **Nhà giải mã vô danh**.

Never copy sentences from the Vietnamese edition. It is copyrighted, and our rule is the book's facts in our own words. Use it for terms and titles only.

Spelling: use the tone placement of vi.wikipedia: *khóa, hóa, thủy* (not *khoá, hoá, thuỷ*), and *ký, kỹ, lý* with **y**. Use standard (northern) words: *nghìn* not *ngàn*, *lợn* not *heo*.

## 1. Glossary

### 1.1 Core ideas

| English | Vietnamese | Note / source |
|---|---|---|
| cryptography | mật mã học | WP "Mật mã học" |
| secret writing | viết bí mật, thư bí mật | Ours. Plain umbrella word. |
| cipher | mật mã | WP. Swaps **letters**. Short form "mã" is fine after first use: "mã Caesar". |
| code | mã | WP. Swaps **whole words or phrases** (a codebook). The first time, say: "mã: thay cả một từ bằng một từ hay một con số khác". |
| codebook | sổ mã | GT. Not "sách mã". |
| encode / encipher / encrypt | mã hóa | WP, GT. One verb for all three. |
| decode / decipher / decrypt (with the key) | giải mã | WP, GT. The rightful reader, who has the key. |
| break, crack (without the key) | phá mã, phá | Ours, common usage. Never "bẻ khóa" (sounds like software piracy). |
| decipher a lost script (hieroglyphs, Linear B) | giải đọc, đọc được | Ours. Nobody had a key, so not "giải mã". |
| cryptanalysis | thám mã | WP "Thám mã", GT. Introduce once: "**thám mã**, tức là phá mã mà không có khóa". Then prefer "phá mã". |
| codebreaker | nhà giải mã | §0, the edition. |
| codemaker | người lập mã | Ours. |
| plaintext | bản rõ | GT, WP "văn bản rõ". Short and standard. Never "văn bản trơn". |
| ciphertext | bản mật mã | §0, the edition. |
| plain alphabet | bảng chữ rõ | Ours, built on *bản rõ*. |
| cipher alphabet | bảng chữ mã | Ours. |
| alphabet | bảng chữ cái | |
| key | khóa | WP, GT. See pitfall 1 (lock vs key). |
| keyword / keyphrase | từ khóa / cụm từ khóa | WP "Mật mã Vigenère" |
| algorithm | thuật toán (cách làm) | WP. First time: "**thuật toán**, tức là cách làm". |
| Kerckhoffs' principle | nguyên lý Kerckhoffs | Ours. Keep the *s* after the *ff*. |
| brute-force attack | thử hết mọi khóa (tấn công vét cạn) | GT "vét cạn". Lead with the plain phrase. |
| substitution (cipher) | (mật mã) thay thế | WP, GT |
| monoalphabetic | thay thế đơn bảng (một bảng chữ mã) | GT. Gloss it the first time. |
| polyalphabetic | thay thế đa bảng (nhiều bảng chữ mã) | GT; WP "dùng nhiều bảng chữ cái". |
| homophonic (substitution) | (thay thế) đồng âm | Ours, after GT usage. Explain: "một chữ có nhiều ký hiệu thay thế". |
| transposition | mã chuyển vị (đổi chỗ chữ) | §0, the edition. Gloss: "giữ nguyên các chữ, chỉ đổi chỗ". |
| steganography | giấu thư (kỹ thuật giấu thư) | §0, the edition. Not "ẩn mã". |
| cover text | văn bản che | Ours |
| semagram | ký hiệu ẩn ý (semagram) | Ours |
| nulls | chữ đệm (ký tự vô nghĩa) | Ours. Symbols that mean nothing. |
| nomenclator | bảng mã nomenclator | Ours. Explain: half cipher alphabet, half list of code words. |
| frequency, frequency analysis | tần suất, phân tích tần suất | WP "Phân tích tần suất" |
| letter count(s) | số lần xuất hiện của mỗi chữ | Ours. UI: "Đếm chữ". |
| digraph | cặp chữ | Ours. Avoid "song tự". |
| grid / square | lưới / hình vuông | WP "hình vuông Vigenère" |
| Vigenère square | hình vuông Vigenère | WP |
| Kasiski test | phép thử Kasiski | Ours |
| repeated sequence | chuỗi chữ lặp lại | Ours |
| book cipher, key text | mật mã sách, văn bản khóa | WP "Mật mã sách" |
| equidistant letter sequence | dãy chữ cách đều | Ours |
| fractionation | chia nhỏ chữ (phân đoạn) | Ours (ADFGVX) |
| one-time pad | tập khóa dùng một lần | Ours. "pad" = a tear-off pad of paper: **tập giấy**. Not "sổ" (that is the codebook). |
| pad (sheet) | tờ khóa | Ours |
| spelling alphabet | bảng đánh vần | Ours (Navajo) |
| cryptogram | bức mật thư | Ours; "mật thư" is familiar from Scout games. |
| message | tin nhắn; bức thư; bức điện | See pitfall 4. |
| telegram | bức điện (điện báo) | WP "Điện báo Zimmermann" |
| teleprinter | máy điện báo đánh chữ | Ours |
| wiretap / eavesdropper | nghe lén / kẻ nghe lén | Ours |

### 1.2 Machines

| English | Vietnamese | Note / source |
|---|---|---|
| cipher machine | máy mật mã | |
| cipher disc | đĩa mật mã | Ours |
| rotor | rotor (bánh xe mã) | WP "Máy Enigma" keeps *rotor* and also says *bánh xe chữ*. Keep *rotor*, gloss once as "bánh xe mã". |
| scrambler | bộ xáo trộn | Ours. Alberti/Enigma's scrambling unit. |
| reflector | bộ phản xạ | Ours |
| plugboard | bảng cắm dây | Ours. WP keeps "plugboard"; ours is plain and says what it is. |
| cable / socket | dây cắm / ổ cắm | |
| keyboard | bàn phím | WP |
| lampboard / lamp | bảng đèn / đèn | Ours. WP describes "một bảng gồm những bóng đèn". |
| rotor order / start position | thứ tự rotor / vị trí xuất phát | Ours |
| day key | khóa ngày | Ours. WP says "thiết lập hằng ngày"; ours is shorter. |
| message key | khóa bức điện | WP "khóa mã của bức điện" |
| crib | từ mồi | Ours. First time: "**từ mồi**: một từ đoán trước là có trong bức điện, như `WETTER`". Keep the English in brackets once. |
| bombe | máy bombe | WP keeps "bombe". Do not translate as "bom". |
| chain (Rejewski) | chuỗi | Ours |
| stepping switch | công tắc bước | Ours (Purple) |
| sixes / twenties | nhóm sáu / nhóm hai mươi | Ours (Purple's two parts) |
| tape, wheel (Lorenz) | băng giấy, bánh xe | |
| first programmable computer | máy tính lập trình được đầu tiên | |

### 1.3 Computers and modern cryptography

| English | Vietnamese | Note / source |
|---|---|---|
| bit, binary digit | bit, chữ số nhị phân | WP "Bit" |
| ASCII | ASCII | WP |
| XOR | XOR (cộng không nhớ) | Ours. Explain with 0 and 1, not the Sino-Vietnamese "phép tuyển loại trừ". |
| block / round / round key | khối / vòng / khóa vòng | GT |
| Data Encryption Standard (DES) | Chuẩn mã hóa dữ liệu (DES) | WP "DES (mã hóa)" |
| symmetric / asymmetric | đối xứng / bất đối xứng | WP |
| key distribution problem | bài toán phân phối khóa | GT |
| key exchange | trao đổi khóa | WP "Trao đổi khóa Diffie-Hellman" |
| one-way function | hàm một chiều | GT |
| modular arithmetic | số học mô-đun ("số học đồng hồ") | WP "Số học mô đun". Use the clock image for the reader. |
| modulus, mod | số chia (mô-đun), mod | Keep `mod` in formulas. |
| prime number | số nguyên tố | WP, SGK |
| factor / factoring | thừa số / phân tích ra thừa số nguyên tố | SGK |
| public key / private key | khóa công khai / khóa riêng | WP lists "khóa bí mật" and "khóa cá nhân". Use **khóa riêng**: plain, and "khóa bí mật" clashes with symmetric "secret key". |
| secret key | khóa bí mật | For symmetric ciphers only. |
| session key | khóa phiên | GT |
| padlock (RSA image) | ổ khóa móc | See pitfall 1. |
| digital signature | chữ ký số | WP "Chữ ký số" |
| digest (hash) | bản tóm tắt (giá trị băm) | WP "Hàm băm mật mã". Lead with "bản tóm tắt". |
| key escrow / escrow agent | ký gửi khóa / bên giữ khóa | Ours. |
| warrant | lệnh của tòa án | |
| quantum cryptography | mật mã lượng tử | WP "Mật mã lượng tử" |
| quantum | lượng tử | WP |
| photon | photon (hạt ánh sáng) | WP "Photon". Not the old textbook form "phôtôn". |
| polarisation | sự phân cực | WP "Phân cực" |
| detector / scheme | máy dò / kiểu đo | Ours. Alice's two schemes: "kiểu thẳng" (+) and "kiểu chéo" (×). |

### 1.4 People, groups, places and code names

| English | Vietnamese | Note |
|---|---|---|
| Alice, Bob, Eve | Alice, Bob, Eve | Keep. Eve = "kẻ nghe lén" on first use. |
| Mary Queen of Scots | Nữ hoàng Mary xứ Scotland | WP "Mary I của Scotland" is formal; ours reads easier. |
| Queen Elizabeth I | Nữ hoàng Elizabeth I | |
| Freemasons | Hội Tam Điểm | WP "Hội Tam Điểm" |
| Navajo code talkers | những người truyền mã Navajo | Ours. WP "Người Navajo". |
| marines | lính thủy đánh bộ | |
| Bletchley Park, Room 40, Ultra, Magic, Colossus, Clipper, Capstone | keep as is | Code names and places stay. Gloss once: "Ultra, tên mật của tin tình báo lấy từ Enigma". |
| Polish Cipher Bureau | Cục Mật mã Ba Lan | WP "Cơ quan mật mã Ba Lan" also fine. |
| First / Second World War | Chiến tranh thế giới thứ nhất / thứ hai | |
| Rosetta Stone | phiến đá Rosetta | WP "Phiến đá Rosetta" |
| hieroglyph, cartouche | chữ tượng hình, khung tên (cartouche) | Ours |
| syllabary / phonogram | bảng chữ ghi âm tiết / ký hiệu ghi âm | Ours |
| Gaul, Sparta, Baghdad, Crete | xứ Gaul, Sparta, Baghdad, đảo Crete | |
| Germany, Britain, America, Japan, Poland, France, Persia, Rome, Egypt, Greece | Đức, Anh, Mỹ, Nhật Bản, Ba Lan, Pháp, Ba Tư, La Mã, Ai Cập, Hy Lạp | Use the usual Vietnamese name for any country that has one. |
| Sherlock Holmes, "The Dancing Men" | Sherlock Holmes, "Những hình nhân nhảy múa" | Known Vietnamese title of the story. |
| Poe, "The Gold-Bug" | Edgar Allan Poe, "Con bọ vàng" | Known Vietnamese title. |

### 1.5 Chapter titles

| # | English | Vietnamese |
|---|---|---|
| 1 | The Cipher of Mary Queen of Scots | Bản mật mã của Nữ hoàng Mary xứ Scotland |
| 2 | The Anonymous Codebreaker | Nhà giải mã vô danh |
| 3 | The Mechanization of Secrecy | Cơ giới hóa việc giữ bí mật |
| 4 | The Language Barrier | Rào cản ngôn ngữ |
| 5 | Alice and Bob Go Public | Alice và Bob ra công khai |
| 6 | Pretty Good Privacy | Riêng tư tốt đẹp |
| 7 | The Codebreaker's Challenge | Thách thức giải mã |

### 1.6 Cipher page titles (all 38, in menu order)

| Slug | English | Vietnamese |
|---|---|---|
| hidden-writing | Hidden writing | Giấu thư |
| rail-fence | The rail fence | Mật mã hàng rào |
| scytale | The Spartan scytale | Gậy scytale của Sparta |
| kama-sutra | The Kama Sutra cipher | Mật mã Kama Sutra |
| caesar | The Caesar shift | Mật mã dịch chuyển Caesar |
| keyword-substitution | The keyword cipher | Mật mã từ khóa |
| frequency-analysis | Frequency analysis | Phân tích tần suất |
| bible-code | The so-called Bible code | Cái gọi là “mật mã Kinh Thánh” |
| mary-queen-of-scots | The cipher of Mary Queen of Scots | Mật mã của Nữ hoàng Mary xứ Scotland |
| vigenere | The Vigenère cipher | Mật mã Vigenère (WP) |
| homophonic | The homophonic cipher | Mật mã thay thế đồng âm |
| pigpen | The pigpen cipher | Mật mã chuồng heo |
| babbage | Babbage breaks the Vigenère cipher | Babbage phá mật mã Vigenère |
| pinprick | Pinprick messages | Thư lỗ kim |
| dancing-men | The Dancing Men and other ciphers in stories | Những hình nhân nhảy múa và các mật mã trong truyện |
| playfair | The Playfair cipher | Mật mã Playfair (WP) |
| beale | The Beale ciphers | Mật thư Beale |
| morse | Morse code | Mã Morse (WP) |
| zimmermann | The Zimmermann telegram | Bức điện Zimmermann (WP "Điện báo Zimmermann") |
| adfgvx | The ADFGVX cipher | Mật mã ADFGVX (WP) |
| one-time-pad | The one-time pad | Sổ tay dùng một lần |
| cipher-disc | The cipher disc | Đĩa mật mã |
| enigma | The Enigma machine | Máy Enigma (WP) |
| cracking-enigma | Cracking Enigma | Công phá Enigma |
| purple | Purple, the machine with no rotors | Purple, cỗ máy không có rôto |
| navajo | The Navajo code talkers | Những người truyền mã Navajo |
| hieroglyphs | Reading the hieroglyphs | Đọc chữ tượng hình |
| linear-b | The riddle of Linear B | Câu đố chữ Linear B (WP "Grammikí Beta"; keep "Linear B", it is the name used in English sources and museums) |
| lorenz | Colossus and the Lorenz cipher | Colossus và mật mã Lorenz |
| binary | Ciphers for computers | Mật mã cho máy tính |
| lucifer | Lucifer and DES | Lucifer và DES |
| key-exchange | The key exchange | Trao đổi khóa |
| rsa | RSA | RSA (WP "RSA (mã hóa)") |
| pgp | Pretty Good Privacy | Riêng tư tốt đẹp (PGP) |
| key-escrow | Key escrow | Ký gửi khóa |
| digital-signatures | Digital signatures | Chữ ký số (WP) |
| quantum | Quantum cryptography | Mật mã lượng tử (WP) |
| codebreakers-challenge | The Codebreaker's Challenge | Thách thức giải mã |

### 1.7 Interface words

Sentence case, as in English: only the first word and names take a capital.

| English | Vietnamese | Note |
|---|---|---|
| Shift | Độ dịch | |
| Key / Key letter | Khóa / Chữ khóa | |
| Keyword | Từ khóa | |
| Message / Your message | Tin nhắn / Tin nhắn của bạn | |
| Plaintext / Plain | Bản rõ / Rõ | "Plain" and "Cipher" are row labels on a board. |
| Ciphertext / The ciphertext / Cipher | Bản mật mã / Bản mật mã / Mã | |
| Encipher / Decipher | Mã hóa / Giải mã | |
| Reset / Back to start | Làm lại / Về lúc đầu | |
| Step / Next step / Steps | Bước / Bước tiếp / Các bước | |
| Send | Gửi | |
| Hide story / Read the story | Ẩn câu chuyện / Đọc câu chuyện | |
| Previous / Next | Bài trước / Bài sau | Links between cipher pages. |
| Back to the menu / Chapters | Về mục lục / Các chương | |
| Full edition (badge) | Bản đầy đủ | |
| Loading the model… | Đang tải mô hình… | |
| Story part: The hook | Mở đầu | Part labels from STANDARDS §3. |
| Try it | Thử xem | |
| How it works | Cách hoạt động | |
| The story | Câu chuyện | |
| How it was broken | Bị phá như thế nào | |
| Challenge | Thử thách | |
| What came next | Chuyện gì đến tiếp theo | |
| Further reading | Đọc thêm | |
| Your answer / Check | Câu trả lời của bạn / Kiểm tra | |
| Dig deeper / Go deeper | Tìm hiểu thêm | Not "Đào sâu". |
| Yes / No | Có / Không | |
| Plugboard, Crib, Session key, Pad | Bảng cắm dây, Từ mồi, Khóa phiên, Tờ khóa | As in the glossary. |

## 2. Style rules

### Voice

1. **Address the reader as "bạn"**, every time. Never "các em" (sounds like a teacher), "quý vị", "cậu" or "mày". Use "chúng ta" only for something truly shared ("chúng ta biết…"), at most once or twice per page.
2. **People in the story** get the pronoun Vietnamese gives an adult: "ông" for Caesar, Babbage, Turing; "bà" for Mary or Elizabeth once they are named; "cô" for Alice, "anh" for Bob, "cô" for Eve. When unsure, repeat the name.
3. **Short sentences.** English allows 25 words. Vietnamese words are one syllable, so count syllables (tiếng): **at most 35 tiếng, aim for 15 to 25.** One idea per sentence. Split at "và", "nhưng", "vì vậy" rather than chaining clauses.
4. **Warm and plain.** Write as an older cousin who loves the subject would speak. Active verbs: "Caesar dịch bảng chữ cái", not "Bảng chữ cái được Caesar dịch". Avoid "được/bị" passives unless the doer is unknown.
5. **Plain word before Sino-Vietnamese word.** If a pure Vietnamese word exists, use it: "đổi chỗ" not "hoán đổi vị trí", "cách làm" not "phương thức", "dùng" not "sử dụng" (both fine, prefer the shorter), "tìm ra" not "phát hiện ra" where it reads better, "chia" not "phân chia". A settled technical term (thám mã, hoán vị, số nguyên tố) is kept, but glossed in plain words the first time.
6. **Explain a term the first time and bold it once**, as in English: "Phần tin nhắn gốc gọi là **bản rõ**."
7. **Say "nhấn" or "chạm", never "click" or "nhấp chuột".** "Nhấn" for buttons, "chạm" for letters or parts of the simulator. "Chọn" for a choice.
8. **Headings say what the section tells you**, as in English: "Lặp lại là kẻ thù", not "Điểm yếu".
9. **The words must be ours**, as in English. Do not copy sentences from the Vietnamese edition of the book either.

### Names

10. **Personal names keep their original Latin spelling and diacritics**: Julius Caesar, Alan Turing, Marian Rejewski, Blaise de Vigenère, Jean-François Champollion, Al-Kindi. Do not use old Vietnamese transcriptions ("Xê-da"). Given name first, as in the source.
11. **Titles are translated, names are not**: "Nữ hoàng Mary", "Vua Philip II", "Tướng Cicero".
12. **Places**: use the usual Vietnamese name if one exists (Đức, Anh, Mỹ, La Mã, Ai Cập, Hy Lạp, Ba Tư). Otherwise keep the original: Bletchley Park, Baghdad, Sparta.
13. **Titles of books and stories**: use a known Vietnamese title if there is one ("Con bọ vàng"), otherwise keep the English in italics and add a translation in brackets the first time. *The Code Book* stays in English, italic.

### Dates, numbers and units

14. **Dates** in words: "ngày 8 tháng 11 năm 1931". Months as numbers ("tháng 11"), never by name. No "8/11/1931" in story text.
15. **Eras**: "khoảng năm 50 TCN", "thế kỷ 5 TCN", "thế kỷ 9" (Arabic numerals, not Roman, for the young reader), "thập niên 1950", "1918–1945", "từ năm 1976", "Sau Công nguyên" only where the English says AD.
16. **Numbers**: thousands with a dot, decimals with a comma: `17.576`, `10.000`, `2,20`. Numbers in a formula or the simulator stay as the engine prints them.
17. **Large numbers** in words, using nghìn, triệu, tỷ: "10 triệu tỷ" (10.000.000.000.000.000). Write the digits too when the size is the point.
18. **Units**: give metric, with the original in brackets only when it matters: "khoảng 30 cm (12 inch)", "khoảng 6,4 km (4 dặm)". Money keeps its own currency: "10.000 mác", "3 bảng Anh", "đô la".

### Punctuation

19. **Quotation marks**: “ ” for quotes and for button names in instructions ("Nhấn “Bước tiếp”"); ‘ ’ inside them. Use the curly forms, not straight " in story text.
20. **Symbols** ▲ ▼ stay as they are: "Nhấn ▲ cạnh “Độ dịch”."

### Cipher letters and example messages

21. **Anything in `code` style stays exactly as it is**: letters, keys, ciphertext, cribs (`WETTER`, `L FDPH`). Never translate, add diacritics or change case.
22. **Example messages stay in English**, because the ciphers, the 26-letter alphabet and the letter frequencies are English. Give the meaning in Vietnamese right after: "`ATTACK AT DAWN` (tấn công lúc bình minh)".
23. **Say "tiếng Anh" when a fact depends on English**: "Trong tiếng Anh, `E` là chữ hay gặp nhất." Never imply it holds for Vietnamese.
24. **The alphabet is the 26-letter Latin one** (A–Z). If a page needs it, say once: "bảng chữ cái tiếng Anh, 26 chữ, không có dấu".
25. **Letter names** in prose: "chữ `A`", "chữ `E`". Not "ký tự A" or "mẫu tự A".
26. **Quoted historical words** (Latin, German) stay in the original, with the Vietnamese meaning in brackets: "Veni, vidi, vici (Ta đến, ta thấy, ta chinh phục)".

## 3. Pitfalls

1. **"Khóa" means both "lock" and "key".** For RSA's padlock image, write "ổ khóa móc" for the padlock and "chìa khóa" for what opens it. Elsewhere "khóa" is the cipher key.
2. **"Giải mã" is not "phá mã".** Bob *giải mã* with the key; Eve *phá mã* without it. English "decipher" sometimes means "break" or "read a lost script". Choose by who holds the key.
3. **"Mã" alone is ambiguous** (barcode, source code, a product code). Write "mật mã" for a cipher and "mã" only in fixed names (mã Morse, mã Navajo) or after "mật mã" has been said.
4. **"Message" is not always "thông điệp".** "Thông điệp" sounds like a speech or an advert's moral. Use "tin nhắn" in the interface and for the reader's own text, "bức thư" for letters, "bức điện" for telegrams and radio messages.
5. **"Story" is "câu chuyện", not "truyện"** (that means fiction). The history is true.
6. **"Challenge" is "thử thách", not "thách đấu"** (a duel). "Dig deeper" is "tìm hiểu thêm", not "đào sâu".
7. **"Crack" is not "bẻ khóa" or "hack"**: they read as software piracy. Use "phá".
8. **"Bombe" is not "bom".** The machine was named for its ticking; keep "máy bombe".
9. **"Pigpen" is "mật mã chuồng heo"**, the Vietnamese edition's name (see §0), an exception to the "lợn" spelling rule. Do not make it cute ("ổ heo con").
10. **"Prime" is "số nguyên tố"**, not "số chính" or "số nguyên".
11. **"Private key" is "khóa riêng"**, so it does not clash with "khóa bí mật" (the shared key of a symmetric cipher).
12. **Avoid heavy Sino-Vietnamese that a 13-year-old trips on**: "mật mã hóa" (just "mã hóa"), "giải mật mã" ("giải mã"), "văn bản trơn" ("bản rõ"), "thuật toán mã hóa đối xứng khối" (say it in two sentences).
13. **Do not localise the examples** into Vietnamese words. A Vietnamese plaintext breaks the cipher (diacritics, no F, J, W, Z) and breaks the frequency charts.
14. **"Code talker" is not "người nói mã"** (sounds like someone who talks in riddles). Use "người truyền mã".
