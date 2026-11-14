/** Key texts for the book cipher. All three are public documents, long out of copyright. */

/** A text whose numbered words act as the key of a book cipher. */
export interface KeyText {
  id: string;
  title: string;
  text: string;
}

/**
 * The first three paragraphs of the United States Declaration of Independence (1776),
 * in the wording the Beale pamphlet numbered: "inalienable", and "institute a new government".
 * Source: The Code Book, chapter 2, figure 22.
 */
const DECLARATION_TEXT =
  "When, in the course of human events, it becomes necessary for one people to dissolve the political bands " +
  "which have connected them with another, and to assume among the powers of the earth, the separate and equal " +
  "station to which the laws of nature and of nature's God entitle them, a decent respect to the opinions of " +
  "mankind requires that they should declare the causes which impel them to the separation. " +
  "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their " +
  "Creator with certain inalienable rights, that among these are life, liberty and the pursuit of happiness; " +
  "That to secure these rights, governments are instituted among men, deriving their just powers from the " +
  "consent of the governed; That whenever any form of government becomes destructive of these ends, it is the " +
  "right of the people to alter or to abolish it, and to institute a new government, laying its foundation on " +
  "such principles and organizing its powers in such form, as to them shall seem most likely to effect their " +
  "safety and happiness. Prudence, indeed, will dictate that governments long established should not be changed " +
  "for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to " +
  "suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are " +
  "accustomed. But when a long train of abuses and usurpations, pursuing invariably the same object evinces a " +
  "design to reduce them under absolute despotism, it is their right, it is their duty, to throw off such " +
  "government, and to provide new Guards for their future security. Such has been the patient sufferance of " +
  "these Colonies; and such is now the necessity which constrains them to alter their former systems of " +
  "government. The history of the present King of Great Britain is a history of repeated injuries and " +
  "usurpations, all having in direct object the establishment of an absolute tyranny over these States. " +
  "To prove this, let facts be submitted to a candid world.";

/**
 * Abraham Lincoln's Gettysburg Address (1863), the "Bliss" copy, the last one Lincoln wrote out.
 * Checked word for word against the Bliss text at Abraham Lincoln Online. Lincoln's dashes are
 * written as commas here, which does not change the word numbering.
 */
const GETTYSBURG_TEXT =
  "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in " +
  "Liberty, and dedicated to the proposition that all men are created equal. " +
  "Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so " +
  "dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a " +
  "portion of that field, as a final resting place for those who here gave their lives that that nation might " +
  "live. It is altogether fitting and proper that we should do this. " +
  "But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground. The brave " +
  "men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. " +
  "The world will little note, nor long remember what we say here, but it can never forget what they did here. " +
  "It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have " +
  "thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us, " +
  "that from these honored dead we take increased devotion to that cause for which they gave the last full " +
  "measure of devotion, that we here highly resolve that these dead shall not have died in vain, that this " +
  "nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for " +
  "the people, shall not perish from the earth.";

/**
 * The preamble to the Constitution of the United States (1787).
 * Checked against the US National Archives transcription.
 */
const CONSTITUTION_TEXT =
  "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure " +
  "domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings " +
  "of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States " +
  "of America.";

/** The key texts a reader can choose between. */
export const KEY_TEXTS: KeyText[] = [
  { id: "declaration", title: "Declaration of Independence", text: DECLARATION_TEXT },
  { id: "gettysburg", title: "Gettysburg Address", text: GETTYSBURG_TEXT },
  { id: "constitution", title: "Constitution, preamble", text: CONSTITUTION_TEXT },
];
