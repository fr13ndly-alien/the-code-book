/**
 * Cipher text printed in The Code Book itself, for the reader to work on:
 * the four cryptograms of its challenge and its dedication, as printed.
 * The book gives no solutions, and neither does this file. The test breaks
 * cryptograms 1 to 4 to prove the letters were copied correctly.
 */

/**
 * The book's Cryptogram 1 (Caesar shift, easy) and Cryptogram 2 (Caesar shift, harder).
 * Source: The Code Book, abridged edition, "The Codebreaker's Challenge", p. 243.
 */
export const BOOK_CAESAR: readonly [string, string] = [
  "L FDQQRW IRUHFDVW WR BRX WKH DFWLRQ RI UXVVLD LW LV D ULGGOH ZUDSSHG LQ D PBVWHUB LQVLGH DQ HQLJPD " +
    "ZLQVWRQ FKXUFKLOO",
  "OXGB OBWB OBVB CNEBNL VTXLTK",
];

/**
 * The last line of the book's dedication, which is printed in cipher with no key and no solution.
 * Source: The Code Book, abridged edition, dedication page.
 */
export const BOOK_DEDICATION = "XICYIQKMHR, VOIR RFH LKRQT";

/**
 * The book's Cryptogram 3 (monoalphabetic substitution cipher), with its word spaces.
 * Source: The Code Book, abridged edition, "The Codebreaker's Challenge", p. 244.
 */
export const BOOK_SUBSTITUTION =
  "EVA KRC BEOA TRNZEVA CPR BWTFCOWV OB DK VW UREVB BW AOLLOGFTC EB KWF UONPC DR TRA CW OUENOVR LZWU " +
  "CPR LOZBC PEBCK OVBXRGCOWV WL CPR GPEZEGCRZB CPRBR GPEZEGCRZB EB EVK WVR UONPC ZREAOTK NFRBB LWZU E " +
  "GOXPRZ CPEC OB CW BEK CPRK GWVHRK E UREVOVN DFC CPRV LZWU IPEC OB SVWIV WL SOAA O GWFTA VWC BFXXWBR " +
  "POU GEXEDTR WL GWVBCZFGCOVN EVK WL CPR UWZR EDBCZFBR GZKXCWNZEXPB O UEAR FX UK UOVA EC WVGR CPEC " +
  "CPOB IEB WL E BOUXTR BXRGORB BFGP PWIRHRZ EB IWFTA EXXREZ CW CPR GZFAR OVCRTTRGC WL CPR BEOTWZ " +
  "EDBWTFCRTK OVBWTFDTR IOCPWFC CPR SRK LZWU CPR NWTA DFN DK RANEZ ETTEV XWR";

/**
 * The book's Cryptogram 4 (Vigenère cipher). The book prints the letters spaced out one by one;
 * here they are in groups of five, which changes nothing in the cipher.
 * Source: The Code Book, abridged edition, "The Codebreaker's Challenge", p. 244.
 */
export const BOOK_VIGENERE =
  "CUDRY HSODB ODGRZ AFDNR FCRQT ELCTH NVXSO HSGNN BZNSR RQHVR OOCLN TWHRE LHHPE LNGIO EWHRP OQHRA " +
  "FOZSU GHRUH WNVTU HSBQO SEEAM AZLNO DBODG RDWRD LGKYY RNQRN ODNXH RUHAC SLVHD ULSTH NVXSG RMNQY " +
  "CUOOO EZVHV VIAYE AWIBQ SVQCY XDRWH RVPRH DBPEG HRNQD GKEPR WPDTP KEE";
