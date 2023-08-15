import geohash from 'ngeohash'
import queryString from 'query-string'

export const getZigbangGeohash = async (search: string, serviceType: string) => {
  const url = 'https://apis.zigbang.com/v2/search'
  const queryParams = queryString.stringify({
    leaseYn: 'N',
    q: search,
    serviceType: serviceType
  })

  const response = await fetch(`${url}?${queryParams}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    },
    method: 'GET',
  })

  if (!response.ok) throw new Error()

  const data = await response.json()
  const { lat, lng } = data.items[0]

  const geohasgValue = geohash.encode(lat, lng, 5)

  return geohasgValue
}

export const getLandList = async (itemIDs: number[]): Promise<[]> => {
  if (itemIDs.length === 0) return Promise.resolve([])

  const url = 'https://apis.zigbang.com/v2/items/list'
  const searchParams = {
    domain: 'zigbang',
    item_ids: itemIDs,
    withCoalition: true,
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(searchParams),
  })

  const data = await response.json()

  return data.items
}
