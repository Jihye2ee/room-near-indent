'use client'
import { useCallback } from 'react'

import styled from '@emotion/styled'
import { Stack, Typography } from '@mui/material'

import { Slider } from '../atoms'

type Props = {
  value: number[]
  onChange: (value: number[]) => void
}

export const rentMarks = [
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

const RentPriceSlider = ({ value, onChange }: Props) => {
  const valueText = useCallback((value: number[]) => {
    return `최소 ${value[0]}만원 최대 ${value[1]}만원`
  }, [])

  return (
    <Container>
      <Slider
        min={0}
        max={150}
        marks={rentMarks}
        step={null}
        getAriaLabel={() => '월세 범위'}
        value={value}
        onChange={(_, newValue) => onChange(newValue as number[])}
        getAriaValueText={() => valueText(value)}
      />
    </Container>
  )
}

export default RentPriceSlider

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`
