export const m2ToPyeong = (m2: number): string => {
  return (m2 / 3.3).toFixed(2)
}

export const pyeonToM2 = (pyeong: number): string => {
  return (pyeong * 3.3).toFixed(2)
}

export const extractM2andConvertToPyeong = (text: string): string => {
  const regex = /(\d+\.\d+)\/(\d+\.\d+)㎡/
  const match = text.match(regex)

  if (match) {
    const value1 = match[1]
    const value2 = match[2]
    return `${m2ToPyeong(Number(value1))}/${m2ToPyeong(Number(value2))}평`
  }

  return ''
}
