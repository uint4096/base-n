export type DecodeConfig = {
  chunkSize: number;
  bitsPerChar: number;
  charset: Array<string>;
  charsPerChunk: number;
};

export type EncodeConfig = DecodeConfig & { bitmask: number };

export const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split("");
export const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
export const OCTAL_HEX_CHARS = "0123456789ABCDEF".split("");