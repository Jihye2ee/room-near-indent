
import { atom } from 'recoil'

import { KakaoItem } from '@/src/data/local/types'
import { Building, Item } from '@/src/data/officetel/types'
import { PropertyInfo } from '@/src/data/types'

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
  distance: 0.8,
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
  buildings: Building[]
  items: Item[]
  uniqueItemIds: number[]
  displayedZigbangList: PropertyInfo[]
  zigbangList: PropertyInfo[]
}

export const zigbangResultState = atom<zigbangState>({
  key: 'mapState',
  default: {
    buildings: [],
    items: [],
    uniqueItemIds: [],
    zigbangList: [],
    displayedZigbangList: [],
  }
})
