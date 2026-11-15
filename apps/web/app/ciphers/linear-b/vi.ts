import type { NameId, WordId } from "@codebook/cipher-engine/linear-b";

/** The engine's word meanings (WORDS[id].meaning) in Vietnamese. */
export const MEANING_VI: Record<WordId, string> = {
  knossosMen: "của Knossos, nói về đàn ông",
  knossosWomen: "của Knossos, nói về phụ nữ",
  knossos: "Knossos, cung điện",
  amnisos: "Amnisos, bến cảng của Knossos",
  tulissos: "Tulissos, một thị trấn khác trên đảo Crete",
  tripods: "hai cái vạc ba chân (tiếng Hy Lạp tripode)",
};

/** The engine's name labels (NAMES[id].label) in Vietnamese. The three towns keep their names. */
export const NAME_LABEL_VI: Record<NameId, string> = {
  amnisos: "Amnisos",
  knossos: "Knossos",
  tulissos: "Tulissos",
  tripods: "Vạc ba chân",
};
