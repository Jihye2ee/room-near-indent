import { Bounds } from '../data/address/types'

export const calculateBounds = (centerLatitude: number, centerLongitude: number): Bounds => {
  const deltaLat = 1.5 / 110.574 // 위도 1도는 약 110.574km
  const deltaLon = 1.5 / (111.320 * Math.cos((centerLatitude * Math.PI) / 180))

  return {
    topLat: (centerLatitude + deltaLat).toFixed(7),
    bottomLat: (centerLatitude - deltaLat).toFixed(7),
    leftLon: (centerLongitude - deltaLon).toFixed(7),
    rightLon: (centerLongitude + deltaLon).toFixed(7),
  }
}
