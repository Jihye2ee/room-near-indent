'use client'
import { useCallback } from 'react'

import { Stack, Typography } from '@mui/material'

import { Slider } from '../atoms'

type Props = {
  value: number[]
  onChange: (value: number[]) => void
}

const DepositPriceSlider = ({ value, onChange }: Props) => {
  const valueText = useCallback((value: number[]) => {
    return `최소 ${value[0]}만원 최대 ${value[1]}만원`
  }, [])

  const marks = [
    {
      value: 0,
      label: '최소'
    },
    {
      value: 5000,
      label: '5천'
    },
    {
      value: 15000,
      label: '1억 5천'
    },
    {
      value: 25000,
      label: '2억 5천'
    },
    {
      value: 40000,
      label: '최대'
    },
  ]

  return (
    <Stack>
      <Typography variant='body2' tabIndex={1} aria-label=''>보증금</Typography>
      <Stack justifyContent='center' alignItems='center'>
        <Slider
          sx={{ m: 1 }}
          min={0}
          max={40000}
          marks={marks}
          step={null}
          value={value}
          onChange={(_, newValue) => onChange(newValue as number[])}
          getAriaValueText={() => valueText(value)}
          valueLabelDisplay='off'
        />
      </Stack>
    </Stack>
  )
}

export default DepositPriceSlider


