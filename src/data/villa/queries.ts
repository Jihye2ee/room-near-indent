import geohash from 'ngeohash'
import queryString from 'query-string'

import { State } from '@/app/recoil-state'

import { Item } from '../officetel/types'
import { VillaItems } from './types'

type Section = {
  type: string
  title: string
  itemIds: number[]
}

export const getVillaItemIDs = async (params: State) => {
  const url = 'https://apis.zigbang.com/v2/items/villa'
  const geohashValue = geohash.encode(params.area.y, params.area.x, 5)
  const queryParams = queryString.stringify({
    depositMin: params.deposit[0],
    depositMax: params.deposit[1] === 40000 ? undefined : params.deposit[1],
    rentMin: params.type === 'rent' ? params.rent[0] : undefined,
    rentMax:  params.type === 'rent' ? params.rent[1] === 150 ? undefined : params.rent[1] : undefined,
    'salesTypes[0]': params.type === 'rent' ? '월세': '전세',
    domain: 'zigbang',
    geohash: geohashValue,
    checkAnyItemWithoutFilter: true,
    zoom: 16,
  })

  const response = await fetch(`${url}?${queryParams}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    },
    method: 'GET',
  })

  if (!response.ok) throw new Error()

  const data = await response.json()
  const itemIds: number[] = data.sections.map((section: Section) => section.itemIds.map((itemId: number) => itemId)).flat()
  const uniqueItemIds = Array.from(new Set(itemIds))
  if (uniqueItemIds.length === 0) return { uniqueItemIds: [], buildings: [], items: [] }
  const clusters: VillaItems[] = data.clusters
  const items: Item[] = data.items.filter((item: Item) => uniqueItemIds.includes(item.itemId))
  return { uniqueItemIds, clusters, items }
}
