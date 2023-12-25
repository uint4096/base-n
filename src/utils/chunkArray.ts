export const chunkArray = <T>(arr: Array<T>, size: number) =>
  arr.reduce<Array<Array<T>>>((chunkedArr, elem) => {
    const currentChunk: Array<T> | undefined = chunkedArr.at(-1);
    if (currentChunk && currentChunk.length < size) {
      currentChunk.push(elem);
    } else {
      chunkedArr.push([elem]);
    }

    return chunkedArr;
  }, []);
