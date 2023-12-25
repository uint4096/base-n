import { OCTAL_HEX_CHARS } from "../utils/index.js";

const toOctalOrHex = (num: number, n: 8 | 16) => {
  const bitmask = n - 1; // 0b111 or 0b1111
  const result = [];
  while (num > 0) {
    const bitset = num & bitmask;
    result.push(OCTAL_HEX_CHARS[bitset]);
    num = num >> Math.log2(n);
  }

  return result.reverse().join("");
};

export const toOctal = (num: number) => toOctalOrHex(num, 8);
export const toHex = (num: number) => toOctalOrHex(num, 16);
