import { BASE32_CHARS, chunkArray } from "../utils";

export const toBase32 = (str: string) => {
  const byteChunks = chunkArray(
    str.split("").map((c) => c.charCodeAt(0)),
    5
  );

  const res = [];
  for (const bytes of byteChunks) {
    const bitConcat = bytes.reduce(
      (buf, byte) => (buf << BigInt(8)) | BigInt(byte),
      BigInt(0)
    );

    // Pad bits with 0s to make the number of bits divisible by 5
    const bitPadding = bytes.length < 5 ? 5 - ((8 * bytes.length) % 5) : 0;

    let buf = bitConcat << BigInt(bitPadding);
    const bitmask = BigInt(0b11111);
    const convertedByte = [];
    while (buf > 0) {
      // Safe because `buf & bitmask` will always have <5 bits
      convertedByte.push(BASE32_CHARS[Number(buf & bitmask)]);
      buf = buf >> BigInt(5);
    }

    const charPadding = Array.from(
      { length: 8 - convertedByte.length },
      () => "="
    ).join("");

    res.push(...convertedByte.reverse(), ...charPadding);
  }

  return res.join("");
};
