'use client'
import { useReducer } from 'react'

import { Button, ToggleButton } from '@/src/ui/atoms'
import DepositPriceSlider from '@/src/ui/components/DepositPriceSlider'
import RentPriceSlider from '@/src/ui/components/RentPriceSlider'
import { ToggleButtonGroup } from '@/src/ui/mui'
import { Stack, styled, Typography } from '@mui/material'

type Props = {
  onApply: (state: State) => void
}

export type State = {
  area: number
  type: string
  deposit: number[]
  rent: number[]
}

type Action =
  | {
      type: 'SET_AREA'
      payload: number
    }
  | {
      type: 'SET_TYPE'
      payload: string
    }
  | {
      type: 'SET_DEPOSIT'
      payload: number[]
    }
  | {
      type: 'SET_RENT'
      payload: number[]
    }


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_AREA':
      return {
        ...state,
        area: action.payload,
      }
    case 'SET_TYPE':
      return {
        ...state,
        type: action.payload,
      }
    case 'SET_DEPOSIT':
      return {
        ...state,
        deposit: action.payload,
      }
    case 'SET_RENT':
      return {
        ...state,
        rent: action.payload,
      }
    default:
      return state
  }
}

const Conditions = ({ onApply }: Props) => {
  const [state, dispatch] = useReducer(reducer, { area: 20, type: 'deposit', deposit: [0, 40000], rent: [0, 100]})

  return (
    <Stack my={2} mx={2}>
      <Typography variant='body2'>지역 선택</Typography>
      <ToggleButtonGroup
        value={state.area}
        exclusive
        sx={{
          m: 1,
        }}
        onChange={(_, value: number) => dispatch({ type: 'SET_AREA', payload: value })}
        aria-label='지역 선택'
      >
        <ToggleButtonBase value={20} aria-label='성수역'>
          <Typography variant='body2'>성수역</Typography>
        </ToggleButtonBase>
        <ToggleButton value={21} aria-label='건대입구역'>
          <Typography variant='body2'>건대입구역</Typography>
        </ToggleButton>
        <ToggleButton value={348} aria-label='군자역'>
          <Typography variant='body2'>군자역</Typography>
        </ToggleButton>
        <ToggleButton value={19} aria-label='뚝섬역'>
          <Typography variant='body2'>뚝섬역</Typography>
        </ToggleButton>
      </ToggleButtonGroup>

      <Typography variant='body2' mt={2}>거래 유형</Typography>
      <ToggleButtonGroup
        value={state.type}
        exclusive
        sx={{
          m: 1,
          width: '100%',
        }}
        onChange={(_, value: string) => dispatch({ type: 'SET_TYPE', payload: value })}
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
        <DepositPriceSlider value={state.deposit} onChange={(value) => dispatch({ type: 'SET_DEPOSIT', payload: value })} />
      </Stack>
      {state.type === 'rent' && (
        <Stack mt={3}>
          <RentPriceSlider value={state.rent} onChange={(value) => dispatch({ type: 'SET_RENT', payload: value })} />
        </Stack>
      )}
      <Stack mt={4}>
        <Button onClick={() => onApply(state)} sx={{ width: '100%' }}>적용하기</Button>
      </Stack>
    </Stack>
  )
}

export default Conditions

const ToggleButtonBase = styled(ToggleButton)`
  border: 1px solid ${({ theme }) => theme.palette.grey[500]};
  color: ${({ theme }) => theme.palette.grey[500]};
  background-color: ${({ theme }) => theme.palette.grey[50]};
`
