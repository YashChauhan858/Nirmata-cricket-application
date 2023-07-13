export const getDateByEpoch = (epoch: number): string => {
  if (!!epoch) {
    return new Date(epoch).toLocaleString().split(',')[0]
  }
  return '-'
}
