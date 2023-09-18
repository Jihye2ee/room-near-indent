import { useRecoilState } from 'recoil'

import { filterState } from '@/app/recoil-state'
import styled from '@emotion/styled'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

import DepositPriceSlider from './DepositPriceSlider'
import RentPriceSlider from './RentPriceSlider'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const TypeAndPriceSelect = ({ isOpen, onClose }: Props) => {
  const [conditions, setConditions] = useRecoilState(filterState)

  return (
    <Container role='dialog' aria-hidden={!isOpen} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <TypeTitle tabIndex={0} aria-label='거래 유형 선택'>거래 유형</TypeTitle>
      <TypeCheckboxContainer>
        <TypeCheckBox
          tabIndex={0}
          role='checkbox'
          aria-checked={conditions.type === 'deposit'}
          onClick={() => setConditions({ ...conditions, type: 'deposit' })}
          onKeyDown={(e) => e.key === 'Enter' && setConditions({ ...conditions, type: 'deposit' })}
        >
          {conditions.type === 'deposit' ? <CheckBoxIcon sx={{ color: '#356EFB' }}/> : <CheckBoxOutlineBlankIcon sx={{ color: '#356EFB' }} />}
          <TypeText>전세</TypeText>
        </TypeCheckBox>
        <TypeCheckBox
          tabIndex={0}
          role='checkbox'
          aria-checked={conditions.type === 'rent'}
          onClick={() => setConditions({ ...conditions, type: 'rent' })}
          onKeyDown={(e) => e.key === 'Enter' && setConditions({ ...conditions, type: 'rent' })}
        >
          {conditions.type === 'rent' ? <CheckBoxIcon sx={{ color: '#356EFB' }} /> : <CheckBoxOutlineBlankIcon sx={{ color: '#356EFB' }} />}
          <TypeText>월세</TypeText>
        </TypeCheckBox>
      </TypeCheckboxContainer>
      <PriceContainer>
        <TypeTitle>가격</TypeTitle>
        <PriceSliderContainer>
          <PriceTypeText tabIndex={0} aria-label='전세 보증금'>보증금 / 전세가</PriceTypeText>
          <DepositPriceSlider value={conditions.deposit} onChange={(value) => setConditions({ ...conditions, deposit: value })} />
        </PriceSliderContainer>
        {conditions.type === 'rent' && (<>
          <PriceSliderContainer style={{ marginTop: 16}}>
            <PriceTypeText tabIndex={0} aria-label='전세 보증금'>월세</PriceTypeText>
            <RentPriceSlider value={conditions.rent} onChange={(value) => setConditions({ ...conditions, rent: value })} />
          </PriceSliderContainer>
        </>)}
      </PriceContainer>
    </Container>
  )
}

export default TypeAndPriceSelect

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: var(--grey-50);
  width: 300px;
  border-radius: 4px;
  border: 1px solid var(--grey-300);
`

const TypeTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: var(--grey-800);
  padding-top: 8px;
`

const TypeCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

const TypeCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  cursor: pointer;
`

const TypeText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--grey-600);
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

const PriceTypeText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--grey-600);
`

const PriceSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
