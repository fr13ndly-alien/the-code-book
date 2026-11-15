import type { PgpState } from "./usePgp";

const base = { message: "MEET ME AT NOON", sessionKey: "QXJM", viewer: "friends", sealed: false, cracked: false } as const;

/** Setups that buttons in story.mdx can load, by name. */
export const PRESETS: Record<string, PgpState> = {
  /** The envelope has just been sent. The page starts here. */
  sent: { ...base, stage: 4 },

  /** Alice has only written her message. */
  start: { ...base, stage: 0 },

  /** The message is locked with the session key. */
  lockedMessage: { ...base, stage: 2 },

  /** The session key is locked with Bob's public key. */
  lockedKey: { ...base, stage: 3 },

  /** Eve's view of the same envelope. */
  eve: { ...base, stage: 4, viewer: "eve" },

  /** The challenge: an envelope caught by Eve, with Alice's desk covered. */
  intercepted: {
    message: "IT IS OUT ON THE NET",
    sessionKey: "ZMRK",
    stage: 4,
    viewer: "eve",
    sealed: true,
    cracked: false,
  },
};
