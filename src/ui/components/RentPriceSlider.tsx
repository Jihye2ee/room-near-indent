'use client'

import { useCallback } from 'react'

import { Stack, Typography } from '@mui/material'

import { Slider } from '../atoms'

type Props = {
  value: number[]
  onChange: (value: number[]) => void
}

const RentPriceSlider = ({ value, onChange }: Props) => {
  const valueText = useCallback((value: number[]) => {
    return `최소 ${value[0]}만원 최대 ${value[1]}만원`
  }, [])

  const marks = [
    {
      value: 0,
      label: '최소'
    },
    {
      value: 50,
      label: '50만원'
    },
    {
      value: 100,
      label: '100만원'
    },
    {
      value: 150,
      label: '최대'
    },
  ]

  return (
    <Stack>
      <Typography variant='body2'>월세</Typography>
      <Stack justifyContent='center' alignItems='center'>
        <Slider
          sx={{ m: 2 }}
          min={0}
          max={150}
          marks={marks}
          step={null}
          getAriaLabel={() => '월세 범위'}
          value={value}
          onChange={(_, newValue) => onChange(newValue as number[])}
          getAriaValueText={() => valueText(value)}
        />
      </Stack>
    </Stack>
  )
}

export default RentPriceSlider

