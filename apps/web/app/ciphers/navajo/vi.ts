/**
 * Vietnamese for the engine's English words on the Navajo page.
 * The engine (packages/cipher-engine/src/navajo) stays English; the page looks words up here.
 */

/** The everyday meaning of each lexicon code word, keyed by the engine's English meaning. */
export const TERM_MEANING_VI: Record<string, string> = {
  hummingbird: "chim ruồi",
  buzzard: "chim ó",
  "chicken hawk": "diều hâu",
  swallow: "chim én",
  whale: "cá voi",
  "small whale": "cá voi nhỏ",
  shark: "cá mập",
  "iron fish": "cá sắt",
  frog: "con ếch",
  tortoise: "con rùa",
  potatoes: "khoai tây",
  eggs: "trứng",
  "cliff dwelling": "nhà trên vách đá",
  "our mother": "mẹ của chúng ta",
};

/** The military terms themselves, keyed by the engine's term (what the reader types). */
export const TERM_VI: Record<string, string> = {
  "FIGHTER PLANE": "máy bay tiêm kích",
  BOMBER: "máy bay ném bom",
  "DIVE BOMBER": "máy bay ném bom bổ nhào",
  "TORPEDO PLANE": "máy bay phóng ngư lôi",
  BATTLESHIP: "thiết giáp hạm",
  CRUISER: "tuần dương hạm",
  DESTROYER: "khu trục hạm",
  SUBMARINE: "tàu ngầm",
  AMPHIBIOUS: "lội nước (đổ bộ)",
  TANK: "xe tăng",
  GRENADE: "lựu đạn",
  BOMB: "bom",
  FORTIFICATION: "công sự",
  AMERICA: "nước Mỹ",
};

/**
 * Vietnamese glosses for the spelling alphabet's English words. The English word stays,
 * because the letter it spells is its first letter; the gloss is shown beside it.
 */
export const LETTER_MEANING_VI: Record<string, string> = {
  ant: "con kiến",
  bear: "con gấu",
  cat: "con mèo",
  deer: "con hươu",
  elk: "nai sừng tấm",
  fox: "con cáo",
  goat: "con dê",
  horse: "con ngựa",
  ice: "băng",
  jackass: "con lừa",
  kid: "dê con",
  lamb: "cừu con",
  mouse: "con chuột",
  nut: "hạt dẻ",
  owl: "con cú",
  pig: "con lợn",
  quiver: "ống tên",
  rabbit: "con thỏ",
  sheep: "con cừu",
  turkey: "gà tây",
  Ute: "người Ute",
  victor: "người chiến thắng",
  weasel: "con chồn",
  cross: "chữ thập",
  yucca: "cây ngọc giá",
  zinc: "kẽm",
};
