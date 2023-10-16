export const m2ToPyeong = (m2: number): string => {
  return Math.floor(m2 / 3.3).toFixed(2)
}

export const pyeonToM2 = (pyeong: number): string => {
  return Math.floor(pyeong * 3.3).toFixed(2)
}
