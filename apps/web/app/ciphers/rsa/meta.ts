import type { CipherMeta } from "../types";

export const meta: CipherMeta = {
  slug: "rsa",
  title: "RSA",
  era: "1977",
  chapter: 5,
  order: 5,
  hook: "Publish a padlock that anyone can snap shut, and keep the only key that opens it.",
  firstStep: "Change p or q and watch every other number follow.",
  source: "The Code Book, chapter 5: Alice and Bob Go Public, and Appendix E",
  vi: {
    title: "Mật mã RSA",
    era: "1977",
    hook: "Phát cho cả thế giới những chiếc khóa móc ai cũng bấm khóa được, và giữ cho riêng mình chiếc chìa duy nhất mở được chúng.",
    firstStep: "Đổi p hoặc q và xem mọi con số khác thay đổi theo.",
    source: "Mật mã: Từ cổ điển đến lượng tử, chương 6: Alice và Bob ra công khai, và phụ lục J",
  },
};
