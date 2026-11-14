import type { CipherMeta } from "./types";
import { meta as enigma } from "./enigma/meta";

/** Every published cipher, oldest first. Add new ciphers here and in app/routes.ts. */
export const CIPHERS: CipherMeta[] = [enigma].sort((a, b) => a.year - b.year);
