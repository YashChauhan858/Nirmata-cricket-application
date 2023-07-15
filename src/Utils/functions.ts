export const getDateByEpoch = (epoch: number): string => {
  if (!!epoch) {
    return new Date(epoch).toLocaleString().split(',')[0]
  }
  return '-'
}

export const divideArrayIntoChunks = <T>(
  arr: T[],
  chunkSize: number,
): T[][] => {
  const dividedArray: T[][] = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    dividedArray.push(chunk)
  }

  return dividedArray
}
