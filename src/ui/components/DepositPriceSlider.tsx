'use client'
import { useCallback } from 'react'

import styled from '@emotion/styled'

import { Slider } from '../atoms'

type Props = {
  value: number[]
  onChange: (value: number[]) => void
}

export const depositMarks = [
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

const DepositPriceSlider = ({ value, onChange }: Props) => {
  const valueText = useCallback((value: number[]) => {
    return `최소 ${value[0]}만원 최대 ${value[1]}만원`
  }, [])

  return (
    <Container>
      <Slider
        min={0}
        max={40000}
        marks={depositMarks}
        step={null}
        value={value}
        onChange={(_, newValue) => onChange(newValue as number[])}
        getAriaValueText={() => valueText(value)}
        valueLabelDisplay='off'
      />
    </Container>
  )
}

export default DepositPriceSlider

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`
