import { BASE32_CHARS, BASE64_CHARS, EncodeConfig, chunkArray } from "../utils/index.js";

const toBaseN = (str: string, {
  chunkSize,
  bitmask,
  bitsPerChar,
  charset,
  charsPerChunk
}: EncodeConfig) => {
  const byteChunks = chunkArray(
    str.split("").map((c) => c.charCodeAt(0)),
    chunkSize
  );

  return byteChunks.map(bytes => {
    const bitConcat = bytes.reduce(
      (buf, byte) => (buf << BigInt(8)) | BigInt(byte),
      BigInt(0)
    );

    // Pad bits with 0s to make the number of bits divisible by chunkSize
    const bitPadding = bytes.length < chunkSize ? chunkSize - ((8 * bytes.length) % chunkSize) : 0;
    let buf = bitConcat << BigInt(bitPadding);

    const convertedByte = [];

    while (buf > 0) {
      // Safe because `buf & bitmask` will always have < bitsPerChar bits
      convertedByte.push(charset[Number(buf & BigInt(bitmask))]);
      buf >>= BigInt(bitsPerChar);
    }

    const charPadding = Array.from(
      { length: charsPerChunk - convertedByte.length },
      () => "="
    ).join("");

    return [...convertedByte.reverse(), ...charPadding];
  })
  .flat()
  .join("");
};

export const toBase32 = (str: string) => toBaseN(str, {
  bitsPerChar: 5,
  charset: BASE32_CHARS,
  charsPerChunk: 8,
  chunkSize: 5,
  bitmask: 0b11111 
});

export const toBase64 = (str: string) => toBaseN(str, {
  bitsPerChar: 6,
  charset: BASE64_CHARS,
  charsPerChunk: 4,
  chunkSize: 3,
  bitmask: 0b111111 
});
