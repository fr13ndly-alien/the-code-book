/** The passages the page searches for hidden words. */

/**
 * The opening of Herman Melville's "Moby-Dick" (1851), chapter 1. Public domain.
 * Brendan McKay searched this novel to show that any long text holds "predictions".
 */
export const MOBY_DICK =
  "Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, " +
  "and nothing particular to interest me on shore, I thought I would sail about a little and see the watery " +
  "part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever " +
  "I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever " +
  "I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral " +
  "I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral " +
  "principle to prevent me from deliberately stepping into the street, and methodically knocking people's " +
  "hats off, then, I account it high time to get to sea as soon as I can. This is my substitute for pistol " +
  "and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. " +
  "There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or " +
  "other, cherish very nearly the same feelings towards the ocean with me.";

/** A deliberately dull notice, written for this site. Nobody hid anything in it. */
export const DULL_NOTICE =
  "Notice to all users of the car park behind the library. The car park opens at seven in the morning and " +
  "closes at ten at night from Monday to Saturday. On Sundays it opens at nine and closes at six. Please take " +
  "a ticket from the machine at the gate when you arrive and keep it with you. Pay at the machine beside the " +
  "stairs before you return to your car. The machine takes coins and cards but does not give change. The " +
  "first hour costs one pound and each hour after that costs two pounds. Spaces near the lift are kept for " +
  "drivers with a blue badge. Do not leave your car in front of the bins on a Tuesday, because the lorry " +
  "comes to empty them before noon. Bicycles belong in the racks next to the side door and not on the " +
  "railings. If the barrier does not lift, press the green button and wait for a member of staff to answer. " +
  "Lost tickets are charged at the full daily rate. Thank you for parking with care.";

/** The name of a passage the page can search. */
export type TextId = "moby" | "dull";

/** Every passage, by name. */
export const TEXTS: Record<TextId, { title: string; text: string }> = {
  moby: { title: "Moby-Dick", text: MOBY_DICK },
  dull: { title: "A car park notice", text: DULL_NOTICE },
};
