/**
 * The four cryptograms of the closing page. The Code Book ends with four of
 * its own (two Caesar shifts, a substitution and a Vigenère) and prints no
 * answers. These are ours: we wrote the plaintexts, and the engines of the
 * earlier pages enciphered them. The test proves every ciphertext.
 */

/** What every cryptogram carries, whatever its cipher. */
interface Puzzle {
  /** 1 to 4, in rising difficulty. */
  number: number;
  /** What the reader is given. */
  ciphertext: string;
  /** The answer, kept for checking. Spaces are for reading only. */
  plaintext: string;
  /** True when the word spaces were removed and the letters sent in groups of five. */
  grouped: boolean;
}

/** A Caesar shift, with the number of places the alphabet was moved. */
export interface CaesarCryptogram extends Puzzle {
  kind: "caesar";
  shift: number;
}

/** A monoalphabetic substitution, with its cipher alphabet: the first letter stands for A. */
export interface SubstitutionCryptogram extends Puzzle {
  kind: "substitution";
  cipherAlphabet: string;
}

/** A Vigenère cipher, with its keyword. */
export interface VigenereCryptogram extends Puzzle {
  kind: "vigenere";
  keyword: string;
}

/** One of the four puzzles. */
export type Cryptogram = CaesarCryptogram | SubstitutionCryptogram | VigenereCryptogram;

/** The kinds of cipher the cryptograms use. */
export type Kind = Cryptogram["kind"];

/** Cryptogram 1: a Caesar shift with the word spaces left in. */
const FIRST: CaesarCryptogram = {
  number: 1,
  kind: "caesar",
  shift: 11,
  grouped: false,
  plaintext: "A CIPHER IS ONLY AS STRONG AS THE SECRET OF ITS KEY SO GUARD THE KEY AND LET THE METHOD BE KNOWN",
  ciphertext: "L NTASPC TD ZYWJ LD DECZYR LD ESP DPNCPE ZQ TED VPJ DZ RFLCO ESP VPJ LYO WPE ESP XPESZO MP VYZHY",
};

/** Cryptogram 2: a Caesar shift again, but short and with no word lengths to help. */
const SECOND: CaesarCryptogram = {
  number: 2,
  kind: "caesar",
  shift: 19,
  grouped: true,
  plaintext: "EVERY CODEMAKER MEETS A CODEBREAKER",
  ciphertext: "XOXKR VHWXF TDXKF XXMLT VHWXU KXTDX K",
};

/**
 * Cryptogram 3: a substitution. Its cipher alphabet is the one the keyword
 * cipher page builds from the keyphrase THOMAS PHELIPPES, the man who broke
 * the cipher of Mary Queen of Scots. No letter stands for itself.
 */
const THIRD: SubstitutionCryptogram = {
  number: 3,
  kind: "substitution",
  cipherAlphabet: "THOMASPELIJKNQRUVWXYZBCDFG",
  grouped: false,
  plaintext:
    "THE CONTEST BETWEEN THE PEOPLE WHO MAKE CODES AND THE PEOPLE WHO BREAK THEM HAS NEVER STOPPED " +
    "EACH TIME A CODEMAKER INVENTS A STRONGER CIPHER A CODEBREAKER SOMEWHERE STARTS TO HUNT FOR ITS WEAKNESS " +
    "THE BREAKERS COUNT LETTERS SEARCH FOR PATTERNS AND TEST ONE GUESS AFTER ANOTHER " +
    "UNTIL THE HIDDEN MESSAGE APPEARS THEN THE MAKERS MUST BEGIN AGAIN WITH A BETTER IDEA " +
    "THAT IS THE STORY OF SECRET WRITING AND IT IS NOT OVER YET",
  ciphertext:
    "YEA ORQYAXY HAYCAAQ YEA UARUKA CER NTJA ORMAX TQM YEA UARUKA CER HWATJ YEAN ETX QABAW XYRUUAM " +
    "ATOE YLNA T ORMANTJAW LQBAQYX T XYWRQPAW OLUEAW T ORMAHWATJAW XRNACEAWA XYTWYX YR EZQY SRW LYX CATJQAXX " +
    "YEA HWATJAWX ORZQY KAYYAWX XATWOE SRW UTYYAWQX TQM YAXY RQA PZAXX TSYAW TQRYEAW " +
    "ZQYLK YEA ELMMAQ NAXXTPA TUUATWX YEAQ YEA NTJAWX NZXY HAPLQ TPTLQ CLYE T HAYYAW LMAT " +
    "YETY LX YEA XYRWF RS XAOWAY CWLYLQP TQM LY LX QRY RBAW FAY",
};

/** Cryptogram 4: a Vigenère cipher with a five-letter keyword, sent in groups of five. */
const FOURTH: VigenereCryptogram = {
  number: 4,
  kind: "vigenere",
  keyword: "SINGH",
  grouped: true,
  plaintext:
    "FOR CENTURIES THE CIPHER WITH A KEYWORD WAS CALLED UNBREAKABLE " +
    "THEN A PATIENT MAN NOTICED THAT THE SAME GROUPS OF LETTERS CAME BACK AGAIN AND AGAIN " +
    "HE MEASURED THE GAPS BETWEEN THEM AND FOUND THE LENGTH OF THE KEYWORD " +
    "AFTER THAT EVERY LETTER OF THE KEYWORD WAS ONLY A SIMPLE SHIFT AND THE COUNTING OF LETTERS DID THE REST " +
    "YOU HAVE JUST DONE WHAT HE DID NOW YOU KNOW THAT NO CIPHER IS SAFE FOREVER " +
    "BECAUSE SOMEWHERE THERE IS ALWAYS A READER WHO WILL NOT GIVE UP " +
    "THE LAST THREE WORDS OF THIS MESSAGE ARE YOUR PASSWORD NEVER STOP COUNTING",
  ciphertext:
    "XWEIL FBHXP WAGNL UQCNL JEVZO SSRED GZQCH KKNRS WLHTI JMNQH TTRZO WVNVH LQRTA EIATV LQPKK LPNZA ZMFGT " +
    "WOEUB HABLS WBGKY KKNSL TIPQH YIVTH FLNMH AVUKT WIFAY WLGNL YICYI WBJKL FBUKT SVQLV MVQZO WTRTN LPBLA " +
    "ZMXKF OWEJH XBRXA ZIGKC WZLRL LBRXV XBUKR WGJUY VENYV FTLGZ AUCRL KPVLA SVQZO WKBAU LQAMV XTRZA WZFJP " +
    "VBUKY WAGEV MPNBL BCFZK GVRCO SBUKK ALAUD QWHQU GEGNH LVBIP HPRXP KANLL XWEKC WZOKJ SCFKZ GURCO WZRZO " +
    "WZROZ STJGF KIEKH VMECO GEVRS FWGMP NMHVA ZMYGZ LBUXL WEBXK KWSZO AAZKZ KITKH JMLUB JXNYZ OWEJU WDRXZ " +
    "LWCIV MVGOU Y",
};

/** The four cryptograms, easiest first. */
export const CRYPTOGRAMS: Cryptogram[] = [FIRST, SECOND, THIRD, FOURTH];
