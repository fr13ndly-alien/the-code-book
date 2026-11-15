import { SIGNS, type SignId } from "@codebook/cipher-engine/hieroglyphs";
import type { Locale } from "~/i18n";

/**
 * Vietnamese names of the signs. The engine (packages/cipher-engine/src/hieroglyphs)
 * keeps the English names; the page looks them up here.
 */
const SIGN_NAME_VI: Record<SignId, string> = {
  stool: "ghế đẩu",
  loaf: "ổ bánh mì",
  lasso: "dây thòng lọng",
  lion: "sư tử",
  plinth: "bệ đá",
  reeds: "đôi cây sậy",
  cloth: "tấm vải gấp",
  slope: "sườn đồi",
  reed: "cây sậy",
  vulture: "chim kền kền",
  hand: "bàn tay",
  mouth: "cái miệng",
  basket: "giỏ có quai",
  water: "gợn nước",
  bolt: "then cửa",
  sun: "mặt trời",
  skins: "ba tấm da cáo",
};

/** A sign's name in the page's language. */
export const signName = (sign: SignId, locale: Locale): string =>
  locale === "vi" ? SIGN_NAME_VI[sign] : SIGNS[sign].name;
