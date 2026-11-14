/** The facts every cipher page declares in its meta.ts. */
export interface CipherMeta {
  /** URL segment: /ciphers/<slug>. */
  slug: string;
  title: string;
  /** Shown on the timeline and in the page header, e.g. "1918 to 1945". */
  era: string;
  /** Used to sort the timeline. Negative for BC. */
  year: number;
  /** One sentence that makes a reader want to open the page. */
  hook: string;
  /** The first thing to do on the simulator, shown over it. One short sentence. */
  firstStep: string;
  /** Where the material comes from in The Code Book. */
  source: string;
}
