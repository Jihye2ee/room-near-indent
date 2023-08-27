export const getPriceText = (value: number) => {
  if (value >= 10000) {
    const billions = Math.floor(value / 10000)
    const millions = value % 10000
    if (millions === 0) {
        return `${billions}억`
    } else {
        return `${billions}억 ${millions}만원`
    }
  } else {
      return `${value}만원`
  }
}
