import { compare, type Photon } from "@codebook/cipher-engine/quantum";
import { Board } from "~/components/sim/Board";
import { Caption } from "~/components/sim/Caption";
import { useLocale, type Bilingual, type Locale } from "~/i18n";
import { PhotonTable } from "./PhotonTable";
import { MEASURED, photons, type QuantumState } from "./useQuantum";

/** What has just happened at each stage, for readers who never open the story. */
const CAPTIONS: Bilingual[] = [
  { en: "", vi: "" },
  {
    en: "Alice picks a bit and a scheme at random for each photon. The arrow shows how the photon is polarised.",
    vi: "Với mỗi photon, Alice chọn ngẫu nhiên một bit và một kiểu đo. Mũi tên cho thấy photon phân cực thế nào.",
  },
  {
    en: "Bob picks a detector at random. The right one reads Alice's bit. The wrong one reads 0 or 1 by chance.",
    vi: "Bob chọn ngẫu nhiên một máy dò. Máy dò đúng đọc ra bit của Alice. Máy dò sai đọc ra 0 hoặc 1 do may rủi.",
  },
  {
    en: "Alice and Bob tell each other their schemes, never their bits. They keep the photons where the two match.",
    vi: "Alice và Bob nói cho nhau kiểu đo của mình, không bao giờ nói bit. Họ giữ những photon có hai kiểu đo khớp nhau.",
  },
  {
    en: "They read half the kept bits aloud. If all agree, nobody measured the photons, and the rest is their key.",
    vi: "Họ đọc to một nửa số bit đã giữ. Nếu tất cả đều khớp thì không ai đã đo các photon, và phần còn lại là khóa của họ.",
  },
];

const name = (scheme: Photon["aliceScheme"]) => (scheme === "+" ? "+" : "×");

/** What Eve did to one photon, in a sentence. */
function eveSentence(photon: Photon, locale: Locale): string {
  if (!photon.eve) return "";
  const right = photon.eve.scheme === photon.aliceScheme;
  if (locale === "vi") {
    return right
      ? ` Eve dùng ${name(photon.eve.scheme)}, đúng máy dò, và gửi nó đi tiếp mà không đổi gì.`
      : ` Eve dùng ${name(photon.eve.scheme)}, sai máy dò. Cô đọc ra ${photon.eve.bit} do may rủi và gửi đi tiếp một photon mới theo kiểu đo của mình.`;
  }
  return right
    ? ` Eve used ${name(photon.eve.scheme)}, the right detector, and passed it on unchanged.`
    : ` Eve used ${name(photon.eve.scheme)}, the wrong detector. She read ${photon.eve.bit} by chance and sent on a new photon in her scheme.`;
}

/** What Bob made of one photon, in a sentence. */
function bobSentence(photon: Photon, locale: Locale): string {
  if (locale === "vi") {
    if (!photon.kept) return ` Bob dùng ${name(photon.bobScheme)}, một kiểu đo khác, nên photon này bị bỏ đi.`;
    return photon.wrong
      ? ` Bob dùng ${name(photon.bobScheme)}, cùng kiểu đo, nhưng bit của anh bị sai: có ai đó đã làm nhiễu photon.`
      : ` Bob dùng ${name(photon.bobScheme)}, cùng kiểu đo, và bit của anh đúng.`;
  }
  if (!photon.kept) return ` Bob used ${name(photon.bobScheme)}, a different scheme, so this photon is thrown away.`;
  const verdict = photon.wrong ? "but his bit is wrong: somebody disturbed the photon" : "and his bit is right";
  return ` Bob used ${name(photon.bobScheme)}, the same scheme, ${verdict}.`;
}

/** The story of the photon the reader tapped. */
function describe(photon: Photon, number: number, state: QuantumState, locale: Locale): string {
  const start =
    locale === "vi"
      ? `Photon ${number}: Alice gửi ${photon.aliceBit} theo kiểu đo ${name(photon.aliceScheme)}.`
      : `Photon ${number}: Alice sent ${photon.aliceBit} in the ${name(photon.aliceScheme)} scheme.`;
  const eve = state.eveHidden ? "" : eveSentence(photon, locale);
  return start + eve + (state.stage >= MEASURED ? bobSentence(photon, locale) : "");
}

/** The exchange as a table of photons, with a caption for the step or for the photon picked. */
export function QuantumBoard({ state, onPick }: { state: QuantumState; onPick: (column: number) => void }) {
  const locale = useLocale();
  const all = photons(state);
  const picked = state.picked === undefined ? undefined : all[state.picked];

  return (
    <Board>
      <PhotonTable
        photons={all}
        result={compare(all)}
        stage={state.stage}
        showEve={state.eve && !state.eveHidden}
        picked={state.picked}
        onPick={onPick}
      />
      <Caption>
        {picked
          ? describe(picked, state.picked! + 1, state, locale)
          : locale === "vi"
            ? `${CAPTIONS[state.stage]!.vi} Chạm vào một con số để theo dõi một photon.`
            : `${CAPTIONS[state.stage]!.en} Tap a number to follow one photon.`}
      </Caption>
    </Board>
  );
}
