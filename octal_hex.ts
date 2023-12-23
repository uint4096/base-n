const digits = "0123456789ABCDEF".split("");

const toBaseN = (num: number, n: 8 | 16) => {
  const bitmask = n - 1; // 0b111 or 0b1111
  const result = [];
  while (num > 0) {
    const bitset = num & bitmask;
    result.push(digits[bitset]);
    num = num >> Math.log2(n);
  }

  return result.reverse().join("");
};

export const toOctal = (num: number) => toBaseN(num, 8);
export const toHex = (num: number) => toBaseN(num, 16);
