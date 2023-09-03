
import { atom } from 'recoil'

import { State } from '@/src/ui/components/ConditionsModal'

export const initialFilterStateDefault: State = {
  site: 'zigbang',
  type: 'deposit',
  distance: 0.7,
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
