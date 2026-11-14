/**
 * Cipher text printed in The Code Book itself, for the reader to work on.
 * Only the short pieces are kept here, exactly as printed. The book gives no
 * solutions, and neither does this file.
 */

/**
 * The book's Cryptogram 1 (Caesar shift, easy) and Cryptogram 2 (Caesar shift, harder).
 * Source: The Code Book, abridged edition, "The Codebreaker's Challenge", p. 243.
 * Cryptograms 3 and 4 on p. 244 are long, so they are not copied: the reader pastes them in.
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
