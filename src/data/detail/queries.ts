import { LandDetail } from '@/src/data/detail'

export const getLandDetail = async (itemID: number) => {
  const requestURL = `https://apis.zigbang.com/v2/items/${itemID}`

  const url = `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/land?url=${encodeURIComponent(requestURL)}`
  const response = await fetch(url)

  if (!response.ok) throw new Error()

  const data: LandDetail = await response.json()

  return data
}
