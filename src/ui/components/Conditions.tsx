'use client'
import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import { KaKaoAddressItem } from '@/src/data/address/types'
import { ToggleButton } from '@/src/ui/atoms'
import DepositPriceSlider from '@/src/ui/components/DepositPriceSlider'
import RentPriceSlider from '@/src/ui/components/RentPriceSlider'
import { Stack, ToggleButtonGroup, Typography } from '@/src/ui/mui'

import AddressSearchInput from './AddressSearchInput'

export type State = {
  site: 'naver' | 'zigbang'
  area: KaKaoAddressItem
  type: string
  deposit: number[]
  rent: number[]
  page?: number
}

const Conditions = () => {
  const [state, setState] = useRecoilState(filterState)

  return (
    <Stack my={2} mx={2}>
      <Typography variant='body2' mt={2}>사이트 선택</Typography>
      <ToggleButtonGroup
        value={state.site}
        exclusive
        sx={{
          m: 1,
          width: '100%',
        }}
        onChange={(_, value: 'naver' | 'zigbang') => setState({ ...state, site: value })}
        aria-label='매물 검색 사이트 선택'
      >
        <ToggleButton value='zigbang' aria-label='직방'>
          <Typography variant='body2'>직방</Typography>
        </ToggleButton>
        <ToggleButton value='naver' aria-label='네이버부동산'>
          <Typography variant='body2'>네이버<br/>부동산</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant='body2' mt={2}>지역 선택</Typography>
      <AddressSearchInput onChange={(value: KaKaoAddressItem) => setState({ ...state, area: value })}/>

      <Typography variant='body2' mt={2}>거래 유형</Typography>
      <ToggleButtonGroup
        value={state.type}
        exclusive
        sx={{
          m: 1,
          width: '100%',
        }}
        onChange={(_, value: string) => setState({ ...state, type: value })}
        aria-label='전월세 옵션 선택'
      >
        <ToggleButton value='deposit' aria-label='전세'>
          <Typography variant='body2'>전세</Typography>
        </ToggleButton>
        <ToggleButton value='rent' aria-label='월세'>
          <Typography variant='body2'>월세</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack mt={1}>
        <DepositPriceSlider value={state.deposit} onChange={(value) => setState({ ...state, deposit: value })} />
      </Stack>
      {state.type === 'rent' && (
        <Stack mt={3}>
          <RentPriceSlider value={state.rent} onChange={(value) => setState({ ...state, rent: value })} />
        </Stack>
      )}
    </Stack>
  )
}

export default Conditions
