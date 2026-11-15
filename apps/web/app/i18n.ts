import { useLocation } from "react-router";

/**
 * The site's two languages. English pages live at /…, Vietnamese pages at /vi/….
 * Both are prerendered. The same route module serves both, so switching keeps
 * the simulator's state.
 */
export type Locale = "en" | "vi";

export const LOCALES: Locale[] = ["en", "vi"];

/** A piece of text in both languages. */
export type Bilingual<T = string> = { en: T; vi: T };

const VI_PREFIX = /^\/vi(?=\/|$)/;

/** The language a path is in. */
export const localeOf = (pathname: string): Locale => (VI_PREFIX.test(pathname) ? "vi" : "en");

/** A path with any language prefix removed: "/vi/ciphers/caesar" → "/ciphers/caesar". */
export const stripLocale = (pathname: string): string => pathname.replace(VI_PREFIX, "") || "/";

/** An English path in the given language: ("/ciphers/caesar", "vi") → "/vi/ciphers/caesar". */
export function localePath(path: string, locale: Locale): string {
  const plain = stripLocale(path);
  if (locale === "en") return plain;
  return plain === "/" ? "/vi" : `/vi${plain}`;
}

/** The language of the current page. */
export function useLocale(): Locale {
  return localeOf(useLocation().pathname);
}

/** Picks the current language's version: const t = useT(); t({ en: "Shift", vi: "Độ dịch" }). */
export function useT() {
  const locale = useLocale();
  return <T>(text: Bilingual<T>): T => text[locale];
}

/** Where the reader's choice of language is remembered between visits. */
export const LOCALE_STORAGE_KEY = "codebook.locale";

/** Text used by the page frame, the menu and the story blocks. */
export const UI = {
  siteName: { en: "The Code Book, interactive", vi: "Mật mã, bản tương tác" },
  siteDescription: {
    en: "Try every cipher from Simon Singh's The Code Book, chapter by chapter.",
    vi: "Thử tay mọi loại mật mã trong cuốn The Code Book của Simon Singh, theo từng chương.",
  },
  intro: {
    en: "Every cipher in Simon Singh's book, chapter by chapter. Pick one, read its story and try it yourself.",
    vi: "Mọi loại mật mã trong sách của Simon Singh, theo từng chương. Chọn một loại, đọc câu chuyện của nó và tự tay thử.",
  },
  chapters: { en: "Chapters", vi: "Các chương" },
  chapter: { en: "Chapter", vi: "Chương" },
  afterLastChapter: { en: "After the last chapter", vi: "Sau chương cuối" },
  fullEdition: { en: "Full edition", vi: "Bản đầy đủ" },
  fullEditionNote: {
    en: "Pages marked “Full edition” cover ciphers from the full edition of the book that the abridged edition leaves out.",
    vi: "Các trang có nhãn “Bản đầy đủ” nói về những mật mã chỉ có trong bản đầy đủ của cuốn sách, bản rút gọn không có.",
  },
  backToMenu: { en: "Back to the menu", vi: "Về trang mục lục" },
  hideStory: { en: "Hide story", vi: "Ẩn câu chuyện" },
  readStory: { en: "Read the story", vi: "Đọc câu chuyện" },
  theStory: { en: "The story", vi: "Câu chuyện" },
  otherCiphers: { en: "Other ciphers", vi: "Các mật mã khác" },
  previous: { en: "Previous", vi: "Bài trước" },
  next: { en: "Next", vi: "Bài sau" },
  basedOn: {
    en: (source: string) => `Based on ${source}, by Simon Singh. Retold in our own words.`,
    vi: (source: string) => `Dựa theo ${source} của Simon Singh. Được kể lại bằng lời của chúng tôi.`,
  },
  loadingModel: { en: "Loading the model…", vi: "Đang tải mô hình…" },
  language: { en: "Language", vi: "Ngôn ngữ" },
  // Story blocks
  tryIt: { en: "Try it", vi: "Thử xem" },
  challenge: { en: "Challenge", vi: "Thử thách" },
  yourAnswer: { en: "Your answer", vi: "Câu trả lời của bạn" },
  check: { en: "Check", vi: "Kiểm tra" },
  correct: { en: "Correct. Well done.", vi: "Đúng rồi. Giỏi lắm!" },
  notYet: { en: "Not yet. Check your setup and try again.", vi: "Chưa đúng. Hãy kiểm tra lại cách cài đặt rồi thử lần nữa." },
  // Shared simulator fields
  oneBack: { en: (label: string) => `${label}: one back`, vi: (label: string) => `${label}: lùi một` },
  oneForward: { en: (label: string) => `${label}: one forward`, vi: (label: string) => `${label}: tiến một` },
  highlight: { en: "Highlight", vi: "Đánh dấu" },
  // Error page
  notFound: { en: "Page not found", vi: "Không tìm thấy trang" },
  notFoundBody: { en: "That page does not exist.", vi: "Trang này không tồn tại." },
  somethingWrong: { en: "Something went wrong", vi: "Đã có lỗi xảy ra" },
  reload: { en: "Reload the page to try again.", vi: "Hãy tải lại trang để thử lần nữa." },
} satisfies Record<string, Bilingual<unknown>>;
