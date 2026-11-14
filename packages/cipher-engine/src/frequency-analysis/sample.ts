/**
 * The message the page asks the reader to break. We wrote it ourselves: a
 * spy's report, long enough (over 300 letters) for the letter counts to mean something.
 */
export const SAMPLE_PLAINTEXT =
  "I HAVE WATCHED THE HARBOUR FOR THREE NIGHTS. THE ENEMY FLEET IS SMALLER THAN WE FEARED, " +
  "AND THE SAILORS ARE TIRED AND HUNGRY. THEIR ADMIRAL SLEEPS IN THE WHITE HOUSE ON THE HILL. " +
  "A SHIP WITH RED SAILS BRINGS THEM FOOD EACH EVENING. IF WE STOP THAT SHIP, THE FLEET WILL " +
  "HAVE TO LEAVE BEFORE THE END OF THE WEEK. SEND ME TEN GOOD MEN AND A FAST BOAT. I WILL MEET " +
  "THEM AT THE OLD MILL WHEN THE MOON IS HIGH. TELL NO ONE ELSE. THE PASSWORD IS LANTERN.";

/**
 * The cipher alphabet that hides the sample. It is the key of the book's own
 * worked example (The Code Book, chapter 1), built from the keyphrase
 * "A VOID BY GEORGES PEREC" starting three letters in.
 */
export const SAMPLE_CIPHER_ALPHABET = "XZAVOIDBYGERSPCFHJKLMNQTUW";

/**
 * A lipogram: a passage that leaves one letter out on purpose. We wrote this one
 * ourselves, with no letter E, after the idea of Georges Perec's novel La Disparition
 * (The Code Book, chapter 1). Over 200 letters, so the count is a fair one.
 */
export const LIPOGRAM_PLAINTEXT =
  "A STORM HIT OUR ISLAND AT DAWN. RAIN WAS POURING THROUGH A GAP IN OUR ROOF, AND WIND SHOOK " +
  "ALL OUR WINDOWS. MY AUNT LIT A LAMP AND SAT BY IT, CALM AS A CAT. I RAN TO SHUT OUR BARN AND " +
  "BRING IN SIX GOATS. BY NOON THAT STORM WAS FAR AWAY, AND A BRIGHT SUN WAS DRYING OUR MUDDY " +
  "YARD. NOT A THING WAS LOST.";

/**
 * The 338-letter ciphertext the book breaks step by step, exactly as printed.
 * The book's first three finds are O = e, X = a and Y = i.
 * Source: The Code Book, chapter 1, "Cryptanalyzing a ciphertext", PDF p. 34 (worked on pp. 34-40).
 */
export const BOOK_CIPHERTEXT =
  "PCQ VMJYPD LBYK LYSO KBXBJXWXV BXV ZCJPO EYPD KBXBJYUXJ LBJOO KCPK. CP LBO LBCMKXPV XPV IYJKL PYDBL, " +
  "QBOP KBO BXV OPVOV LBO LXRO CI SX'XJMI, KBO JCKO XPV EYKKOV LBO DJCMPV ZOICJO BYS, KXUYPD: " +
  '"DJOXL EYPD, ICJ X LBCMKXPV XPV CPO PYDBLK Y BXNO ZOOP JOACMPLYPD LC UCM LBO IXZROK CI FXKL XDOK ' +
  'XPV LBO RODOPVK CI XPAYOPL EYPDK. SXU Y SXEO KC ZCRV XK LC AJXNO X IXNCMJ CI UCMJ SXGOKLU?" ' +
  "OFYRCDMO, LXROK IJCS LBO LBCMKXPV XPV CPO PYDBLK";

/** The first three letters the book finds in its ciphertext, cipher letter to plain letter (PDF pp. 36-37). */
export const BOOK_FIRST_FINDS: Record<string, string> = { O: "E", X: "A", Y: "I" };
