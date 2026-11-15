# Vietnamese glossary and style guide

For translating the site into Vietnamese. Follow it line by line. The reader is the same as in English: a curious 13-year-old on a phone (see [STANDARDS.md §3](../STANDARDS.md#3-content-standard-the-page-template) and [DESIGN.md](../DESIGN.md)).

The Vietnamese pages are based on the Vietnamese edition of the book: *Mật mã: Từ cổ điển đến lượng tử* (NXB Trẻ, translated by Phạm Văn Thiều and Phạm Thu Hằng; our copy is the 4th reprint, "Tái bản lần thứ 4", 2014, 552 pages). It is the full edition: 8 chapters, the Cipher Challenge and Appendices A–J (see §4). Its words are our words. Bibliographic research is in [vi-edition.md](vi-edition.md).

Sources, cited by tag in the tables:

| Tag | Source |
|---|---|
| **ED** | The Vietnamese edition. A number is the printed page ("p. 37" = *[tr. 37]*), always a page where the term appears. Counts (×N) are occurrences in the whole book. Checked November 2026 against the extracted text in `resource/vi-book/` (git-ignored; never commit or publish it). |
| **WP** | vi.wikipedia.org. The article title that exists is given, e.g. WP "Thám mã". Checked November 2026. |
| **GT** | Usage in Vietnamese university courses on mật mã học / an toàn thông tin (e.g. Học viện Kỹ thuật Mật mã). |
| **SGK** | Vietnamese school textbooks (Toán, Vật lý). |
| **Ours** | Our choice. The edition has no word for it. |

## 0. Decisions that override the tables below

**Rule: where the Vietnamese edition has a word, we use the edition's word**, so a reader of the Vietnamese book recognises every term. Where the edition uses more than one form, we use its most common form unless the row says otherwise. Our own choice stays only where the edition has no word; those rows are marked **(not in the book)**. **This section wins over any row below.**

Never copy sentences from the Vietnamese edition. It is copyrighted, and our rule is the book's facts in our own words. Use it for terms, names and titles only.

### 0.1 Core ideas

| English | Use | Edition | Not / note |
|---|---|---|---|
| cryptography | **khoa học mật mã**; "mật mã" alone is also fine | p. 24 (×48; *mật mã học* ×5) | not *mật mã học* as the main term |
| cipher (in general) | **mật mã**; short **mã** after first use (*mã Caesar*) | p. 30 | |
| cipher vs code, where the difference matters | cipher = **mã chữ cái**; code = **mã từ** | p. 13–14, p. 59 | The first time, say what each one swaps: letters, or whole words. |
| codebook | **sổ mã** | p. 60 (×39) | not *sách mã* |
| encrypt / encipher / encode | **mã hóa** | p. 59 | The edition separates *mã hóa chữ cái* / *mã hóa từ* only where it defines them. |
| decrypt / decipher (with the key) | **giải mã** | p. 59 | |
| break, crack (without the key) | **phá**, **phá vỡ**, **phá mã** | p. 9 (*phá mã* ×15), p. 10 (*phá vỡ* ×51), p. 37 (*phá được mật mã*) | The edition most often says *giải mã* for breaking too, and sometimes *hóa giải* (p. 57). We keep *phá* for breaking so the reader can tell Bob from Eve. Never *bẻ khóa*. |
| codebreaker | **nhà giải mã** | p. 35 (×171) | Also in the edition: *người giải mã* ×15, *người phá mã* ×11, *nhà phân tích mã* ×14 (for the Arab scholars, p. 35). Use *nhà giải mã*. |
| codemaker | **nhà tạo mã** | p. 38 (×55) | not *người lập mã* (×3) |
| cryptanalysis | **phân tích mã** (*phép phân tích mã* when defined) | p. 37 (×38) | not *thám mã* (not in the edition) |
| ciphertext | **bản mật mã** (UI: "Bản mật mã") | p. 31 (×223; *văn bản mật mã* ×104) | not *bản mã* |
| plaintext | **văn bản thường** (UI: "Văn bản thường"); **bức thư gốc** when it is a letter | p. 28 (×100); p. 24 (*bức thư gốc* ×8) | not *bản rõ* (not in the edition) |
| plain alphabet / cipher alphabet | **bảng chữ cái thường / bảng chữ cái mật mã** | p. 30 (×30 / ×74) | not *bảng chữ rõ / bảng chữ mã*. Board row labels: **"Thường" / "Mật mã"** (ours, shortened from the edition). |
| key | **chìa khóa mã**; short **chìa khóa** (UI: "Chìa khóa") | p. 30 (*chìa khóa mã* ×303; *chìa khóa* ×495 in all) | Bare *khóa* only inside the edition's compounds: *khóa mã ngày*, *khóa mã thư*, *từ khóa*. |
| keyword / keyphrase | **từ khóa** (also *từ khóa mã*) / **cụm từ khóa mã** | p. 87 (×63), p. 34 (×54); p. 34 | |
| algorithm | **thuật toán** | p. 30 | |
| substitution (cipher) | **mã thay thế**, **mật mã thay thế** | p. 28 (×52) | |
| monoalphabetic | **(mật mã) thay thế dùng một bảng chữ cái** | p. 37 (×70 for *một bảng chữ cái*) | not *đơn bảng* (not in the edition) |
| polyalphabetic | **mật mã dùng nhiều bảng chữ cái** | p. 92 (×14) | not *đa bảng* |
| homophonic | **mật mã thay thế đồng âm** | p. 93 | |
| transposition | **chuyển vị**, **mã chuyển vị** | p. 25, p. 29 | not *hoán vị* |
| steganography | **kỹ thuật giấu thư**; short **giấu thư** | p. 23 | not *giấu tin* |
| nulls | **ký tự không** | p. 58 | not *chữ đệm* |
| nomenclator | **mã hỗn hợp**; the document is a **bảng mã hỗn hợp** or **sổ mã hỗn hợp** | p. 61, p. 72 | not *nomenclator* |
| frequency analysis | **phân tích tần suất** | p. 41 (×42) | |
| letter pair, digraph | **cặp chữ cái** | p. 28, p. 534 | |
| Caesar shift | **mật mã dịch chuyển Caesar**; short **mã Caesar** | p. 30 | |
| Vigenère cipher / square | **mật mã Vigenère / hình vuông Vigenère** | p. 86 | |
| Kasiski test | **phép thử Kasiski** | p. 127 | |
| book cipher / key text | **mật mã sách / văn bản khóa mã** | p. 142 (*văn bản chìa khóa* also, p. 149) | |
| equidistant letter sequence | **chuỗi chữ cái cách đều nhau (EDLS)** | p. 529 | not *dãy chữ cách đều* |
| one-time pad | **sổ tay dùng một lần** | p. 184 (×39) | not *tập khóa dùng một lần* |
| cryptogram | **bản mật mã** | p. 149 (*các bản mật mã của Beale*), p. 538 (the Challenge) | not *bức mật thư* (not in the edition) |
| message | **bức thư**; **bức điện** for telegrams and radio | p. 21 (×282); p. 104 (×38) | not *thông điệp*. The edition has *tin nhắn* once. UI keeps **"Tin nhắn"** for the reader's own text (ours, interface only). |
| telegram | **bức điện** (also *điện tín*) | p. 104, p. 170 | |
| eavesdrop | **nghe lén** (also *nghe trộm*) | p. 369 (×32 / ×8) | |
| decipher a lost script | **giải mã** | p. 294 (section title), p. 5 | The edition uses *giải mã* for scripts too. Not *giải đọc*. |
| hieroglyph / cartouche | **chữ tượng hình / cartouche** | p. 297 / p. 304 | not *khung tên* |
| syllabary | **chữ viết theo âm tiết** | p. 320 | |

### 0.2 Machines

| English | Use | Edition | Not / note |
|---|---|---|---|
| cipher machine | **máy mã** | p. 189 (×18; *máy mật mã* ×4) | |
| cipher disc (Alberti) | **đĩa mã hóa** | p. 189 (*đĩa mật mã* once, p. 192) | not *đĩa mật mã* |
| rotor, scrambler | **đĩa mã hóa**; gloss once "(còn gọi là rôto)" | p. 197 (×203; *rôto* ×3) | Scherbius's scrambling unit as a whole: **bộ phận mã hóa** (p. 193). Not *bộ xáo trộn*. |
| reflector | **đĩa phản xạ** | p. 199 | not *bộ phản xạ* |
| plugboard | **bảng ổ nối** | p. 202 (×52) | not *bảng cắm dây* |
| cable | **dây cáp** | p. 202 | |
| keyboard / lampboard | **bàn phím / bảng đèn** | p. 193 | |
| start position | **vị trí ban đầu** | p. 195 | |
| rotor settings | **cách sắp đặt các đĩa mã hóa** | p. 204 | |
| day key | **khóa mã ngày** | p. 219 (×44) | not *khóa ngày* |
| message key | **khóa mã thư** | p. 220 (×41) | not *khóa bức điện* |
| chains (Rejewski) | **vòng liên kết** | p. 226 | not *chuỗi* |
| crib | **crib** | p. 251 (×31) | The edition keeps the English word. Not *từ mồi*. Explain it the first time. |
| bombe | **máy bom**; short **bom** | p. 231 (*máy bom* ×19) | The edition's word. Say the first time that it is a machine, named for its ticking (the edition says so on p. 231). |

### 0.3 Computers and modern cryptography

| English | Use | Edition | Not / note |
|---|---|---|---|
| bit, binary digit | **bit**, **chữ số nhị phân** | p. 352 | |
| DES | **DES, Tiêu chuẩn Mã hóa Dữ liệu** | p. 360 | not *Chuẩn mã hóa dữ liệu* |
| block / round | **khối / vòng** | p. 358 | |
| symmetric / asymmetric | **mật mã đối xứng / bất đối xứng** | p. 386 | |
| key distribution (problem) | **(vấn đề) phân phối chìa khóa mã** | p. 360 (×46) | not *bài toán phân phối khóa* |
| key exchange | **trao đổi chìa khóa mã** | p. 249, p. 383 (*sơ đồ trao đổi chìa khóa mã Diffie-Hellman-Merkle*) | not *trao đổi khóa* |
| one-way function | **hàm số một chiều** | p. 375 (×36; *hàm một chiều* ×18) | |
| modular arithmetic | **số học môđun** | p. 375 (×14; *số học đồng dư* ×3) | not *mô-đun*. The clock picture ("như mặt đồng hồ") is ours. |
| prime number | **số nguyên tố** | p. 391 | |
| factor / factoring | **thừa số / phân tích ra thừa số (nguyên tố)** | p. 397 | |
| padlock (the picture) | **khóa móc** | p. 361 (×20) | not *ổ khóa móc* |
| public-key cryptography | **mật mã chìa khóa công khai** | p. 384 | |
| public key | **chìa khóa công khai** | p. 384 (×81; *chìa khóa mã công khai* ×16) | not *khóa công khai* |
| private key | **chìa khóa riêng** | p. 387 (×34; *chìa khóa mã riêng* ×13) | not *khóa riêng* |
| secret key (symmetric) | **chìa khóa mã bí mật** | p. 369 | |
| digital signature | **chữ ký số hóa** | p. 430 (×6) | not *chữ ký số* |
| key escrow | **giao kèo chìa khóa mã** | p. 446 (×8; *giao kèo* alone ×13) | not *ký gửi khóa* |
| escrow agent | **đại lý giao kèo** | p. 446 | not *bên giữ khóa* |
| trusted third party (key-recovery company) | **bên thứ ba tin cậy (TTP)** | p. 450 | |
| quantum cryptography / quantum computer | **mật mã lượng tử / máy tính lượng tử** | p. 478 / p. 462 | |
| photon | **phôtôn** | p. 464 (×168) | not *photon* |
| polarisation | **phân cực**; *phôtôn phân cực thẳng đứng / ngang / chéo* | p. 479–480 | |
| superposition / uncertainty principle | **sự chồng chất / nguyên lý bất định** | p. 467 / p. 485 | |
| detector | **máy dò** | p. 489 | |
| Alice's two schemes (+ and ×) | **sơ đồ thẳng / sơ đồ chéo** | p. 494 | not *kiểu thẳng / kiểu chéo* |

### 0.4 Not in the book: our decisions stay

| English | Use |
|---|---|
| secret writing | viết bí mật, thư bí mật |
| Kerckhoffs' principle | **nguyên tắc Kerckhoffs** (the book, p. 33) |
| brute-force attack | thử hết mọi chìa khóa (tấn công vét cạn) |
| cover text | văn bản che |
| semagram | **ký hiệu biểu ý** (the book, ch. 5) |
| fractionation | chia nhỏ chữ (phân đoạn) |
| letter count(s) | số lần xuất hiện của mỗi chữ; UI "Đếm chữ" |
| repeated sequence | chuỗi chữ lặp lại (the edition has *chuỗi lặp* once, p. 119, and *sự lặp lại*, p. 115) |
| spelling alphabet | bảng đánh vần |
| teleprinter | máy điện báo đánh chữ |
| pad (one sheet) | tờ khóa |
| stepping switch; sixes / twenties | công tắc bước; nhóm sáu / nhóm hai mươi |
| XOR | XOR (cộng không nhớ) |
| session key | khóa phiên |
| digest (hash) | bản tóm tắt (giá trị băm) |
| warrant | lệnh của tòa án |
| Site chapter 2 title | **Le chiffre indéchiffrable** (the edition's ch. 2 title, kept in French as the book does; earlier we used *Nhà giải mã vô danh*; *Các nhà giải mã vô danh* is a section of its ch. 4, p. 271) |

### 0.5 Where the edition is inconsistent

| English | Forms in the edition (most common first) | We use |
|---|---|---|
| codebreaker | nhà giải mã ×171, người giải mã ×15, nhà phân tích mã ×14, người phá mã ×11 | nhà giải mã |
| to break | giải mã (most), phá vỡ ×51, hóa giải, phá được, phá mã ×15 | phá, phá vỡ, phá mã |
| key | chìa khóa mã ×303, chìa khóa, khóa mã (in compounds) | chìa khóa mã / chìa khóa |
| keyword | từ khóa ×63, từ khóa mã ×54 | từ khóa |
| ciphertext | bản mật mã ×223, văn bản mật mã ×104, văn bản mã ×7 | bản mật mã |
| plaintext | văn bản thường ×100, bức thư gốc ×8, văn bản gốc ×5 | văn bản thường |
| cryptography | khoa học mật mã ×48, mật mã học ×5 | khoa học mật mã |
| cipher machine | máy mã ×18, máy mật mã ×4 | máy mã |
| cipher disc / rotor | đĩa mã hóa ×203, rôto ×3, đĩa mật mã ×1 | đĩa mã hóa |
| one-way function | hàm số một chiều ×36, hàm một chiều ×18 | hàm số một chiều |
| modular arithmetic | số học môđun ×14, số học đồng dư ×3 | số học môđun |
| public / private key | chìa khóa công khai ×81 / chìa khóa mã công khai ×16; chìa khóa riêng ×34 / chìa khóa mã riêng ×13 | the shorter forms |
| Zimmermann telegram | bức điện Zimmermann ×9, điện tín Zimmermann ×3 | bức điện Zimmermann |
| Mary | Nữ hoàng Mary xứ Scotland ×9, Nữ hoàng Mary của Scotland ×4 | xứ Scotland |
| Ptolemy | Ptolemy ×11, Ptolemaios ×3 | Ptolemy |
| US Marines | Quân đoàn Hải quân (p. 284); often just *hải quân*, which also means the Navy | Quân đoàn Hải quân; never bare *hải quân* for the Marines |

### 0.6 Spelling

Use the tone placement the edition and vi.wikipedia both use: *khóa, hóa, thủy* (not *khoá, hoá, thuỷ*), and *ký, kỹ, lý* with **y**. The edition writes southern *ngàn* (×42, *nghìn* ×6) and *heo*. Names keep the edition's spelling, *mật mã chuồng heo* included. For plain numbers we keep **nghìn** (house style, not a term).

## 1. Glossary

The tables below repeat §0 and add words the edition does not settle. Where a row and §0 disagree, §0 wins.

### 1.1 Core ideas

| English | Vietnamese | Note / source |
|---|---|---|
| cryptography | khoa học mật mã | §0, ED p. 24 |
| secret writing | viết bí mật, thư bí mật | Ours |
| cipher | mật mã; short "mã" (mã Caesar) | ED p. 30. Where cipher vs code matters: **mã chữ cái** (ED p. 14) |
| code | mã từ | ED p. 13. The first time: "mã từ: thay cả một từ bằng một từ hay một con số khác". |
| codebook | sổ mã | ED p. 60 |
| encode / encipher / encrypt | mã hóa | ED p. 59 |
| decode / decipher / decrypt (with the key) | giải mã | ED p. 59. The rightful reader, who has the key. |
| break, crack (without the key) | phá, phá vỡ, phá mã | §0. Never "bẻ khóa". |
| decipher a lost script (hieroglyphs, Linear B) | giải mã | ED p. 294 |
| cryptanalysis | phân tích mã | ED p. 37. Introduce once: "**phân tích mã**, tức là phá mật mã mà không có chìa khóa". |
| codebreaker | nhà giải mã | ED p. 35 |
| codemaker | nhà tạo mã | ED p. 38 |
| plaintext | văn bản thường | ED p. 28 |
| ciphertext | bản mật mã | ED p. 31 |
| plain alphabet | bảng chữ cái thường | ED p. 30 |
| cipher alphabet | bảng chữ cái mật mã | ED p. 30 |
| alphabet | bảng chữ cái | ED |
| key | chìa khóa mã; chìa khóa | ED p. 30. See pitfall 1. |
| keyword / keyphrase | từ khóa / cụm từ khóa mã | ED p. 87, p. 34 |
| algorithm | thuật toán | ED p. 30 |
| Kerckhoffs' principle | nguyên tắc Kerckhoffs | ED p. 33 |
| brute-force attack | thử hết mọi chìa khóa (tấn công vét cạn) | Ours (not in the book) |
| substitution (cipher) | mã thay thế, mật mã thay thế | ED p. 28 |
| monoalphabetic | thay thế dùng một bảng chữ cái | ED p. 37 |
| polyalphabetic | dùng nhiều bảng chữ cái | ED p. 92 |
| homophonic (substitution) | (mật mã) thay thế đồng âm | ED p. 93. Explain: "một chữ có nhiều ký hiệu thay thế". |
| transposition | chuyển vị, mã chuyển vị | ED p. 25. Gloss: "giữ nguyên các chữ, chỉ đổi chỗ". |
| steganography | kỹ thuật giấu thư | ED p. 23 |
| cover text | văn bản che | Ours (not in the book) |
| semagram | ký hiệu biểu ý | ED ch. 5 |
| nulls | ký tự không | ED p. 58. Symbols that mean nothing. |
| nomenclator | mã hỗn hợp; bảng mã hỗn hợp | ED p. 61, p. 72. Explain: half cipher alphabet, half list of code words. |
| frequency, frequency analysis | tần suất, phân tích tần suất | ED p. 41 |
| letter count(s) | số lần xuất hiện của mỗi chữ | Ours. UI: "Đếm chữ". |
| digraph | cặp chữ cái | ED p. 28 |
| grid / square | lưới / hình vuông | ED "hình vuông Vigenère" |
| Vigenère square | hình vuông Vigenère | ED p. 86 |
| Kasiski test | phép thử Kasiski | ED p. 127 |
| repeated sequence | chuỗi chữ lặp lại | Ours (not in the book as a term) |
| book cipher, key text | mật mã sách, văn bản khóa mã | ED p. 142 |
| equidistant letter sequence | chuỗi chữ cái cách đều nhau (EDLS) | ED p. 529 |
| fractionation | chia nhỏ chữ (phân đoạn) | Ours (not in the book) |
| one-time pad | sổ tay dùng một lần | ED p. 184 |
| pad (sheet) | tờ khóa | Ours (not in the book) |
| spelling alphabet | bảng đánh vần | Ours (not in the book) |
| cryptogram | bản mật mã | ED p. 149, p. 538 |
| message | bức thư; bức điện | ED. See pitfall 4. |
| telegram | bức điện (điện tín) | ED p. 104, p. 170 |
| teleprinter | máy điện báo đánh chữ | Ours (not in the book) |
| wiretap / eavesdropper | nghe lén / người nghe lén | ED p. 369 "nghe lén" |

### 1.2 Machines

| English | Vietnamese | Note / source |
|---|---|---|
| cipher machine | máy mã | ED p. 189 |
| cipher disc | đĩa mã hóa | ED p. 189 |
| rotor | đĩa mã hóa (rôto) | ED p. 197. Gloss "rôto" once. |
| scrambler | đĩa mã hóa; the whole unit: bộ phận mã hóa | ED p. 193 |
| reflector | đĩa phản xạ | ED p. 199 |
| plugboard | bảng ổ nối | ED p. 202 |
| cable / socket | dây cáp / ổ nối | ED p. 202, p. 252 |
| keyboard | bàn phím | ED p. 193 |
| lampboard / lamp | bảng đèn / bóng đèn | ED p. 193, p. 254 |
| rotor order / start position | cách sắp đặt các đĩa mã hóa / vị trí ban đầu | ED p. 204, p. 195 |
| day key | khóa mã ngày | ED p. 219 |
| message key | khóa mã thư | ED p. 220 |
| crib | crib | ED p. 251. First time: "**crib**: một từ đoán trước là có trong bức điện, như `WETTER`". |
| bombe | máy bom | ED p. 231. Not a weapon; see pitfall 8. |
| chain (Rejewski) | vòng liên kết | ED p. 226 |
| stepping switch | công tắc bước | Ours (not in the book) |
| sixes / twenties | nhóm sáu / nhóm hai mươi | Ours (not in the book) |
| tape, wheel (Lorenz) | băng giấy, bánh xe | Ours |
| first programmable computer | máy tính lập trình được đầu tiên | ED p. 350 "máy tính lập trình" |

### 1.3 Computers and modern cryptography

| English | Vietnamese | Note / source |
|---|---|---|
| bit, binary digit | bit, chữ số nhị phân | ED p. 352 |
| ASCII | ASCII | ED p. 352 |
| XOR | XOR (cộng không nhớ) | Ours (not in the book). Explain with 0 and 1. |
| block / round / round key | khối / vòng / khóa vòng | ED p. 358 (khối, vòng); "khóa vòng" ours |
| Data Encryption Standard (DES) | Tiêu chuẩn Mã hóa Dữ liệu (DES) | ED p. 360 |
| symmetric / asymmetric | đối xứng / bất đối xứng | ED p. 386 |
| key distribution problem | vấn đề phân phối chìa khóa mã | ED p. 360 |
| key exchange | trao đổi chìa khóa mã | ED p. 383 |
| one-way function | hàm số một chiều | ED p. 375 |
| modular arithmetic | số học môđun | ED p. 375. Use the clock image for the reader (ours). |
| modulus, mod | môđun, mod | Keep `mod` in formulas. |
| prime number | số nguyên tố | ED p. 391 |
| factor / factoring | thừa số / phân tích ra thừa số nguyên tố | ED p. 397 |
| public key / private key | chìa khóa công khai / chìa khóa riêng | ED p. 384, p. 387 |
| secret key | chìa khóa mã bí mật | ED p. 369. For symmetric ciphers only. |
| session key | khóa phiên | Ours (not in the book) |
| padlock (RSA image) | khóa móc | ED p. 361. See pitfall 1. |
| digital signature | chữ ký số hóa | ED p. 430 |
| digest (hash) | bản tóm tắt (giá trị băm) | Ours (not in the book) |
| key escrow / escrow agent | giao kèo chìa khóa mã / đại lý giao kèo | ED p. 446 |
| warrant | lệnh của tòa án | Ours (not in the book) |
| quantum cryptography | mật mã lượng tử | ED p. 478 |
| quantum | lượng tử | ED |
| photon | phôtôn | ED p. 464 |
| polarisation | sự phân cực | ED p. 479 |
| detector / scheme | máy dò / sơ đồ | ED p. 489, p. 494: "sơ đồ thẳng" (+) and "sơ đồ chéo" (×). |

### 1.4 People, groups, places and code names

All names, as the edition writes them, are in §5. In short:

| English | Vietnamese | Note |
|---|---|---|
| Alice, Bob, Eve | Alice, Bob, Eve | Keep. Eve = "người nghe lén" on first use. |
| Mary Queen of Scots | Nữ hoàng Mary xứ Scotland | ED p. 17 |
| Queen Elizabeth I | Nữ hoàng Elizabeth (Elizabeth I) | ED p. 17, p. 66 |
| Freemasons | Hội Tam điểm | ED p. 531 |
| Navajo code talkers | những người nói mật mã Navajo | ED p. 290 |
| US Marines | Quân đoàn Hải quân (Mỹ) | ED p. 284 |
| Room 40 | Phòng 40 | ED p. 170 |
| Bletchley Park, Ultra, Colossus, Clipper, Capstone | keep as is | ED p. 238, p. 271, p. 349, p. 447 |
| Magic (US intelligence from Purple) | Magic | Ours (not in the book) |
| Polish Cipher Bureau | Biuro Szyfrów | ED p. 214 |
| First / Second World War | Chiến tranh thế giới thứ nhất / thứ hai | |
| Rosetta Stone | phiến đá Rosetta | ED p. 300 |
| hieroglyph, cartouche | chữ tượng hình, cartouche | ED p. 297, p. 304 |
| syllabary / phonogram | chữ viết theo âm tiết / ký âm | ED p. 320; ch. 5 |
| Gaul, Sparta, Baghdad, Crete | xứ Gaul, Sparta, Baghdad, đảo Crete | ED p. 29, p. 20, p. 38, p. 317 |
| Germany, Britain, America, Japan, Poland, France, Persia, Rome, Egypt, Greece | Đức, Anh, Mỹ, Nhật Bản, Ba Lan, Pháp, Ba Tư, La Mã, Ai Cập, Hy Lạp | ED |
| Sherlock Holmes, "The Dancing Men" | Sherlock Holmes, "Cuộc phiêu lưu của những hình nhân nhảy múa" | ED p. 131 |
| Poe, "The Gold-Bug" | Edgar Allan Poe, "Con bọ bằng vàng" | ED p. 131–132 |

### 1.5 Chapter titles (our site)

| # | English | Vietnamese | Source |
|---|---|---|---|
| 1 | The Cipher of Mary Queen of Scots | Bản mật mã của Nữ hoàng Mary xứ Scotland | ED ch. 1 |
| 2 | The Anonymous Codebreaker | Le chiffre indéchiffrable | The book (ch. 2 title) |
| 3 | The Mechanization of Secrecy | Cơ giới hóa việc giữ bí mật | ED ch. 3 |
| 4 | The Language Barrier | Rào cản ngôn ngữ | ED ch. 5 |
| 5 | Alice and Bob Go Public | Alice và Bob ra công khai | ED ch. 6 |
| 6 | Pretty Good Privacy | Riêng tư tốt đẹp | ED ch. 7 |
| 7 | The Codebreaker's Challenge | Thách thức giải mã | ED p. 505 "Một thách thức giải mã" |

How the site's chapters map onto the edition's is in §4.3.

### 1.6 Cipher page titles (all 38, in menu order)

| Slug | English | Vietnamese |
|---|---|---|
| hidden-writing | Hidden writing | Giấu thư |
| rail-fence | The rail fence | Mật mã hàng rào (ED p. 26: chuyển vị kiểu “hàng rào”) |
| scytale | The Spartan scytale | Cây scytale của Sparta (ED p. 28) |
| kama-sutra | The Kama Sutra cipher | Mật mã Kāma-Sūtra (ED p. 27) |
| caesar | The Caesar shift | Mật mã dịch chuyển Caesar |
| keyword-substitution | The keyword cipher | Mật mã từ khóa |
| frequency-analysis | Frequency analysis | Phân tích tần suất |
| bible-code | The so-called Bible code | Cái gọi là “mật mã Kinh thánh” (ED p. 529, Phụ lục C) |
| mary-queen-of-scots | The cipher of Mary Queen of Scots | Mật mã của Nữ hoàng Mary xứ Scotland |
| vigenere | The Vigenère cipher | Mật mã Vigenère |
| homophonic | The homophonic cipher | Mật mã thay thế đồng âm |
| pigpen | The pigpen cipher | Mật mã chuồng heo (ED p. 531) |
| babbage | Babbage breaks the Vigenère cipher | Babbage phá mật mã Vigenère |
| pinprick | Pinprick messages | Thư lỗ châm kim (ED p. 130 "lỗ châm kim") |
| dancing-men | The Dancing Men and other ciphers in stories | Những hình nhân nhảy múa và các mật mã trong truyện |
| playfair | The Playfair cipher | Mật mã Playfair |
| beale | The Beale ciphers | Các bản mật mã của Beale (ED p. 149) |
| morse | Morse code | Mã Morse |
| zimmermann | The Zimmermann telegram | Bức điện Zimmermann (ED p. 170) |
| adfgvx | The ADFGVX cipher | Mật mã ADFGVX |
| one-time-pad | The one-time pad | Sổ tay dùng một lần |
| cipher-disc | The cipher disc | Đĩa mã hóa (ED p. 189) |
| enigma | The Enigma machine | Máy Enigma |
| cracking-enigma | Cracking Enigma | Công phá Enigma |
| purple | Purple, the machine with no rotors | Purple, máy mã không có đĩa mã hóa |
| navajo | The Navajo code talkers | Những người nói mật mã Navajo (ED p. 290) |
| hieroglyphs | Reading the hieroglyphs | Giải mã chữ tượng hình |
| linear-b | The riddle of Linear B | Bí mật của Linear B (ED p. 315, a section title) |
| lorenz | Colossus and the Lorenz cipher | Colossus và mật mã Lorenz (ED p. 349) |
| binary | Ciphers for computers | Mật mã cho máy tính |
| lucifer | Lucifer and DES | Lucifer và DES |
| key-exchange | The key exchange | Trao đổi chìa khóa mã |
| rsa | RSA | Mật mã RSA (ED p. 422) |
| pgp | Pretty Good Privacy | Riêng tư tốt đẹp (PGP) |
| key-escrow | Key escrow | Giao kèo chìa khóa mã |
| digital-signatures | Digital signatures | Chữ ký số hóa |
| quantum | Quantum cryptography | Mật mã lượng tử |
| codebreakers-challenge | The Codebreaker's Challenge | Thách thức giải mã |

### 1.7 Interface words

Sentence case, as in English: only the first word and names take a capital.

| English | Vietnamese | Note |
|---|---|---|
| Shift | Độ dịch | |
| Key / Key letter | Chìa khóa / Chữ khóa | §0 |
| Keyword | Từ khóa | |
| Message / Your message | Tin nhắn / Tin nhắn của bạn | Interface only; story text says "bức thư" (§0). |
| Plaintext / Plain | Văn bản thường / Thường | "Plain" and "Cipher" are row labels on a board. |
| Ciphertext / The ciphertext / Cipher | Bản mật mã / Bản mật mã / Mật mã | |
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
| Plugboard, Crib, Session key, Pad | Bảng ổ nối, Crib, Khóa phiên, Tờ khóa | As in §0. |

## 2. Style rules

### Voice

1. **Address the reader as "bạn"**, every time. Never "các em" (sounds like a teacher), "quý vị", "cậu" or "mày". Use "chúng ta" only for something truly shared ("chúng ta biết…"), at most once or twice per page.
2. **People in the story** get the pronoun Vietnamese gives an adult: "ông" for Caesar, Babbage, Turing; "bà" for Mary or Elizabeth once they are named; "cô" for Alice, "anh" for Bob, "cô" for Eve. When unsure, repeat the name.
3. **Short sentences.** English allows 25 words. Vietnamese words are one syllable, so count syllables (tiếng): **at most 35 tiếng, aim for 15 to 25.** One idea per sentence. Split at "và", "nhưng", "vì vậy" rather than chaining clauses.
4. **Warm and plain.** Write as an older cousin who loves the subject would speak. Active verbs: "Caesar dịch bảng chữ cái", not "Bảng chữ cái được Caesar dịch". Avoid "được/bị" passives unless the doer is unknown.
5. **Plain word before Sino-Vietnamese word** in our own sentences: "đổi chỗ" not "hoán đổi vị trí", "cách làm" not "phương thức", "dùng" not "sử dụng" (both fine, prefer the shorter), "tìm ra" not "phát hiện ra" where it reads better, "chia" not "phân chia". The edition's terms (§0) are kept even when they are Sino-Vietnamese (phân tích mã, chuyển vị, số nguyên tố), but glossed in plain words the first time.
6. **Explain a term the first time and bold it once**, as in English: "Bức thư gốc gọi là **văn bản thường**."
7. **Say "nhấn" or "chạm", never "click" or "nhấp chuột".** "Nhấn" for buttons, "chạm" for letters or parts of the simulator. "Chọn" for a choice.
8. **Headings say what the section tells you**, as in English: "Lặp lại là kẻ thù", not "Điểm yếu".
9. **The words must be ours**, as in English. Do not copy sentences from the Vietnamese edition. Its terms, names and titles are ours to use; its sentences are not.

### Names

10. **Personal names keep the edition's Latin spelling and diacritics** (§5): Julius Caesar, Alan Turing, Marian Rejewski, Blaise de Vigenère, Champollion, al-Kindī, Vātsyāyana. Do not use old Vietnamese transcriptions ("Xê-da"). Given name first, as in the source.
11. **Titles are translated, names are not**: "Nữ hoàng Mary", "Ngài Francis Walsingham", "Đô đốc Hall".
12. **Places**: use the edition's name (§5): Đức, Anh, Mỹ, La Mã, Ai Cập, Hy Lạp, Ba Tư, Vácsava, Trân Châu Cảng. Otherwise keep the original: Bletchley Park, Baghdad, Sparta.
13. **Titles of books and stories**: use the edition's Vietnamese title if it gives one ("Con bọ bằng vàng"), otherwise keep the English in italics and add a translation in brackets the first time. When citing the source, write *Mật mã: Từ cổ điển đến lượng tử*, chương N: <title> (§4).

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

1. **"Khóa" means both "lock" and "key".** That is why the edition says **chìa khóa (mã)** for the key. For RSA's padlock image, write "khóa móc" for the padlock and "chìa khóa" for what opens it.
2. **"Giải mã" is not "phá".** The edition uses *giải mã* for both, but we keep them apart: Bob *giải mã* with the key; Eve *phá* (phá vỡ, phá mã) without it. The noun stays the edition's *nhà giải mã*. Lost scripts are *giải mã* too, as in the edition.
3. **"Mã" alone is ambiguous** (barcode, source code, a product code). Write "mật mã" for a cipher and "mã" only in fixed names (mã Morse, mã Caesar, mật mã Navajo) or after "mật mã" has been said.
4. **"Message" is not "thông điệp".** "Thông điệp" sounds like a speech or an advert's moral. In story text use the edition's "bức thư", and "bức điện" for telegrams and radio messages. Only the interface says "tin nhắn" for the reader's own text.
5. **"Story" is "câu chuyện", not "truyện"** (that means fiction). The history is true.
6. **"Challenge" is "thử thách", not "thách đấu"** (a duel). The book's Cipher Challenge is "Thách thức Giải mã" (p. 505). "Dig deeper" is "tìm hiểu thêm", not "đào sâu".
7. **"Crack" is not "bẻ khóa" or "hack"**: they read as software piracy. Use "phá".
8. **"Bombe" is "máy bom"**, the edition's word (p. 231). The first time, say plainly that it is a code-breaking machine named for its ticking, so no reader thinks of a weapon.
9. **"Pigpen" is "mật mã chuồng heo"**, the edition's name (p. 531). Do not make it cute ("ổ heo con").
10. **"Prime" is "số nguyên tố"**, not "số chính" or "số nguyên".
11. **"Private key" is "chìa khóa riêng"**, so it does not clash with "chìa khóa mã bí mật" (the shared key of a symmetric cipher).
12. **Avoid heavy forms the edition does not use**: "mật mã hóa" (just "mã hóa"), "giải mật mã" ("giải mã"), "văn bản trơn" or "bản rõ" ("văn bản thường"), "thuật toán mã hóa đối xứng khối" (say it in two sentences).
13. **Do not localise the examples** into Vietnamese words. A Vietnamese plaintext breaks the cipher (diacritics, no F, J, W, Z) and breaks the frequency charts.
14. **"Code talker" is "người nói mật mã"**, the edition's word (p. 288, p. 290). Make clear once that they spoke Navajo over the radio in a code built on it, not that they talked in riddles.

## 4. The Vietnamese edition: chapters, pages and appendices

Cite each page's source as: *Mật mã: Từ cổ điển đến lượng tử*, chương N: <title>. Chapter 2's title is French in the edition too; write it in italics. The contents page (p. 7) lists the Introduction, chapters 1–8, Appendices A–J and the web list; the Cipher Challenge has no line there and sits at the end of chapter 8's page run.

### 4.1 Chapters

| # | Title in the edition | Pages | Sections (first page) |
|---|---|---|---|
| – | Mở đầu | 9–16 | |
| 1 | Bản mật mã của Nữ hoàng Mary xứ Scotland | 17–82 | Sự tiến hóa của thư từ bí mật (20); Các nhà phân tích mã Ả Rập (35); Phân tích một văn bản mật mã (45); Phục hưng ở phương Tây (53); Âm mưu Babington (62) |
| 2 | *Le chiffre indéchiffrable* | 83–156 | Từ sự lãng quên Vigenère đến Người Đeo Mặt Nạ Sắt (92); Phòng Đen (102); Babbage và Mật mã Vigenère (108); Từ Cột nhắn tin đến Kho báu bí mật (128) |
| 3 | Cơ giới hóa việc giữ bí mật | 157–212 | Báu vật của Khoa học mật mã (176); Sự phát triển của Máy mã – Từ Đĩa mã hóa đến máy Enigma (189) |
| 4 | Công phá Enigma | 213–278 | Con ngỗng không bao giờ kêu quạc quạc (237); Đánh cắp sổ mã (265); Các nhà giải mã vô danh (271) |
| 5 | Rào cản ngôn ngữ | 279–348 | Giải mã những ngôn ngữ đã biến mất và văn tự cổ (294); Bí mật của Linear B (315); Các âm tiết nối (324); Một sự lạc hướng vô nghĩa (330) |
| 6 | Alice và Bob ra công khai | 349–420 | Thánh nhân đãi kẻ khù khờ (363); Sự ra đời của Mật mã chìa khóa công khai (384); Các số nguyên tố bước ra sân khấu (391); Câu chuyện khác về Mật mã chìa khóa công khai (402) |
| 7 | Riêng tư tốt đẹp | 421–456 | Mã hóa trên diện rộng... hay không? (436); Sự phục hồi của Zimmermann (452) |
| 8 | Bước nhảy lượng tử vào tương lai | 457–504 | Tương lai của giải mã (459); Mật mã lượng tử (478) |
| – | Một thách thức giải mã: mười bước tiến đến 15 ngàn đôla | 505–523 | Bước 1 – Bước 10 |
| – | Các trang WEB tham khảo | 549–550 | |

### 4.2 Appendices

| | Title in the edition | Subject | Page |
|---|---|---|---|
| A | Đoạn mở đầu cuốn *A Void* của Georges Perec do Gilbert Adair dịch | The opening of a novel written without the letter `E` | 524 |
| B | Một vài mẹo cơ bản trong phân tích tần suất | Tips for frequency analysis | 526 |
| C | Mật mã Kinh thánh | The so-called Bible code (Drosnin, EDLS) | 529 |
| D | Mật mã chuồng heo | The pigpen cipher (Freemasons) | 531 |
| E | Mật mã Playfair | The Playfair cipher | 533 |
| F | Mật mã ADFGVX | The ADFGVX cipher | 537 |
| G | Điểm yếu của sự quay vòng sổ tay dùng một lần | Why reusing a one-time pad is fatal | 540 |
| H | Giải đáp Ô chữ trên tờ Daily Telegraph | The answers to the *Daily Telegraph* crossword (Bletchley recruiting) | 542 |
| I | Một số bài tập dành cho độc giả quan tâm | Exercises for the reader | 543 |
| J | Toán học của mật mã RSA | The mathematics of RSA | 545 |

### 4.3 How our 7 chapters line up with the edition's 8

Our site follows the abridged English edition's 7 chapters. The edition's chapters 3 and 4 are one chapter for us, and so are its 7 and 8. Our chapter 2 has the full edition's chapter 2 content under the abridged edition's title.

| Site # | Our title | Edition chapter(s) to cite | Pages |
|---|---|---|---|
| 1 | Bản mật mã của Nữ hoàng Mary xứ Scotland | ch. 1 (Bible code: Phụ lục C) | 17–82; 529 |
| 2 | Le chiffre indéchiffrable | ch. 2 *Le chiffre indéchiffrable* (pigpen: Phụ lục D; Playfair: ch. 2 p. 129 and Phụ lục E) | 83–156; 531–536 |
| 3 | Cơ giới hóa việc giữ bí mật | ch. 3 and ch. 4 *Công phá Enigma* (ADFGVX: also Phụ lục F; one-time pad: also Phụ lục G). **Morse** is in the edition's ch. 2 (p. 105). | 157–278; 537–541 |
| 4 | Rào cản ngôn ngữ | ch. 5. Purple is at its start (p. 279). | 279–348 |
| 5 | Alice và Bob ra công khai | ch. 6. Colossus and Lorenz are at its start (p. 349). | 349–420; 545 (RSA maths) |
| 6 | Riêng tư tốt đẹp | ch. 7 (PGP, digital signatures, key escrow) and ch. 8 *Bước nhảy lượng tử vào tương lai* (quantum) | 421–504 |
| 7 | Thách thức giải mã | Một thách thức giải mã (after ch. 8) | 505–523 |

## 5. Names as the Vietnamese edition writes them

The edition keeps Latin-script names, with their diacritics, and translates titles, countries and some places. Page = one page where that form appears.

| English | Vietnamese edition | Page |
|---|---|---|
| Herodotus | Herodotus | 20 |
| Xerxes | Xerxes | 20 |
| Demaratus | Demaratus | 21 |
| Susa | Susa | 21 |
| Histiaeus | Histaiaeus | 22 |
| Aristagoras | Aristagoras | 22 |
| Miletus | Miletus | 22 |
| Sparta, Spartans | Sparta, người Sparta | 20, 21 |
| Pliny | Pliny | 23 |
| Giovanni Porta | Giovanni Porta | 23 |
| Lysander | Lysander | 27 |
| scytale | cây scytale (khúc gỗ) | 27–28 |
| Kama Sutra, Vatsyayana | Kāma-Sūtra, Vātsyāyana | 27 |
| Julius Caesar | Julius Caesar | 29 |
| Suetonius | Suetonius | 29 |
| Gaul | xứ Gaul | 29 |
| Arabs | người Ả Rập | 37 |
| al-Kindi | al-Kindī | 40 |
| Baghdad | Baghdad | 38 |
| Atbash | Atbash | 53 |
| Mary Queen of Scots | Nữ hoàng Mary xứ Scotland | 17 |
| Fotheringhay Castle | Lâu đài Fotheringhay | 17 |
| Elizabeth I | Nữ hoàng Elizabeth; Elizabeth I | 17, 66 |
| Sir Francis Walsingham | Ngài Francis Walsingham | 18 |
| Thomas Phelippes | Thomas Phelippes | 20 |
| Babington Plot | Âm mưu Babington | 62 |
| Chartley | Chartley | 67 |
| Gilbert Gifford | Gilbert Gifford | 68 |
| Leon Battista Alberti | Leon Battista Alberti (Leon Alberti) | 83, 189 |
| Leonardo Dato | Leonardo Dato | 84 |
| Trithemius | Trithemius | 85 |
| Blaise de Vigenère | Blaise de Vigenère | 85 |
| Man in the Iron Mask | Người Đeo Mặt Nạ Sắt | 92 |
| Louis XIV | Louis XIV | 96 |
| Great Cipher | Mật mã Vĩ đại | 96 |
| Antoine and Bonaventure Rossignol | Rossignol, Bonaventure Rossignol | 96 |
| Étienne Bazeries | Bazeries | 98 |
| Black Chambers | Phòng Đen | 102 |
| Charles Wheatstone | Charles Wheatstone | 104 |
| Samuel Morse | Samuel Morse | 105 |
| Charles Babbage | Charles Babbage | 108 |
| John Hall Brock Thwaites | Thwaites | 113 |
| Friedrich Kasiski | Friedrich Kasiski | 128 |
| Lyon Playfair | Lyon Playfair | 129 |
| Aeneas | Aeneas | 130 |
| Jules Verne | Jules Verne | 130 |
| Sherlock Holmes, Arthur Conan Doyle | Sherlock Holmes, Conan Doyle | 131 |
| "The Adventure of the Dancing Men" | "Cuộc phiêu lưu của những hình nhân nhảy múa" | 131 |
| Edgar Allan Poe | Edgar Allan Poe | 131 |
| "The Gold-Bug", William Legrand | "Con bọ bằng vàng", William Legrand | 132 |
| Thomas J. Beale | Thomas J. Beale | 133 |
| Robert Morriss | Robert Morriss | 133 |
| Lynchburg | Lynchburg | 133 |
| Beale treasure | kho báu của Beale | 147 |
| William Friedman | William Friedman | 147 |
| NSA | Cơ quan An ninh Quốc gia Mỹ (NSA) | 15, 150 |
| Georges Painvin | Georges Painvin | 161 |
| Arthur Zimmermann | Arthur Zimmermann | 166 |
| Mexico, Mexico City | Mexico, Mexico City | 168, 172 |
| Zimmermann telegram | bức điện Zimmermann | 170 |
| Room 40 | Phòng 40 | 170 |
| Reverend William Montgomery | Reverend Montgomery | 170 |
| Nigel de Grey | Nigel de Grey | 170 |
| Admiral Sir William Hall | Đô đốc Hall, Ngài William Hall | 171 |
| Joseph Mauborgne | Joseph Mauborgne | 182 |
| Enigma | máy Enigma | 189 |
| Arthur Scherbius | Arthur Scherbius | 193 |
| David Kahn | David Kahn | 204 |
| Polish Cipher Bureau | Biuro Szyfrów | 214 |
| Warsaw | Vácsava | 214 |
| Hans-Thilo Schmidt ("Asche") | Hans-Thilo Schmidt | 215 |
| Marian Rejewski | Marian Rejewski | 222 |
| Gwido Langer | Gwido Langer | 232 |
| Bletchley Park | Bletchley Park | 238 |
| Alan Turing | Alan Turing | 244 |
| Gordon Welchman | Gordon Welchman | 244 |
| U-boat | tàu ngầm Đức (U-boat) | 266 |
| Ultra | Ultra | 271 |
| Purple | Purple (Màu tím) | 279 |
| Midway | Midway | 279 |
| Philip Johnston | Philip Johnston | 282 |
| Navajo (people / language) | người Navajo / tiếng Navajo | 282 |
| Navajo code | mật mã Navajo | 284 |
| US Marine Corps | Quân đoàn Hải quân | 284 |
| Pearl Harbor | Trân Châu Cảng | 284 |
| Navajo code talkers | những người nói mật mã Navajo | 290 |
| Iwo Jima | Iwo Jima | 292 |
| Seizo Arisue | Arisue | 294 |
| Coptic | chữ Coptic, tiếng Coptic | 297, 312 |
| Athanasius Kircher | Kircher | 299 |
| Rosetta Stone | phiến đá Rosetta | 300 |
| Ptolemy | Ptolemy (also Ptolemaios) | 301, 304 |
| Thomas Young | Thomas Young | 304 |
| Jean-François Champollion | Champollion | 307 |
| Cleopatra | Cleopatra | 309 |
| Abu Simbel | Abu Simbel | 310 |
| Rameses | Rameses | 312 |
| Sir Arthur Evans | Ngài Arthur Evans | 316 |
| Knossos, Crete | Knossos, đảo Crete | 317 |
| Linear A, Linear B | Linear A, Linear B | 319, 5 |
| Carl Blegen | Blegen | 323 |
| Alice Kober | Alice Kober | 325 |
| Michael Ventris | Michael Ventris | 330 |
| John Chadwick | John Chadwick | 5 |
| Lorenz cipher | mật mã Lorenz | 349 |
| Colossus | Colossus | 349 |
| John Tiltman, Bill Tutte | Tiltman, Tutte | 349 |
| Tommy Flowers, Max Newman | Tommy Flowers, Max Newman | 350 |
| ASCII | ASCII | 352 |
| IBM | IBM | 355 |
| Horst Feistel, Lucifer | Horst Feistel, Lucifer | 357 |
| DES | DES, Tiêu chuẩn Mã hóa Dữ liệu | 360 |
| Whitfield Diffie | Whitfield Diffie | 363 |
| Martin Hellman | Martin Hellman | 366 |
| Ralph Merkle | Ralph Merkle | 368 |
| Alice, Bob, Eve | Alice, Bob, Eve | 369 |
| Diffie–Hellman–Merkle key exchange | sơ đồ trao đổi chìa khóa mã Diffie-Hellman-Merkle | 383 |
| Ron Rivest, Adi Shamir, Leonard Adleman | Ron Rivest, Adi Shamir, Leonard Adleman | 391 |
| RSA | mật mã RSA | 422 |
| GCHQ | GCHQ | 14 |
| James Ellis | James Ellis | 402 |
| Clifford Cocks | Clifford Cocks | 408 |
| Malcolm Williamson | Malcolm Williamson | 411 |
| Phil Zimmermann | Phil Zimmermann | 423 |
| Pretty Good Privacy, PGP | Pretty Good Privacy (Riêng tư tốt đẹp), PGP | 428, 7 |
| IDEA | IDEA | 429 |
| Clipper, Capstone | Clipper, Capstone | 447 |
| David Deutsch | David Deutsch | 470 |
| Peter Shor | Peter Shor | 476 |
| Stephen Wiesner | Stephen Wiesner | 479 |
| Heisenberg | Heisenberg | 485 |
| Charles Bennett | Charles Bennett | 487 |
| Gilles Brassard | Gilles Brassard | 488 |
| Cipher Challenge | Thách thức Giải mã | 505 |
| Michael Drosnin, *The Bible Code* | Michael Drosnin, *Mật mã Kinh thánh* | 529 |
| Freemasons | Hội Tam điểm | 531 |

Not found in the edition: Gorgo, Leonidas, Plutarch, Kerckhoffs, Claude Shannon, Gilbert Vernam, Frank Rowlett, Fritz Nebel, Dilly Knox, Matt Blaze, Magic, Tunny. Spell these as in English.

## 6. Terms to change in the site

Found in the Vietnamese strings of `apps/web/app` (story.vi.mdx, the `vi:` strings in .tsx/.ts, chapters.ts) on 15 November 2026. Paths are under `apps/web/app/ciphers/` unless they start with `chapters.ts`. Code identifiers (`rotor`, `Photon…`) are not Vietnamese strings and stay. All changed in the rework of 15 November 2026; kept as a record.

| Old | New (§0) | Files |
|---|---|---|
| bản rõ, "Bản rõ" | văn bản thường, "Văn bản thường" | adfgvx/AdfgvxControls.tsx, babbage/BabbageBoard.tsx, babbage/BabbageControls.tsx, babbage/story.vi.mdx, beale/BealeControls.tsx, beale/story.vi.mdx, binary/BinaryControls.tsx, caesar/CaesarControls.tsx, caesar/story.vi.mdx, cipher-disc/DiscControls.tsx, cipher-disc/story.vi.mdx, codebreakers-challenge/VigenereBench.tsx, homophonic/HomophonicBoard.tsx, homophonic/HomophonicControls.tsx, kama-sutra/story.vi.mdx, keyword-substitution/KeywordControls.tsx, keyword-substitution/story.vi.mdx, lucifer/LuciferControls.tsx, mary-queen-of-scots/story.vi.mdx, morse/story.vi.mdx, one-time-pad/PadControls.tsx, playfair/PlayfairControls.tsx, playfair/story.vi.mdx, purple/PurpleControls.tsx, rail-fence/RailFenceControls.tsx, scytale/ScytaleControls.tsx, vigenere/VigenereControls.tsx, vigenere/story.vi.mdx |
| row labels "Rõ" / "Mã" | "Thường" / "Mật mã" | caesar/CaesarBoard.tsx, cipher-disc/DiscBoard.tsx, codebreakers-challenge/CaesarBench.tsx, dancing-men/VerneSteps.tsx, keyword-substitution/KeywordBoard.tsx, playfair/PlayfairBoard.tsx, vigenere/VigenereBoard.tsx |
| bảng chữ rõ / bảng chữ mã | bảng chữ cái thường / bảng chữ cái mật mã | babbage, caesar, cipher-disc, codebreakers-challenge, enigma, frequency-analysis, homophonic, keyword-substitution (incl. KeywordBoard.tsx), mary-queen-of-scots, pigpen, rsa, vigenere (story.vi.mdx) |
| khóa (the key), UI "Khóa" | chìa khóa mã / chìa khóa, UI "Chìa khóa" | `vi:` labels in binary/BinaryControls.tsx, babbage/BabbageControls.tsx, codebreakers-challenge/CodebreakersChallengeControls.tsx, dancing-men/DancingMenBoard.tsx, digital-signatures/SignaturesBoard.tsx, frequency-analysis/FrequencyAnalysisControls.tsx, homophonic/HomophonicBoard.tsx, key-escrow/EscrowBoard.tsx, key-escrow/EscrowControls.tsx, key-escrow/ReaderDesk.tsx, key-exchange/KeyExchangeControls.tsx, lorenz/Adding.tsx, lucifer/LuciferBoard.tsx, lucifer/LuciferControls.tsx, mary-queen-of-scots/SignKey.tsx, pgp/*.tsx, pgp/usePgp.ts, quantum/PhotonTable.tsx, quantum/QuantumControls.tsx, rsa/RsaControls.tsx, vigenere/VigenereBoard.tsx; and bare *khóa* in all 38 story.vi.mdx (review each) |
| khóa công khai / khóa riêng | chìa khóa công khai / chìa khóa riêng | digital-signatures (story, SignaturesBoard.tsx, meta.ts), key-escrow (story, EscrowBoard.tsx), key-exchange/story, one-time-pad (story, PadBoard.tsx), pgp (story, AliceDesk, BobDesk, EveDesk, PgpBoard), quantum/story, rsa (story, RsaControls.tsx) |
| trao đổi khóa; phân phối khóa | trao đổi chìa khóa mã; phân phối chìa khóa mã | key-exchange/meta.ts (page title), lucifer/story, rsa/story; binary/story, quantum/story |
| thám mã | phân tích mã | frequency-analysis/story.vi.mdx |
| người lập mã | nhà tạo mã | adfgvx, babbage, beale, caesar, codebreakers-challenge, digital-signatures, frequency-analysis, homophonic, keyword-substitution, lorenz, lucifer, mary-queen-of-scots, pigpen, quantum, vigenere (story.vi.mdx) |
| người phá mã | nhà giải mã | lucifer/story.vi.mdx |
| mật mã học | khoa học mật mã | bible-code, cipher-disc, digital-signatures, hidden-writing, key-exchange, pinprick, rail-fence (story.vi.mdx) |
| thay thế đơn bảng / đa bảng | thay thế dùng một bảng chữ cái / dùng nhiều bảng chữ cái | codebreakers-challenge/CodebreakersChallengeBoard.tsx; frequency-analysis, homophonic, keyword-substitution, pigpen, rsa, vigenere, cipher-disc (story.vi.mdx) |
| nomenclator | mã hỗn hợp, bảng mã hỗn hợp | mary-queen-of-scots/MaryBoard.tsx, SignKey.tsx, story.vi.mdx |
| chữ đệm | ký tự không | mary-queen-of-scots (MaryBoard.tsx, MaryControls.tsx, SignKey.tsx, story.vi.mdx), frequency-analysis/story.vi.mdx |
| giấu tin | giấu thư, kỹ thuật giấu thư | hidden-writing (meta.ts, story), morse, pinprick, rail-fence (story.vi.mdx) |
| rôto | đĩa mã hóa (rôto once) | cracking-enigma (ChainsBoard.tsx, CrackControls.tsx, CribBoard.tsx, story), enigma (EnigmaControls.tsx, story), purple (meta.ts, story) |
| bộ xáo trộn | đĩa mã hóa / bộ phận mã hóa | cipher-disc/story.vi.mdx, enigma/ToyScrambler.tsx |
| bảng cắm dây | bảng ổ nối | cracking-enigma/story, enigma (EnigmaControls.tsx, story), purple (Plugboard.tsx, PurpleControls.tsx, story) |
| từ mồi | crib | cracking-enigma (CrackControls.tsx, CribBoard.tsx, story), enigma/story, frequency-analysis/story, hieroglyphs/story |
| máy bombe | máy bom | cracking-enigma/story.vi.mdx, enigma/story.vi.mdx |
| khóa ngày; khóa bức điện | khóa mã ngày; khóa mã thư | cracking-enigma (ChainsBoard.tsx, story), enigma/story, binary/story, rsa/story; zimmermann/story |
| chuỗi (Rejewski's chains) | vòng liên kết | cracking-enigma (ChainsBoard.tsx, CrackControls.tsx, meta.ts, story) |
| máy mật mã; đĩa mật mã, "Đĩa mật mã" | máy mã; đĩa mã hóa, "Đĩa mã hóa" | cipher-disc (meta.ts page title, story), lorenz (meta.ts, story), navajo/story, purple (meta.ts, story); one-time-pad/story |
| chữ ký số | chữ ký số hóa | digital-signatures (meta.ts page title, story), key-escrow/story, pgp/story, rsa/story |
| ký gửi khóa | giao kèo chìa khóa mã | key-escrow (EscrowBoard.tsx, EscrowControls.tsx, meta.ts page title, story) |
| hàm một chiều | hàm số một chiều | key-exchange (KeyExchangeBoard.tsx, story), rsa/story |
| mô-đun | môđun | key-exchange/story.vi.mdx |
| photon | phôtôn | quantum (story, QuantumBoard.tsx, QuantumControls.tsx, PhotonTable.tsx, useQuantum.ts `vi:` strings) |
| kiểu thẳng / kiểu chéo | sơ đồ thẳng / sơ đồ chéo | quantum/story.vi.mdx |
| ổ khóa móc | khóa móc | key-exchange, rsa, pgp, binary, digital-signatures, key-escrow, lucifer (story.vi.mdx), pgp/PgpBoard.tsx, rsa/meta.ts (check each *ổ khóa*) |
| Chuẩn mã hóa dữ liệu | Tiêu chuẩn Mã hóa Dữ liệu | lucifer/story.vi.mdx |
| mật thư, bức mật thư, "Mật thư Beale" | bản mật mã, "Các bản mật mã của Beale" | chapters.ts (ch. 7 summary), beale (meta.ts, story), codebreakers-challenge (CodebreakersChallengeBoard.tsx, CodebreakersChallengeControls.tsx, meta.ts, story), frequency-analysis/story, playfair/story |
| tin nhắn (in story text) | bức thư; bức điện | most story.vi.mdx (e.g. adfgvx, binary, caesar, cipher-disc). UI labels keep "Tin nhắn". |
| giải đọc | giải mã | hieroglyphs/story.vi.mdx, linear-b/story.vi.mdx |
| khung tên | cartouche | hieroglyphs/HieroglyphsBoard.tsx, hieroglyphs/story.vi.mdx |
| người truyền mã | người nói mật mã | chapters.ts (ch. 4 summary), navajo/meta.ts, navajo/story.vi.mdx |
| lính thủy đánh bộ | Quân đoàn Hải quân | navajo (meta.ts, story), purple/story |
| Cục Mật mã Ba Lan | Biuro Szyfrów | cracking-enigma/story.vi.mdx |
| Warsaw | Vácsava | cracking-enigma/story.vi.mdx |
| Pearl Harbor | Trân Châu Cảng | purple/story.vi.mdx |
| Room 40 | Phòng 40 | zimmermann/story.vi.mdx |
| Con bọ vàng | Con bọ bằng vàng | dancing-men/story.vi.mdx |
| Kama Sutra | Kāma-Sūtra | kama-sutra (KamaSutraControls.tsx, meta.ts, story, useKamaSutra.ts), keyword-substitution/story, scytale/story |
| Gậy scytale | cây scytale | scytale (meta.ts page title, story), hidden-writing, kama-sutra, rail-fence (story.vi.mdx) |
| al-Kindi, Al-Kindi | al-Kindī | frequency-analysis (presets.ts, story) |
| Kinh Thánh | Kinh thánh | bible-code (meta.ts, story), hidden-writing/story, zimmermann/story |
| dãy chữ cách đều | chuỗi chữ cái cách đều nhau (EDLS) | bible-code/story.vi.mdx |
| Hội Tam Điểm | Hội Tam điểm | homophonic/story, pigpen (meta.ts, story) |
| page titles "Thư lỗ kim", "Câu đố chữ Linear B", "Purple, cỗ máy không có rôto" | "Thư lỗ châm kim", "Bí mật của Linear B", "Purple, máy mã không có đĩa mã hóa" | pinprick/meta.ts (and babbage/story), linear-b/meta.ts, purple/meta.ts |

## 7. Terms the writers settled from the book

Found while reworking the pages from the Vietnamese edition (15 November 2026). These override any row above.

| English | Vietnamese edition | Where | Note |
|---|---|---|---|
| brute force | tấn công hùng hục | p. 33 | gloss once as *(tấn công vét cạn)* |
| Rejewski's bombes / Turing's bombes | bom / máy bom | ch. 4 | |
| Ventris's grid | bảng (hệ thống bảng) | ch. 5 | the simulator keeps *lưới*, glossed once as the book's *bảng* |
| linking syllable, declension | âm tiết nối, biến cách | pp. 325–329 | |
| the Navajo lexicon | bảng từ vựng | ch. 5 | |
| code word (Navajo) | từ mật mã | ch. 5 | |
| one sheet of a one-time pad | trang | ch. 3 | the UI keeps *tờ khóa*; the story glosses *trang* once |
| keyword, in appendices E and F | từ chìa khóa | pp. 533–539 | we keep *từ khóa* everywhere |
| escrow agent | đại lý giao kèo | p. 446 | *bên thứ ba tin cậy (TTP)* is the key-recovery company, p. 450 |
| Pearl Harbor fighter (Navajo table) | chim ruồi | p. 286 | the Vietnamese table follows the Navy's dictionary |
