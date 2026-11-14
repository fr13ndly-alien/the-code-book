import type { Chapter } from "./types";

/** The chapters of The Code Book (abridged edition), then its closing challenge. The menu follows them. */
export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    title: "The Cipher of Mary Queen of Scots",
    summary: "Hiding letters, swapping letters, and the invention of codebreaking.",
  },
  {
    number: 2,
    title: "The Anonymous Codebreaker",
    summary: "The cipher they called unbreakable, the man who broke it, and a buried treasure.",
  },
  {
    number: 3,
    title: "The Mechanization of Secrecy",
    summary: "Telegrams, two world wars, and machines that do the enciphering.",
  },
  {
    number: 4,
    title: "The Language Barrier",
    summary: "When the secret is a language: the Navajo code talkers and a lost script.",
  },
  {
    number: 5,
    title: "Alice and Bob Go Public",
    summary: "Computers, and how two strangers can agree on a secret while everyone listens.",
  },
  {
    number: 6,
    title: "Pretty Good Privacy",
    summary: "Strong encryption for everyone, and a cipher guarded by the laws of physics.",
  },
  {
    number: 7,
    title: "The Codebreaker's Challenge",
    summary: "The book ends with cryptograms to crack. Here are four of our own, and the tools to break them.",
  },
];
