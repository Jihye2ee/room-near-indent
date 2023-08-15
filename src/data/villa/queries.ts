import geohash from 'ngeohash'
import queryString from 'query-string'

import { State } from '@/src/ui/components/Conditions'

type Section = {
  type: string
  title: string
  item_ids: number[]
}

export const getVillaItmeIDs = async (params: State) => {
  const url = 'https://apis.zigbang.com/v2/items'
  const geohashValue = geohash.encode(params.area.y, params.area.x, 5)
  const queryParams = queryString.stringify({
    deposit_gteq: params.deposit[0],
    deposit_lteq: params.deposit[1],
    rent_gteq: params.type === 'rent' ? params.rent[0] : '',
    rent_lteq:  params.type === 'rent' ? params.rent[1] : '',
    sales_type_in: params.type === 'rent' ? '월세': '전세',
    domain: 'zigbang',
    needHasNoFiltered: true,
    new_villa: true,
    geohash: geohashValue
  })

  const response = await fetch(`${url}?${queryParams}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
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
