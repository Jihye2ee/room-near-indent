'use client'
import { useRouter } from 'next/navigation'
import { useReducer } from 'react'
import { useRecoilState } from 'recoil'

import { Stack, Typography } from '@/src/ui/mui'
import styled from '@emotion/styled'
import BedIcon from '@mui/icons-material/Bed'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'

import { filterState } from './recoil-state'

type State = {
  isCompanyEmojiShow: boolean
  isSubwayEmojiShow: boolean
  isSchoolEmojiShow: boolean
  isZigbangEmojiShow: boolean
  isNaverlandEmojiShow: boolean
}

type Action =
  | {
      type: 'TOGGLE_COMPANY'
      payload: boolean
    }
  | {
      type: 'TOGGLE_SUBWAY'
      payload: boolean
    }
  | {
      type: 'TOGGLE_SCHOOL'
      payload: boolean
    }
  | {
    type: 'TOGGLE_ZIGBANG'
    payload: boolean
  }
  | {
    type: 'TOGGLE_NAVER_LAND'
    payload: boolean
  }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_COMPANY':
      return { ...state, isCompanyEmojiShow: !state.isCompanyEmojiShow }
    case 'TOGGLE_SUBWAY':
      return { ...state, isSubwayEmojiShow: !state.isSubwayEmojiShow}
    case 'TOGGLE_SCHOOL':
      return { ...state, isSchoolEmojiShow: !state.isSchoolEmojiShow }
    case 'TOGGLE_ZIGBANG':
      return { ...state, isZigbangEmojiShow: !state.isZigbangEmojiShow }
    case 'TOGGLE_NAVER_LAND':
      return { ...state, isNaverlandEmojiShow: !state.isNaverlandEmojiShow }
    default:
      return state
  }
}

export default function Home() {
  const router = useRouter()
  const [conditions, setConditions] = useRecoilState(filterState)
  const [state, dispatch] = useReducer(reducer, { isCompanyEmojiShow: true, isSubwayEmojiShow: true, isSchoolEmojiShow: true, isZigbangEmojiShow: true, isNaverlandEmojiShow: true })
  const handleSelect = (e: any) => {
    setConditions({ ...conditions, distance: e.target.value })
  }
  return (
    <Stack alignItems='center' role='navigation' aria-label='주거 유형 선택' sx={{ mt: { laptop: 10, tablet: 5, mobile: 2 }}}>
      <MainPhraseContainer>
        원하는 장소에서&nbsp;
        <select onChange={handleSelect}>
          <option value='0.7'>걸어서 10분 이내</option>
          <option value='1.5'>걸어서 20분 이내</option>
        </select>
        &nbsp;매물을 찾아보세요!
      </MainPhraseContainer>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} pl={2} pr={2} sx={{ width: { mobile: '100%' }}}>
        <Stack
          component='button'
          borderRadius={2}
          justifyContent='center'
          alignItems='center'
          height={100}
          sx={{ backgroundColor: '#356EFB', width: { laptop: '120px', mobile: '100%' }, cursor: 'pointer', border: 'none' }}
          onClick={() => router.push('/officetel')}
        >
          <BusinessIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <Typography variant='body2' sx={{ color: 'grey.50', fontWeight: 600 }}>오피스텔</Typography>
        </Stack>
        <Stack
          component='button'
          borderRadius={2}
          justifyContent='center'
          alignItems='center'
          height={100}
          sx={{ backgroundColor: '#ffba00', width: { laptop: '120px', mobile: '100%' }, cursor: 'pointer', border: 'none' }}
          onClick={() => router.push('/villa')}
        >
          <HomeIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <Typography variant='body2' sx={{ color: 'grey.50', fontWeight: 600 }}>빌라, 투룸+</Typography>
        </Stack>
        <Stack
          component='button'
          borderRadius={2}
          justifyContent='center'
          alignItems='center'
          height={100}
          sx={{ backgroundColor: '#6D24FF', width: { laptop: '120px', mobile: '100%' }, cursor: 'pointer', border: 'none' }}
          onClick={() => router.push('/oneroom')}
        >
          <BedIcon aria-hidden='true' sx={{ fontSize: '30px', color: 'grey.50' }} />
          <Typography variant='body2' sx={{ color: 'grey.50', fontWeight: 600 }}>원룸</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

const MainPhraseContainer = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`
