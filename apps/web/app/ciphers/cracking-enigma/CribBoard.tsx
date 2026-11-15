import { clashes, ROTOR_POSITIONS } from "@codebook/cipher-engine/cracking-enigma";
import { letterAt, lettersOnly } from "@codebook/cipher-engine/text";
import { Caption, Letters } from "~/components/sim/Caption";
import { LetterGrid } from "~/components/sim/LetterGrid";
import { useT } from "~/i18n";
import type { CrackState } from "./useCrack";

const TESTED = { en: ROTOR_POSITIONS.toLocaleString("en"), vi: ROTOR_POSITIONS.toLocaleString("vi") };

/** Turing's working: the crib laid under the ciphertext, the clashes, and the result of the search. */
export function CribBoard({ state }: { state: CrackState }) {
  const t = useT();
  const tested = t(TESTED);
  const cipher = [...lettersOnly(state.ciphertext)];
  const { crib, offset, stops } = state;
  const clashing = clashes(state.ciphertext, crib, offset).map((at) => at + offset);
  const underCrib = (column: number) => column >= offset && column < offset + crib.length;
  const found = stops?.[0];
  const rows = [cipher, cipher.map((_, column) => (underCrib(column) ? crib[column - offset]! : ""))];

  return (
    <>
      <LetterGrid
        label={t({ en: "The crib under the ciphertext", vi: "Từ mồi đặt dưới bản mật mã" })}
        size="small"
        rowHeads={
          found
            ? t({ en: ["Ciphertext", "Crib", "Message"], vi: ["Bản mật mã", "Từ mồi", "Bức điện"] })
            : t({ en: ["Ciphertext", "Crib"], vi: ["Bản mật mã", "Từ mồi"] })
        }
        cells={found ? [...rows, [...found.plaintext]] : rows}
        mark={(row, column) => {
          if (row < 2 && clashing.includes(column)) return "on";
          return row !== 1 && underCrib(column) ? "cipher" : undefined;
        }}
      />
      <Caption>
        {clashing.length > 0
          ? t({
              en: (
                <>
                  <Letters>{cipher[clashing[0]!]}</Letters> sits under <Letters>{cipher[clashing[0]!]}</Letters>. Enigma
                  never turns a letter into itself, so the crib cannot be here. Slide it along.
                </>
              ),
              vi: (
                <>
                  Chữ <Letters>{cipher[clashing[0]!]}</Letters> nằm dưới chữ <Letters>{cipher[clashing[0]!]}</Letters>.
                  Enigma không bao giờ biến một chữ thành chính nó, nên từ mồi không thể nằm ở đây. Hãy trượt nó đi.
                </>
              ),
            })
          : state.illustration
            ? t({
                en: (
                  <>
                    No letter sits under itself, so the crib could be here. The book stops at this point. Its ciphertext
                    is a made-up example, not real Enigma output, so there is no rotor setting to find.
                  </>
                ),
                vi: (
                  <>
                    Không chữ nào nằm dưới chính nó, nên từ mồi có thể nằm ở đây. Sách dừng lại ở bước này. Bản mật mã
                    của sách chỉ là ví dụ bịa ra, không phải do máy Enigma thật tạo ra, nên không có vị trí rôto nào để
                    tìm.
                  </>
                ),
              })
            : !stops
              ? t({
                  en: <>No letter sits under itself. The crib could be here. Test the rotor settings to find out.</>,
                  vi: (
                    <>
                      Không chữ nào nằm dưới chính nó. Từ mồi có thể nằm ở đây. Hãy thử các vị trí rôto để biết chắc.
                    </>
                  ),
                })
              : found
                ? t({
                    en: (
                      <>
                        {tested} rotor settings tested. With <Letters>{found.start.map(letterAt).join(" ")}</Letters>{" "}
                        in the windows, the machine turns these letters into <Letters>{crib}</Letters>. Read the whole
                        message in the bottom row.
                      </>
                    ),
                    vi: (
                      <>
                        Đã thử {tested} vị trí rôto. Khi các ô cửa sổ hiện{" "}
                        <Letters>{found.start.map(letterAt).join(" ")}</Letters>, máy biến những chữ này thành{" "}
                        <Letters>{crib}</Letters>. Hãy đọc cả bức điện ở hàng dưới cùng.
                      </>
                    ),
                  })
                : t({
                    en: (
                      <>
                        {tested} rotor settings tested. Not one turns these letters into <Letters>{crib}</Letters>. The
                        crib is in the wrong place. Slide it along.
                      </>
                    ),
                    vi: (
                      <>
                        Đã thử {tested} vị trí rôto. Không vị trí nào biến những chữ này thành{" "}
                        <Letters>{crib}</Letters>. Từ mồi đang nằm sai chỗ. Hãy trượt nó đi.
                      </>
                    ),
                  })}
      </Caption>
    </>
  );
}
