import { BASE32_CHARS, BASE64_CHARS, DecodeConfig, chunkArray } from "../utils/index.js";

const fromBaseN = (baseStr: string, {
  chunkSize,
  bitsPerChar,
  charset,
  charsPerChunk
}: DecodeConfig) => {
  const str = baseStr.split("=")[0].split("");
  const strIdx = str.map((s) => charset.findIndex((el) => s === el));
  const byteSet = chunkArray(strIdx, charsPerChunk);

  return byteSet
    .map((bits) => {
      const bitConcat = bits.reduce(
        (buf, bitset) => (buf << BigInt(bitsPerChar)) | BigInt(bitset),
        BigInt(0)
      );

      const originalBytes = Math.floor((bits.length * bitsPerChar) / 8);
      const padding = bits.length < charsPerChunk ? chunkSize - ((originalBytes * 8) % chunkSize) : 0;
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

export const fromBase32 = (str: string) => fromBaseN(str, {
  bitsPerChar: 5,
  charset: BASE32_CHARS,
  charsPerChunk: 8,
  chunkSize: 5,
});

export const fromBase64 = (str: string) => fromBaseN(str, {
  bitsPerChar: 6,
  charset: BASE64_CHARS,
  charsPerChunk: 4,
  chunkSize: 3,
});
