import { BASE32_CHARS, chunkArray } from "../utils/index.js";

export const fromBase32 = (baseStr: string) => {
  const str = baseStr.split("=")[0].split("");
  const strIdx = str.map((s) => BASE32_CHARS.findIndex((el) => s === el));
  const byteSet = chunkArray(strIdx, 8);

  return byteSet
    .map((bits) => {
      const bitConcat = bits.reduce(
        (buf, bitset) => (buf << BigInt(5)) | BigInt(bitset),
        BigInt(0)
      );

      const originalBytes = Math.floor((bits.length * 5) / 8);
      const padding = bits.length < 8 ? 5 - ((originalBytes * 8) % 5) : 0;
      let buf = bitConcat >> BigInt(padding);

      const bitmask = BigInt(0b11111111);
      const chars = [];

      while (buf > 0) {
        chars.push(String.fromCharCode(Number(buf & bitmask)));
        buf >>= BigInt(8);
      }

      return chars.reverse();
    })
    .flat()
    .join('');
};
