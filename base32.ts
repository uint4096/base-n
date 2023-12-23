const chunkArray = <T>(arr: Array<T>, size: number) =>
  arr.reduce<Array<Array<T>>>((chunkedArr, elem) => {
    const currentChunk: Array<T> | undefined = chunkedArr.at(-1);
    if (currentChunk && currentChunk.length < size) {
      currentChunk.push(elem);
    } else {
      chunkedArr.push([elem]);
    }

    return chunkedArr;
  }, []);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split("");

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
      // Safe because the number will always have <5 bits
      convertedByte.push(chars[Number(buf & bitmask)]);
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
