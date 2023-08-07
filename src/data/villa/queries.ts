import geohash from 'ngeohash'
import queryString from 'query-string'

import { State } from '@/src/ui/components/Conditions'

type Section = {
  type: string
  title: string
  item_ids: number[]
}

export const getGeohash = async (search: string, serviceType: string) => {
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

export const getVillaItmeIDs = async (parmas: State) => {
  const url = 'https://apis.zigbang.com/v2/items'
  const queryParams = queryString.stringify({
    deposit_gteq: parmas.deposit[0],
    deposit_lteq: parmas.deposit[1],
    rent_gteq: parmas.type === 'rent' ? parmas.rent[0] : undefined,
    rent_lteq:  parmas.type === 'rent' ? parmas.rent[1] : undefined,
    sales_type_in: parmas.type === 'rent' ? '월세': '전세',
    radius: 1,
    domain: 'zigbang',
    subway_id: parmas.area,
    needHasNoFiltered: true,
    new_villa: true
  })

  const response = await fetch(`${url}?${queryParams}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    },
    method: 'GET',
  })

  if (!response.ok) throw new Error()

  const data = await response.json()
  const itemIds: number[] = data.sections.map((section: Section) => section.item_ids.map((item_id: number) => item_id)).flat()
  const uniqueItemIds = Array.from(new Set(itemIds))

  if (uniqueItemIds.length === 0) return Promise.resolve([])

  return uniqueItemIds
}
