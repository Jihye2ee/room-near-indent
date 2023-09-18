
import { atom } from 'recoil'

import { KakaoItem } from '@/src/data/local/types'
import { Building, Item } from '@/src/data/officetel/types'
import { ArticleData, Cluster, PropertyInfo } from '@/src/data/types'
import { VillaItems } from '@/src/data/villa/types'

export type State = {
  site: 'naver' | 'zigbang'
  search?: string
  area: KakaoItem
  distance?: number
  type: string
  deposit: number[]
  rent: number[]
  totalCount?: number
  cortarNo: string
}

export const initialFilterStateDefault: State = {
  site: 'zigbang',
  type: 'deposit',
  distance: 1.5,
  deposit: [0, 40000],
  rent: [0, 150],
  area: {
    address: null,
    address_name: '',
    address_type: '',
    x: '127.056066999327',
    y: '37.5445888153751',
    road_address: null,
    bounds: {
      bottomLat: '',
      leftLon: '',
      rightLon: '',
      topLat: '',
    },
  },
  cortarNo: '',
}

export const filterState = atom<State>({
  key: 'filterState',
  default: initialFilterStateDefault
})

type ModalTypeState = {
  siteOpen: boolean
  typeAndPriceOpen: boolean
  mobileFilterOpen: boolean
}
export const filterModalState = atom<ModalTypeState>({
  key: 'filterModalState',
  default: {
    siteOpen: false,
    typeAndPriceOpen: false,
    mobileFilterOpen: false,
  }
})

export type zigbangState = {
  buildings?: Building[]
  items: Item[]
  uniqueItemIds: number[]
  displayedZigbangList: PropertyInfo[]
  zigbangList: PropertyInfo[]
  clusterList?: VillaItems[]
}

export const zigbangResultState = atom<zigbangState>({
  key: 'zigbangResultState',
  default: {
    buildings: [],
    items: [],
    uniqueItemIds: [],
    zigbangList: [],
    displayedZigbangList: [],
    clusterList: [{
      items: [{
        itemId: '0',
        lat: 0,
        lng: 0,
      }],
      lat: 0,
      lng: 0,
    },],
  }
})

export type naverlandState = {
  ariticles: Cluster[]
  naverList: ArticleData
  cortarNo: string
  totalCount: number
}
export const naverlandResultState = atom<naverlandState>({
  key: 'naverlandResultState',
  default: {
    cortarNo: '',
    ariticles: [],
    naverList: {
      more: false,
      page: 1,
      body: []
    },
    totalCount: 0,
  }
})
