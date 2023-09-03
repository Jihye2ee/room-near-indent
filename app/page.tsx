'use client'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'

import { KakaoItem } from '@/src/data/local/types'
import AddressSearchInput from '@/src/ui/components/AddressSearchInput'
import styled from '@emotion/styled'
import BedIcon from '@mui/icons-material/Bed'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'

import { filterState } from './recoil-state'

export default function Home() {
  const router = useRouter()
  const [conditions, setConditions] = useRecoilState(filterState)
  const handleSelect = (e: any) => {
    setConditions({ ...conditions, distance: e.target.value })
  }

  return (
    <Container role='navigation' aria-label='주거 유형 선택'>
      <PreFilterContainer>
        <AddressSearchInput onChange={(value: KakaoItem) => setConditions({ ...conditions, area: value })} />
        <MainPhraseContainer>
          <DistanceSelect onChange={handleSelect}>
            <option value='0.7'>걸어서 10분 이내</option>
            <option value='1.5'>걸어서 20분 이내</option>
          </DistanceSelect>
        </MainPhraseContainer>
      </PreFilterContainer>
      <TypeSelectContainer>
        <TypeButtonContainer
          as='button'
          style={{ backgroundColor: '#356EFB' }}
          onClick={() => router.push('/officetel')}
        >
          <BusinessIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <TypeText>오피스텔</TypeText>
        </TypeButtonContainer>
        <TypeButtonContainer
          as='button'
          style={{ backgroundColor: '#FFBA00' }}
          onClick={() => router.push('/villa')}
        >
          <HomeIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <TypeText>빌라, 투룸+</TypeText>
        </TypeButtonContainer>
        <TypeButtonContainer
          as='button'
          style={{ backgroundColor: '#6D24FF' }}
          onClick={() => router.push('/oneroom')}
        >
          <BedIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <TypeText>원룸</TypeText>
        </TypeButtonContainer>
      </TypeSelectContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-top: 80px;
  @media (max-width: 767px) {
    margin-top: 16px;
    align-items: center;
  }
`

const PreFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 383px;
  @media (max-width: 767px) {
    width: 100%;
  }

`

const MainPhraseContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`

const DistanceSelect = styled.select`
  display: flex;
  height: 48px;
  padding: 16px;
  background-color: var(--grey-100);
  border-radius: 4px;
  border: 1px solid var(--grey-200);
`

const TypeSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const TypeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 120px;
  gap: 4px;
  cursor: pointer;
  border: none;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const TypeText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--grey-50);
`
