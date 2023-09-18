'use client'
import { useEffect, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'

import { filterModalState, filterState } from '@/app/recoil-state'
import { KakaoItem } from '@/src/data/local/types'
import styled from '@emotion/styled'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TuneIcon from '@mui/icons-material/Tune'

import AddressSearchInput from './AddressSearchInput'
import ConditionsModal from './ConditionsModal'
import { depositMarks } from './DepositPriceSlider'
import { rentMarks } from './RentPriceSlider'
import SiteSelect from './SiteSelect'
import TypeAndPriceSelect from './TypeAndPriceSelect'

const FilterBox = () => {
  const siteRef = useRef<HTMLDivElement>(null)
  const typeAndPriceRef = useRef<HTMLDivElement>(null)

  const [conditions, setState] = useRecoilState(filterState)
  const [modalState, setModalState] = useRecoilState(filterModalState)

  const depositMaxText = useMemo(() =>
    conditions.deposit[1] === 40000? '' : depositMarks.find(mark => mark.value === conditions.deposit[1])?.label ?? ''
  , [conditions.deposit])

  const rentMaxText = useMemo(() =>
    conditions.rent[1] === 150 ? '' : rentMarks.find(mark => mark.value === conditions.rent[1])?.label ?? ''
  , [conditions.rent])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (siteRef.current && !siteRef.current.contains(event.target) && modalState.siteOpen) {
        setModalState(prevState => ({ ...prevState, siteOpen: false }))
      }
      if (typeAndPriceRef.current && !typeAndPriceRef.current.contains(event.target) && modalState.typeAndPriceOpen) {
        setModalState(prevState => ({ ...prevState, typeAndPriceOpen: false }))
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [typeAndPriceRef, setModalState, modalState.siteOpen, modalState.typeAndPriceOpen])

  return (
    <Container>
      <SearchContainer>
        <AddressSearchInput onChange={(value: KakaoItem) => setState({ ...conditions, area: value })}/>
        <MobileFilterContainer onClick={() => setModalState({ mobileFilterOpen: !modalState.mobileFilterOpen, siteOpen: false, typeAndPriceOpen: false })}>
          <TuneIcon width={24} height={24} sx={{ color: 'grey.800', m: 1, cursor: 'pointer', display: { laptop: 'none', mobile: 'block' } }}/>
        </MobileFilterContainer>
      </SearchContainer>
      <FilterContainer ref={siteRef}>
        <FilterMenu as='button' onClick={() => setModalState({ siteOpen: !modalState.siteOpen, mobileFilterOpen: false, typeAndPriceOpen: false })} selected={modalState.siteOpen}>
          <FilterText selected={modalState.siteOpen}>{conditions.site === 'zigbang' ? '직방' : '네이버 부동산'}</FilterText>
          {modalState.siteOpen
            ? <ExpandLessIcon sx={{ fontSize: 16, color: modalState.siteOpen ? '#90C2FF' : 'grey.800' }} />
            : <ExpandMoreIcon sx={{ fontSize: 16, color: modalState.siteOpen ? '#90C2FF' : 'grey.800' }} />
          }
        </FilterMenu>
        <FilterSelect>
          {modalState.siteOpen && <SiteSelect isOpen={modalState.siteOpen} onClose={() => setModalState({ siteOpen: false, typeAndPriceOpen: false, mobileFilterOpen: false })}/>}
        </FilterSelect>
      </FilterContainer>
      <FilterContainer ref={typeAndPriceRef}>
        <FilterMenu as='button' onClick={() => setModalState({ typeAndPriceOpen: !modalState.typeAndPriceOpen, siteOpen: false, mobileFilterOpen: false })} selected={modalState.typeAndPriceOpen}>
          <FilterText selected={modalState.typeAndPriceOpen}>
            {conditions.type === 'deposit'
              ? `전세${depositMaxText && `(~${depositMaxText})`}`
              : `월세${!depositMaxText && !rentMaxText ? ' ･ 금액' : !depositMaxText ? '(' : ''} ${depositMaxText && `(~${depositMaxText}${rentMaxText && '/'}`}${rentMaxText && `~${rentMaxText})`}${!depositMaxText && !rentMaxText ? '' : !rentMaxText ? ')' : ''}`
            }
          </FilterText>
          {modalState.typeAndPriceOpen
            ? <ExpandLessIcon sx={{ fontSize: 16, color: modalState.typeAndPriceOpen ? '#90C2FF' : 'grey.800' }} />
            : <ExpandMoreIcon sx={{ fontSize: 16, color: modalState.typeAndPriceOpen ? '#90C2FF' : 'grey.800' }} />
          }
        </FilterMenu>
        <FilterSelect>
          {modalState.typeAndPriceOpen && <TypeAndPriceSelect isOpen={modalState.typeAndPriceOpen} onClose={() => setModalState({ typeAndPriceOpen: false, siteOpen: false, mobileFilterOpen: false })}/>}
        </FilterSelect>
      </FilterContainer>
      <ConditionsModal />
    </Container>
  )
}

export default FilterBox

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  height: 60px;
  gap: 8px;
  background-color: var(--grey-50);
  border-bottom: 1px solid var(--grey-200);
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  @media (max-width: 767px) {
    display: none;
  }
`

const FilterMenu = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
  padding: 8px;
  border: ${(props) => props.selected ? '2px solid var(--blue-200)' : '1px solid var(--grey-200)'};
  background-color: var(--grey-50);
  border-radius: 4px;
  cursor: pointer;
`

const FilterText = styled.p<{ selected: boolean }>`
  font-size: 15px;
  font-weight: ${(props) => props.selected ? 600 : 500};
  color: ${(props) => props.selected ? 'var(--blue-300)' : 'var(--grey-800)'};
  &:hover {
    opacity: 0.8;
  }
`

const FilterSelect = styled.div`
  position: absolute;
  top: calc(100% + 13px);
  left: 0;
  z-index: 99;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const MobileFilterContainer = styled.div`
  display: flex;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`
