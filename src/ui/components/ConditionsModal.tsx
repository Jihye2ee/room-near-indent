'use client'
import { useReducer } from 'react'
import { useRecoilState } from 'recoil'

import { filterModalState, filterState } from '@/app/recoil-state'
import styled from '@emotion/styled'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import DepositPriceSlider from './DepositPriceSlider'
import RentPriceSlider from './RentPriceSlider'

type State = {
  site: 'naver' | 'zigbang'
  type: string
  deposit: number[]
  rent: number[]
}

type Action =
  | { type: 'SET_SITE', payload: 'naver' | 'zigbang' }
  | { type: 'SET_TYPE', payload: string }
  | { type: 'SET_DEPOSIT', payload: number[] }
  | { type: 'SET_RENT', payload: number[] }
  | { type: 'RESET' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SITE':
      return { ...state, site: action.payload }
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    case 'SET_DEPOSIT':
      return { ...state, deposit: action.payload }
    case 'SET_RENT':
      return { ...state, rent: action.payload }
    case 'RESET':
      return { site: 'zigbang', type: 'deposit', deposit: [0, 40000], rent: [0, 150] }
    default:
      return state
  }
}

const ConditionsModal = () => {
  const [conditions, setConditions] = useRecoilState(filterState)
  const [modalState, setModalState] = useRecoilState(filterModalState)
  const [mobileConditions, dispatch] = useReducer(reducer, {
    site: conditions.site,
    type: conditions.type,
    deposit: conditions.deposit,
    rent: conditions.rent
  })

  if (!modalState.mobileFilterOpen) return null
  return (
    <Container role='dialog' aria-hidden={!modalState.mobileFilterOpen}>
      <NavigationContainer>
        <ChevronLeftIcon width={24} height={24} sx={{ color: 'grey.800' }} onClick={() => setModalState({ ...modalState, mobileFilterOpen: false })}/>
        <Title>전체 필터</Title>
        <Reset onClick={() => dispatch({ type: 'RESET' })}>초기화</Reset>
      </NavigationContainer>
      <Content>
        <SiteSelectContainer>
          <FilterTitle>매물 검색 사이트</FilterTitle>
          <ButtonRowContainer>
            <SiteSelectButton
              as='button'
              selected={mobileConditions.site === 'zigbang'}
              onClick={() => dispatch({ type: 'SET_SITE', payload: 'zigbang' })}
            >
              직방
            </SiteSelectButton>
            <SiteSelectButton
              as='button'
              selected={mobileConditions.site === 'naver'}
              onClick={() => dispatch({ type: 'SET_SITE', payload: 'naver' })}
            >
              네이버 부동산
            </SiteSelectButton>
          </ButtonRowContainer>
        </SiteSelectContainer>
        <TypeCheckboxContainer>
          <FilterTitle>거래 유형</FilterTitle>
          <TypeCheckBox
            tabIndex={0}
            role='checkbox'
            aria-checked={mobileConditions.type === 'deposit'}
            onClick={() => dispatch({ type: 'SET_TYPE', payload: 'deposit' })}
            onKeyDown={(e) => e.key === 'Enter' && dispatch({ type: 'SET_TYPE', payload: 'deposit' })}
          >
            {mobileConditions.type === 'deposit' ? <CheckBoxIcon sx={{ color: '#356EFB' }}/> : <CheckBoxOutlineBlankIcon sx={{ color: '#356EFB' }} />}
            <TypeText>전세</TypeText>
          </TypeCheckBox>
          <TypeCheckBox
            tabIndex={0}
            role='checkbox'
            aria-checked={mobileConditions.type === 'rent'}
            onClick={() => dispatch({ type: 'SET_TYPE', payload: 'rent' })}
            onKeyDown={(e) => e.key === 'Enter' && dispatch({ type: 'SET_TYPE', payload: 'rent' })}
          >
            {mobileConditions.type === 'rent' ? <CheckBoxIcon sx={{ color: '#356EFB' }} /> : <CheckBoxOutlineBlankIcon sx={{ color: '#356EFB' }} />}
            <TypeText>월세</TypeText>
          </TypeCheckBox>
        </TypeCheckboxContainer>
        <PriceContainer>
          <FilterTitle>가격</FilterTitle>
          <PriceSliderContainer>
            <PriceTypeText tabIndex={0} aria-label='전세 보증금'>보증금 / 전세가</PriceTypeText>
            <DepositPriceSlider value={mobileConditions.deposit} onChange={(value) => dispatch({ type: 'SET_DEPOSIT', payload: value })} />
          </PriceSliderContainer>
          {mobileConditions.type === 'rent' && (<>
            <PriceSliderContainer style={{ marginTop: 16}}>
              <PriceTypeText tabIndex={0} aria-label='전세 보증금'>월세</PriceTypeText>
              <RentPriceSlider value={mobileConditions.rent} onChange={(value) => dispatch({ type: 'SET_RENT', payload: value })} />
            </PriceSliderContainer>
          </>)}
        </PriceContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              setConditions({
              ...conditions,
              site: mobileConditions.site,
              type: mobileConditions.type,
              deposit: mobileConditions.deposit,
              rent: mobileConditions.rent
            })
            setModalState({ ...modalState, mobileFilterOpen: false })
          }}
        >
          적용하기
        </Button>
        </ButtonContainer>
      </Content>
    </Container>
  )
}

export default ConditionsModal

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  height: 100%;
  width: 100%;
  border-radius: 0;
  max-height: 100%;
  z-index: 99990;
  background-color: var(--grey-100);
`

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding: 0px 16px;
  border-bottom: 1px solid var(--grey-200);
`

const Title = styled.h1`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: var(--grey-800);
  text-align: center;
`

const Reset = styled.button`
  width: 44px;
  height: 44px;
  padding: 0px;
  color: var(--grey-600);
  font-size: 14px;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 32px 0;
`

const FilterTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: var(--grey-800);
`

const SiteSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 4px solid var(--grey-200);
  padding-bottom: 32px;
`

const ButtonRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const SiteSelectButton = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 48px;
  border: 1px solid var(--grey-200);
  border-radius: 12px;
  padding: 16px;
  background-color: ${(props) => props.selected ? 'var(--blue-500)' : 'var(--grey-50)'};
  cursor: pointer;

  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.selected ? 'var(--grey-200)' : 'var(--grey-400)'};

`

const TypeCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  padding-bottom: 32px;
  margin-top: 16px;
  border-bottom: 4px solid var(--grey-300);
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
  padding: 0 16px;
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

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  background-color: var(--grey-200);
  height: 60px;
  padding: 8px 16px;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  cursor: pointer;

  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  background-color: var(--blue-500);
  color: var(--grey-100);
`
