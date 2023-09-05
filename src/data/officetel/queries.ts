import geohash from 'ngeohash'
import queryString from 'query-string'

import { State } from '@/app/recoil-state'

import { Building, Item, Section } from './types'

export const getOfficetelItemIDs = async (params: State): Promise<{ uniqueItemIds: number[], buildings: Building[], items: Item[] }> => {
  const url = 'https://apis.zigbang.com/v2/items/officetel'
  const geohashValue = geohash.encode(params.area.y, params.area.x, 5)
  const queryParams = queryString.stringify({
    depositMin: params.deposit[0],
    depositMax: params.deposit[1] === 40000 ? undefined : params.deposit[1],
    rentMin: params.type === 'rent' ? params.rent[0] : undefined,
    rentMax:  params.type === 'rent' ? params.rent[1] === 150 ? undefined : params.rent[1] : undefined,
    'salesTypes[0]': params.type === 'rent' ? '월세': '전세',
    checkAnyItemWithoutFilter: true,
    withBuildings: true,
    domain: 'zigbang',
    geohash: geohashValue,
  })

  const response = await fetch(`${url}?${queryParams}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    },
    method: 'GET',
  })

  if (!response.ok) throw new Error()

  const data = await response.json()
  const itemIds: number[] = data.sections.map((section: Section) => section.itemIds.map((itemId: number) => itemId)).flat()
  const uniqueItemIds = Array.from(new Set(itemIds))
  if (uniqueItemIds.length === 0) return { uniqueItemIds: [], buildings: [], items: [] }

  const buildings: Building[] = data.buildings.filter((building: Building) => building.count > 0)
  const items: Item[] = data.items.filter((item: Item) => uniqueItemIds.includes(item.itemId))
  return { uniqueItemIds, buildings, items }
}
