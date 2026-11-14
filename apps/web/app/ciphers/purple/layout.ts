/** How many letters of the message the strip shows at a time: as many as fit across a phone. */
export const PAGE = 10;

/** The names of the four switches, sixes first. */
export const SWITCH_NAMES = ["Sixes", "I", "II", "III"];

/** The speed of a twenties switch (1 to 3) under a motion such as "231". */
export const speedOf = (index: number, motion: string) => ["fast", "medium", "slow"][motion.indexOf(String(index))]!;

/** The longest output the controls show before folding the rest away. */
export const SHORT_OUTPUT = 60;
