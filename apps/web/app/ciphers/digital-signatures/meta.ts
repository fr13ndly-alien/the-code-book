import type { CipherMeta } from "../types";

export const meta: CipherMeta = {
  slug: "digital-signatures",
  title: "Digital signatures",
  era: "1976 onwards",
  chapter: 6,
  order: 2,
  hook: "Turn a public-key cipher back to front, and it proves who wrote a message.",
  firstStep: "Change one letter of the message that arrives. Watch Bob's check.",
  source: "The Code Book (full edition): Pretty Good Privacy",
  fullEditionOnly: true,
  vi: {
    title: "Chữ ký số hóa",
    era: "Từ năm 1976",
    hook: "Dùng mật mã chìa khóa công khai theo chiều ngược lại, và nó chứng minh được ai đã viết một bức thư.",
    firstStep: "Đổi một chữ của bức thư đến nơi. Hãy xem phép kiểm tra của Bob.",
    source: "Mật mã: Từ cổ điển đến lượng tử, chương 7: Riêng tư tốt đẹp",
  },
};
