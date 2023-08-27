
import { atom } from 'recoil'

import { State } from '@/src/ui/components/Conditions'

export const filterState = atom<State>({
  key: 'filterState',
  default: {
    site: 'zigbang',
    type: 'deposit',
    distance: 0.7,
    deposit: [0, 40000],
    rent: [0, 150],
    area: {
      address: null,
      address_name: '',
      address_type: '',
      x: '37.5445888153751',
      y: '127.056066999327',
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
})
