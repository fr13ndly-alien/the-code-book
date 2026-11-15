import type { Chapter } from "./types";

/** The chapters of The Code Book (abridged edition), then its closing challenge. The menu follows them. */
export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    title: "The Cipher of Mary Queen of Scots",
    summary: "Hiding letters, swapping letters, and the invention of codebreaking.",
    vi: { title: "Bản mật mã của Nữ hoàng Mary xứ Scotland", summary: "Giấu chữ, thay chữ, và sự ra đời của nghề phá mã." },
  },
  {
    number: 2,
    title: "The Anonymous Codebreaker",
    summary: "The cipher they called unbreakable, the man who broke it, and a buried treasure.",
    vi: { title: "Nhà giải mã vô danh", summary: "Loại mật mã được gọi là không thể phá, người đã phá được nó, và một kho báu bị chôn giấu." },
  },
  {
    number: 3,
    title: "The Mechanization of Secrecy",
    summary: "Telegrams, two world wars, and machines that do the enciphering.",
    vi: { title: "Cơ giới hóa việc giữ bí mật", summary: "Điện báo, hai cuộc thế chiến, và những cỗ máy làm thay việc mã hóa." },
  },
  {
    number: 4,
    title: "The Language Barrier",
    summary: "When the secret is a language: the Navajo code talkers and a lost script.",
    vi: { title: "Rào cản ngôn ngữ", summary: "Khi bí mật là cả một ngôn ngữ: những người truyền mã Navajo và một hệ chữ đã bị lãng quên." },
  },
  {
    number: 5,
    title: "Alice and Bob Go Public",
    summary: "Computers, and how two strangers can agree on a secret while everyone listens.",
    vi: { title: "Alice và Bob ra công khai", summary: "Máy tính, và cách hai người lạ thỏa thuận một bí mật trong khi mọi người đều đang nghe." },
  },
  {
    number: 6,
    title: "Pretty Good Privacy",
    summary: "Strong encryption for everyone, and a cipher guarded by the laws of physics.",
    vi: { title: "Riêng tư tốt đẹp", summary: "Mã hóa mạnh cho tất cả mọi người, và một mật mã được các định luật vật lý canh giữ." },
  },
  {
    number: 7,
    title: "The Codebreaker's Challenge",
    summary: "The book ends with cryptograms to crack. Here are four of our own, and the tools to break them.",
    vi: { title: "Thách thức giải mã", summary: "Cuốn sách kết thúc bằng những bức mật thư để phá. Đây là bốn bức của riêng chúng tôi, cùng các công cụ để phá chúng." },
  },
];
