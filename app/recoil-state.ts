
import { atom } from 'recoil'

import { State } from '@/src/ui/components/Conditions'

export const filterState = atom<State>({
  key: 'filterState',
  default: {
    site: 'zigbang',
    type: 'deposit',
    deposit: [0, 40000],
    rent: [0, 150],
    area: {
      address: null,
      address_name: '',
      address_type: '',
      x: '126.570667',
      y: '33.450701',
      road_address: null,
      bounds: {
        bottomLat: '37.5298390',
        leftLon: '127.0388926',
        rightLon: '127.0751460',
        topLat: '37.5520865',
      },
    },
    cortarNo: '',
  }
})
